# Système de Documentation JSON

Ce projet utilise un format de documentation basé sur JSON pour structurer le contenu de manière flexible et modulaire. Au lieu d'utiliser du Markdown traditionnel, nous définissons chaque élément de la page (titres, paragraphes, images, boutons) comme un objet dans une liste.

## Structure du Fichier JSON

Chaque fichier de documentation doit être un objet JSON valide contenant deux clés principales : `meta` et `blocks`.

### 1. Métadonnées (`meta`)

Cette section contient les informations générales sur la page de documentation.

```json
"meta": {
  "id": "identifiant-unique",
  "title": "Titre de la Page",
  "subtitle": "Sous-titre optionnel",
  "description": "Description courte pour le SEO et les aperçus",
  "coverImage": "/chemin/vers/image.jpg",
  "author": "Nom de l'auteur",
  "lastUpdated": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"]
}
```

### 2. Contenu (`blocks`)

La clé `blocks` est un tableau (liste) d'objets. Chaque objet représente un bloc de contenu (un paragraphe, une image, un titre, etc.). L'ordre des blocs dans le tableau détermine l'ordre d'affichage sur la page.

#### Types de Blocs Disponibles

Voici les différents types de blocs que vous pouvez utiliser :

---

#### **A. Titre (`heading`)**

Pour structurer le document.

```json
{
  "type": "heading",
  "level": 1, // 1 pour H1, 2 pour H2, etc.
  "text": "Votre Titre Ici"
}
```

---

#### **B. Paragraphe (`paragraph`)**

Pour le texte courant. Au lieu d'une simple chaîne de caractères, nous utilisons une liste de segments de texte pour gérer le formatage (gras, italique, liens).

```json
{
  "type": "paragraph",
  "content": [
    { "text": "Ceci est du texte normal. " },
    { "text": "Ceci est en gras. ", "bold": true },
    { "text": "Ceci est en italique. ", "italic": true },
    { "text": "Ceci est un lien.", "link": "https://google.com", "color": "blue" }
  ]
}
```

**Propriétés de style supportées :**
- `"bold": true` (Gras)
- `"italic": true` (Italique)
- `"underline": true` (Souligné)
- `"link": "url"` (Lien hypertexte)
- `"color": "#hex"` (Couleur du texte)

---

#### **C. Image (`image`)**

Pour insérer une image entre deux blocs de texte.

```json
{
  "type": "image",
  "url": "/assets/images/screenshot.png",
  "alt": "Description pour l'accessibilité",
  "caption": "Légende affichée sous l'image",
  "width": "full" // "full", "centered", ou pixels
}
```

---

#### **D. Groupe de Boutons (`button_group`)**

Pour afficher une ou plusieurs actions.

```json
{
  "type": "button_group",
  "alignment": "left", // "left", "center", "right"
  "buttons": [
    {
      "type": "text", // Bouton texte simple
      "label": "Voir la démo",
      "action": "https://demo.com",
      "variant": "primary"
    },
    {
      "type": "text_icon", // Bouton texte + icône
      "label": "Télécharger",
      "icon": "download",
      "action": "/download",
      "variant": "secondary"
    },
    {
      "type": "icon_only", // Bouton icône seule
      "icon": "github",
      "action": "https://github.com",
      "variant": "ghost"
    }
  ]
}
```

---

#### **E. Liste d'Étapes (`step_list`)**

Pour afficher un processus étape par étape (Step 1 -> Step 2 -> ...).

```json
{
  "type": "step_list",
  "title": "Titre du processus",
  "description": "Description globale du processus (optionnel)",
  "steps": [
    {
      "step_number": 1,
      "title": "Première étape",
      "description": "Explication détaillée de cette étape."
    },
    {
      "step_number": 2,
      "title": "Deuxième étape",
      "description": "Explication de la suite..."
    }
  ]
}
```

---

#### **F. Alerte / Note (`alert`)**

Pour mettre en avant une information importante.

```json
{
  "type": "alert",
  "variant": "warning", // "info", "warning", "error", "success"
  "title": "Attention",
  "content": [
    { "text": "Ceci est un message important à lire." }
  ]
}
```

## Exemple Complet

Voir le fichier `exemple_documentation.json` pour un exemple concret utilisant tous ces blocs ensemble.
