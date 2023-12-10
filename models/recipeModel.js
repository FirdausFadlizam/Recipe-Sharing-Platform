const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//first is the schema
//second is the timestamps boolean variable
const recipeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a recipe title"]
        },
        ingredients: {
            type: [String],
            required: true
        },
        instructions: {
            type: [String],
            required: [true, "Please enter steps for recipe"]
        },
        user: {
            type: Schema.Types.ObjectID,
            ref: "User",
            required: true
        },
        image: {
            type: String,
            required: true
        },
        comments: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            commentText: {
                type: String,
            },
        }]
        
    }, 
    
    {
        timestamps: true
    });//end of recipe schema prototype/object

    const Recipe = mongoose.model('Recipe', recipeSchema);
    module.exports = Recipe;