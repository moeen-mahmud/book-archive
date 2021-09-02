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
  totalResults(data.docs.length);
};

const displayResult = (docs) => {
  docs.forEach((doc) => {
    doc.author_name?.forEach((author) => console.log(author));
    const coverImage = doc.cover_i ? doc.cover_i : "";
    const bookName = doc.title;
    const authorsName = doc.author_name ? doc.author_name : "";
    const firstPublish = doc.first_publish_year ? doc.first_publish_year : "";
    const [publisherName] = doc.publisher ? doc.publisher : "";
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${coverImage}-M.jpg" class="block mx-auto mb-4 w-2/4 h-2/4">
      <h1 class="text-xl font-bold mb-2">${bookName}</h1>
      <h2 class="font-bold">By ${authorsName}</h2>
      <p class="text-gray-600 mt-8"> First published in ${firstPublish}</p>
      <p class="text-gray-600 font-bold">Publisher: ${publisherName}</p>
    `;
    div.classList.add("thumbnails");
    searchResult.appendChild(div);
  });
};

const totalResults = (totalFound) => {
  resultQuantity.classList.add("text-center");
  resultQuantity.innerHTML = `
    <div class="block mx-auto">
      <h1 class="text-xl font-bold text-indigo-500">
        Total ${totalFound} results have found.
      </h1>
    </div>
  `;
};
