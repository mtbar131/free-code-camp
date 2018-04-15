var outputDisplay = [];
var runningExp = [];
var resetDisplay = false;

$("#clearBtn").click(() => {
    runningExp = [];
    clearDisplay();
});

$("#nineBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(9);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#eightBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(8);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#sevenBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(7);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#sixBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(6);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#fiveBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(5);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#fourBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(4);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#threeBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(3);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#twoBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(2);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#oneBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(1);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#zeroBtn").click(() => {
    if (resetDisplay) {
        clearDisplay();
    }

    if (outputDisplay.length <= 20) {
        outputDisplay.push(0);
        $("#outputBox").html(outputDisplay);
    }
    else {
        alert("ERROR: INPUT CONTAINER OVERFLOW");
    }
});

$("#decimalBtn").click(() => {
    if (outputDisplay.includes(".")) {
        alert("ERROR: CANNOT HAVE TWO DECIMALS");
    }
    else if (outputDisplay.length == 0) {
        alert("ERROR: CANNOT START WITH DECIMAL");
    }
    else {
        if (outputDisplay.length <= 20) {
            outputDisplay.push(".");
            $("#outputBox").html(outputDisplay);
        }
        else {
            alert("ERROR: INPUT CONTAINER OVERFLOW");
        }
    }
});

$("#divideBtn").click(() => {
    runningExp.push(outputDisplay);
    runningExp.push("/");
    resetDisplay = true;
});

$("#multiplyBtn").click(() => {
    runningExp.push(outputDisplay);
    runningExp.push("*");
    resetDisplay = true;
});

$("#subtractBtn").click(() => {
    runningExp.push(outputDisplay);
    runningExp.push("-");
    resetDisplay = true;
});

$("#addBtn").click(() => {
    runningExp.push(outputDisplay);
    runningExp.push("+");
    resetDisplay = true;
});

$("#equalsBtn").click(() => {
    if (outputDisplay[outputDisplay.length - 1] == ".") {
        alert('ERROR: INPUT CANNOT END IN A DECIMAL');
    }
    else {
        runningExp.push(outputDisplay);

        // Array to string and strip commas
        var solution = eval(runningExp.toString().replace(/,/g, ""));
        $('#outputBox').html(solution);

        // Reset arrays
        resetDisplay = true;
        outputDisplay = [];
        runningExp = [];
        runningExp.push(solution);
    }
});

function clearDisplay() {
    outputDisplay = [];
    $("#outputBox").html(outputDisplay);
    resetDisplay = false;
}
