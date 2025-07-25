const express=require('express')
const authmiddleware = require('../middleware/authmiddleware')
const { createInventoryController, getInventoryController, getDonorsController, getHospitalController, getOrganisationController, getInventoryHospitalController } = require('../controller/inventorycontroller')
const router=express.Router()
router.post('/create-inventory',authmiddleware,createInventoryController)
router.get('/get-inventory',authmiddleware,getInventoryController)
router.post('/get-inventory-hospital',authmiddleware,getInventoryHospitalController)

router.get('/get-donors',authmiddleware,getDonorsController)
router.get('/get-hospital',authmiddleware,getHospitalController)
router.get('/get-organisation',authmiddleware,getOrganisationController)


module.exports=router