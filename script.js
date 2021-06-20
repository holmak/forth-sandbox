"use strict";

function main() {
    const Zoom = 2;
    const DisplayWidth = 160;
    const DisplayHeight = 120;

    var textInput = document.getElementById("textInput");
    var textOutput = document.getElementById("textOutput");
    var canvas = document.getElementById("pixelOutput");
    var g = canvas.getContext("2d");
    g.fillStyle = "#000000";
    g.fillRect(0, 0, 320, 240);

    function onTextInput(event) {
        if (event.key == "Enter") {
            textOutput.innerHTML += ("\n" + textInput.value);
            textOutput.scrollTop = textOutput.scrollHeight * 2;
            textInput.value = "";

            // Draw a pixel:
            g.fillStyle = "#FFFFFF";
            g.fillRect(0, 0, Zoom, Zoom);
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
