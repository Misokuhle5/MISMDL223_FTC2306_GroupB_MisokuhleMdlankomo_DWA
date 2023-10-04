const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  // Check if inputs are empty or not numeric
  if (isNaN(dividend) || isNaN(divider) || dividend === "" || divider === "") {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
    console.error("Validation Error: Both values are required in inputs.");
    return; // Exit early
  }

  // Check for division by zero
  if (parseFloat(divider) === 0) {
    result.innerText = "Division not performed. Cannot divide by zero. Try again";
    console.error("Validation Error: Division by zero.");
    return; // Exit early
  }

  // Check for invalid division with negative divider
  if (parseFloat(divider) < 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Validation Error: Invalid number provided.");
    return; // Exit early
  }

  // Check if both inputs are non-numeric
  if (isNaN(parseFloat(dividend)) || isNaN(parseFloat(divider))) {
    result.innerText = "Something critical went wrong. Please reload the page";
    console.error("Critical Error: Non-numeric values provided.");
    
    // Replace entire screen with error message
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page</h1>";
    
    return; // Exit early
  }

  // Perform the division
  const divisionResult = parseFloat(dividend) / parseFloat(divider);

  // Check if the result is a valid number
  if (isNaN(divisionResult)) {
    result.innerText = "Something critical went wrong. Please reload the page";
    console.error("Critical Error: Invalid division result");
    
    // Replace entire screen with error message
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page</h1>";
    
    return; // Exit early
  }

  // Display the result with no decimal
  result.innerText = Math.floor(divisionResult);
});
