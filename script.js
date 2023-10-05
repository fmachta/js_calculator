document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".screen");
  const buttons = document.querySelectorAll(".button");
  const screen1 = "5x9/3x7/5-5+6/3-5/2";

  console.log("HERE IS THE CONSOLE LOG", calculate(screen1));

  let currentOperation = null;
  let shouldResetScreen = false;

  function clearAll() {
    screen.value = "";
    currentOperation = null;
    shouldResetScreen = false;
  }

  function calculate(screen) {
    const numbers = [];
    const signs = [];
    
    let currentNumber = "";
    for (let i = 0; i < screen.length; i++) {
        if ('0123456789'.includes(screen[i]) || (screen[i] === '-' && (i === 0 || '+-x/'.includes(screen[i-1])))) {
            currentNumber += screen[i];
        } else {
            numbers.push(Number(currentNumber));
            currentNumber = "";
            signs.push(screen[i]);
        }
    }
    if (currentNumber) numbers.push(Number(currentNumber));

    const counts = {};
    for (const num of signs) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    if (counts["x"] === undefined) {
      counts["x"] = 0;
    }

    if (counts["/"] === undefined) {
      counts["/"] = 0;
    }

    if (counts["+"] === undefined) {
      counts["+"] = 0;
    }

    if (counts["-"] === undefined) {
      counts["-"] = 0;
    }

    console.log(
      "how many occurances are there of each sign:",
      "\n",
      counts,
      "\n"
    );
    console.log(
      "how many occurances are there of x and /:",
      "\n",
      counts["x"] + counts["/"],
      "\n"
    );
    console.log(
      "how many occurances are there of + and -:",
      "\n",
      counts["+"] + counts["-"],
      "\n"
    );

    console.log("list the numbers in the equation:", "\n", numbers, "\n"); // [5, 10, 3, 5, 1]
    console.log("list the signs in the equation", "\n", signs, "\n", "\n"); // [ 'x', '/', 'x', '-' ]

    console.log("List the steps of the multiplication and division:");
    console.log("==========================");
    for (let i = 0; i < counts["x"] + counts["/"]; i++) {
      switch (signs[i]) {
        case "x":
          numbers[i] = numbers[i] * numbers[i + 1];
          numbers.splice(i + 1, 1); // Remove the next number as it's been used
          signs.splice(i, 1); // Remove the current sign as it's been processed
          i--; // Decrement the index to adjust for splicing
          break;
        case "/":
          numbers[i] = numbers[i] / numbers[i + 1];
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
          break;
      }
      console.log("array numbers:", numbers);
      console.log("array signs:", signs);
    }
    console.log("==========================", "\n");

    console.log("List the steps of the addition and subtration:");
    console.log("==========================");
    for (let i = 0; i < counts["+"] + counts["-"]; i++) {
      switch (signs[i]) {
        case "+":
          numbers[i] = numbers[i] + numbers[i + 1];
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
          break;
        case "-":
          numbers[i] = numbers[i] - numbers[i + 1];
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
          break;
      }
      console.log("array numbers:", numbers);
      console.log("array signs:", signs);
    }
    console.log("==========================", "\n", "\n");
    console.log("list the final answer:", numbers[0]);
    return numbers[0];
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const value = e.target.innerText;

      if (["+", "-", "x", "/"].includes(value)) {
        if (["+", "-", "x", "/"].includes(screen.value.slice(-1))) return; // Prevent multiple operations in a row
        currentOperation = value;
        screen.value += value;
      } else if (value === "=") {
        if (currentOperation === null) return;
        screen.value = calculate(screen.value); // Sending screen's value to the function
      } else if (value === "C") {
        clearAll();
      } else {
        if (shouldResetScreen) {
          screen.value = "";
          shouldResetScreen = false;
        }
        screen.value += value;
      }
    });
  });
});
