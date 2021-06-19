"use strict";

function main() {
    var textInput = document.getElementById("textInput");
    var textOutput = document.getElementById("textOutput");

    function onTextInput(event) {
        if (event.key == "Enter") {
            textOutput.innerHTML += ("\n" + textInput.value);
            textOutput.scrollTop = textOutput.scrollHeight * 2;
            textInput.value = "";
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
