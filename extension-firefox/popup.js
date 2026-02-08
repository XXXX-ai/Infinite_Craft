document.getElementById('exportBtn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    status.innerText = "Lecture du jeu...";

    try {
        // On récupère l'onglet actif
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        
        // On envoie le message au content script
        const response = await browser.tabs.sendMessage(tabs[0].id, { action: "getData" });

        if (response && response.elements) {
            status.innerText = `Trouvé : ${response.elements.length} éléments !`;
            console.log("Données prêtes :", response);
            
            // Étape suivante (plus tard) : Envoyer vers ton API
            // fetch('https://ton-api-mongodb.com/upload', { method: 'POST', ... })
            
        } else {
            status.innerText = "Données non trouvées. Joue un peu d'abord !";
        }
    } catch (error) {
        status.innerText = "Erreur : rafraîchis la page du jeu.";
        console.error(error);
    }
});