const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//first is the schema
//second is the timestamps boolean variable
const favRecipeSchema = mongoose.Schema(
    {        
        user: {
            type: Schema.Types.ObjectID,
            ref: "User",
            required: true
        },

        recipe: {
            type: Schema.Types.ObjectID,
            ref: "Recipe",
            required: true
        }   
    }, 
    
    {
        timestamps: true
    });//end of recipe schema prototype/object

    const favRecipe = mongoose.model('favRecipe', favRecipeSchema);
    module.exports = favRecipe;