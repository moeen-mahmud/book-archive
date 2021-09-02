// Global variables for search result and total search quantity
const searchResult = document.getElementById("search-result");
const resultQuantity = document.getElementById("result-quantity");

// Functionality for search button
const searchBook = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  if (searchText === "") {
    searchField.value = "Search field cannot be empty...";
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResult(data.docs.slice(0, 30));
      console.log(data.docs);
      totalResults(data.numFound);
    } catch (err) {
      totalResults(data.numFound);
    }
  }
};

// Functionality for displaying the search results
const displayResult = (docs) => {
  searchResult.textContent = "";
  //Checking the condition
  if (Array.isArray) {
    if (docs.length !== -1) {
      docs.forEach((doc) => {
        const coverImage = doc.cover_i ? doc.cover_i : "";
        const bookName = doc.title;
        const authorsName = doc.author_name ? doc.author_name : "";
        const firstPublish = doc.first_publish_year
          ? doc.first_publish_year
          : "";
        const publisherName = doc.publisher ? doc.publisher : "Not found";
        const div = document.createElement("div");
        div.classList.add("p-4");
        div.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${coverImage}-M.jpg" class="block mx-auto mb-4 w-2/4 h-2/4">
      <h1 class="mb-2 text-xl font-bold text-center">${bookName}</h1>
      <h2 class="text-lg italic text-indigo-500">${authorsName}</h2>
      <p class="text-gray-600 mt-8"> First published in ${firstPublish}</p>
      <p class="text-gray-600 font-bold">Publisher: ${publisherName.slice(
        0,
        1
      )}</p>
    `;
        div.classList.add("thumbnails");
        searchResult.appendChild(div);
      });
    }
  }
};

//Function for displaying the total and the error message as well
const totalResults = (numFound) => {
  resultQuantity.classList.add("text-center");
  // For displaying the total result
  if (numFound > 0) {
    resultQuantity.innerHTML = `
    <div class="block mx-auto mt-16">
      <h1 class="text-xl font-bold text-indigo-500">Total 
        ${numFound} book(s) have been found.
      </h1>
    </div>
  `;
    // For displaying the error message
  } else {
    resultQuantity.innerHTML = `
    <div class="block mx-auto mt-16">
      <h1 class="text-5xl font-bold text-yellow-400">
        Looks like there are no such books! 🤔
      </h1>
    </div>
  `;
  }
};
