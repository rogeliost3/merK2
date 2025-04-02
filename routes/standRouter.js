import {Router} from "express";

const router = Router();
// crear un stand
router.post ("/",(req,res) => {
    res.send("Creamos un stand");
})


// editar un stand
router.post ("/:id",(req,res) => {
    const id=req.params.id;
    const datos=req.body; // los datos para modificar el stand
    res.send("Editamos un stand "+id);
})

// borrar el stand
router.post("/:id/delete",(req,res) => {
    const id=req.params.id;
    res.send("Borramos un stand "+id);
})

export default router;
