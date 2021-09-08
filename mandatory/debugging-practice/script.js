let myLibrary = []; // array of book objects with author, title, page and check (true/false) properties

window.addEventListener("load", function (e) {
  // when the page loads, call these two functions
  populateStorage();
  render();
});

function populateStorage() {
  // adds default book objects to the myLibrary array
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true); // creates book1 object with author, title, pages and check properties
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    // render();  // calling render func here is not necessary
  } 
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  // adds new book to the myLibrary array of book objects with input values
  if (
    title.value === null ||
    title.value === "" ||
    author.value === null ||
    author.value === "" ||
    pages.value === null ||
    pages.value === "" ||
    pages.value <= 0
  ) {
    alert("Please fill all fields properly!");
    return false; // why do we return false here?
  } else if (myLibrary.some((book) => book.title === title.value)) {
    alert("This book is already in the library");
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
  } 
}

class Book {
  constructor(title, author, pages, check) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.check = check;
  }
}
function render() {   // creates table rows and cells for each book object and renders it on the page
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    cell4.appendChild(changeBut);
    let readStatus = "";
    if (myLibrary[i].check === true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    changeBut.innerHTML = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();  // calling the function itself to adjust the check property value and show it on the page
    });

    //add delete button to every row and render again
    let delBut = document.createElement("button");
    delBut.id = i + 5;
    cell5.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
