const mongoose = require('mongoose');
const inventorymodel = require("../models/inventorymodel");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ['A+', 'B+', 'B-', 'O+', 'O-', 'AB+', 'A-', 'AB-'];
    const bloodGroupdata = [];
    const organisation = new mongoose.Types.ObjectId(req.user.userId);

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        const totalIn = await inventorymodel.aggregate([
          {
            $match: {
              bloodGroup,
              inventorytype: 'in',
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);

        const totalOut = await inventorymodel.aggregate([
          {
            $match: {
              bloodGroup,
              inventorytype: 'out',
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$quantity' },
            },
          },
        ]);

        const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupdata.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: 'Blood Group data fetched successfully',
      bloodGroupdata,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in blood group dataAnalytics API',
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
