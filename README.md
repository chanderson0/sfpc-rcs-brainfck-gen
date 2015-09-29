## Brainf*ck pretty image generator

![example](https://cloud.githubusercontent.com/assets/73099/10171403/ff8147d8-66a7-11e5-8f18-77c1aebab183.png)

### What?

This software replaces all non-whitespace characters in stdin with [Brainf*ck](https://en.wikipedia.org/wiki/Brainfuck) compatible characters, then runs it. It searches the output for a search string, and terminates when it finds that string.

### Usage

1. `npm install`
2. `node bf.js %SEARCH_STRING% < %INPUT_FILE%`

Example: `node bf.js sfpc < sfpc.txt`

### Dependencies

- [Braincrunch](https://github.com/AgentME/braincrunch)
