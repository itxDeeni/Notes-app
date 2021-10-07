// const validator = require("validator")
const getNotes = require('./note')
const chalk = require('chalk')
const yargs = require('yargs')
const { string, argv } = require('yargs')
const note = require('./note')

//customise yargs versions

yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string '
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler:  (argv) => note.addNote(argv.title,argv.body)
    }
)

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:string
        }
    },
    handler: ()=>note.removeNotes(argv.title)})

//create list command 
yargs.command({
    command: 'list',
    describe: 'list commands',
    handler() {
        getNotes.listNotes()
    }
})

//create read commands
yargs.command({
    command: 'read',
    describe: 'read commands',
    builder: {
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        getNotes.readNotes(argv.title)
    }
})

console.log(process.argv);
console.log(yargs.argv);