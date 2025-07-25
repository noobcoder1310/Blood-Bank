const userModel = require("../models/usermodel");
const mongoose = require("mongoose");

const inventoryModel = require("../models/inventorymodel.js");


const createInventoryController = async (req, res) => {
  try {
    const {  email,bloodGroup,quantity} = req.body;
    const userId = req.user.userId; // organisation/hospital id from auth middleware

    // Get the organisation user
    const organisationUser = await userModel.findById(userId);
    if (!organisationUser) {
      return res.status(400).send({ success: false, message: "Organisation user not found" });
    }

    // Find donor user by email (if donorEmail provided)
    
    
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).send({ success: false, message: "Donor with this email not found" });
      }
    

    // Attach donor and organisation IDs to the req.body for inventory record
    req.body.donor = user ? user?._id : undefined;
    req.body.organisation = organisationUser._id;

    // If inventorytype is 'out', check availability for requested blood group and quantity
    if (req.body.inventorytype === "out") {
      const requestedBloodGroup = bloodGroup;
      const requestedQuantity = quantity;

      // Total IN quantity for organisation & blood group
      const totalInResult = await inventoryModel.aggregate([
        {
          $match: {
            organisation:  new mongoose.Types.ObjectId(organisationUser._id),
            inventorytype: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            totalIn: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInResult[0]?.totalIn || 0;

      // Total OUT quantity for organisation & blood group
      const totalOutResult = await inventoryModel.aggregate([
        {
          $match: {
            organisation:  new mongoose.Types.ObjectId(organisationUser._id),
            inventorytype: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            totalOut: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutResult[0]?.totalOut || 0;

      const availableQuantity = totalIn - totalOut;
      if (availableQuantity < requestedQuantity) {
        return res.status(400).send({
          success: false,
          message: `Only ${availableQuantity} mL of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      // Set hospital field as organisation user id (if you want to track hospital)
      req.body.hospital = user?._id;

    }
else{
  req.body.donor=user?._id
}
    // Save new inventory record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).json({
      status: true,
      message: "New blood record added",
    });
  } catch (error) {
    console.error("Error in createInventoryController:", error);
    res.status(500).send({
      status: false,
      message: "Error in create Inventory API",
      error: error.message,
    });
  }
};

//Get all blood records

const getInventoryController = async (req, res) => {

  try {
    console.log("User ID from token:", req.user.userId);
    const inventory = await inventoryModel
      .find({}).limit(5)
      .populate("donor hospital")
      .sort({ createdAt: -1 });
    console.log("Inventory found:", inventory.length);
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all Inventory",
      error,
    });
  }
};
const getInventoryHospitalController = async (req, res) => {

  try {
    console.log("User ID from token:", req.user.userId);
    const inventory = await inventoryModel
      .find(req.body.filters||{}).limit(5)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    console.log("Inventory found:", inventory.length);
    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get  consumer Inventory",
      error,
    });
  }
};
const getDonorsController = async (req, res) => {
  try {
    const organisation = req.user?.userId;
    console.log('Organisation ID:', organisation);
    if (!organisation) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No organisation ID found' });
    }
    const donorId = await inventoryModel.distinct('donor', {
      organisation: new mongoose.Types.ObjectId(organisation),
      inventorytype: 'in', // Only fetch donors from 'in' records
    });
    console.log('Donor IDs:', donorId);
    if (!donorId.length) {
      return res.status(200).json({
        success: true,
        message: 'No donors found for this organisation',
        donors: [],
      });
    }
    const donors = await userModel.find({ _id: { $in: donorId }, role: 'donor' }).select('name email phone address createdAt');
    console.log('Donors:', donors);
    return res.status(200).json({
      success: true,
      message: 'Donor record fetched successfully',
      donors,
    });
  } catch (error) {
    console.error('Error in getDonorsController:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in donor records',
      error: error.message,
    });
  }
};
const getHospitalController = async (req, res) => {
  try {
    const organisationId = req.user?.userId;
    console.log('Organisation ID:', organisationId);

    if (!organisationId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No organisation ID found',
      });
    }

    const hospitalIds = await inventoryModel.distinct('hospital', {
      organisation: new mongoose.Types.ObjectId(organisationId),
      inventorytype: 'out', // Only fetch hospitals from 'out' records
    });
    console.log('Hospital IDs:', hospitalIds);

    if (!hospitalIds.length) {
      console.log('No inventory records found for organisation:', organisationId);
      return res.status(200).json({
        success: true,
        message: 'No hospitals found for this organisation',
        hospitals: [],
      });
    }

    const hospitals = await userModel.find({
      _id: { $in: hospitalIds },
      role: 'hospital',
    }).select('name HospitalName email phone address createdAt');
    console.log('Hospitals:', hospitals);

    return res.status(200).json({
      success: true,
      message: 'Hospital data fetched successfully',
      hospitals,
    });
  } catch (error) {
    console.error('Error in getHospitalController:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in get hospital records',
      error: error.message,
    });
  }
};
const getOrganisationController=async(req,res)=>{
  try {
    const donor=req.user.userId
    const orgId=await inventoryModel.distinct('organisation',{donor})
    const organisations=await userModel.find({
      _id:{$in:orgId}
    })
    return res.status(200).send({
      success:true,
      message:"organisation data fetched successfully",
      organisations
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"Error in Org API",
      error
    })
    
  }

}

module.exports = { createInventoryController, getInventoryController,getDonorsController,getHospitalController,getOrganisationController,getInventoryHospitalController };
