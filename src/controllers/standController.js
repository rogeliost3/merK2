import standModel from "../models/stand.js";

async function getAll(req,res){
    //res.send("Conseguir todos los stands");
    const stands = await standModel.getAll();
    console.log(stands);
    //res.json(stands)
    res.render("stand/list",{stands});
}

async function getByID(req,res){
    const id = req.params.id;
    //const {id} = req.params;
    //res.send("Conseguir el stand "+id);
    const stand = await standModel.getByID(id);
    res.json(stand);
    //res.render("stand/show",{standId:id});
}

function createForm(req,res){
    res.render("stand/create");
}
async function create(req,res){
    //res.send("Creamos un stand");
    const {name,size} = req.body;
    const category  = 1;
    const creation_date = new Date();
    const response = await standModel.create(name,size,creation_date,category);
    res.json(response);
    //res.redirect("/stand");
}

function edit(req,res){
    const id = req.params.id;
    const datos = req.body; // los datos para modificar el stand
    res.send("Modificamos el stand "+ id);
}

function remove(req,res){
    const id = req.params.id;
    res.send("Borramos el stand "+ id);
}

export{
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