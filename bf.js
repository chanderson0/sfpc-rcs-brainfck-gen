var fs = require('fs');
var braincrunch = require('braincrunch');

var BF_CHARACTERS = [
  '>', '<', '-', '.',
  '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+',
  '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'
];

var inputSearch = process.argv[2];
var searchRegex = new RegExp(inputSearch, 'i');

var inputChunks = [];
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  inputChunks.push(chunk);
});
process.stdin.on('end', function() {
  var input = inputChunks.join();
  translate(input, 0);
});

var start = new Date();
function translate(input, i) {
  setTimeout(function() {
    var bfCode = '';
    var bfOutput = '';
    
    for (var c = 0; c < input.length; ++c) {
      if (/\S/.test(input[c])) {
        bfCode += BF_CHARACTERS[Math.floor(Math.random() * BF_CHARACTERS.length)];
      } else {
        bfCode += input[c];
      }
    }

    new braincrunch.Machine({
      code: bfCode,
      write: function(n) {
        // Ignore bell
        if (n == 7) return;

        bfOutput += String.fromCharCode(n);
      }
    }).run();

    if (i % 10 == 0) {
      format(bfCode, bfOutput, i);
    }

    if (searchRegex.test(bfOutput)) {
      format(bfCode, bfOutput, i);
      console.log('!!!!DONE!!!!');
      process.exit();
    } else {
      translate(input, i+1);
    }
  }, 1);

}

function format(code, output, i) {
  // Reset console
  console.log('\u001B[2J\u001B[0;0f');
  console.log("Execution time: %dms", new Date() - start);
  console.log("Iteration: %d", i);

  console.log(code, '\n');
  console.log('------------------------------------');
  console.log(output);
  console.log('------------------------------------');
}