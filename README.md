# make

[![GitHub release](https://img.shields.io/github/release/gemmaro/crystal-make.svg)](https://github.com/gemmaro/crystal-make/releases)

NOTE: This library is *highly* experimental.

Rake-like task runner library.

The features, including future improvements, are as follows.

* This is a library.
  * It is not provided as a command line tool.
* File tasks are the main.
  * Command is not yet supported.
* Parallel execution is not supported.
* The description can be a bit more verbose than Rake.

## Installation

* Add the dependency to your `shard.yml`:

```yaml
dependencies:
  make:
    github: gemmaro/crystal-make
```

* Run `shards install`

## Usage

A simple example (write "hello" in `world.txt`) is as follows:

```crystal
require "make"

world = Path.new("world.txt")

make = Make.new do |a|
  a.file world do |t|
    `echo hello > #{t.target}`
  end
end

make.run(world)
```

This example is also available in `examples/hello_world`.

## Development

I haven't written any tests or documentation yet.
Please wait a bit...

TODO: Write development instructions here

## Alternatives

* [MakeNowJust / crake](https://github.com/MakeNowJust/crake)
* [axvm / cake](https://github.com/axvm/cake/tree/master)
* [imdrasil / sam.cr](https://github.com/imdrasil/sam.cr/tree/master)
* [lupincr / lupin](https://github.com/lupincr/lupin)

## Contributing

1. Fork it (<https://github.com/gemmaro/crystal-make/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

* [gemmaro](https://github.com/gemmaro) - creator and maintainer
