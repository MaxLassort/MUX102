# MUX102

## Choix UX

- **Cards compactes + SearchBar et Paginator toujours visibles sur desktop** : plutôt que d'agrandir les cards et de cacher la pagination sous la ligne de flottaison (ce qui aurait obligé à scroller ou à introduire un scroll interne — un anti-pattern qui « casse » la scrollbar du navigateur et trompe l'utilisateur sur la quantité de contenu restante), j'ai réduit la taille des cards pour qu'une page complète tienne dans le viewport. La pagination reste ainsi accessible sans effort et conserve son « happy sense of completion » : l'utilisateur sait où il en est et combien il reste à parcourir. Source : Hoa Loranger, *Infinite Scrolling Is Not for Every Website*, Nielsen Norman Group, 2014 — <https://www.nngroup.com/articles/infinite-scrolling/>.

## Choix des couleurs

- **Palette construite autour d'un rose** : je suis parti de mon rose (`#e2bab6`, utilisé en accent / chips / badges) qui donne le ton chaleureux et nostalgique adapté à une application de souvenirs. À partir de cette base, je suis allé chercher une couleur primaire (`#592223`, un brun-vin profond) en validant le contraste avec le [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) pour garantir un ratio conforme aux WCAG AA sur le texte et les éléments d'interface (boutons, liens actifs, titres). Les couleurs de surface, de texte et d'outline ont ensuite été dérivées en gardant cette même contrainte d'accessibilité.

## Heuristiques de Nielsen

Justification de l'UX au regard des [10 heuristiques de Jakob Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

### 1. Visibilité de l'état du système

- Le lien actif dans la `TopAppBar` est clairement marqué (couleur primaire, gras, soulignement épais).
- Le `Paginator` affiche en permanence la page courante et la plage d'éléments visibles (`1–8 sur N`).
- États de chargement (`Chargement…`) et d'erreur (`Erreur : {message}`) explicites sur la page d'accueil.
- ⚠️ **Limite POC** : les états de chargement sont rudimentaires (texte brut). En version productive, il faudrait des **skeletons** sur les cards pendant le fetch, un indicateur d'enregistrement (« Sauvegarde en cours… ») dans la `SaveBar`, et un état visuel sur le bouton voix pendant l'enregistrement réel.

### 2. Correspondance entre le système et le monde réel

- Vocabulaire orienté utilisateur final, jamais technique : « Souvenirs », « Nouveau », « Capturer l'instant », « Raconter l'histoire », « Mots-clés ».
- Icônes Material Symbols universellement reconnues (`search`, `account_circle`, `auto_stories`, `add_circle`, `home`).
- Métaphores cohérentes avec un journal de souvenirs : carte = photo, badge daté, étiquettes/chips.

### 3. Contrôle et liberté de l'utilisateur

- `BackHeader` sur la page « Nouveau Souvenir » pour revenir en arrière à tout moment.
- Choix de **pagination** plutôt que d'infinite scroll : l'utilisateur peut sauter à une page, changer la taille de page, revenir à un état connu.
- Toggle grille/liste sur la page d'accueil : l'utilisateur choisit sa densité d'affichage.
- ⚠️ **Limite POC** : aucune action n'est réellement annulable. En version productive, il faudrait un **undo** (Snackbar « Souvenir supprimé — Annuler ») et un avertissement si l'utilisateur quitte la page « Nouveau Souvenir » avec des modifications non sauvegardées.

### 4. Cohérence et standards

- Tous les styles passent par les design tokens de `src/styles/theme.css` (couleurs, typographie, espacements, rayons) → aucune valeur en dur.
- Patterns de navigation standards : top bar + nav desktop, bottom nav + FAB sur mobile.
- Composants réutilisés partout (`Tooltip`, `Toggle`, `Paginator`, `MemoryCard`) avec API constante.

### 5. Prévention des erreurs

- Les fonctionnalités non implémentées (POC) sont rendues visuellement comme **désactivées** (`linkDisabled`, opacité réduite, curseur `not-allowed`) plutôt que cliquables et silencieuses.
- Boutons du `Paginator` désactivés (`disabled`, opacité 0.35) quand on est sur la première / dernière page.
- Tooltips « POC — fonctionnalité non active » qui préviennent **avant** le clic.
- ⚠️ **Limite POC** : pas de validation côté formulaire (champ texte « Nouveau Souvenir » accepte une chaîne vide, aucun contrôle de taille de photo, etc.). En version productive : validation contextuelle, désactivation du bouton « Enregistrer » tant que les champs requis ne sont pas valides, dialog de confirmation pour les actions destructives.

### 6. Reconnaissance plutôt que rappel

- Chaque action de menu combine **icône + label** (jamais l'icône seule) dans la `BottomNavBar` et le `TagPicker`.
- Les tags des souvenirs sont affichés sous forme de chips visibles sur chaque card : pas besoin d'ouvrir la card pour reconnaître son contenu.
- Le placeholder de la barre de recherche (`Rechercher un souvenir...`) rappelle ce qu'on peut y faire.

### 7. Flexibilité et efficacité d'usage

- Sélecteur de taille de page (`8 / 12 / 24`) : l'utilisateur novice garde 8, l'utilisateur avancé scanne plus vite avec 24.
- Toggle vue grille / vue liste pour adapter l'affichage au contexte (parcours rapide vs lecture détaillée).
- Navigation principale accessible aux deux niveaux : `TopAppBar` (desktop) et `BottomNavBar` (mobile, pouce-friendly).
- ⚠️ **Limite POC** : pas de raccourcis clavier, pas de mémorisation des préférences (taille de page, vue grille/liste) entre les sessions. En version productive : `localStorage` pour les préférences, raccourcis (`/` pour focus la recherche, `←`/`→` pour la pagination).

### 8. Esthétique et design minimaliste

- Palette restreinte (rose chaud + brun-vin + neutres) construite autour d'une émotion unique.
- Densité augmentée sur desktop (cards 225px, padding réduit) pour ne montrer **que** ce qui sert : tout tient dans le viewport, pas de surcharge.
- Typographie hiérarchisée : `headline` pour les titres, `body` pour les contenus, `label` pour les actions.

### 9. Aider à reconnaître, diagnostiquer et corriger les erreurs

- Le `useFetch` expose un état `error` qui s'affiche en clair (`Erreur : {error.message}`) plutôt qu'un écran blanc.
- Les éléments désactivés expliquent **pourquoi** ils le sont via tooltip (« POC — fonctionnalité non active ») au lieu de laisser l'utilisateur cliquer dans le vide.
- ⚠️ **Limite POC** : la gestion fine des erreurs et des retours d'action n'a pas été implémentée — il n'y a pas de validation de formulaire côté UI, pas de message de confirmation après une action, pas de gestion des cas limites (réseau coupé, sauvegarde échouée, etc.). Dans une version productive, il faudrait ajouter :
  - un système de **Snackbar / Toast** (Material Design) pour les retours non bloquants (« Souvenir enregistré », « Connexion perdue »),
  - des **messages d'erreur inline** près des champs concernés (validation de formulaire),
  - des **dialogs de confirmation** pour les actions destructives (suppression d'un souvenir),
  - un état d'**empty state** explicite quand la recherche ne retourne rien.

### 10. Aide et documentation

- Tooltips contextuels (`Tooltip` + `POC_TOOLTIP`) sur toutes les zones non fonctionnelles : c'est la documentation embarquée du POC.
- `aria-label` sur les boutons et liens icônes seuls (`account_circle`, `milleSouvenir — Accueil`) pour les lecteurs d'écran.
- Présent README qui documente les choix de design et de structure pour les contributeurs.
- ⚠️ **Limite POC** : pas d'aide en contexte au-delà des tooltips POC. En version productive : onboarding/tour guidé au premier lancement, page d'aide accessible depuis le menu, micro-copies explicatives sur les étapes complexes (ex. : conseils de capture photo, format d'enregistrement vocal supporté).

