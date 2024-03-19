const FRUITS = [
  "APPLE",
  "BANANA",
  "ORANGE",
  "MANGO",
  "AAM",
  "AMRICOT",
  "ASHTOUCH",
];

document
  .getElementById("search-input")
  .addEventListener("input", debounce(handleInputChange, 300));

const suggestionBox = document.querySelector(".suggestions-wrapper");

const getSuggestions = (keywords) => {
  let result = FRUITS.filter(
    (i) =>
      i.substring(0, keywords.length).toLowerCase() === keywords.toLowerCase()
  );
  return new Promise((res) => {
    setTimeout(() => res(result), 1000);
  });
};

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

async function handleInputChange(event) {
  const value = event.target.value;
  console.log(value);
  await handleSearch(value); // Call handleSearch when input changes
}

const handleSearch = async (keywords) => {
  const result = await getSuggestions(keywords);
  console.log("result", result);
  2;
  if (result.length) {
    suggestionBox.classList.add("suggestion-visible");
    suggestionBox.innerHTML = ""; // Clear previous suggestions
    result.forEach((suggestion) => {
      const suggestionElement = document.createElement("div");
      suggestionElement.textContent = suggestion;
      suggestionBox.appendChild(suggestionElement);
    });
  } else {
    suggestionBox.classList.remove("suggestion-visible");
    suggestionBox.innerHTML = ""; // Clear suggestion box if there are no suggestions
  }
};
