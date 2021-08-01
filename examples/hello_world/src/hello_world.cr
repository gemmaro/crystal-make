# TODO: Write documentation for `HelloWorld`
module HelloWorld
  VERSION = "0.1.0"

  # TODO: Put your code here
end

require "make"

world = Path.new("world.txt")

make = Make.new do |a|
  a.file world do |t|
    `echo hello > #{t.target}`
  end
end

make.run(world)
