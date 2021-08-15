<!-- markdownlint-disable no-duplicate-header -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.2.0 - 2021-08-15

### Added

- GitHub Actions CI settings
  - Test Crystal codes
  - Publish API document to GitHub Pages
- Some documents
  - readme
  - doc comments
- Hello world example
- Some tests
- Usefull types
  - `PathLike`
  - `PathsLike`
  - `CommandName`
  - `Error`
    - Some custom error types inheritating `Error`
- Method overloads
  - `Make#run`
  - `Tasks#file`
  - `Tasks#directory`
- `Tasks#command` for command task
- `Tasks#clean` for clean task (special command task)

### Changed

- Method visibilities
  - `Flow.initialize`
  - `Tasks.initialize`
  - `Tasks#file(path : PathLike, sources : Array(Path), action : Proc(Flow, Nil))`

### Fixed

- Require `file_utils` standard library on the code

## 0.1.0 - 2021-07-31

### Added

- This changelog file.
