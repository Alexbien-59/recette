# 🍳 MaRecette

**Cuisine du quotidien** — Trouvez des recettes à partir de vos ingrédients, explorez le catalogue, sauvegardez vos favoris. Installable sur mobile comme une vraie application.

[![Ouvrir l'application](https://img.shields.io/badge/▶%20Ouvrir%20l'application-C4622D?style=for-the-badge)](https://a-rech.github.io/marecette/)

---

## Fonctionnalités

| | |
|---|---|
| 🔍 **Recherche par ingrédients** | Sélectionnez ce que vous avez, obtenez les recettes compatibles triées par correspondance |
| 📚 **Catalogue complet** | Filtrez par type de plat ou par culture culinaire |
| 🎲 **Recette aléatoire** | Laissez-vous inspirer |
| ❤️ **Favoris** | Sauvegardés localement, affichés en tête du catalogue |
| 📝 **Notes personnelles** | Ajoutez vos astuces sur chaque fiche recette |
| 📱 **PWA** | Installable sur mobile, fonctionne hors ligne |

---

## Installer l'application

### Android

1. Ouvrez l'URL dans **Chrome**
2. Appuyez sur le menu **⋮** en haut à droite
3. Sélectionnez **"Ajouter à l'écran d'accueil"**
4. Cliquer sur **"Installer"**

### iPhone / iPad

1. Ouvrez l'URL dans **Safari**
2. Appuyez sur l'icône **Partager** en bas de l'écran
3. Sélectionnez **"Sur l'écran d'accueil"**
4. Confirmez — l'icône apparaît sur votre écran

---

## Structure du projet

```
├── index.html       Application complète (HTML + CSS + JS)
├── manifest.json    Configuration PWA
├── sw.js            Service Worker — cache hors ligne
├── icon-192.png     Icône 192 x 192 px
└── icon-512.png     Icône 512 x 512 px
```

---

## Technologies

- HTML / CSS / JavaScript — aucune dépendance externe
- PWA : Service Worker + Web App Manifest
- `localStorage` pour les favoris, notes et historique
