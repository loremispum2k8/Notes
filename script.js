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
    },500);
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

        let open = document.createElement('p'); open.classList.add('openBtn');open.textContent = 'Open'; notesCard.appendChild(open);

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
    //let card = document.querySelectorAll('.notes-card');
    //console.log(card)

})

carousel.addEventListener('click',(e)=>{
    if(e.target.classList.contains('deleteimg')){
        notesArray = notesArray.filter((note)=>note.id !== e.target.parentElement.parentElement.getAttribute('data-ID'));
        addNotes();
    }
})

let editPopUpContainer = document.querySelector('.editPopUpContainer')
let editPopUp = document.querySelector('.editPopUp');
let editDate = document.querySelector('.edit-date');
let editExit = document.querySelector('.edit-exit');
let editTitle = document.querySelector('#edit-title');
let editContent = document.querySelector('#edit-content');
let editButton = document.querySelector('.edit-edit-button');
carousel.addEventListener('click',(e)=>{
    if(e.target.classList.contains('editimg')){
        editPopUpContainer.style.display = 'flex';
        editPopUp.classList.add('showPopUp');
        editPopUpContainer.setAttribute('data-ID',e.target.parentElement.parentElement.getAttribute('data-id'))
        editPopUp.classList.remove('exitPopUp');

        notesArray.forEach((note)=>{
            if(note.id == e.target.parentElement.parentElement.getAttribute('data-id')){
                editDate.textContent = note.date
                editTitle.value = note.title
                editContent.value = note.content
            }
        })
    }
})

editButton.addEventListener('click',(e)=>{
    e.preventDefault()
    notesArray.forEach((note)=>{
        if(note.id == editPopUpContainer.getAttribute('data-id')){
            note.date = editDate.textContent;
            note.title = editTitle.value;
            note.content = editContent.value;
            carousel.innerHTML='';
            addNotes();
        }
    })
    console.log(notesArray)
})

editExit.addEventListener('click',()=>{
    editPopUp.classList.add('exitPopUp');
    editPopUp.classList.remove('showPopUp');
    editPopUp.reset();
    setTimeout(()=>{
        editPopUpContainer.style.display = 'none'
    },500);
})

deleteBtn.addEventListener('click',()=>{
    carousel.innerHTML = '';
    notesArray = [];
})

let canvasArray = [];
window.addEventListener('click',(e)=>{
    let card = e.target.closest('.notes-card');
    if(card){
        let openBtn = document.querySelectorAll('.openBtn')
        openBtn.forEach((btn)=>{
            btn.addEventListener('click',()=>{
                notesArray.forEach(note=>{
                    if(note.id == btn.parentElement.getAttribute('data-ID') && !canvasArray.includes(note)){
                        canvasArray.push(note);
                        console.log(canvasArray)
                        const form = document.createElement('form');
                        form.className = 'noteCanvasPopUp';
                        form.setAttribute('spellcheck', 'false');
                        form.setAttribute('data-ID-delete',note.id)
                        
                        const topRow = document.createElement('div');
                        topRow.className = 'noteCanvas-top-row';
                        
                        const dateDelete = document.createElement('div');
                        dateDelete.className = 'noteCanvas-date-delete';
                        
                        const dateContainer = document.createElement('div');
                        dateContainer.className = 'noteCanvas-container';
                        
                        const dateLabel = document.createElement('p');
                        dateLabel.textContent = 'Date:';
                        dateLabel.setAttribute('for', 'noteCanvas-noteCanvas-title');
                        
                        const dateValue = document.createElement('p');
                        dateValue.className = 'noteCanvas-date';
                        dateValue.textContent = note.date;
                        
                        dateContainer.appendChild(dateLabel);
                        dateContainer.appendChild(dateValue);
                        
                        const closeImg = document.createElement('img');
                        closeImg.className = 'noteCanvas-close';
                        closeImg.src = 'images/material-symbols--close-rounded.png';
                        
                        dateDelete.appendChild(dateContainer);
                        dateDelete.appendChild(closeImg);
                        
                        const titleContainer = document.createElement('div');
                        titleContainer.className = 'noteCanvas-title-container';
                        
                        const titleLabel = document.createElement('p');
                        titleLabel.className = 'noteCanvas-title-label';
                        titleLabel.textContent = 'Title:';
                        
                        const titleValue = document.createElement('p');
                        titleValue.className = 'noteCanvas-title';
                        titleValue.textContent = note.title
                        
                        titleContainer.appendChild(titleLabel);
                        titleContainer.appendChild(titleValue);
                        
                        topRow.appendChild(dateDelete);
                        topRow.appendChild(titleContainer);
                        
                        const content = document.createElement('p');
                        content.className = 'noteCanvasContent';
                        content.textContent = note.content;
                        
                        form.appendChild(topRow);
                        form.appendChild(content);
                        
                        document.body.appendChild(form);
                    }
                })
            })
        })
    }
})
window.addEventListener('click',(e)=>{
    if(e.target.classList.contains('noteCanvas-close')){
        e.preventDefault();
        canvasArray = canvasArray.filter(note=>note.id!==e.target.parentElement.parentElement.parentElement.getAttribute('data-ID-delete'));
        let deleteItem = document.querySelector(`[data-ID-delete="${e.target.parentElement.parentElement.parentElement.getAttribute('data-ID-delete')}"]`);
        if(deleteItem){
            deleteItem.remove();
        }
    }
})


let newX;
let newY;
let startX;
let startY;
if(window.innerWidth > 600){
    window.addEventListener('mouseover',(e)=>{
        if(notesArray.length>0){
            let canvasNotes = document.querySelectorAll('.noteCanvasPopUp');
            canvasNotes.forEach((note)=>{
                note.addEventListener('mousedown',mouseDown);
                function mouseDown(e){
                    startX = e.clientX;
                    startY = e.clientY;
    
                    document.addEventListener('mousemove',mouseMove);
                    document.addEventListener('mouseup',mouseUp)
                }
                function mouseMove(e){
                    newX = startX - e.clientX;
                    newY = startY - e.clientY;
                    
                    startX = e.clientX;
                    startY = e.clientY;
                    note.style.left = (note.offsetLeft - newX) + 'px';
                    note.style.top = (note.offsetTop - newY) + 'px';
                }
                function mouseUp(){
                    document.removeEventListener('mousemove',mouseMove)
                }
            })
        }
    });
} else if(window.innerWidth <= 600){
    window.addEventListener('mouseover',(e)=>{
        if(notesArray.length>0){
            let canvasNotes = document.querySelectorAll('.noteCanvasPopUp');
            let textWidth = document.querySelectorAll('.noteCanvasContent')
            canvasNotes.forEach((note)=>{
                note.style.width = '80vw'
                note.style.marginTop = '20px'
                note.style.height = '50vw'
            })
            textWidth.forEach((text)=>{
                text.style.width = '100%'
            })
        }
    });
}
