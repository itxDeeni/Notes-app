const { log } = require('console')
const fs = require('fs')
const chalk = require('chalk')

function getNotes(){
    return "getting notes"
}
const addNote = (title,body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>  note.title === title)
    debugger
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log("New note added")
    }else{
        console.log('Note title taken!');
    }
    
    }    

    const readNotes = (title)=>{
        const notes = loadNotes()
        const note = notes.find((note)=>note)
        if(note){
            console.log(chalk.inverse(note.title));
            console.log(note.body);
        }else{
            console.log(chalk.red.inverse("Note not found"));
        }


    };


    const removeNotes = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>{return note.title !== title})
    if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse("Note removed"));
        saveNotes(notesToKeep)

    }else{
        console.log(chalk.red.inverse("No note found"))
    }
    }
    
const saveNotes = (notes)=>{
    const dataJSON =  JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }

}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'));

    notes.forEach((note) => {
        console.log(note.title);
    });
}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNotes:removeNotes,
    listNotes:listNotes,
    readNotes:readNotes
}