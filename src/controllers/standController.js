
function getAll(req,res){
    //res.send("Conseguir todos los stands");
    res.render("stand/list");
}

function getByID(req,res){
    const id = req.params.id;
    //res.send("Conseguir el stand "+id);
    res.render("stand/show",{standId:id});
}

function createForm(req,res){
    res.render("stand/create");
}
function create(req,res){
    //res.send("Creamos un stand");
    const {name,size} = req.body;
    // const name = req.body.name;
    // const size = req.body.size;
    console.log("name",name,"size",size);
    res.redirect("/stand");
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