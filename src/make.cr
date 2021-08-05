require "file_utils"

class Make
  VERSION = "0.1.0"

  # Defines all tasks in a block.
  #
  # The block takes `Tasks` as an argument:
  #
  # ```
  # Make.new do |a|
  #   a.command :hello do
  #     puts :world
  #   end
  # end.run(:hello)
  # ```
  def initialize
    @tasks = Tasks.new
    yield @tasks
  end

  # Start generating *path*.
  def run(path : Path)
    @tasks.run(path)
  end

  # Start generating all *paths*.
  def run(paths : Array(Path | Array(Path) | String))
    paths.flatten.map { |path| Path.new(path) }.each do |path|
      @tasks.run(path)
    end
  end

  # Start running command of given *name*.
  def run(name : Symbol)
    @tasks.run(name)
  end

  class Flow
    getter target : Path
    getter sources : Array(Path)

    protected def initialize(@target : Path, @sources : Array(Path))
    end

    # Get first source of sources.
    #
    # If the length of the `sources` is 0, then raise index error.
    def source : Path
      @sources[0]
    end
  end

  class Tasks
    protected def initialize
      @directories = Set(Path).new
      @files = Hash(Path, Tuple(Array(Path), Proc(Flow, Nil))).new
      @commands = Hash(Symbol, Proc(Nil)).new
    end

    # Add a directory task, a special file task which just make directory.
    def directory(path : Path)
      @directories << path
    end

    # Add a file task, which will run *action* for generating *path*.
    def file(path : Path | String, &action : Flow ->)
      file(path, Array(Path).new, action)
    end

    # Add a file task, which will run *action* using *source* for generating *path*.
    def file(path : Path | String, source : Path | String, &action : Flow ->)
      file(path, [Path.new(source)], action)
    end

    # Add a file task, which will run *action* using *sources* for generating *path*.
    def file(path : Path | String, sources : Array(Path | String), &action : Flow ->)
      file(path, sources.map { |source| Path.new(source) }, action)
    end

    private def file(path : Path | String, sources : Array(Path), action : Proc(Flow, Nil))
      @files[Path.new(path)] = {sources, action}
    end

    # Add a command task, which will run *action* when called with *name*.
    def command(name : Symbol, &action)
      @commands[name] = action
    end

    # TODO: Prefixes inner commands' name with *name*.
    #
    # NOTE: To be implemented.
    # Currently not supported and just exists for grouping.
    def namespace(_name : Symbol)
      yield
    end

    protected def run(path : Path)
      if @directories.includes?(path)
        mkdir(path)
      elsif @files.has_key?(path)
        sources, action = @files[path]

        sources.each do |source|
          run(source)
        end

        generate(path, sources, action)
      else
        generate(path)
      end
    end

    protected def run(name : Symbol)
      @commands[name].call
    end

    private def mkdir(path : Path)
      generate(path, Array(Path).new) do |s|
        FileUtils.mkdir(s.target)
      end
    end

    private def generate(path : Path)
      raise "#{path} doesn't exist" unless File.exists?(path)
    end

    private def generate(path : Path, sources : Array(Path), &block : Flow ->)
      generate(path, sources, block)
    end

    private def generate(path : Path, sources : Array(Path), action)
      return if File.exists?(path)
      action.call(Flow.new(path, sources))
      raise "#{path} wasn't generated" unless File.exists?(path)
    end
  end
end
