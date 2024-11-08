const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Utilise body-parser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Sert les fichiers statiques (comme index.html) du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Route POST pour recevoir et sauvegarder les données d'inscription
app.post('/save-info', (req, res) => {
  const { firstName, lastName, street, city, country, postalCode, phone } = req.body;

  // Création de la chaîne de données formatée
  const userData = `
  Prénom: ${firstName}
  Nom: ${lastName}
  Rue: ${street}
  Ville: ${city}
  Pays: ${country}
  Code Postal: ${postalCode}
  Téléphone: ${phone}
  --------------------
  `;

  // Enregistre les données dans info.txt
  fs.appendFile('info.txt', userData, (err) => {
    if (err) {
      console.error("Erreur lors de la sauvegarde des informations :", err);
      return res.status(500).json({ message: "Erreur lors de la sauvegarde des informations." });
    }

    console.log("Informations enregistrées avec succès !");
    res.json({ message: "Informations enregistrées avec succès !" });
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});