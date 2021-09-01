const searchField = document.getElementById("search-field");
const searchResult = document.getElementById("search-result");
const resultQuantity = document.getElementById("result-quantity");
const errorContainer = document.getElementById("error-container");

const searchBook = async () => {
  const searchText = searchField.value;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const response = await fetch(url);
  const data = await response.json();
  displayResult(data.docs);
  totalResults(data.numFound);
};

const displayResult = (docs) => {
  docs.forEach((doc) => {
    doc.author_name?.forEach((author) => console.log(author));
    const coverImage = doc.cover_i ? doc.cover_i : "10909258";
    const bookName = doc.title;
    const authorsName = doc.author_name ? doc.author_name : "";
    const firstPublish = doc.first_publish_year ? doc.first_publish_year : "";
    const publisherName = doc.publisher ? doc.publisher : "";
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${coverImage}-M.jpg" class="block mx-auto">
      <h1 class="text-xl font-bold">${bookName}</h1>
      <h2 class="font-bold">${authorsName}</h2>
      <p class="text-gray-600">${firstPublish}</p>
      <p class="text-gray-600 font-bold">${publisherName}</p>
      
    `;
    div.classList.add("thumbnails", "space-y-2");
    searchResult.appendChild(div);
    // console.log(doc.title);
  });
};

const totalResults = (numFound) => {
  resultQuantity.classList.add("text-center");
  resultQuantity.innerText = `Total ${numFound} results found`;
};
