const mongoose = require('mongoose');


//first is the schema
//second is the timestamps boolean variable
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
        
    }, 
    
    {
        timestamps: true
    });//end of recipe schema prototype/object

    const User = mongoose.model('User', userSchema);
    module.exports = User;