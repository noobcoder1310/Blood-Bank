const mongoose=require('mongoose')
const Inventoryschema=new mongoose.Schema({
    inventorytype:{
        type:String,
        required:[true,'inventory type require'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required:[true,'blood group is required'],
        enum:['A+','B+','B-','O+','O-','AB+','A-','AB-']
    },
    email: {
      type: String,
      required: function () {
        return this.inventorytype === "in";
      },
    },
    quantity:{
        type:Number,
         required:[true,"Blood is required"]
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blood',
        required:[true,"organisation is required"]

    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blood',
        required:function(){
            return this.inventorytype==='out'
        },
    },
        donor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'blood',
            required:function(){
                 return this.inventorytype==='in'
            }
        }
    
},{ timestamps: true })
module.exports=mongoose.model("Inventory",Inventoryschema)