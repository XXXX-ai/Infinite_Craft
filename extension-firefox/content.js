// On écoute les requêtes réseau du site
// Infinite Craft envoie une requête vers /api/infinite-craft/pair quand on fusionne
const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    
    if (args[0].includes('pair')) {
        const url = new URL(args[0]);
        const ing1 = url.searchParams.get('ingredient1');
        const ing2 = url.searchParams.get('ingredient2');
        
        // On clone la réponse pour lire le résultat sans casser le jeu
        const clone = response.clone();
        const resultData = await clone.json();

        console.log(`Fusion détectée : ${ing1} + ${ing2} = ${resultData.result}`);

        // On envoie directement à ton serveur
        fetch('http://localhost:3000/api/recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ingredient1: ing1,
                ingredient2: ing2,
                result: resultData.result,
                isFirstDiscovery: resultData.isFirstDiscovery
            })
        }).catch(err => console.log("Serveur non lancé, fusion non sauvegardée."));
    }
    return response;
};