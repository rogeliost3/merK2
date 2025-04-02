import standModel from "../models/stands.js"; // default

async function getAll(req, res) {

    // obtenemos los stands en forma de array
    const stands = await standModel.getAll();

    // pedimos que la respuesta se haga en formato json
    res.json(stands);

    //res.render("stand/list");
}

async function getByID(req, res) {
    const id = req.params.id;
    const stand = await standModel.getByID(id);
    res.json(stand);
    //res.render("stand/show",{standId:id});
}

function createForm(req, res) {
    res.render("stand/create");
}

async function create(req, res) {
    //res.send("Creamos un stand");
    const { name, size } = req.body;

    const category = 1, //temporalmente
    creation_date = new Date(); //hoy
    const response = await standModel.create(name, size, creation_date, category);
    
    // const name = req.body.name;
    // const size = req.body.size;
    console.log("name", name, "size", size);
    res.redirect("/stand");
}

function edit(req, res) {
    const id = req.params.id;
    const datos = req.body; // los datos para modificar el stand
    res.send("Modificamos el stand " + id);
}

function remove(req, res) {
    const id = req.params.id;
    res.send("Borramos el stand " + id);
}

export {
    getAll,
    getByID,
    createForm,
    create,
    edit,
    remove
}

export default {
    getAll,
    getByID,
    createForm,
    create,
    edit,
    remove
};