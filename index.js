// Crea una aplicación para llevar un registro de libros leídos/por leer. Cada libro tendrá dos propiedades:
// Título del libro
// Estado: “leído” o “sin leer”

// Una ruta GET /api/libros que devuelva toda la colección de libros
// Una ruta GET /api/libros/:titulo que devuelva el libro solicitado.
// Una ruta POST /api/nuevoLibro/:titulo que añada un libro a la colección. En esta ruta, crea un objeto libro con el título que llega por req.params y el estado: “sin leer”
//                                                       libro : { título:, estado: “sin leer”}
// Una ruta PUT /api/editarLibro/:titulo. En esta ruta modifica el estado de libro escrito en la ruta: haz que cambie de “sin leer” a “leído”
// Una ruta DELETE /api/borrarLibro/:titulo que borre el libro indicado de la base de datos

// IMPORTANTE: Antes de crear formularios o elementos input en un archivo HTML, prueba desde el Postman que todas las rutas hacen lo esperado.

//importo la libreria
const libreria = require("./libreria");

//Importo express
const express = require("express");
const app = express();

//Creo la carpeta public con un index.html y un index.js y la enlazo con este código
app.use(express.static("public"));

// Una ruta GET /api/libros que devuelva toda la colección de libros
app.get("/api/libros", (req, res) => {
  res.send(libreria);
});

// Una ruta GET /api/libros/:titulo que devuelva el libro solicitado.
app.get("/api/libros/:titulo", (req, res) => {
  let titulo = req.params.titulo;
  let indice = 0.1;
  let aux = false;

  for (let i = 0; i < libreria.length; i++) {
    if (titulo === libreria[i].titulo) {
      indice = i;
      aux = true;
    }
  }
  if (aux) {
    res.send(libreria[indice]);
  } else {
    res.send("Título no disponible");
  }
});

// Una ruta POST /api/nuevoLibro/:titulo que añada un libro a la colección. En esta ruta, crea un objeto libro con el título que llega por req.params y el estado: “sin leer”
app.post("/api/nuevoLibro/:titulo", (req, res) => {
  let libro = { titulo: req.params.titulo, estado: "Sin leer" };
  libreria.push(libro);
  console.log(libreria);
  res.send(libro);
});

////////////////////////////////
//Probando ruta que viene a través del formulario
app.post("/api/nuevoLibro2/", (req, res) => {
  res.send("formulario");
});
////////////////////////////////

// Una ruta PUT /api/editarLibro/:titulo. En esta ruta modifica el estado de libro escrito en la ruta: haz que cambie de “sin leer” a “leído”
app.put("/api/editarLibro/:titulo", (req, res) => {
  let editar = req.params.titulo;
  let indice = 0.1;
  let aux = false;

  for (let i = 0; i < libreria.length; i++) {
    console.log(libreria[i].titulo);
    if (editar === libreria[i].titulo) {
      indice = i;
      aux = true;
    }
  }
  if (aux) {
    //TODO HACERLO PERMANENTE... ¿con splice?... ¿O eliminar el objeto completo y volverlo a insertar?
    res.send((libreria[indice].estado = "leído"));
  } else {
    res.send("Título no disponible");
  }
});

// Una ruta DELETE /api/borrarLibro/:titulo que borre el libro indicado de la base de datos
app.delete("/api/borrarLibro/:titulo", (req, res) => {
  let borrarLibro = req.params.titulo;
  let indice = 0.1;
  let aux = false;

  for (let i = 0; i < libreria.length; i++) {
    if (borrarLibro === libreria[i].titulo) {
      indice = i;
      aux = true;
    }
  }
  if (aux) {
    libreria.splice(indice, 1);
    console.log(libreria);
    res.send(libreria[indice]);
  } else {
    res.send("Título no disponible");
  }
});
app.listen(3000);
