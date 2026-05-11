# Mise à jour des releases vers 3.1.10 et suppression de l'historique

## Why
Le launcher Divizion passe en version 3.1.10. Il faut mettre à jour tous les liens de téléchargement, les checksums SHA256, les tailles de fichiers et le numéro de version sur l'ensemble du site. L'historique des versions doit également être retiré du site.

## What Changes
- Mise à jour de la `latest` release dans `releases.json` : version 3.1.9 → 3.1.10 avec tous les nouveaux liens, SHA256, tailles et date
- Suppression de l'historique (`history` array vidé dans `releases.json`)
- Suppression de la page `/versions` (fichier `app/versions/page.tsx`)
- Suppression du lien "Versions" dans la navigation du `Header`
- La page `/download` et la page d'accueil `/` sont automatiquement mises à jour car elles lisent `latest` depuis `releases.json` et `version.ts`

## Impact
- Affected specs: releases, navigation, versions
- Affected code: `releases.json`, `app/versions/page.tsx`, `app/components/Header.tsx`

## MODIFIED Requirements

### Requirement: Latest Release Data
Le système DOIT exposer la version 3.1.10 comme release courante avec les données suivantes :

- **version** : `"3.1.10"`
- **tag** : `"3.1.10"`
- **releaseDate** : `"2026-05-11"`
- **releaseDateFormatted** : `{ "fr": "11 mai 2026", "en": "May 11, 2026" }`
- **githubReleaseUrl** : `"https://github.com/divizion-project/Divizion-Launcher/releases/tag/3.1.10"`
- **downloads** :
  - **Windows (.exe)** : `Divizion-Launcher-setup-3.1.10.exe`, 186 MB, sha256: `f4050d19109c6f9932330cc9ce79241063499ac1d287d42430c3f3f2ac651a30`
  - **Windows (.zip x64)** : `Divizion-Launcher-setup-3.1.10-x64.zip`, 206 MB, sha256: `bbcad65e7c3872ffa1d51b1bc5371e44feab2a6538884cb40d4f9593efe6da8e`
  - **Windows (.zip arm64)** : `Divizion-Launcher-setup-3.1.10-arm64.zip`, 201 MB, sha256: `e5dc783e04d90a68d335645fb249f4486ce47aa8e785491b4c3853f51efb3339`
  - **macOS (x64 .dmg)** : `Divizion-Launcher-setup-3.1.10-x64.dmg`, 200 MB, sha256: `ba9f038241824036cf1b26b9b31cb0629d8b268b4aa4927e265a98253a977739`
  - **macOS (arm64 .dmg)** : `Divizion-Launcher-setup-3.1.10-arm64.dmg`, 197 MB, sha256: `3f455d60097e8561f9b64e92471a6cdaa458acc52db196026d75eee1b0bd2614`
  - **Linux (AppImage)** : `Divizion-Launcher-3.1.10.AppImage`, 183 MB, sha256: `0b85213be7e0a60c339b029ce18e5ce0f6cdd307e17a68f0b2c2000e7961d023`

#### Scenario: Page de téléchargement affiche la version 3.1.10
- **WHEN** un utilisateur visite `/download`
- **THEN** la page affiche "v3.1.10" et les liens pointent vers les assets du tag GitHub `3.1.10`

#### Scenario: Page d'accueil référence la bonne version
- **WHEN** un utilisateur visite `/`
- **THEN** le CTA "Télécharger" pointe vers `/download` qui utilise la version 3.1.10

## REMOVED Requirements

### Requirement: Page d'historique des versions
**Reason** : L'historique des versions n'est plus nécessaire sur le site. Les releases sont disponibles sur GitHub.
**Migration** : Supprimer `app/versions/page.tsx` et retirer le lien de navigation associé.

### Requirement: Navigation "Versions"
**Reason** : La page `/versions` est supprimée.
**Migration** : Retirer l'entrée `{ href: '/versions', label: t('nav.versions') }` du tableau `navLinks` dans `Header.tsx`.

### Requirement: Données d'historique dans releases.json
**Reason** : L'historique n'est plus affiché sur le site.
**Migration** : Vider le tableau `history` dans `releases.json` (`"history": []`).