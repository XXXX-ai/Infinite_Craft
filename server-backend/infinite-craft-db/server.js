require('dotenv').config(); // Charge les variables du fichier .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Recipe = require('./models/Recipe');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à Atlas via la variable d'environnement
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connecté avec succès à MongoDB Atlas !"))
    .catch(err => console.error("❌ Erreur de connexion Atlas :", err));

// ROUTE POUR RECEVOIR LES DONNÉES
app.post('/api/sync', async (req, res) => {
    try {
        const { elements } = req.body; 
        let nouveauxElements = 0;

        for (const item of elements) {
            // On vérifie si l'élément existe déjà pour ne pas faire de doublons
            const existe = await Recipe.findOne({ result: item.text });
            
            if (!existe) {
                const nouvelleRecette = new Recipe({
                    result: item.text,
                    ingredient1: "Inconnu", // On verra plus tard pour capturer les ingrédients
                    ingredient2: "Inconnu",
                    isFirstDiscovery: item.discovered || false
                });
                await nouvelleRecette.save();
                nouveauxElements++;
            }
        }
        res.status(200).json({ message: `Succès : ${nouveauxElements} nouveaux éléments ajoutés !` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LANCEMENT DU SERVEUR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});