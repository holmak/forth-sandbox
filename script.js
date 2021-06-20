"use strict";

function main() {
    const Zoom = 2;
    const DisplayWidth = 160;
    const DisplayHeight = 120;

    let operands = [];

    let textInput = document.getElementById("textInput");
    let textOutput = document.getElementById("textOutput");
    let canvas = document.getElementById("pixelOutput");
    let g = canvas.getContext("2d");
    g.fillStyle = "#000000";
    g.fillRect(0, 0, 320, 240);

    textInput.focus();

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

    function write(text) {
        textOutput.innerHTML += text;
    }

    function drawPixel() {
        g.fillStyle = "#FFFFFF";
        g.fillRect(0, 0, Zoom, Zoom);
    }

    function onTextInput(event) {
        if (event.key == "Enter") {
            // Parse input:
            let input = textInput.value;
            let tokens = input.split(/ +/);

            // String.split() returns a single empty string if the
            // input is empty; remove this invalid token.
            if (tokens[0] == "") {
                tokens.shift();
            }

            // Interpret words:
            for (let i = 0; i < tokens.length; i++) {
                let token = tokens[i];

                if (token == ".") {
                    let n = pop();
                    write(n.toString() + " ");
                }
                else if (token == "+") {
                    let b = pop();
                    let a = pop();
                    push(a + b);
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
                console.log(operands);
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

    textInput.addEventListener("keydown", onTextInput);
}

if (document.readyState != "loading") {
    main();
}
else {
    document.addEventListener("DOMContentLoaded", main);
}
