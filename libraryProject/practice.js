/* declaration of objects/variables */ 
const myLibrary = [];

function Book (title,author,pages,readed){
    this.title = title;
    this.author=author;
    this.pages=pages;
    this.readed=readed;
    this.info = function(){
        console.log(title + ' '+author+' '+pages+' '+readed);
    }
}   

const form = document.getElementById('form');
const bookShowCase = document.getElementById('bookShowCase');
const btnAdd = document.getElementById("addBtn");
const shelf = document.getElementById('bookShelf');

//form inputs
const dialog = document.getElementById("dialog");
const titleForm = document.getElementById('addTitle');
const authorForm = document.getElementById('addAuthor');
const pagesForm = document.getElementById('addPages');
const readedForm = document.getElementById('readed');


/*Logic*/ 
function addBookToLibrary(book) {
    if (myLibrary.some(bookB => bookRepeated(book, bookB))) {
        console.log('book already in library');
        return;
    }
    myLibrary.push(book);
    showBooks();
}


function showBooks (){
    console.log('2');
    while (shelf.hasChildNodes()) {
        shelf.removeChild(shelf.firstChild);
    }

    myLibrary.forEach(book => {
        showBooksInTable(book);
    })
}

function bookRepeated(bookA,bookB){
    console.log('4');
    if ((bookA.author === bookB.author) && (bookA.title===bookB.title)){
        return true;
    }
    return false;
}

function showBooksInTable(book){
    //create div and assign a class
    const bookElem = document.createElement("div"); 
    bookElem.classList.add('card');

    //add book content
    const header = document.createElement('div');
    header.id="title";
    header.classList.add('cardHeader');

    const titleText = document.createElement('h2');
    titleText.textContent = book.title;

    const readed = document.createElement('div');
    readed.id = "readed";
    readed.textContent = book.readed? "Read" : "Unread";

    header.appendChild(titleText);
    header.appendChild(readed);

    const cardBody = document.createElement('div');
    cardBody.classList.add('cardBody');
    
    const textAuthor = document.createElement('h4');
    textAuthor.id = "cardDescription";
    textAuthor.textContent = "author:";
    cardBody.appendChild(textAuthor);
    cardBody.append(book.author);

    const textPages = document.createElement('h4');
    textPages.id="cardDescription";
    textPages.textContent='pages:';
    cardBody.appendChild(textPages);
    cardBody.append(book.pages);

    const delBtn = document.createElement('button');
    delBtn.id='delete';
    delBtn.textContent='delete';

    delBtn.addEventListener('click',()=>{
        deleteBook(book);
    });

    const readBtn = document.createElement('button');
    readBtn.id= book.readed? "Readed":"Unreaded";
    readBtn.textContent = !book.readed? "Readed":"Unreaded";

    readBtn.addEventListener('click',()=>{
        book.readed = !book.readed;
        readBtn.textContent = !book.readed? "Readed":"Unreaded";
        readBtn.style.backgroundColor = book.readed? "#dc2626":"#16a34a";
        readed.textContent = book.readed? "Readed":"Unreaded";
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttonsDiv');

    buttonsDiv.appendChild(delBtn);
    buttonsDiv.appendChild(readBtn);

    bookElem.appendChild(header);
    bookElem.appendChild(cardBody);
    bookElem.appendChild(buttonsDiv);
    shelf.appendChild(bookElem);
    bookShowCase.appendChild(shelf);
}

function deleteBook (book) {
    let index = myLibrary.indexOf(book);
    if (index !== -1){
        myLibrary.splice(index,1);
        showBooks();
    }
    return;
}

//add events listeners

btnAdd.addEventListener('click', () => {
    dialog.showModal();
})

form.addEventListener('submit',(event)=>{
    const newTitle = titleForm.value;
    const newAuthor = authorForm.value;
    const newPages = pagesForm.value;
    const newReaded = readedForm.value;

    const book = new Book(newTitle,newAuthor,newPages,newReaded);
    console.log('5');
    addBookToLibrary(book);

    event.preventDefault();
    dialog.close();

    titleForm.value='';
    authorForm.value='';
    pagesForm.value='';
    readedForm.value='';
});