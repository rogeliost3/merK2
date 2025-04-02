import {Router} from "express";

const router = Router();

// conseguir todos los productos
router.get("/",(req,res)=>{
    res.send("Conseguir todos los productos");
})
// conseguir producto por id
router.get("/:id",(req,res)=>{
    const id = req.params.id;
    res.send("Conseguir el producto "+id);
})
// crear un producto
router.post("/",(req,res)=>{
    res.send("Creamos un producto");
})
// modificar un producto
router.post("/:id",(req,res)=>{
    const id = req.params.id;
    const datos = req.body; // los datos para modificar el producto
    res.send("Modificamos el producto "+ id);
})

// ruta para eliminar un producto
router.post("/:id/delete",(req,res)=>{
    const id = req.params.id;
    res.send("Borramos el producto "+ id);
})

export default router;