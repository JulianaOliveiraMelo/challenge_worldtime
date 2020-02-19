// étape indispensable : importer express
const express = require('express');
// indispensable aussi : créer le serveur
const app = express();

// dans un futur proche, on ne fera plus qu'importer un unique module qui se charge de tout
const cityTime = require('./my_modules/cityTime');

// pour éviter de le modifier par erreur, je le fixe ici
const port = 3000;

app.get('/', (request, response) => {
    // sendFile permet de retourner au client le contenu d'un fichier désigné par le premier argument
    response.sendFile('views/index.html', {root: '.'});
});

// /city/paris => Paris TZ => formaté
// /city/beijing => Beijing TZ => formaté
// /city/washington => Washington TZ => formaté

// ma route paramétrée, qui permet d'intercepter n'importe quelle requête commençant par /city/ puis contenant un ensemble non vide de caractères, chiffres, ponctuation (hors /) etc.
app.get('/city/:cityName', (request, response) => {
    // 1. vérifier si on a bien une ville répertoriée qui correspond à la ville demandée
    let theCurrentTime = cityTime.getCityTime(request.params.cityName); // m
    

    // 1.1. si pas de correspondance, on arrête là
    // si on a trouvé une capitale, theRightCapital contient un objet avec 2 propriétés
    // si on a rien trouvé, la variable reste à son état initial, elle contient undefined (son contenu n'est pas défini)
    // un objet non-vide étant casté en true et undefined étant casté en false, on peut utiliser l'opérateur ! (not) pour les distinguer
    // ce if signifie donc "si on a pas trouvé de capitale", on affiche la 404
    if (!theCurrentTime) {
        response.status(404);
        response.send('Ville non trouvée');
        return;
    }

    

    // j'ai lu dans la doc qu'il existe des "formats localisés" à base de L, qui changeront entièrement en fonction de la locale sélectionnée, sans s'embêter avec un formatage "local"
    response.send("La date et l'heure actuelles de " + theCurrentTime.city + " est " + theCurrentTime.format("LLLL")); // m
    // utiliser moment pour formater correctement l'heure et la date
    
});

app.listen(port, () => console.log('Server listening'));