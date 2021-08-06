crystal_doc_search_index_callback({"repository_name":"make","body":"# make\n\n[![GitHub release](https://img.shields.io/github/release/gemmaro/crystal-make.svg)](https://github.com/gemmaro/crystal-make/releases)\n\nNOTE: This library is *highly* experimental.\n\nRake-like task runner library.\n\nThe features, including future improvements, are as follows.\n\n* This is a library.\n  * It is not provided as a command line tool.\n* File tasks are the main.\n  * Command is not yet supported.\n* Parallel execution is not supported.\n* The description can be a bit more verbose than Rake.\n\n## Installation\n\n* Add the dependency to your `shard.yml`:\n\n```yaml\ndependencies:\n  make:\n    github: gemmaro/crystal-make\n```\n\n* Run `shards install`\n\n## Usage\n\nA simple example (write \"hello\" in `world.txt`) is as follows:\n\n```crystal\nrequire \"make\"\n\nworld = Path.new(\"world.txt\")\n\nmake = Make.new do |a|\n  a.file world do |t|\n    `echo hello > #{t.target}`\n  end\nend\n\nmake.run(world)\n```\n\nThis example is also available in `examples/hello_world`.\n\n## Development\n\nI haven't written any tests or documentation yet.\nPlease wait a bit...\n\nTODO: Write development instructions here\n\n## Alternatives\n\n* [MakeNowJust / crake](https://github.com/MakeNowJust/crake)\n* [axvm / cake](https://github.com/axvm/cake/tree/master)\n* [imdrasil / sam.cr](https://github.com/imdrasil/sam.cr/tree/master)\n* [lupincr / lupin](https://github.com/lupincr/lupin)\n\n## Contributing\n\n1. Fork it (<https://github.com/gemmaro/crystal-make/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n* [gemmaro](https://github.com/gemmaro) - creator and maintainer\n","program":{"html_id":"make/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"make","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"make/Make","path":"Make.html","kind":"class","full_name":"Make","name":"Make","abstract":false,"superclass":{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"make/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/make.cr","line_number":3,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L3"}],"repository_name":"make","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.0\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[{"html_id":"new(&)-class-method","name":"new","doc":"Defines all tasks in a block.\n\nThe block takes `Tasks` as an argument:\n\n```\nMake.new do |a|\n  a.command :hello do\n    puts :world\n  end\nend.run(:hello)\n```","summary":"<p>Defines all tasks in a block.</p>","abstract":false,"args":[],"args_string":"(&)","args_html":"(&)","location":{"filename":"src/make.cr","line_number":17,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L17"},"def":{"name":"new","args":[],"double_splat":null,"splat_index":null,"yields":1,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize do |_arg0|\n  yield _arg0\nend\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"run(path:PathLike)-instance-method","name":"run","doc":"Start generating *path*.","summary":"<p>Start generating <em>path</em>.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"args_string":"(path : PathLike)","args_html":"(path : <a href=\"Make/PathLike.html\">PathLike</a>)","location":{"filename":"src/make.cr","line_number":25,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L25"},"def":{"name":"run","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@tasks.run(path)"}},{"html_id":"run(paths:Array(PathLike|Array(PathLike)))-instance-method","name":"run","doc":"Start generating all *paths*.","summary":"<p>Start generating all <em>paths</em>.</p>","abstract":false,"args":[{"name":"paths","doc":null,"default_value":"","external_name":"paths","restriction":"Array(PathLike | Array(PathLike))"}],"args_string":"(paths : Array(PathLike | Array(PathLike)))","args_html":"(paths : Array(<a href=\"Make/PathLike.html\">PathLike</a> | Array(<a href=\"Make/PathLike.html\">PathLike</a>)))","location":{"filename":"src/make.cr","line_number":30,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L30"},"def":{"name":"run","args":[{"name":"paths","doc":null,"default_value":"","external_name":"paths","restriction":"Array(PathLike | Array(PathLike))"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"paths.flatten.map do |path|\n  Path.new(path)\nend.each do |path|\n  @tasks.run(path)\nend"}},{"html_id":"run(name:Symbol)-instance-method","name":"run","doc":"Start running command of given *name*.","summary":"<p>Start running command of given <em>name</em>.</p>","abstract":false,"args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"}],"args_string":"(name : Symbol)","args_html":"(name : Symbol)","location":{"filename":"src/make.cr","line_number":37,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L37"},"def":{"name":"run","args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@tasks.run(name)"}}],"macros":[],"types":[{"html_id":"make/Make/Flow","path":"Make/Flow.html","kind":"class","full_name":"Make::Flow","name":"Flow","abstract":false,"superclass":{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"make/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/make.cr","line_number":41,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L41"}],"repository_name":"make","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"make/Make","kind":"class","full_name":"Make","name":"Make"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[{"html_id":"source:Path-instance-method","name":"source","doc":"Get first source of sources.\n\nIf the length of the `sources` is 0, then raise index error.","summary":"<p>Get first source of sources.</p>","abstract":false,"args":[],"args_string":" : Path","args_html":" : Path","location":{"filename":"src/make.cr","line_number":51,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L51"},"def":{"name":"source","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Path","visibility":"Public","body":"@sources[0]"}},{"html_id":"sources:Array(Path)-instance-method","name":"sources","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Array(Path)","args_html":" : Array(Path)","location":{"filename":"src/make.cr","line_number":43,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L43"},"def":{"name":"sources","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(Path)","visibility":"Public","body":"@sources"}},{"html_id":"target:Path-instance-method","name":"target","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Path","args_html":" : Path","location":{"filename":"src/make.cr","line_number":42,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L42"},"def":{"name":"target","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Path","visibility":"Public","body":"@target"}}],"macros":[],"types":[]},{"html_id":"make/Make/PathLike","path":"Make/PathLike.html","kind":"alias","full_name":"Make::PathLike","name":"PathLike","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/make.cr","line_number":22,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L22"}],"repository_name":"make","program":false,"enum":false,"alias":true,"aliased":"(Path | String)","aliased_html":"Path | String","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"make/Make","kind":"class","full_name":"Make","name":"Make"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[]},{"html_id":"make/Make/Tasks","path":"Make/Tasks.html","kind":"class","full_name":"Make::Tasks","name":"Tasks","abstract":false,"superclass":{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"make/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"make/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/make.cr","line_number":56,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L56"}],"repository_name":"make","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"make/Make","kind":"class","full_name":"Make","name":"Make"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[{"html_id":"clean(path:PathLike)-instance-method","name":"clean","doc":"*path* will be cleaned.","summary":"<p><em>path</em> will be cleaned.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"args_string":"(path : PathLike)","args_html":"(path : <a href=\"../Make/PathLike.html\">PathLike</a>)","location":{"filename":"src/make.cr","line_number":103,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L103"},"def":{"name":"clean","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@cleans << (Path.new(path))"}},{"html_id":"command(name:Symbol,prerequisite:Symbol,&action)-instance-method","name":"command","doc":"Add a command task, which will run *action* when called with *name*, after *prerequisite* runned.","summary":"<p>Add a command task, which will run <em>action</em> when called with <em>name</em>, after <em>prerequisite</em> runned.</p>","abstract":false,"args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"},{"name":"prerequisite","doc":null,"default_value":"","external_name":"prerequisite","restriction":"Symbol"}],"args_string":"(name : Symbol, prerequisite : Symbol, &action)","args_html":"(name : Symbol, prerequisite : Symbol, &action)","location":{"filename":"src/make.cr","line_number":89,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L89"},"def":{"name":"command","args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"},{"name":"prerequisite","doc":null,"default_value":"","external_name":"prerequisite","restriction":"Symbol"}],"double_splat":null,"splat_index":null,"yields":0,"block_arg":{"name":"action","doc":null,"default_value":"","external_name":"action","restriction":""},"return_type":"","visibility":"Public","body":"@commands[name] = {prerequisite, action}"}},{"html_id":"command(name:Symbol,&action)-instance-method","name":"command","doc":"Add a command task, which will run *action* when called with *name*.","summary":"<p>Add a command task, which will run <em>action</em> when called with <em>name</em>.</p>","abstract":false,"args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"}],"args_string":"(name : Symbol, &action)","args_html":"(name : Symbol, &action)","location":{"filename":"src/make.cr","line_number":94,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L94"},"def":{"name":"command","args":[{"name":"name","doc":null,"default_value":"","external_name":"name","restriction":"Symbol"}],"double_splat":null,"splat_index":null,"yields":0,"block_arg":{"name":"action","doc":null,"default_value":"","external_name":"action","restriction":""},"return_type":"","visibility":"Public","body":"if name == (:clean)\n  raise(\"clean command is built-in command and cannot be overridden\")\nend\n@commands[name] = action\n"}},{"html_id":"directory(path:PathLike)-instance-method","name":"directory","doc":"Add a directory task, a special file task which just make directory.","summary":"<p>Add a directory task, a special file task which just make directory.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"args_string":"(path : PathLike)","args_html":"(path : <a href=\"../Make/PathLike.html\">PathLike</a>)","location":{"filename":"src/make.cr","line_number":65,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L65"},"def":{"name":"directory","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@directories << (Path.new(path))"}},{"html_id":"file(path:PathLike,source:PathLike,&action:Flow->)-instance-method","name":"file","doc":"Add a file task, which will run *action* using *source* for generating *path*.","summary":"<p>Add a file task, which will run <em>action</em> using <em>source</em> for generating <em>path</em>.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"},{"name":"source","doc":null,"default_value":"","external_name":"source","restriction":"PathLike"}],"args_string":"(path : PathLike, source : PathLike, &action : Flow -> )","args_html":"(path : <a href=\"../Make/PathLike.html\">PathLike</a>, source : <a href=\"../Make/PathLike.html\">PathLike</a>, &action : <a href=\"../Make/Flow.html\">Flow</a> -> )","location":{"filename":"src/make.cr","line_number":75,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L75"},"def":{"name":"file","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"},{"name":"source","doc":null,"default_value":"","external_name":"source","restriction":"PathLike"}],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"action","doc":null,"default_value":"","external_name":"action","restriction":"(Flow -> )"},"return_type":"","visibility":"Public","body":"file(path, [Path.new(source)], action)"}},{"html_id":"file(path:PathLike,sources:Array(PathLike),&action:Flow->)-instance-method","name":"file","doc":"Add a file task, which will run *action* using *sources* for generating *path*.","summary":"<p>Add a file task, which will run <em>action</em> using <em>sources</em> for generating <em>path</em>.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"},{"name":"sources","doc":null,"default_value":"","external_name":"sources","restriction":"Array(PathLike)"}],"args_string":"(path : PathLike, sources : Array(PathLike), &action : Flow -> )","args_html":"(path : <a href=\"../Make/PathLike.html\">PathLike</a>, sources : Array(<a href=\"../Make/PathLike.html\">PathLike</a>), &action : <a href=\"../Make/Flow.html\">Flow</a> -> )","location":{"filename":"src/make.cr","line_number":80,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L80"},"def":{"name":"file","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"},{"name":"sources","doc":null,"default_value":"","external_name":"sources","restriction":"Array(PathLike)"}],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"action","doc":null,"default_value":"","external_name":"action","restriction":"(Flow -> )"},"return_type":"","visibility":"Public","body":"file(path, sources.map do |source|\n  Path.new(source)\nend, action)"}},{"html_id":"file(path:PathLike,&action:Flow->)-instance-method","name":"file","doc":"Add a file task, which will run *action* for generating *path*.","summary":"<p>Add a file task, which will run <em>action</em> for generating <em>path</em>.</p>","abstract":false,"args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"args_string":"(path : PathLike, &action : Flow -> )","args_html":"(path : <a href=\"../Make/PathLike.html\">PathLike</a>, &action : <a href=\"../Make/Flow.html\">Flow</a> -> )","location":{"filename":"src/make.cr","line_number":70,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L70"},"def":{"name":"file","args":[{"name":"path","doc":null,"default_value":"","external_name":"path","restriction":"PathLike"}],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"action","doc":null,"default_value":"","external_name":"action","restriction":"(Flow -> )"},"return_type":"","visibility":"Public","body":"file(path, Array(Path).new, action)"}},{"html_id":"namespace(_name:Symbol,&)-instance-method","name":"namespace","doc":"TODO: Prefixes inner commands' name with *name*.\n\nNOTE: To be implemented.\nCurrently not supported and just exists for grouping.","summary":"<p><span class=\"flag orange\">TODO</span>  Prefixes inner commands' name with <em>name</em>.</p>","abstract":false,"args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"Symbol"}],"args_string":"(_name : Symbol, &)","args_html":"(_name : Symbol, &)","location":{"filename":"src/make.cr","line_number":111,"url":"https://github.com/gemmaro/crystal-make/blob/7222de6c1d5d77240aa207ffbd58a12162d4fc84/src/make.cr#L111"},"def":{"name":"namespace","args":[{"name":"_name","doc":null,"default_value":"","external_name":"_name","restriction":"Symbol"}],"double_splat":null,"splat_index":null,"yields":0,"block_arg":null,"return_type":"","visibility":"Public","body":"yield"}}],"macros":[],"types":[]}]}]}})