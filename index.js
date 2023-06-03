let library = [];

// Book Div and Template const
const temp = document.querySelector(".book");
const book1 = document.querySelector("#book1");
let num = library.length;
const submitButton = document.getElementById('submit');
const input = document.getElementById('user');
// 
function Book (title, author, details) {
    this.id = num;
    this.title = title;
    this.author = author;
    this.details = details;
    num += 1;
  };
// e = keyboard event 
input.addEventListener("keyup", (e) => {
  const value = e.currentTarget.value;
  if (value ===""){
    submitButton.disabled = true;
  }
  else{
    submitButton.disabled = false;
  };
});
//buttons
function increaseButton() {
  let element = document.getElementById("increase");
  let value = element.innerHTML;
  ++value;
  console.log(value);
  document.getElementById("increase").innerHTML = value;
};
function decreaseButton() {
  let element = document.getElementById("increase");
  let value = element.innerHTML;
  value < 1 ? value = 1 : '';
  --value;
  console.log(value);
  document.getElementById("increase").innerHTML = value;
};
// 
function ReloadLibrary() {
  library = JSON.parse(localStorage.library);
  book1.innerHTML = "";
  book1.appendChild(temp);

  for (let i = 0; i < library.length; i += 1) {
    DisplayBook(library[i]);
  }; //loop
};
function SaveBook(title, author, details) {
  const book = new Book(title, author, details);
  if (!Array.isArray(library)) {
    library = [];
  };
  library.push(book);
  localStorage.library = JSON.stringify(library);
  ReloadLibrary();
};
function AddBook() {
  event.preventDefault();
  const formAddBook = document.forms.AddBook;
  const bookData = new FormData(formAddBook);
  const bookTitle = bookData.get("title");
  const bookAuthor = bookData.get("author");
  const bookDetails = bookData.get("details");
  formAddBook.reset();
  SaveBook(bookTitle, bookAuthor, bookDetails);
};
function DeleteBook(id) {
  library = library.filter((book) => book.id !== id);
  localStorage.library = JSON.stringify(library);
  ReloadLibrary();
};
// output data code
function DisplayBook(book) {
  const clon = temp.content.cloneNode(true);//true is used to copy parent and child elements and false is used to copy only parent element 
  clon.querySelectorAll("p")[0].innerHTML = "Title:" + book.title;
  clon.querySelectorAll("p")[1].innerHTML = "Author:" + book.author;
  clon.querySelectorAll("p")[2].innerHTML = "Details:" + book.author;
  clon.querySelector("button").addEventListener("click", () => {
    DeleteBook(book.id);
  });
  book1.appendChild(clon); //append is used for copy element data ad paste into another element  
  console.log(book);
};
// Load the Library on opening the page
ReloadLibrary();

 