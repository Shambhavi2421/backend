const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name: {type:String, require:true},
    description: {type:String, require:true},
    ingredients: {type:String, require:true},
    steps: {type:String, require:true},
    time: {type:String, require:true},
    instruction: {type:String, require:true},
    photo: {type:String, require:true} // Image path
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
