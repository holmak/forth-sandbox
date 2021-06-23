"use strict";

function main() {
    const Zoom = 2;
    const DisplayWidth = 160;
    const DisplayHeight = 120;

    let tokens = [];
    let tokenIndex = 0;
    let operands = [];
    let words = new Map();
    let memory = [];

    let textInput = document.getElementById("textInput");
    let textOutput = document.getElementById("textOutput");
    let canvas = document.getElementById("pixelOutput");
    let g = canvas.getContext("2d");
    g.fillStyle = "#000000";
    g.fillRect(0, 0, 320, 240);

    textInput.focus();

    function peek() {
        if (operands.length > 0) {
            return operands[operands.length - 1];
        }
        else {
            write("-- Not enough operands. ");
            return 0;
        }
    }

    function push(a) {
        operands.push(a);
    }

    function pop() {
        if (operands.length > 0) {
            return operands.pop();
        }
        else {
            write("-- Not enough operands. ");
            return 0;
        }
    }

    function readToken() {
        if (tokenIndex < tokens.length) {
            let name = tokens[tokenIndex];
            tokenIndex += 1;
            return name;
        }
        else {
            write("-- A name is required. ");
            return "";
        }
    }

    function write(text) {
        textOutput.innerHTML += text;
    }

    function setPixel(x, y, color) {
        g.fillStyle = "#FFFFFF";
        g.fillRect(x * Zoom, y * Zoom, Zoom, Zoom);
    }

    function onTextInput(event) {
        if (event.key == "Enter") {
            // Parse input:
            let input = textInput.value;
            tokens = input.split(/ +/);
            tokenIndex = 0;

            // String.split() returns a single empty string if the
            // input is empty; remove this invalid token.
            if (tokens[0] == "") {
                tokens.shift();
            }

            // Interpret words:
            while (tokenIndex < tokens.length) {
                let token = tokens[tokenIndex];
                tokenIndex += 1;

                let defn = words.get(token);
                if (defn !== undefined) {
                    defn();
                }
                else {
                    let n = parseInt(token);
                    if (!isNaN(n)) {
                        operands.push(n);
                    }
                    else {
                        write(`-- I do not understand '${token}'. `);
                        break;
                    }
                }
            }

            // Return unused operands to the input field:
            textInput.value = "";
            for (let n of operands) {
                textInput.value += (n.toString() + " ");
            }
            operands = [];

            // Finish updating the text output:
            write("\n");
            textOutput.scrollTop = textOutput.scrollHeight * 2;
        }
    }

    function define(name, func) {
        words.set(name, func);
    }

    define("print", function() {
        let n = pop();
        write(n.toString() + " ");
    });

    define("add", function() {
        let b = pop();
        let a = pop();
        push(a + b);
    });

    define("mul", function() {
        let b = pop();
        let a = pop();
        push(a * b);
    });

    define("variable", function() {
        let name = readToken();
        let address = memory.length;
        memory.push(0);
        define(name, function() { push(memory[address]); });
        define(name + "&", function() { push(address); });
        define(name + "!", function() { memory[address] = pop(); });
    });

    define("[", function() {
        let c = pop();
        if (c === 0) {
            // Skip the block:
            let depth = 1;
            while (tokenIndex < tokens.length) {
                let token = tokens[tokenIndex];
                tokenIndex += 1;
                if (token === "[") depth += 1;
                else if (token === "]") depth -= 1;
                if (depth <= 0) break;
            }
        }
    });

    define("]", function() {});

    define("dup", function() {
        push(peek());
    });

    define("swap", function() {
        let b = pop();
        let a = pop();
        push(b);
        push(a);
    });

    define("over", function() {
        let b = pop();
        let a = peek();
        push(b);
        push(a);
    });

    define("set-pixel", function() {
        let color = pop();
        let y = pop();
        let x = pop();
        setPixel(x, y, color);
    });

    textInput.addEventListener("keydown", onTextInput);
}

if (document.readyState != "loading") {
    main();
}
else {
    document.addEventListener("DOMContentLoaded", main);
}
