const { nanoid } = require("nanoid");
const notes = require("./notes");
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if(isSucces){
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });

  response.header("Access-Control-Allow-Origin", "*");
  response.code(500);
  return response;
};

const getAllNoteHandler = ()=> ({
  status: 'success',
  data: {
    notes,
  }
});


const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter(n => n.id === id)[0];


    if(note !== undefined){
      return{
        status: 'success',
        data:{
          note
        }
      }
    }

    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan'
    })
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNoteHandler , getNoteByIdHandler};
