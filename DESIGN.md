---
name: BostonSolux Academy
description: Formations certifiantes trouvées par leur numéro de référence, comme on cite une norme.
colors:
  red: "#b70003"
  red-deep: "#8f0002"
  red-ink: "#6e0002"
  ochre: "#dd9c6b"
  ink: "#1d1a1a"
  ink-2: "#4f4a48"
  ink-pressed: "#000000"
  ink-line: "#3a3534"
  paper: "#f6f5f2"
  white: "#ffffff"
  rule: "#dcd8d2"
  rule-strong: "#b9b3ab"
  on-red-2: "#ffd8d2"
  highlight: "#fbe3c9"
  ochre-tint: "#fdf3ea"
  ochre-ink: "#7a4317"
typography:
  display:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  reference-giant:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(6.5rem, 14vw, 14rem)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.03em"
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 62"
  headline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 80"
  title-panel:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 85"
  title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.3
  reference-code:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 900
    lineHeight: 0.9
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 65"
  date-numeral:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 900
    lineHeight: 0.85
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 62"
  wordmark:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 800
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 82"
  body:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"lnum\" 1"
  body-sm:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
  button:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  none: "0px"
  sharp: "2px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "36px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 112px)"
  container-max: "1320px"
components:
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "42px"
  button-red-hover:
    backgroundColor: "{colors.red-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "42px"
  button-ink-hover:
    backgroundColor: "{colors.ink-pressed}"
  button-line:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "42px"
  button-line-hover:
    backgroundColor: "{colors.white}"
  button-ghost:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "42px"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.sharp}"
    padding: "0 18px"
    height: "42px"
  button-light-hover:
    backgroundColor: "{colors.on-red-2}"
  button-lg:
    padding: "0 24px"
    height: "52px"
  chip-on-red:
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "6px 12px"
  search-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "8px 8px 8px 20px"
  search-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "0 22px"
    height: "52px"
  input-form:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 14px"
    height: "52px"
  status-tag:
    backgroundColor: "{colors.ochre-tint}"
    textColor: "{colors.ochre-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "1px 8px"
  status-tag-major:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  segmented-tab:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sharp}"
    padding: "6px 14px"
  segmented-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  notice-course-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "10px 12px"
  intra-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "24px 28px"
---

# Design System: BostonSolux Academy

## Overview

**Creative North Star: "La norme publiée"**

Le site se lit comme la couverture d'une norme imprimée : papier clair, encre presque noire, un aplat de rouge BostonSolux et un filet ocre repris du logo. Les formations se trouvent par leur numéro de référence (27001, 42001, 62443, ITIL 5), exactement comme on cite un référentiel. Le numéro est donc l'élément graphique principal : composé en Archivo condensé, très gras, en chiffres tabulaires, il tient lieu d'illustration.

La densité est assumée. Listes, tableaux et filets fins remplacent les grilles de cartes : une session est une ligne datée, une formation est une ligne de tableau, une actualité est un avis daté qui bascule vers la formation qui y prépare. Les surfaces restent plates, les angles quasi droits (2px), et la hiérarchie se construit par la largeur de la fonte et les filets, pas par des ombres ou des fonds colorés.

Le système refuse explicitement le catalogue de cartes blanches avec photo de banque d'images et prix. Le logo existant du client (« BostonSolux » rouge, « Academy » noir, filet ocre, « Excellence in Training ») est conservé tel quel ; sur fond encre, il est posé sur une plaque blanche.

**Key Characteristics:**
- Aplat rouge plein cadre pour la bande de recherche et la bande de conversion ; jamais de rouge en dégradé ou en teinte décorative.
- Archivo variable : largeur 62 à 85 % pour les numéros et les titres, 100 % pour le texte courant.
- Références normatives en chiffres tabulaires, en rouge, comme points d'entrée.
- Filets fins (1px) pour séparer, filet encre de 2px pour ouvrir une liste, filet ocre de 2px pour signer une rubrique.
- Sélection signalée par un rail rouge de 3px à gauche (ou souligné de 2 à 3px en horizontal).
- Coins à 2px partout ; ombres réservées aux couches flottantes.

## Colors

Une palette de couverture imprimée : un rouge de marque saturé, une encre chaude presque noire, un papier à peine teinté et un ocre réservé aux filets.

### Primary
- **Rouge BostonSolux** (`red`) : couleur du logo, non négociable. Aplat de la bande de recherche (héros) et de la bande devis/newsletter, bouton d'action principal (« Demander un devis », « S'inscrire »), numéros de référence, jours de session, liens textuels, rail de sélection, anneau de focus et surlignage de sélection de texte.
- **Rouge profond** (`red-deep`) : état survol du bouton rouge ; texte du bouton clair posé sur aplat rouge.
- **Rouge encre** (`red-ink`) : uniquement le numéro de référence géant décoratif posé sur l'aplat rouge (ton sur ton, `aria-hidden`).

### Secondary
- **Filet ocre** (`ochre`) : repris du filet du logo. Filet de signature de 2px (bloc clients, colonne témoignage, haut des engagements), anneau de focus des champs posés sur rouge (3px), bordure des étiquettes de statut. Jamais en aplat de surface ni en couleur de texte.
- **Ocre clair** (`ochre-tint`) et **Ocre encre** (`ochre-ink`) : fond et texte de l'étiquette de statut standard (« Publication »).
- **Surligné** (`highlight`) : surlignage des caractères trouvés dans les résultats de recherche et flash de la ligne de catalogue ouverte depuis une recherche.

### Neutral
- **Encre** (`ink`) : texte principal, barre utilitaire, pied de page, bouton encre, bouton « Rechercher », onglet segmenté actif, filet de 2px qui ouvre les listes et tableaux.
- **Encre secondaire** (`ink-2`) : texte de soutien, métadonnées, intitulés de colonnes, compteurs.
- **Noir pressé** (`ink-pressed`) : survol des boutons encre uniquement.
- **Filet sombre** (`ink-line`) : séparateurs et état actif sur fond encre (langue courante, filet légal du pied de page).
- **Papier** (`paper`) : fond de page et des sections alternées, survol des lignes et liens de menu, fond du lien « formation liée » dans les avis.
- **Blanc** (`white`) : sections alternées, barre de navigation, colonne Veille normative, champs de saisie, texte sur rouge (`--on-red`).
- **Filet** (`rule`) et **Filet appuyé** (`rule-strong`) : séparateurs de lignes 1px ; bordure des boutons fantômes, du segmenté et de la touche clavier.
- **Rose sur rouge** (`on-red-2`) : texte secondaire sur aplat rouge (chapeau, libellés) et survol du bouton clair.

### Named Rules
**La règle de l'aplat rouge.** Le rouge occupe des bandes entières (héros, bande de conversion) ou marque une donnée (référence, date, action) ; il n'apparaît jamais en dégradé doux, en fond pâle de section ou de carte, ni en ornement.

**La règle du filet ocre.** L'ocre trace des lignes : filet de rubrique, focus sur rouge, bordure de statut. S'il remplit une surface ou compose du texte, ce n'est plus le filet du logo.

## Typography

**Display Font:** Archivo variable, axes `wght` 100–900 et `wdth` 62–125 (avec Segoe UI, system-ui, sans-serif)
**Body Font:** Archivo variable (même famille)

**Character:** Une seule famille, dont la largeur porte la hiérarchie : condensée et noire pour les numéros comme sur une couverture de norme, pleine largeur et régulière pour lire. Auto-hébergée dans `maquette/fonts` (sous-ensembles latin et latin-ext en woff2, issus de `@fontsource-variable/archivo` 5.2.5, licence OFL), `font-display: swap`, fichier latin préchargé.

### Hierarchy
- **Reference-giant** (900, largeur 62 %, clamp 6.5–14rem, interlignage 0.78) : le numéro de norme géant décoratif dans l'aplat rouge, qui suit la recherche en cours.
- **Display** (800, largeur 78 %, clamp 2.5–5rem, 0.94, -0.02em) : le titre H1 du héros uniquement, limité à 12ch.
- **Headline** (800, largeur 80 %, clamp 1.875–2.75rem, 1.1) : titres H2 de section.
- **Title-panel** (800, largeur 85 %, 1.625rem) : titre d'une colonne ou d'un panneau secondaire (Veille normative).
- **Title** (700, 1.0625–1.1875rem, 1.3) : titres de session, d'avis et d'engagement (H3).
- **Reference-code** (900, largeur 65–70 %, 1.375–1.75rem, rouge, tabulaire) : code de référence dans le catalogue et les résultats ; préfixe (« ISO/IEC ») en petite ligne 0.6875rem 600 au-dessus, largeur 100 %.
- **Date-numeral** (900, largeur 62 %, 3.5rem, rouge, tabulaire) : jour de la session, mois en dessous en 700.
- **Wordmark** (800, largeur 82–85 %, 1.1875–1.25rem) : noms de clients et d'organismes certificateurs composés en texte, sans logos.
- **Body** (400, 1rem, 1.55) : texte courant ; chapeaux 56–60ch, paragraphes 70ch au plus.
- **Body-sm** (400, 0.9375rem) : textes de soutien, pied de page.
- **Label** (600–700, 0.8125rem) : métadonnées, intitulés de colonnes, références d'avis, compteurs. Jamais en capitales espacées.
- **Button** (600, 0.9375rem ; 1rem en grande taille).

### Named Rules
**La règle de la référence citée.** Tout numéro de norme ou de date se compose en chiffres tabulaires (`font-variant-numeric: tabular-nums`), condensé et très gras, en rouge. Le reste du texte garde des chiffres alignés (`lining-nums`) à largeur normale.

**La règle de la largeur parlante.** Plus un élément est un repère (numéro, titre), plus il est condensé (62 à 85 %) ; le texte de lecture reste à 100 %. On ne condense jamais un paragraphe.

## Layout

Conteneur centré de 1320px de contenu (`--max`) avec une gouttière fluide (clamp 16–48px) ; les bandes pleine largeur (héros, CTA) alignent leur contenu sur ce conteneur via `--side`. Sections verticales espacées de clamp 64–112px, en-tête de section à 36px du contenu, alternance papier / blanc séparée par un filet 1px.

Le premier écran est un partage asymétrique : bande de recherche rouge à gauche (1.55fr), colonne Veille normative blanche à droite (1fr), hauteur min(100svh − 112px, 760px). Les listes sont des grilles en ligne : session = date | intitulé | lieu et dates (270px) | actions ; catalogue = onglets verticaux collants (300px) | tableau.

Points de rupture observés :
- **1180px** : menu replié derrière un bouton, panneau déroulant sous la barre ; sessions sur trois colonnes ; engagements sur deux colonnes.
- **1024px** : héros et CTA en une colonne (la veille passe sous la recherche) ; onglets du catalogue en défilement horizontal souligné ; pied de page sur deux colonnes.
- **720px** : tableau du catalogue en fiches (code | contenu) ; sessions sur deux colonnes (jour | reste) ; formulaires empilés ; bouton « Rechercher » pleine largeur.

## Elevation & Depth

Le système est plat. La profondeur vient des aplats (rouge, encre, papier, blanc) et des filets. Les ombres existent uniquement pour ce qui flotte au-dessus d'une autre couche : le champ de recherche posé sur le rouge, le panneau de résultats, le menu mobile déroulé. Ce sont des ombres diffuses, décalées vers le bas, teintées de rouge sombre sur l'aplat rouge.

### Shadow Vocabulary
- **Champ flottant** (`box-shadow: 0 18px 40px -18px rgba(60, 0, 0, 0.55)`) : le champ de recherche sur l'aplat rouge.
- **Panneau déroulé** (`box-shadow: 0 24px 48px -16px rgba(30, 0, 0, 0.45)`) : le panneau de résultats en direct.
- **Menu mobile** (`box-shadow: 0 24px 40px -24px rgba(0, 0, 0, 0.3)`) : le menu déroulé sous la barre de navigation (≤1180px).
- **Rail de sélection** (`box-shadow: inset 3px 0 0 #b70003`) : marque de sélection, pas une élévation.

### Named Rules
**La règle du papier plat.** Rien ne porte d'ombre au repos sur le papier : cartes, panneaux et lignes restent plats et se distinguent par un fond ou un filet. Une ombre signale une couche qui flotte au-dessus d'une autre.

## Shapes

Coins quasi droits : 2px (`--radius`) sur boutons, champs, puces, étiquettes, panneaux et touche clavier ; 0 pour les marques de sélection (souligné de navigation, rail). Aucune pilule, aucun cercle. Les formes viennent des filets : 1px `rule` entre les lignes, 2px `ink` pour ouvrir une liste ou un tableau, 2px `ochre` pour signer une rubrique (bordure gauche, haute ou droite). Le numéro géant du héros est révélé par un masque `clip-path` qui monte du bas.

Icônes : SVG inline en trait, 18px (14px dans la barre utilitaire, 16px dans les sessions, 24px pour le menu), trait 1.7, extrémités arrondies, couleur héritée.

## Components

### Buttons
Rectangles nets, poids 600, pressés à 97 % au clic.
- **Shape:** coins à 2px ; hauteur 42px, 52px en grande taille.
- **Primary (rouge):** fond `red`, texte blanc, padding horizontal 18px. Action principale : « Demander un devis », « S'inscrire ». Sur l'aplat rouge, le bouton rouge passe en encre.
- **Encre:** fond `ink`, texte blanc, survol noir. Action secondaire forte (« Demander un devis » de l'encart intra).
- **Line / Ghost:** contour 1px `ink` (line) ou `rule-strong` (ghost), fond transparent ; survol : contour encre, fond blanc. Actions de consultation (Programme, Calendrier, Catalogue PDF, E-learning).
- **Light:** fond blanc, texte `red-deep`, sur aplat rouge uniquement ; survol `on-red-2`.
- **Hover / Focus:** transitions de couleur 160ms ; pression `scale(0.97)` en 140ms (`cubic-bezier(0.23, 1, 0.32, 1)`). Survols limités aux pointeurs fins. Focus : contour 2px `red`, décalé de 2px.
- **Lien textuel:** 600, rouge, soulignement 1px à 35 % d'opacité qui se renforce au survol.

### Chips
- **Style:** puces de recherche fréquente sur l'aplat rouge : fond transparent, contour 1px blanc à 45 %, texte blanc 600 0.875rem, padding 6px 12px.
- **State:** survol fond blanc à 12 % et contour plein ; clic : remplit la recherche et déclenche les résultats.

### Status tags
- **Standard:** contour `ochre`, fond `ochre-tint`, texte `ochre-ink`, 600, 1px 8px.
- **Majeur** (« Nouvelle édition », « Lancement ») : aplat `red`, texte blanc.

### Cards / Containers
- **Corner Style:** 2px.
- **Background:** blanc sur papier (encart intra), papier sur blanc (lien « formation liée » d'un avis, survol plus soutenu).
- **Shadow Strategy:** aucune (voir La règle du papier plat).
- **Border:** 1px `rule` pour l'encart intra ; aucune pour le lien d'avis.
- **Internal Padding:** 24px 28px (encart), 10px 12px (lien d'avis).

### Inputs / Fields
- **Style:** fond blanc, sans contour, coins 2px, hauteur 52px, curseur de saisie rouge.
- **Focus:** contour 3px `ochre` sans décalage (les champs vivent sur l'aplat rouge, où un focus rouge disparaîtrait).
- **Error:** contour 1px `ink` plus filet intérieur 2px `ochre` ; message en blanc 600 sous le formulaire, annoncé en `aria-live`.

### Navigation
- **Barre utilitaire:** fond encre, 0.8125rem, téléphones, e-mail, Blog, sélecteur FR/EN (langue courante sur `ink-line`).
- **Barre principale:** collante, fond blanc, filet bas 1px, hauteur 76px ; liens 500 0.9375rem, survol fond papier, page courante soulignée d'un filet rouge 2px (coins droits). Actions à droite : E-learning (ghost) et Demander un devis (rouge).
- **Mobile (≤1180px):** bouton menu 24px ; panneau blanc déroulé avec lignes séparées par filets, page courante marquée par le rail rouge de 3px.

### Segmented tabs and vertical tabs
- **Segmenté:** contour 1px `rule-strong`, boutons 0.875rem 600 séparés d'un filet ; actif en aplat encre et texte blanc.
- **Onglets verticaux** (catalogue, témoignages) : liste ouverte par un filet encre 2px, lignes séparées par filets ; actif : texte encre 700, rail rouge 3px, retrait de 14px. Navigation au clavier par flèches.

### Search combobox (signature)
Le cœur du système. Champ blanc flottant sur l'aplat rouge (icône loupe, touche « / » comme raccourci, bouton « Rechercher » encre), résultats affichés pendant la frappe dans un panneau flottant. Chaque résultat est une grille : code de référence rouge | intitulé (caractères trouvés surlignés `highlight`) et domaine | ville en rouge et date de la prochaine session. Option active : fond papier et rail rouge 3px. Le panneau apparaît en 160ms (opacité et léger glissement). Le numéro géant du héros suit l'option active et se révèle par un masque montant (420ms ; 900ms au premier affichage).

### Notice (signature)
Avis de veille normative : ligne de tête (référence en 700 tabulaire, étiquette de statut, date alignée à droite), titre de l'avis, puis lien « formation liée » sur fond papier qui donne le nom de la formation, la ville et les dates, avec une flèche rouge. Avis séparés par filets ; entrée échelonnée de 60ms au chargement.

### Session row
Ligne datée : jour géant rouge condensé et mois, intitulé, lieu et dates avec icônes, délai avant la session (vert foncé, rouge sous 7 jours), puis « S'inscrire » (rouge) et « Programme » (line).

## Do's and Don'ts

### Do:
- **Do** composer chaque numéro de norme et chaque jour de session en Archivo 900 condensé (largeur 62–70 %), chiffres tabulaires, en `red`.
- **Do** ouvrir chaque liste ou tableau par un filet `ink` de 2px et séparer les lignes par des filets `rule` de 1px.
- **Do** garder des coins à 2px sur tout élément cliquable ou saisissable, et 0 sur les marques de sélection.
- **Do** signaler la sélection par un rail rouge `inset 3px 0 0` (vertical) ou un souligné rouge de 2–3px (horizontal).
- **Do** passer le focus en contour `ochre` de 3px sur les champs posés sur l'aplat rouge, en contour `red` de 2px ailleurs.
- **Do** composer les noms de clients et d'organismes en texte (wordmark, 800 condensé) plutôt qu'en logos.
- **Do** poser le logo sur une plaque blanche quand le fond est encre.
- **Do** réduire toutes les animations à 1ms quand `prefers-reduced-motion: reduce` est actif.

### Don't:
- **Don't** construire de grille de cartes blanches avec photo de banque d'images ; une formation est une ligne de référence, pas une vignette.
- **Don't** poser d'ombre sur un élément au repos sur le papier ; les ombres sont réservées au champ de recherche, au panneau de résultats et au menu mobile.
- **Don't** utiliser le rouge en dégradé doux ou en fond pâle de section ou de carte ; c'est un aplat ou une donnée.
- **Don't** remplir une surface d'ocre pur (`ochre`) ni composer du texte avec ; ses teintes `ochre-tint` et `ochre-ink` servent aux seules étiquettes de statut.
- **Don't** arrondir au-delà de 2px (ni pilules, ni cercles).
- **Don't** condenser le texte courant ni l'espacer en capitales.
- **Don't** ajouter de surtitre ou d'étiquette de rubrique au-dessus d'un titre de section ; le titre parle seul.
