import mongoose from "mongoose";

const {Schema} = mongoose;

const statsSchema = new Schema({
    usersCount:{
        type: Number,
        required: true
    },
    avgLikes: {
        type: Number,
        required: true
    },
    avgComments: {
        type: Number,
        required: true,
    },
    avgVideoLikes:{
        type: String,
        required: true,
    },
    qualityScore:{
        type: String,
        required: true
    },

})

export default mongoose.model("Stats",statsSchema)
