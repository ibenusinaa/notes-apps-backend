const { addNoteHandler, getAllNotes, getNotesById, editNotesById, deleteNotesById } = require("./handler")

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotes
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesById
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesById
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesById
    }
]

module.exports = routes