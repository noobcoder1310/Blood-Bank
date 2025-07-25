const express=require('express')
const { registerController, currentUserController } = require('../controller/authcontroller')
const{loginController}=require('../controller/authcontroller')
const authmiddleware = require('../middleware/authmiddleware')
const { createInventoryController } = require('../controller/inventorycontroller')

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/current-user',authmiddleware,currentUserController)

module.exports=router
