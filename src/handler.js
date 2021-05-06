const { nanoid } = require("nanoid")
const notes = require("./notes")

const addNoteHandler = (req, h) => {
    const { title, tags, body} = req.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if(isSuccess){
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })

        response.code(201)
        return response
    }

    const response = h.response({
        status: 'Failed',
        message: 'Catatan gagal ditambahkan',
    })

    response.code(500)
    return response
}

const getAllNotes = (req, h) => ({
    status: 'Success',
    data: {
        notes
    }
})  

const getNotesById = (req, h) => {
    const {id} = req.params
    // pakai map
    let note
    notes.map((value) => {
        if(value.id === id){
            note = value
        }
    })

    // pakai filter
    // const note = notes.filter((value) => value.id === id)[0]

    if(note){
        console.log(note)
        console.log('pake map bisa')
        console.log(notes)
        return {
            status: 'Success',
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'Failed',
        message: 'Catatan tidak ditemukan',
    })

    response.code(404)
    return response
}

const editNotesById = (req, h) => {
    const {id} = req.params
    const { title, tags, body} = req.payload
    const updatedAt = new Date().toISOString()


    const index = notes.findIndex((value) => value.id === id)

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            id: id,
            title: title,
            tags: tags,
            body: body
        }
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil diperbarui'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'failed',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      })
      response.code(404);
      return response;

}

const deleteNotesById = (req, h) => {
    const {id} = req.params

    const index = notes.findIndex((value) => value.id === id)

    if(index !== -1){
        notes.splice(index, 1)

        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'failed',
        message: 'Gagal menghapus catatan. Id tidak ditemukan',
      })
      response.code(404);
      return response;
}

module.exports = {addNoteHandler, getAllNotes, getNotesById, editNotesById, deleteNotesById}