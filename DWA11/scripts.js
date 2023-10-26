// Get DOM elements
const counterElement = document.getElementById("counter");
const addButton = document.getElementById("addButton");
const subtractButton = document.getElementById("subtractButton");
const resetButton = document.getElementById("resetButton");
const confirmationMessage = document.getElementById("confirmationMessage");

let counterValue = 0;

// Function to update the counter display
function updateCounterDisplay() {
    counterElement.textContent = counterValue;
}

// Event listener for the "Add" button
addButton.addEventListener("click", function () {
    counterValue++;
    updateCounterDisplay();
});

// Event listener for the "Subtract" button
subtractButton.addEventListener("click", function () {
    if (counterValue > 0) {
        counterValue--;
        updateCounterDisplay();

    }
});

// Event listener for the "Reset" button
resetButton.addEventListener("click", function () {
    counterValue = 0;
    updateCounterDisplay();
    confirmationMessage.style.display = "block";
    setTimeout(function () {
        confirmationMessage.style.display = "none";
    }, 2000);
});

// Initialize the counter display
updateCounterDisplay();

// Create a state object to track the counter value
const state = {
    count: 0,
};

// Function to dispatch actions and update the state
function dispatch(action) {
    switch (action) {
        case "ADD":
            state.count++;
            break;
        case "SUBTRACT":
            if (state.count > 0) {
                state.count--;
            }
            break;
        case "RESET":
            state.count = 0;
            break;
    }
}

// Function to log the state to the console
function logState() {
    console.log("Current state: ", state.count);
}



logState(); // Output: "Current state: 0"


dispatch("ADD");
dispatch("ADD");
logState(); // Output: "Current state: 2"

dispatch("SUBTRACT");
logState(); // Output: "Current state: 1"


dispatch("RESET");
logState(); // Output: "Current state: 0"
