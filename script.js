let card = document.querySelectorAll('.notes-card');
let canvas = document.querySelector('.canvas');

let addBtn = document.querySelector('.add');
let deleteBtn = document.querySelector('.delete');
let addContainer = document.querySelector('.addPopUpContainer');
let addPopUp = document.querySelector('.addPopUp')
let addExit = document.querySelector('.add-exit');

function getMonth(){
    if(new Date().getMonth() < 10){
        return `0${new Date().getMonth()}`
    } else if(new Date().getMonth() >= 10){
        return new Date().getMonth()
    }
}
function getDate(){
    if(new Date().getDate() < 10){
        return `0${new Date().getDate()}`
    } else if(new Date().getDate() >= 10){
        return new Date().getDate()
    }
}

addBtn.addEventListener('click',()=>{
    addContainer.style.display = 'flex';
    addPopUp.classList.add('showPopUp');
    addPopUp.classList.remove('exitPopUp');
    datesection.textContent = `${getDate()}.${getMonth()}.${new Date().getFullYear()}`;
})
addExit.addEventListener('click',()=>{
    addPopUp.classList.add('exitPopUp');
    addPopUp.classList.remove('showPopUp');
    addPopUp.reset();
    setTimeout(()=>{
        addContainer.style.display = 'none'
    },1000);
})

let carousel = document.querySelector('.carousel')

let datesection = document.querySelector('.add-date');
let titlesection = document.querySelector('#add-title');
let textareasection = document.querySelector('#add-content');
let ADDBUTTON = document.querySelector('.add-add-button');
let notesArray = [];

function addNotes(){
    carousel.innerHTML = '';
    notesArray.forEach(note=>{
        let notesCard = document.createElement('div'); notesCard.classList.add('notes-card'); notesCard.setAttribute('data-ID', note.id)
        let cardTopRow = document.createElement('div'); cardTopRow.classList.add('card-top-row'); notesCard.appendChild(cardTopRow);
        let date = document.createElement('p'); date.classList.add('date'); date.textContent = note.date; cardTopRow.appendChild(date);
        let deleteimg = document.createElement('img'); deleteimg.classList.add('deleteimg'); deleteimg.setAttribute('src','images/material-symbols--close-rounded.png'); cardTopRow.appendChild(deleteimg);

        let cardBottomRow = document.createElement('div'); cardBottomRow.classList.add('card-bottom-row'); notesCard.appendChild(cardBottomRow);
        let title = document.createElement('h2'); title.classList.add('title'); title.textContent = note.title; cardBottomRow.appendChild(title);
        let editimg = document.createElement('img'); editimg.classList.add('editimg'); editimg.setAttribute('src','images/solar--pen-bold.png'); cardBottomRow.appendChild(editimg);

        carousel.appendChild(notesCard);
    })
}

ADDBUTTON.addEventListener('click',(e)=>{
    e.preventDefault();
    let NoteConstructor = function(){
        this.id = crypto.randomUUID()
        this.date = `${getDate()}.${getMonth()}.${new Date().getFullYear()}`;
        this.title = titlesection.value;
        this.content = textareasection.value;
    }
    notesArray.push(new NoteConstructor);
    console.log(notesArray);
    addPopUp.reset();
    addNotes();


})

    carousel.addEventListener('click',(e)=>{
        if(e.target.classList.contains('deleteimg')){
            notesArray = notesArray.filter((note)=>note.id !== e.target.parentElement.parentElement.getAttribute('data-ID'));
            addNotes();
        }
})

deleteBtn.addEventListener('click',()=>{
    carousel.innerHTML = '';
    notesArray = [];
})

