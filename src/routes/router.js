import { Router } from "express";
import standRouter from "./standRouter.js";
import productRouter from "./productRouter.js"
const router = Router();

router.get("/",(req,res)=>{
    res.send("hello world");
})
router.use("/stand",standRouter);
router.use("/product",productRouter);

export default router