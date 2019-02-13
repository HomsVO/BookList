const   save = document.getElementById('save'),
        form = document.getElementById('form'),
        table = document.getElementById('table');
        removeBtns = table.getElementsByTagName('a');

let     books,
        book,
        editId = null;

init();


//Получить массив книг из локального хранилища
function getBooksFromStorage (){
    books = JSON.parse(localStorage.getItem('books')) || [];
}

//Обновить список книг на экране
function reloadBookList(){
    table.innerHTML = '<tr><th>AUTHOR</th><th>TITLE</th></tr>';
    createBooklist();
}

//Создать список книг на экране
function createBooklist(){
    books.forEach((c,i)=>{
        if( c !==null ){
            tr = document.createElement('tr');
            trHTML = `<td>${c.author}</td><td>${c.title}</td><td><img src="icons/edit.svg"
            width="28px" data-e="${i}"></td><td><img width="28px" src="icons/garbage.svg" data-d="${i}"></td>`
            tr.innerHTML = trHTML;
            table.appendChild(tr);
        }
    })
}
//Получить данные из полей формы в  book
function getFields () {
    book = {
        author:document.getElementById('author').value || '',
        date:document.getElementById('date').value || '',
        title:document.getElementById('title').value || '',
        pages:document.getElementById('pages').value || '',
    }
}

//Добавить книгу в локальное хранилище
function addBookToStorage() {
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}

//Функция для кнопок "remove"
function deleteBook(e){
    books.splice(e.target.dataset.d,1);
    localStorage.setItem('books',JSON.stringify(books));
}

//Сохранить отредактированую книгу
function saveEditedBook(i){
    books[i] = book;
    localStorage.setItem('books',JSON.stringify(books));
    cancelEdit();
}
function cancelEdit(){
    setBookFields("empty");
    cancel.classList.add("hide");
    form_title.innerText = "Book"
    editId = null;
}
function setBookFields(command,e){
    if(command == "target"){
        author.value = books[e.target.dataset.e].author;
        date.value = books[e.target.dataset.e].date;
        title.value = books[e.target.dataset.e].title;
        pages.value = books[e.target.dataset.e].pages;
    }
    if(command == "empty"){
        author.value = '';
        date.value = '';
        title.value = '';
        pages.value = '';
        book = {};
    }
}
function getBookFieldsForEdit(e){
        setBookFields('target',e);
        getFields();
        form_title.innerText = 'Editing';
        cancel.classList.remove('hide');
        editId = e.target.dataset.e;
}
//Функция для кнопки "SAVE"
function saveBook() {
    if(editId !== null){
        saveEditedBook(editId);
    }else{
        addBookToStorage();
    }
    getBooksFromStorage();
    reloadBookList();
}
//Инициализация
function init(){
    getBooksFromStorage();
    reloadBookList();
    save.onclick = saveBook;
    form.onchange = getFields;
    cancel.onclick = cancelEdit;
    table.onclick = function(e){
        if(e.target.dataset.e != undefined){
            getBookFieldsForEdit(e);
        }else if(e.target.dataset.d != undefined){
            deleteBook(e);
        }
        getBooksFromStorage();
        reloadBookList();
    };
}