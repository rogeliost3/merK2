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
    //res.json(stand);
    res.render("stand/show",{stand});
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
    //res.json(response);
    res.redirect("/stand");
}
async function editForm(req,res){
    const id = req.params.id;
    const stand = await standModel.getByID(id);
    if(!stand){
        res.redirect("/stand")
    }
    res.render("stand/edit",{stand});
}
async function edit(req,res){
    const id = req.params.id;
    const {name,size,creation_date,category_id} = req.body; // los datos para modificar el stand
    const result = await standModel.update(id,name,size,creation_date,category_id)
    res.redirect("/stand/"+id);
}

async function remove(req,res){
    const id = req.params.id;
    const response  = await standModel.remove(id);
    res.redirect("/stand");
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
    editForm,
    edit,
    remove
};