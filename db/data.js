// const util = require('util')
// const fs = require('fs')

// const uuidv1 = require('uuid/v1')

// const readFile = util.promisify(fs.readFile)
// const writeFile= util.promisify(fs.writeFile)

// class Data {
//     read() {
//         return readFile('db/db.json', 'utf8')
//     }

//     write(note) {
//         return writeFile('db/db.json', JSON.stringify(note) )
//     }


//     getNotes() {
//         return this.read().then( notes => {
//             let objData;
//             try {
//                 objData = [].concat(JSON.parse(notes))
//             } catch (err) {
//                 objData = []
//             }

//             return objData
//         })
//     }

//     addNode(note) {
//         const {title, text} = note 
//         if ( !title || !text ) {
//             throw new Error(`'Title' and 'Text' can not be blank`)
//         }

//         const newNote = { title, text, id: uuidv1()}

//         return this.getNotes()
//         .then( note => [...note, newNote])
//         .then(note => this.write(note))
//         .then( () => newNote)
//     }

//     deleteNote(id){
//         return this.getNotes()
//         .then( notes => notes.filter( note => note.id !== id))
//         .then( noteLeft => this.write(noteLeft))
//     }
// }


// module.exports = new Data()

const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Data {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  deleteNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Data();
