# 🍳 MaRecette

> **Cuisine du quotidien** — Vos recettes classées par catégorie, recherche par ingrédients, favoris et notes personnelles. Installable sur mobile.

🔗 **[Ouvrir l'application](https://alexbien-59.github.io/marecette/)**

---

## ✨ Fonctionnalités

- 🔍 **Recherche par ingrédients** — sélectionnez ce que vous avez, trouvez les recettes possibles triées par correspondance
- 📚 **Catalogue** — recettes filtrables par type de plat ou culture, mode aléatoire
- 🎲 **Recette aléatoire**
- ❤️ **Favoris** — sauvegardez vos recettes préférées, affichées en tête du catalogue
- 📝 **Notes personnelles** — ajoutez vos astuces sur chaque fiche
- 📱 **PWA** — installable sur mobile, fonctionne hors ligne

---

## 📱 Installer sur votre téléphone

### iPhone / iPad (Safari)
1. Ouvrez l'URL dans **Safari**
2. Appuyez sur **Partager** ↑ → **"Sur l'écran d'accueil"**
3. Confirmez

### Android (Chrome)
1. Ouvrez l'URL dans **Chrome**
2. Menu **⋮** → **"Ajouter à l'écran d'accueil"**

---

## 🗂 Structure du projet

```
marecette/
├── index.html      ← Application complète
├── manifest.json   ← Configuration PWA
├── sw.js           ← Service Worker (cache hors ligne)
├── icon-192.png    ← Icône 192×192
└── icon-512.png    ← Icône 512×512
```

---

## 🛠 Technologies

- HTML / CSS / JavaScript vanilla
- PWA — Service Worker + Web App Manifest
- localStorage pour favoris, notes et évaluations
