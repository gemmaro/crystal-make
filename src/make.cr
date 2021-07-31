class Make
  VERSION = "0.1.0"

  def initialize
    @tasks = Tasks.new
    yield @tasks
  end

  def run(paths : Array(Path | Array(Path)))
    paths.flatten.each do |path|
      @tasks.run(path)
    end
  end

  class Flow
    getter target : Path
    getter sources : Array(Path)

    def initialize(@target : Path, @sources : Array(Path))
    end

    def source : Path
      @sources[0]
    end
  end

  class Tasks
    def initialize
      @directories = Set(Path).new
      @files = Hash(Path, Tuple(Array(Path), Proc(Flow, Nil))).new
    end

    def directory(path : Path)
      @directories << path
    end

    def file(path : Path, source : Path, &action : Flow ->)
      file(path, [source], action)
    end

    def file(path : Path, sources : Array(Path | String), &action : Flow ->)
      file(path, sources, action)
    end

    def file(path : Path, sources : Array(Path | String), action : Proc(Flow, Nil))
      sources = sources.map { |source| Path.new(source) }
      @files[path] = {sources, action}
    end

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

    private def mkdir(path : Path)
      generate(path, Array(Path).new) do |s|
        FileUtils.mkdir(s.target)
      end
    end

    private def generate(path : Path)
      raise "#{path} が存在しません。" unless File.exists?(path)
    end

    private def generate(path : Path, sources : Array(Path), &block : Flow ->)
      generate(path, sources, block)
    end

    private def generate(path : Path, sources : Array(Path), action)
      return if File.exists?(path)
      action.call(Flow.new(path, sources))
      raise "#{path} は生成されませんでした。" unless File.exists?(path)
    end
  end
end
