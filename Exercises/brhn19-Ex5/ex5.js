//----------------------------------------------------------------------------------
//Part 1,2 - Class definition
//----------------------------------------------------------------------------------
/*
TODO: Create a Book class;
Class Name: Book
Description: The parent class with 3 public instance fields

-------------------------------------------------------------------------------
Constructor 
- Params: title, author, pages
-------------------------------------------------------------------------------
Method: reading()
Description: Function that returns the following string:
"You chose <book_title>, here are are its details: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
<BookType Data>: <BookType Data>"

- details() you will implement in the child classes below will be used for 
  the book details.

-------------------------------------------------------------------------------
Method: addToTable()
Description: Function that reads the input form data and adds a book to the 
table below the submit button

- Use querySelector() to obtain a reference to the book table
- Use createElement() in order to create a new table row.
- Populate the table row using innerHTML
- Assign text color based on type of object 
  (Textbook : Red, PictureBook : Blue, CookBook : Green) 
  Resource: https://www.w3schools.com/jsref/prop_html_style.asp
- Append the new row to the table
- Add an event listener to the row that listens for a 'click' event. When  
  clicked will use the return value of the reading() function to display an alert.
- Clear input fields after adding the book
*/

//
// Todo: 
// Book class here!
//

class Book{
  constructor(title,author,pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  reading(){ 
    var str = `You chose ${this.title}, here are its details:\n` +this.details();
    return str;
  }

  addToTable(){    
    var table = document.querySelector('#table');
    var tr = document.createElement('tr');
    var type = document.querySelector('#bookType').value;
 
    if(type == 'TextBook'){
        tr.style.color = 'Red';
     }
    else if(type == 'PictureBook'){
        tr.style.color = 'Blue';
      }
    else{
        tr.style.color = 'Green'
      }
    
    var td1 = document.createElement('td');
    td1.innerHTML = this.title;
    var td2 = document.createElement('td');
    td2.innerHTML = this.author;
    var td3 = document.createElement('td');
    td3.innerHTML = this.pages;
  
    var bookAlert = this.reading();
  
    tr.append(td1,td2,td3);
    table.appendChild(tr);
    tr.addEventListener('click',function(){
      alert(bookAlert)});
  };
}

/*
TODO: Create a TextBook class that inherits from the Book class.
Class Name: TextBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, subject;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string:
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Subject: <book_subject>
*/

//
// Todo: 
// TextBook class here!
//
class TextBook extends Book{
  constructor(title,author,pages,subject){
    super(title,author,pages);
    this.subject = subject;
  }

  details(){
    var str = `Title: ${this.title}\nAuthor: ${this.author}\nPage #: ${this.pages}\n`;
    str += `Subject: ${this.subject}`
    return str;
  }
}
/*
TODO: Create a PictureBook class that inherits from the Book class.
Class Name: PictureBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, illustrator;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Illustrator: <book_illustrator>
*/


//
// Todo: 
// PictureBook class here!
//
class PictureBook extends Book{
  constructor(title,author,pages,illustrator){
    super(title,author,pages);
    this.illustrator = illustrator;
  }

  details(){
    var str = `Title: ${this.title}\nAuthor: ${this.author}\nPage #: ${this.pages}\n`;
    str += `Illustrator: ${this.illustrator}`
    return str;
  }
}

/*
TODO: Create a CookBook class that inherits from the Book class.
Class Name: CookBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, cuisine;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Cuisine: <book_cuisine>
*/

//
// Todo: 
// CookBook class here!
//
class CookBook extends Book{
  constructor(title,author,pages,cuisine){
    super(title,author,pages);
    this.cuisine = cuisine;
  }

  details(){
    var str = `Title: ${this.title}\nAuthor: ${this.author}\nPage #: ${this.pages}\n`;
    str += `Cuisine: ${this.cuisine}`
    return str
  }
}

//----------------------------------------------------------------------------------
//Part 3 - Putting it all together
//----------------------------------------------------------------------------------

// 
// Todo: 
// Declare variables of which values are the references to the HTML elements with 
// the id 'title', 'author', 'pages', 'bookType', and 'data'. 
// - use querySelector 
let titleELem = document.querySelector('#title');
let authorElem = document.querySelector('#author');
let p1Elem = document.querySelector('#pages');
let bookTypeElem = document.querySelector('#bookType');
let dataElem = document.querySelector('#data');



// 
// Todo: 
// - save form data into variables
// - validate inputs
// - create an object based on the book type
// - add the book to the table by calling addToTable of the created object
//
function addBook() {
  var title = titleELem.value;
  var author = authorElem.value;
  var p1 = p1Elem.value;
  var bookType = bookTypeElem.value;
  var data = dataElem.value;
  var flag = true;

  p1 = p1.replace(/^0+/, ''); //leading zeroes

  /*PAGE NUMBER format:
    integers,
    rejects floats,
    removes leading zeroes,
    rejects chars mixed with integers,
    rejects empty string,
    rejects 0 (caught by regex)
  */

  if((String(parseInt(p1))) != p1){ 
    alert('Invalid Page Number Input');
    flag = false
  }
  if(title == '' || author == '' || bookType == '' || data == '' ){
    alert('Input required');
    flag = false;
  }

  if(bookType == 'TextBook'){
    var book = new TextBook(title,author,p1,data);
  } else if(bookType == 'CookBook'){
    var book = new CookBook(title,author,p1,data);
  } else{
    var book = new PictureBook(title,author,p1,data);
  }

  if (flag == true){
    book.addToTable(); 
  }

  clearInputs();
}

//
// Todo: 
// Clear input form elements
// Note that the default book type is "TextBook" and the default dataLabel is "Subject"
//
function clearInputs() {
  //book type is already defaulted as textbook, no need for redundency

  document.querySelector('#book-form').reset();
  document.querySelector('#dataLabel').innerText = 'Subject'
}

//
// Todo: 
// Register an event handler function (to the bookType) that switches the names of
// the last input's label based on book type chosen.
//

const selectChange = document.querySelector('#bookType');
selectChange.addEventListener('change', (event)=>{
  var lbl = document.querySelector('#dataLabel');
  var newType = event.target.value;
  var replacementLbl = '';
  
  if(newType == "TextBook"){
    replacementLbl = 'Subject';
  }
  else if(newType == "PictureBook"){
    replacementLbl = 'Illustrator';
  }
  else{
    replacementLbl = 'Cuisine';
  }
  lbl.innerText = replacementLbl;
});
