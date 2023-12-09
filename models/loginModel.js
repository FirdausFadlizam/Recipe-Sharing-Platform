const mongoose = require('mongoose');

//first is the schema
//second is the timestamps boolean variable
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    });//end of the Product Schema prototype/object

    const User = mongoose.model('User', userSchema);

    module.exports = User;
