const express=require("express")
const {testcontroller}=require('../controller/testcontroller')
const router=express.Router();
router.get("/",testcontroller);
module.exports=router