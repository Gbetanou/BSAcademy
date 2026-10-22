/* Contenu de démonstration : à remplacer par les données du CMS (WordPress).
   Aucun prix n'est stocké ni affiché. */

window.BSA = {
  domains: [
    { id: "iso", name: "Sécurité de l'information et normes ISO" },
    { id: "ot", name: "Cybersécurité industrielle et offensive" },
    { id: "gov", name: "Gouvernance et services IT" },
    { id: "pm", name: "Gestion de projet" },
    { id: "net", name: "Réseaux, cloud et data" },
    { id: "mgmt", name: "Management, banque et relation client" }
  ],

  // pre = préfixe de la référence, code = numéro affiché en grand
  courses: [
    { id: "27001li", d: "iso", pre: "ISO/IEC", code: "27001", title: "Lead Implementer", full: "ISO/IEC 27001 Lead Implementer", body: "PECB", kw: "smsi securite information management", logo: "img/logos/formation-pecb.png" },
    { id: "27005", d: "iso", pre: "ISO/IEC", code: "27005", title: "Lead Risk Manager", full: "ISO/IEC 27005 Lead Risk Manager", body: "PECB", kw: "risque risques analyse", logo: "img/logos/formation-27005.png" },
    { id: "27032", d: "iso", pre: "ISO/IEC", code: "27032", title: "Lead Cybersecurity Manager", full: "ISO/IEC 27032 Lead Cybersecurity Manager", body: "PECB", kw: "cybersecurite cyber", logo: "img/logos/formation-pecb.png" },
    { id: "42001", d: "iso", pre: "ISO/IEC", code: "42001", title: "Lead Implementer (SMIA)", full: "ISO/IEC 42001 Lead Implementer", body: "PECB", kw: "ia intelligence artificielle smia", logo: "img/logos/formation-pecb.png" },
    { id: "22301li", d: "iso", pre: "ISO", code: "22301", title: "Lead Implementer", full: "ISO 22301 Lead Implementer", body: "PECB", kw: "continuite activite pca resilience", logo: "img/logos/formation-pecb.png" },
    { id: "22301la", d: "iso", pre: "ISO", code: "22301", title: "Lead Auditor", full: "ISO 22301 Lead Auditor", body: "PECB", kw: "continuite activite audit auditeur", logo: "img/logos/formation-pecb.png" },
    { id: "31000", d: "iso", pre: "ISO", code: "31000", title: "Lead Implementer", full: "ISO 31000 Lead Implementer", body: "PECB", kw: "risque risques management", logo: "img/logos/formation-pecb.png" },
    { id: "62443", d: "ot", pre: "ISA/IEC", code: "62443", title: "Lead Implementer", full: "ISA/IEC 62443 Lead Implementer", body: "Certifiante", kw: "ot industriel scada iacs cybersecurite isa", logo: "img/logos/formation-62443.png" },
    { id: "ceh", d: "ot", pre: "EC-Council", code: "CEH", title: "Certified Ethical Hacker", full: "CEH, Certified Ethical Hacker", body: "EC-Council", kw: "hacking ethique pentest intrusion" },
    { id: "itil5", d: "gov", pre: "ITIL®", code: "V5", title: "Foundation", full: "ITIL® V5 Foundation", body: "PeopleCert", kw: "itil services itsm v5 version 5", logo: "img/logos/formation-itil5.png" },
    { id: "itil4", d: "gov", pre: "ITIL®", code: "4", title: "Foundation", full: "ITIL® 4 Foundation", body: "PeopleCert", kw: "itil services itsm" },
    { id: "cobit", d: "gov", pre: "COBIT", code: "2019", title: "Foundation", full: "COBIT 2019 Foundation", body: "ISACA", kw: "gouvernance it isaca" },
    { id: "itilcult", d: "gov", pre: "", code: "", title: "Culture d'entreprise avec ITIL 4", full: "Culture d'entreprise avec ITIL 4", body: "", kw: "itil culture" },
    { id: "pmp", d: "pm", pre: "PMI", code: "PMP", title: "Project Management Professional", full: "PMP, Project Management Professional", body: "PMI", kw: "projet gestion de projet pmi", logo: "img/logos/formation-pmp.png" },
    { id: "prince2", d: "pm", pre: "PRINCE2®", code: "P2", title: "Foundation", full: "PRINCE2® Foundation", body: "PeopleCert", kw: "projet methode" },
    { id: "pmo", d: "pm", pre: "", code: "", title: "PMO, Project Management Office", full: "PMO, Project Management Office", body: "", kw: "projet portefeuille" },
    { id: "ccna", d: "net", pre: "Cisco", code: "CCNA", title: "Cisco Certified Network Associate", full: "CCNA, Cisco Certified Network Associate", body: "Cisco", kw: "reseau reseaux routage cisco" },
    { id: "az104", d: "net", pre: "Microsoft", code: "AZ-104", title: "Azure Administrator Associate", full: "Microsoft Azure Administrator (AZ-104)", body: "Microsoft", kw: "cloud azure" },
    { id: "pl300", d: "net", pre: "Microsoft", code: "PL-300", title: "Power BI Data Analyst Associate", full: "Microsoft Power BI Data Analyst (PL-300)", body: "Microsoft", kw: "data power bi analyse donnees" },
    { id: "ds", d: "net", pre: "", code: "DSF", title: "Data Science Foundation", full: "Data Science Foundation", body: "Certifiante", kw: "data science donnees" },
    { id: "telecom", d: "net", pre: "", code: "", title: "Initiation au télécom", full: "Initiation au télécom", body: "", kw: "telecom" },
    { id: "sp1", d: "net", pre: "", code: "", title: "Microsoft SharePoint utilisateur", full: "Microsoft SharePoint utilisateur", body: "", kw: "sharepoint" },
    { id: "sp2", d: "net", pre: "", code: "", title: "SharePoint : conception et gestion des sites", full: "SharePoint : conception et gestion des sites", body: "", kw: "sharepoint" },
    { id: "lead", d: "mgmt", pre: "", code: "", title: "Développer son leadership", full: "Développer son leadership", body: "", kw: "leadership management" },
    { id: "leadorg", d: "mgmt", pre: "", code: "", title: "Leadership organisationnel", full: "Leadership organisationnel", body: "", kw: "leadership management" },
    { id: "coach", d: "mgmt", pre: "", code: "", title: "Coaching et mentorat", full: "Coaching et mentorat", body: "", kw: "coaching" },
    { id: "nego", d: "mgmt", pre: "", code: "", title: "Compétences en négociation", full: "Compétences en négociation", body: "", kw: "negociation vente" },
    { id: "vente", d: "mgmt", pre: "", code: "", title: "Techniques de vente", full: "Techniques de vente", body: "", kw: "vente commercial" },
    { id: "vcroisee", d: "mgmt", pre: "", code: "", title: "Vente croisée", full: "Technique de vente : vente croisée", body: "", kw: "vente commercial banque" },
    { id: "budget", d: "mgmt", pre: "", code: "", title: "Contrôle budgétaire", full: "Contrôle budgétaire", body: "", kw: "finance budget" },
    { id: "agency", d: "mgmt", pre: "", code: "", title: "Agency banking", full: "Agency banking", body: "", kw: "banque" },
    { id: "dormants", d: "mgmt", pre: "", code: "", title: "Gestion des comptes dormants", full: "Gestion des comptes dormants", body: "", kw: "banque" },
    { id: "agence", d: "mgmt", pre: "", code: "", title: "Gestion performante d'une agence bancaire", full: "Gestion performante d'une agence bancaire", body: "", kw: "banque agence" },
    { id: "cx", d: "mgmt", pre: "", code: "", title: "Comprendre l'expérience client", full: "Comprendre l'expérience client", body: "", kw: "client experience" },
    { id: "grc", d: "mgmt", pre: "", code: "", title: "Gestion de la relation client", full: "Gestion de la relation client", body: "", kw: "client crm" },
    { id: "difficiles", d: "mgmt", pre: "", code: "", title: "Gérer les clients difficiles", full: "Gérer les clients difficiles", body: "", kw: "client" },
    { id: "ticket", d: "mgmt", pre: "", code: "", title: "Billetterie et gestion des connaissances", full: "Billetterie et gestion des connaissances", body: "", kw: "support helpdesk" },
    { id: "gform", d: "mgmt", pre: "", code: "", title: "Gestion des formations", full: "Gestion des formations", body: "", kw: "rh formation" }
  ],

  // Dates ISO (AAAA-MM-JJ). Sessions publiées sur bostonsoluxacademy.com
  sessions: [
    { course: "itil5", start: "2026-10-21", end: "2026-10-23", city: "Lomé", country: "Togo", title: "ITIL® V5 Foundation" },
    { course: "pmp", start: "2026-10-26", end: "2026-10-30", city: "Conakry", country: "Guinée", venue: "Onomo Hôtel", title: "PMP, Project Management Professional" },
    { course: "42001", start: "2026-11-02", end: "2026-11-06", city: "Lomé", country: "Togo", venue: "Kpogan", title: "ISO/IEC 42001 Lead Implementer (SMIA)" },
    { course: "27005", start: "2026-11-09", end: "2026-11-13", city: "Abidjan", country: "Côte d'Ivoire", title: "ISO/IEC 27005 Lead Risk Manager" },
    { course: "62443", start: "2026-11-09", end: "2026-11-13", city: "Lomé", country: "Togo", venue: "Kpogan", title: "ISA/IEC 62443 Lead Implementer : cybersécurité industrielle des systèmes OT" },
    { course: "pmp", start: "2026-11-16", end: "2026-11-20", city: "Lomé", country: "Togo", title: "PMP, Project Management Professional" }
  ],

  // Veille normative : saisie manuelle par l'équipe (exemples de démonstration)
  news: [
    { f: "itil", ref: "ITIL® Version 5", status: "Lancement", date: "2026-10-06",
      title: "ITIL Version 5 : la nouvelle Foundation est disponible",
      text: "Le référentiel de gestion des services numériques passe en version 5. Premières sessions certifiantes en Afrique de l'Ouest.",
      teaser: "ITIL passe à la version 5. Mettez vos pratiques de gestion des services numériques à jour et faites partie des premiers certifiés de la région.",
      course: "itil5", img: "img/news-itil5.jpg" },
    { f: "iso", ref: "ISO/IEC 42001:2023", status: "Norme IA", date: "2026-09-29",
      title: "Management de l'IA : préparez votre système à la certification ISO/IEC 42001",
      text: "La première norme de système de management de l'IA : gouvernance, risques et usage responsable.",
      teaser: "L'IA entre dans les systèmes de management. Apprenez à piloter la gouvernance, les risques et la conformité de vos usages d'IA avec la première norme dédiée.",
      course: "42001", img: "img/news-42001.jpg" },
    { f: "isa", ref: "ISA/IEC 62443-2-1:2024", status: "Nouvelle édition", date: "2026-09-15",
      title: "Cybersécurité OT : exigences renforcées pour les exploitants d'installations",
      text: "La partie 2-1 fixe le programme de sécurité attendu des exploitants de systèmes industriels (IACS).",
      teaser: "Les installations industrielles sont devenues des cibles. La nouvelle édition précise le programme de sécurité attendu des exploitants : apprenez à le déployer.",
      course: "62443", img: "img/news-62443.jpg" },
    { f: "iso", ref: "ISO/IEC 27001:2022/Amd 1:2024", status: "Amendement", date: "2026-09-02",
      title: "Changement climatique : ce que l'amendement change pour votre SMSI",
      text: "Le changement climatique devient un enjeu à évaluer dans le contexte de tout SMSI.",
      teaser: "Depuis l'amendement de 2024, le climat fait partie du contexte de votre SMSI. Découvrez ce qui change pour votre prochain audit de certification.",
      course: "27001li", img: "img/news-27001.jpg" },
    { f: "iso", ref: "ISO/IEC 27005:2022", status: "Méthode", date: "2026-08-20",
      title: "Analyse de risques : alignez votre méthode sur ISO/IEC 27005:2022",
      text: "Scénarios de risque, critères d'acceptation et lien direct avec les mesures de l'ISO/IEC 27001.",
      teaser: "Une analyse de risques alignée sur la norme, ce sont des décisions plus solides et des audits plus sereins. Voici comment structurer la vôtre.",
      course: "27005", img: "img/news-27005.jpg" }
  ],

  // Références clients : logos officiels (Wikimedia / sites des entreprises), sinon recadrés depuis la planche fournie
  references: [
    { id: "bank-of-africa", name: "Bank of Africa" },
    { id: "bgfi-bank", name: "BGFIBank" },
    { id: "coris-bank", name: "Coris Bank International" },
    { id: "bcc", name: "Banque Commerciale du Chari" },
    { id: "diamond-bank", name: "Diamond Bank" },
    { id: "societe-generale", name: "Société Générale" },
    { id: "orabank", name: "Orabank" },
    { id: "nsia-banque", name: "NSIA Banque" },
    { id: "cbt", name: "CBT" },
    { id: "asecna", name: "ASECNA" },
    { id: "ccei-bank", name: "CCEI Bank GE" },
    { id: "anac-togo", name: "Agence nationale de l'aviation civile du Togo" },
    { id: "salt", name: "S.A.L.T." },
    { id: "pnud", name: "PNUD" },
    { id: "zener", name: "Zener" },
    { id: "navy-federal", name: "Navy Federal Credit Union" },
    { id: "la-poste", name: "La Poste" },
    { id: "cnps", name: "CNPS" },
    { id: "attijariwafa", name: "Attijariwafa bank" },
    { id: "muni", name: "MUNI" },
    { id: "coca-cola", name: "Coca-Cola" },
    { id: "cofina", name: "Cofina" },
    { id: "care", name: "CARE" },
    { id: "ansice", name: "ANSICE" },
    { id: "togo-port", name: "Port autonome de Lomé" },
    { id: "bsic", name: "BSIC" },
    { id: "moov-africa", name: "Moov Africa" },
    { id: "ceb", name: "CEB" },
    { id: "togocom", name: "Togocom" },
    { id: "bank-of-america", name: "Bank of America" },
    { id: "asaige", name: "ASAIGE" },
    { id: "cap", name: "CAP" },
    { id: "la-star", name: "La Star Nationale" },
    { id: "inege", name: "INEGE" },
    { id: "ecobank", name: "Ecobank" },
    { id: "boad", name: "BOAD" },
    { id: "segesa", name: "SEGESA" },
    { id: "yves-rocher", name: "Yves Rocher" },
    { id: "prudential", name: "Prudential Beneficial" },
    { id: "min-trabajo-gq", name: "Ministerio de Trabajo de Guinea Ecuatorial", logo: "img/references/coat-gq.png", text: "Ministerio de Trabajo, Fomento de Empleo y Seguridad Social" },
    { id: "min-minas-gq", name: "Ministerio de Minas e Hidrocarburos", logo: "img/references/coat-gq.png", text: "Ministerio de Minas e Hidrocarburos" },
    { id: "uba", name: "UBA" },
    { id: "fnm-benin", name: "Fonds national de la microfinance Bénin" }
  ],

  partners: [
    { name: "PECB", logo: "img/logos/partner-pecb.png", size: "lg" },
    { name: "PeopleCert", logo: "img/logos/partner-peoplecert.png" },
    { name: "PMI Authorized Training Partner", logo: "img/logos/partner-pmi.png", size: "lg" },
    { name: "Cisco Partner", logo: "img/logos/partner-cisco.png" }
  ],

  // « Ils ont dit » : témoignages publiés sur bostonsoluxacademy.com, dans le même ordre
  testimonials: [
    { name: "Doumassem Olivier", role: "Responsable informatique, Attijari Bank Tchad", course: "ISO/IEC 27032",
      text: "Je sors de cette formation PECB ISO 27032 bien outillé. J'ai appris beaucoup de notions et découvert de nouveaux concepts qui me permettront de mettre en place de nouvelles procédures et de faire la revue de celles qui existent déjà. […] Merci à BostonSolux pour cette opportunité et j'espère que ce ne sera pas la dernière fois." },
    { name: "M. Amine Ali", role: "Responsable sécurité réseau, CNPS Tchad", course: "",
      text: "Pour ma part, ayant évoqué un plan de carrière et avec d'aussi bonnes carrures dans la salle, je nous pressens un très bel avenir professionnel avec BostonSolux. Merci à toute la Team BostonSolux pour l'idée de visiter le Tchad !" },
    { name: "Lawson-Avla Richard", role: "Chef section exploitation réseau Core, Togocel", course: "CCNA",
      text: "La formation CCNA m'a permis d'obtenir des réponses à des questions précises liées à mon département, et surtout de profiter des retours d'expérience du formateur sur les meilleures pratiques en systèmes et réseaux." },
    { name: "Ouro-Tou T. Yacoub", role: "Chef division systèmes et réseaux, Togocel", course: "CCNA",
      text: "La session de formation CCNA s'est déroulée dans des conditions optimales avec les équipements adéquats, ce qui m'a permis de cerner les aspects pointus des systèmes et réseaux." },
    { name: "Djerane Nayam", role: "DSI, Orabank", course: "ISO/IEC 27032",
      text: "J'ai trouvé très intéressant le contenu de la formation. La formation ISO 27032 vient ouvrir davantage les esprits sur la cybercriminalité, et surtout elle est arrivée au moment où le Tchad met en place un CERT national. Elle permettra d'aider efficacement à sa mise en place." },
    { name: "Djimtobaye Permin", role: "Directeur du contrôle permanent", course: "ISO/IEC 27032",
      text: "Au terme de la formation sur la cybersécurité (ISO 27032), mes attentes sont couvertes. Je profiterai de la disponibilité du formateur pour un accompagnement afin de passer la certification." },
    { name: "Kamaladine Mahamat Ousmane", role: "Directeur technique, ONAMA", course: "ISO/IEC 27001",
      text: "C'est la deuxième fois que j'assiste aux formations de BostonSolux. La première, c'était ISO 27001 Lead Implementer, et c'est toujours une impression de satisfaction, avec un formateur très expérimenté. BostonSolux est un partenaire fiable qui nous accompagne à chaque fois." },
    { name: "Mahamat Ahmat Harouna", role: "DSI, BSIC", course: "",
      text: "La formation a été bien dispensée et à la hauteur de nos attentes. Le formateur maîtrise bien le sujet et ses explications sont claires." },
    { name: "Mansour Mahamat Ali", role: "Chef service réseaux informatiques, Douanes", course: "ISO/IEC 27032",
      text: "Je suis tellement ravi d'avoir participé à la formation en ISO 27032. J'ai appris énormément sur la cybersécurité, les risques et comment y faire face. S'il y a d'autres possibilités de formation, je saisirai l'opportunité." }
  ],
  // « Nos engagements » (textes du site)
  engagements: [
    {
      "id": "transformation",
      "title": "Transformation",
      "img": "img/card-terrain.jpg",
      "icon": "trend",
      "text": "Nous croyons au pouvoir transformateur de la formation pour les compétences, les carrières et les entreprises."
    },
    {
      "id": "qualite",
      "title": "Qualité",
      "img": "img/card-examen.jpg",
      "icon": "check",
      "text": "Nous sommes engagés à fournir des formations d'excellence, fruit d'une veille pédagogique rigoureuse."
    },
    {
      "id": "expertise",
      "title": "Expertise",
      "img": "img/card-formateurs.jpg",
      "icon": "award",
      "text": "Nos formateurs sont des praticiens, experts certifiés et reconnus dans leur domaine."
    },
    {
      "id": "satisfaction",
      "title": "Satisfaction client",
      "img": "img/card-suivi.jpg",
      "icon": "smile",
      "text": "L'écoute, la rigueur et le professionnalisme guident chacune de nos actions afin de nous adapter en permanence aux objectifs et aux besoins de nos clients."
    }
  ],

  // « Nos derniers séminaires & formations » (articles publiés sur le site)
  posts: [
    {
      "date": "2026-08-17",
      "cat": "Actualités",
      "img": "img/posts/post-1.jpg",
      "focus": "50% 25%",
      "title": "5 bonnes raisons de se former à l'ISO 27001 Lead Implementer : comprendre, protéger et piloter la sécurité de l'information",
      "excerpt": "Les entreprises produisent, stockent et partagent chaque jour une quantité importante d'informations : données clients, informations financières, documents internes, contrats…",
      "url": "https://bostonsoluxacademy.com/5-bonnes-raisons-de-se-former-a-liso-27001-lead-implementer-comprendre-proteger-et-piloter-la-securite-de-linformation/"
    },
    {
      "date": "2026-08-10",
      "cat": "Actualités",
      "img": "img/posts/post-2.jpg",
      "focus": "50% 50%",
      "title": "Quand la passion rencontre l'expérience : les Digital Dreamers à l'écoute d'un leader du numérique",
      "excerpt": "Former les talents de demain ne consiste pas seulement à leur apprendre à utiliser les technologies.",
      "url": "https://bostonsoluxacademy.com/quand-la-passion-rencontre-lexperience-les-digital-dreamers-a-lecoute-dun-leader-du-numerique/"
    },
    {
      "date": "2026-06-09",
      "cat": "Formations",
      "img": "img/posts/post-3.jpg",
      "focus": "50% 50%",
      "title": "Digital Dreamers 2026 : la 3ᵉ édition du programme qui prépare les enfants aux métiers du numérique",
      "excerpt": "Après le succès des éditions 2024 et 2025, BostonSolux Academy lance la 3ᵉ édition de Digital Dreamers, un programme d'initiation au numérique pour les enfants de 10 à 13 ans.",
      "url": "https://bostonsoluxacademy.com/digital-dreamers-2026-la-3%e1%b5%89-edition-du-programme-qui-prepare-les-enfants-aux-metiers-du-numerique/"
    },
    {
      "date": "2026-06-01",
      "cat": "Blog",
      "img": "img/posts/post-4.jpg",
      "focus": "60% 35%",
      "title": "5 formations pour se spécialiser en cybersécurité et en gestion des risques",
      "excerpt": "La cybersécurité est aujourd'hui l'un des secteurs les plus recherchés du numérique, avec la hausse des cyberattaques, des fraudes en ligne et des violations de données.",
      "url": "https://bostonsoluxacademy.com/5-formations-pour-se-specialiser-en-cybersecurite-et-en-gestion-des-risques/"
    },
    {
      "date": "2026-04-12",
      "cat": "Formations",
      "img": "img/posts/post-5.jpg",
      "focus": "50% 50%",
      "title": "Formation PECB ISO/IEC 42001 Lead Implementer du 7 au 11 avril 2026",
      "excerpt": "À l'heure où l'intelligence artificielle transforme les organisations, la mise en place d'une gouvernance efficace de l'IA devient une priorité stratégique.",
      "url": "https://bostonsoluxacademy.com/formation-pecb-iso-iec-42001-lead-implementer-du-7-au-11-avril-2026/"
    },
    {
      "date": "2026-02-25",
      "cat": "Actualités",
      "img": "img/posts/post-6.jpg",
      "focus": "50% 40%",
      "title": "BostonSolux célèbre le lancement officiel d'ITIL® Foundation Version 5",
      "excerpt": "Une nouvelle étape majeure dans la gestion des services informatiques vient d'être franchie avec la sortie officielle d'ITIL® Foundation Version 5.",
      "url": "https://bostonsoluxacademy.com/bostonsolux-celebre-le-lancement-officiel-ditil-foundation-version-5/"
    }
  ],

  // « BostonSolux Academy TV » (vidéos intégrées sur le site)
  videos: [
    {
      "id": "yfWeIEKZAA0",
      "thumb": "img/tv/yfWeIEKZAA0.jpg",
      "title": "Séminaire sur le référentiel ITIL en partenariat avec PeopleCert"
    },
    {
      "id": "O8rXkpbckLw",
      "thumb": "img/tv/O8rXkpbckLw.jpg",
      "title": "Séminaire sur le référentiel ITIL en partenariat avec PeopleCert, Conakry 2024"
    }
  ],

  // Liens officiels
  links: {
    "elearning": "https://elearning.bostonsoluxacademy.com/login",
    "blog": "https://bostonsoluxacademy.com/blog/",
    "youtube": "https://www.youtube.com/channel/UCd7b9K_BGh5menUsi_QJyAg",
    "facebook": "https://www.facebook.com/BostonSolux",
    "linkedin": "https://www.linkedin.com/company/bostonsolux-academy/",
    "x": "https://x.com/BostonSolux"
  }
};
