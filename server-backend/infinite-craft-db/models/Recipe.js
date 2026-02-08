const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    result: { type: String, required: true, index: true },
    ingredient1: { type: String, required: true },
    ingredient2: { type: String, required: true },
    isFirstDiscovery: { type: Boolean, default: false },
    discoveredAt: { type: Date, default: Date.now }
});

// On exporte le modèle pour l'utiliser dans server.js
module.exports = mongoose.model('Recipe', RecipeSchema);