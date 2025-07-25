 const testcontroller=(req,res)=>{
    res.status(200).send({
        message:"test route successfully",
        success:true,

    });
};
module.exports={testcontroller};