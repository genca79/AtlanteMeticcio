"use strict";

const STORAGE_KEY = "cantieri-meticci-atlante-v2";
const LANGUAGE_KEY = "cantieri-meticci-language";
const PEOPLE_TABLE = "community_profiles";
const CONFIG = window.APP_CONFIG || {};

const translations = {
  it: {
    heroLead: "Una mappa di Cantieri Meticci come comunita di pratica. Ogni persona e invitata a scegliere la propria distanza dal centro, raccontare desideri e disponibilita, e costruire un pupazzo digitale.",
    addPerson: "Aggiungi persona", exportMap: "Esporta Mappa", importMap: "Importa Mappa", resetDemo: "Ripristina demo",
    mapTitle: "Costellazione della compagnia", core: "Nucleo", middlePlural: "Persone attive", edge: "Margine fertile",
    search: "Cerca", searchPlaceholder: "Nome, talento, desiderio", availability: "Disponibilita", zone: "Zona", allF: "Tutte",
    zoneCore: "Nucleo", zoneMiddle: "Persona attiva", zoneEdge: "Margine fertile",
    detailKicker: "Scheda", edit: "Modifica", galleryKicker: "Corpi simbolici", galleryTitle: "Galleria dei collage digitali",
    editorKicker: "Editor persona", newPerson: "Nuova persona", editPerson: "Modifica persona", close: "Chiudi",
    name: "Nome", role: "Ruolo o provenienza", rolePlaceholder: "Attrice, mediatore, volontaria...",
    bio: "Autoritratto", bioPlaceholder: "Una breve frase per raccontarti.", desire: "Desideri per la compagnia",
    offers: "Cosa puoi offrire", needs: "Di cosa hai bisogno", talents: "Talenti e competenze",
    talentsPlaceholder: "Voce, scenografia, cura, mediazione", tags: "Parole chiave",
    tagsPlaceholder: "Corpo, quartiere, ascolto, bambini", timeAvailability: "Disponibilita di tempo",
    closeness: "Distanza dal centro", closenessHint: "0 significa margine fertile, 100 significa grande prossimita al nucleo della compagnia. La posizione non e gerarchica: puo cambiare nel tempo.",
    puppet: "Pupazzo digitale", puppetHint: "Scegli una struttura di base e poi costruisci un collage personale piu libero.",
    head: "Testa", body: "Corpo", element: "Elemento", object: "Oggetto", personalFragments: "Frammenti personali",
    placeFragment: "Colloca il frammento", onBody: "Sul corpo", onFace: "Sul volto", asObject: "Come oggetto",
    fragmentScale: "Scala frammento", fragmentRotation: "Rotazione frammento", removeFragment: "Rimuovi frammento",
    stageHint: "Seleziona un elemento e manipolalo direttamente sulla figura: trascina per spostare, usa le maniglie per ruotare e ridimensionare. In ritaglio sposti l'immagine dentro la sagoma.",
    hide: "Nascondi", delete: "Elimina", cancel: "Annulla", savePerson: "Salva persona",
    noSelection: "Nessuna persona selezionata. Aggiungi una nuova persona oppure usa i filtri per esplorare la costellazione.",
    noMatches: "Nessuna persona corrisponde ai filtri attivi.", personFallback: "Persona della compagnia",
    visibleSummary: "{visible} persone visibili su {total}.", availabilityPrefix: "Disponibilita", centerPrefix: "Vicino al centro",
    selfPortrait: "Autoritratto", desires: "Desideri", offersTitle: "Cosa offre", needsTitle: "Bisogni", talentsTitle: "Talenti e competenze", tagsTitle: "Parole chiave",
    rotateLeft: "Ruota a sinistra", rotateRight: "Ruota a destra", smaller: "Riduci", larger: "Ingrandisci", scale: "scala", rotate: "ruota", crop: "ritaglio", move: "sposta",
    codePrompt: "Inserisci il codice laboratorio per {action}.", wrongCode: "Codice laboratorio non corretto.",
    actionCreate: "creare un nuovo pupazzo", actionEdit: "modificare questo pupazzo", actionDelete: "cancellare questo pupazzo", actionHide: "nascondere questo pupazzo", actionImport: "caricare un backup JSON",
    confirmDelete: "Eliminare {name}?", confirmHide: "Nascondere {name} dalla mappa pubblica?", confirmImport: "Caricare {count} profili dal JSON? La mappa corrente verra sostituita.",
    thisPerson: "questa persona", importEmpty: "Il file JSON non contiene profili validi.", importOk: "Backup JSON caricato nella mappa.", invalidJson: "JSON non valido: {message}",
    resetConfirm: "Ripristinare i dati demo? I dati locali verranno sostituiti.", cloudEmpty: "Database condiviso vuoto. Aggiungi la prima persona per popolare la mappa.", editNeedsCode: "Inserisci il codice laboratorio per modificare le schede pubblicate.",
    cropKicker: "Frammento personale", cropTitle: "Ritaglia immagine", cropShape: "Forma ritaglio", cropX: "Sposta orizzontale", cropY: "Sposta verticale", cropZoom: "Zoom immagine", cropImport: "Importa ritaglio", rect: "Rettangolo", square: "Quadrato", oval: "Ovale", diamond: "Losanga", torn: "Strappo", backward: "Porta indietro", forward: "Porta avanti"
  },
  en: {
    heroLead: "A map of Cantieri Meticci as a community of practice. Each person is invited to choose their distance from the center, share desires and availability, and build a digital puppet.",
    addPerson: "Add person", exportMap: "Export Map", importMap: "Import Map", resetDemo: "Restore demo",
    mapTitle: "Company constellation", core: "Core", middlePlural: "Active people", edge: "Fertile edge",
    search: "Search", searchPlaceholder: "Name, talent, desire", availability: "Availability", zone: "Zone", allF: "All",
    zoneCore: "Core", zoneMiddle: "Active person", zoneEdge: "Fertile edge",
    detailKicker: "Profile", edit: "Edit", galleryKicker: "Symbolic bodies", galleryTitle: "Digital collage gallery",
    editorKicker: "Person editor", newPerson: "New person", editPerson: "Edit person", close: "Close",
    name: "Name", role: "Role or origin", rolePlaceholder: "Actor, mediator, volunteer...",
    bio: "Self-portrait", bioPlaceholder: "A short sentence to introduce yourself.", desire: "Desires for the company",
    offers: "What you can offer", needs: "What you need", talents: "Talents and skills",
    talentsPlaceholder: "Voice, set design, care, mediation", tags: "Keywords",
    tagsPlaceholder: "Body, neighborhood, listening, children", timeAvailability: "Time availability",
    closeness: "Distance from the center", closenessHint: "0 means fertile edge, 100 means strong closeness to the company core. The position is not hierarchical: it can change over time.",
    puppet: "Digital puppet", puppetHint: "Choose a base structure and then build a freer personal collage.",
    head: "Head", body: "Body", element: "Element", object: "Object", personalFragments: "Personal fragments",
    placeFragment: "Place the fragment", onBody: "On the body", onFace: "On the face", asObject: "As an object",
    fragmentScale: "Fragment scale", fragmentRotation: "Fragment rotation", removeFragment: "Remove fragment",
    stageHint: "Select an element and manipulate it directly on the figure: drag to move, use handles to rotate and resize. In crop mode, move the image inside the shape.",
    hide: "Hide", delete: "Delete", cancel: "Cancel", savePerson: "Save person",
    noSelection: "No person selected. Add a new person or use filters to explore the constellation.",
    noMatches: "No person matches the active filters.", personFallback: "Company person",
    visibleSummary: "{visible} people visible out of {total}.", availabilityPrefix: "Availability", centerPrefix: "Close to center",
    selfPortrait: "Self-portrait", desires: "Desires", offersTitle: "What they offer", needsTitle: "Needs", talentsTitle: "Talents and skills", tagsTitle: "Keywords",
    rotateLeft: "Rotate left", rotateRight: "Rotate right", smaller: "Smaller", larger: "Larger", scale: "scale", rotate: "rotate", crop: "crop", move: "move",
    codePrompt: "Enter the workshop code to {action}.", wrongCode: "Incorrect workshop code.",
    actionCreate: "create a new puppet", actionEdit: "edit this puppet", actionDelete: "delete this puppet", actionHide: "hide this puppet", actionImport: "load a JSON backup",
    confirmDelete: "Delete {name}?", confirmHide: "Hide {name} from the public map?", confirmImport: "Load {count} profiles from JSON? The current map will be replaced.",
    thisPerson: "this person", importEmpty: "The JSON file does not contain valid profiles.", importOk: "JSON backup loaded into the map.", invalidJson: "Invalid JSON: {message}",
    resetConfirm: "Restore demo data? Local data will be replaced.", cloudEmpty: "Shared database empty. Add the first person to populate the map.", editNeedsCode: "Enter the workshop code to edit published profiles.",
    cropKicker: "Personal fragment", cropTitle: "Crop image", cropShape: "Crop shape", cropX: "Move horizontally", cropY: "Move vertically", cropZoom: "Image zoom", cropImport: "Import crop", rect: "Rectangle", square: "Square", oval: "Oval", diamond: "Diamond", torn: "Torn", backward: "Send backward", forward: "Bring forward"
  },
  fr: {
    heroLead: "Une carte de Cantieri Meticci comme communaute de pratique. Chaque personne est invitee a choisir sa distance du centre, raconter ses desirs et disponibilites, et construire une marionnette numerique.",
    addPerson: "Ajouter une personne", exportMap: "Exporter la carte", importMap: "Importer la carte", resetDemo: "Restaurer la demo",
    mapTitle: "Constellation de la compagnie", core: "Noyau", middlePlural: "Personnes actives", edge: "Marge fertile",
    search: "Chercher", searchPlaceholder: "Nom, talent, desir", availability: "Disponibilite", zone: "Zone", allF: "Toutes",
    zoneCore: "Noyau", zoneMiddle: "Personne active", zoneEdge: "Marge fertile",
    detailKicker: "Fiche", edit: "Modifier", galleryKicker: "Corps symboliques", galleryTitle: "Galerie des collages numeriques",
    editorKicker: "Editeur personne", newPerson: "Nouvelle personne", editPerson: "Modifier la personne", close: "Fermer",
    name: "Nom", role: "Role ou provenance", rolePlaceholder: "Actrice, mediateur, volontaire...",
    bio: "Autoportrait", bioPlaceholder: "Une courte phrase pour te presenter.", desire: "Desirs pour la compagnie",
    offers: "Ce que tu peux offrir", needs: "Ce dont tu as besoin", talents: "Talents et competences",
    talentsPlaceholder: "Voix, scenographie, soin, mediation", tags: "Mots-cles",
    tagsPlaceholder: "Corps, quartier, ecoute, enfants", timeAvailability: "Disponibilite de temps",
    closeness: "Distance du centre", closenessHint: "0 signifie marge fertile, 100 signifie grande proximite avec le noyau de la compagnie. La position n'est pas hierarchique: elle peut changer dans le temps.",
    puppet: "Marionnette numerique", puppetHint: "Choisis une structure de base puis construis un collage personnel plus libre.",
    head: "Tete", body: "Corps", element: "Element", object: "Objet", personalFragments: "Fragments personnels",
    placeFragment: "Placer le fragment", onBody: "Sur le corps", onFace: "Sur le visage", asObject: "Comme objet",
    fragmentScale: "Echelle du fragment", fragmentRotation: "Rotation du fragment", removeFragment: "Retirer le fragment",
    stageHint: "Selectionne un element et manipule-le directement sur la figure: fais glisser pour deplacer, utilise les poignees pour tourner et redimensionner. En recadrage, deplace l'image dans la forme.",
    hide: "Masquer", delete: "Supprimer", cancel: "Annuler", savePerson: "Enregistrer",
    noSelection: "Aucune personne selectionnee. Ajoute une personne ou utilise les filtres pour explorer la constellation.",
    noMatches: "Aucune personne ne correspond aux filtres actifs.", personFallback: "Personne de la compagnie",
    visibleSummary: "{visible} personnes visibles sur {total}.", availabilityPrefix: "Disponibilite", centerPrefix: "Proche du centre",
    selfPortrait: "Autoportrait", desires: "Desirs", offersTitle: "Ce qu'elle offre", needsTitle: "Besoins", talentsTitle: "Talents et competences", tagsTitle: "Mots-cles",
    rotateLeft: "Tourner a gauche", rotateRight: "Tourner a droite", smaller: "Reduire", larger: "Agrandir", scale: "echelle", rotate: "tourner", crop: "recadrage", move: "deplacer",
    codePrompt: "Insere le code atelier pour {action}.", wrongCode: "Code atelier incorrect.",
    actionCreate: "creer une nouvelle marionnette", actionEdit: "modifier cette marionnette", actionDelete: "supprimer cette marionnette", actionHide: "masquer cette marionnette", actionImport: "charger une sauvegarde JSON",
    confirmDelete: "Supprimer {name}?", confirmHide: "Masquer {name} de la carte publique?", confirmImport: "Charger {count} profils depuis le JSON? La carte actuelle sera remplacee.",
    thisPerson: "cette personne", importEmpty: "Le fichier JSON ne contient pas de profils valides.", importOk: "Sauvegarde JSON chargee dans la carte.", invalidJson: "JSON invalide: {message}",
    resetConfirm: "Restaurer les donnees demo? Les donnees locales seront remplacees.", cloudEmpty: "Base partagee vide. Ajoute la premiere personne pour remplir la carte.", editNeedsCode: "Insere le code atelier pour modifier les fiches publiees.",
    cropKicker: "Fragment personnel", cropTitle: "Recadrer l'image", cropShape: "Forme du recadrage", cropX: "Deplacer horizontalement", cropY: "Deplacer verticalement", cropZoom: "Zoom image", cropImport: "Importer le recadrage", rect: "Rectangle", square: "Carre", oval: "Ovale", diamond: "Losange", torn: "Dechirure", backward: "Reculer", forward: "Avancer"
  },
  ar: {
    heroLead: "خريطة لكانتييري ميتشي كمجتمع ممارسة. يختار كل شخص مسافته من المركز، ويشارك رغباته وتوفره، ويبني دمية رقمية.",
    addPerson: "إضافة شخص", exportMap: "تصدير الخريطة", importMap: "استيراد الخريطة", resetDemo: "استعادة المثال",
    mapTitle: "كوكبة المجموعة", core: "النواة", middlePlural: "أشخاص نشطون", edge: "الهامش الخصب",
    search: "بحث", searchPlaceholder: "اسم، موهبة، رغبة", availability: "التوفر", zone: "المنطقة", allF: "الكل",
    zoneCore: "النواة", zoneMiddle: "شخص نشط", zoneEdge: "الهامش الخصب",
    detailKicker: "بطاقة", edit: "تعديل", galleryKicker: "أجساد رمزية", galleryTitle: "معرض الكولاج الرقمي",
    editorKicker: "محرر الشخص", newPerson: "شخص جديد", editPerson: "تعديل الشخص", close: "إغلاق",
    name: "الاسم", role: "الدور أو الأصل", rolePlaceholder: "ممثلة، وسيط، متطوع...",
    bio: "بورتريه ذاتي", bioPlaceholder: "جملة قصيرة للتعريف بنفسك.", desire: "الرغبات للمجموعة",
    offers: "ما يمكنك تقديمه", needs: "ما تحتاجه", talents: "المواهب والمهارات",
    talentsPlaceholder: "صوت، سينوغرافيا، رعاية، وساطة", tags: "كلمات مفتاحية",
    tagsPlaceholder: "جسد، حي، إصغاء، أطفال", timeAvailability: "توفر الوقت",
    closeness: "المسافة من المركز", closenessHint: "0 يعني الهامش الخصب، و100 يعني قربا كبيرا من نواة المجموعة. الموقع ليس تراتبيا ويمكن أن يتغير مع الوقت.",
    puppet: "دمية رقمية", puppetHint: "اختر بنية أساسية ثم ابن كولاجا شخصيا أكثر حرية.",
    head: "الرأس", body: "الجسد", element: "العنصر", object: "الغرض", personalFragments: "شظايا شخصية",
    placeFragment: "ضع الشظية", onBody: "على الجسد", onFace: "على الوجه", asObject: "كغرض",
    fragmentScale: "حجم الشظية", fragmentRotation: "دوران الشظية", removeFragment: "إزالة الشظية",
    stageHint: "اختر عنصرا وحرّكه مباشرة على الشكل: اسحب للتحريك، واستخدم المقابض للدوران وتغيير الحجم. في وضع القص حرّك الصورة داخل الشكل.",
    hide: "إخفاء", delete: "حذف", cancel: "إلغاء", savePerson: "حفظ الشخص",
    noSelection: "لا يوجد شخص محدد. أضف شخصا جديدا أو استخدم المرشحات لاستكشاف الكوكبة.",
    noMatches: "لا يوجد شخص يطابق المرشحات النشطة.", personFallback: "شخص من المجموعة",
    visibleSummary: "{visible} أشخاص ظاهرون من {total}.", availabilityPrefix: "التوفر", centerPrefix: "القرب من المركز",
    selfPortrait: "بورتريه ذاتي", desires: "الرغبات", offersTitle: "ما يقدمه", needsTitle: "الاحتياجات", talentsTitle: "المواهب والمهارات", tagsTitle: "كلمات مفتاحية",
    rotateLeft: "تدوير يسارا", rotateRight: "تدوير يمينا", smaller: "تصغير", larger: "تكبير", scale: "الحجم", rotate: "دوران", crop: "قص", move: "تحريك",
    codePrompt: "أدخل رمز الورشة من أجل {action}.", wrongCode: "رمز الورشة غير صحيح.",
    actionCreate: "إنشاء دمية جديدة", actionEdit: "تعديل هذه الدمية", actionDelete: "حذف هذه الدمية", actionHide: "إخفاء هذه الدمية", actionImport: "تحميل نسخة JSON",
    confirmDelete: "حذف {name}؟", confirmHide: "إخفاء {name} من الخريطة العامة؟", confirmImport: "تحميل {count} ملفات من JSON؟ سيتم استبدال الخريطة الحالية.",
    thisPerson: "هذا الشخص", importEmpty: "ملف JSON لا يحتوي على ملفات صالحة.", importOk: "تم تحميل نسخة JSON في الخريطة.", invalidJson: "JSON غير صالح: {message}",
    resetConfirm: "استعادة بيانات المثال؟ سيتم استبدال البيانات المحلية.", cloudEmpty: "قاعدة البيانات المشتركة فارغة. أضف أول شخص لملء الخريطة.", editNeedsCode: "أدخل رمز الورشة لتعديل الملفات المنشورة.",
    cropKicker: "شظية شخصية", cropTitle: "قص الصورة", cropShape: "شكل القص", cropX: "تحريك أفقي", cropY: "تحريك عمودي", cropZoom: "تكبير الصورة", cropImport: "استيراد القص", rect: "مستطيل", square: "مربع", oval: "بيضاوي", diamond: "معين", torn: "ممزق", backward: "إلى الخلف", forward: "إلى الأمام"
  }
};

Object.assign(translations.it, {
  "availability.Alta": "Alta", "availability.Media": "Media", "availability.Bassa": "Bassa", "availability.A chiamata": "A chiamata",
  "catalog.moon": "Luna", "catalog.shell": "Conchiglia", "catalog.seed": "Seme", "catalog.stone": "Sasso", "catalog.mask": "Maschera", "catalog.star": "Stella",
  "catalog.thread": "Tessuto", "catalog.sea": "Mare", "catalog.leaf": "Foglia", "catalog.root": "Radice", "catalog.metal": "Lamiera", "catalog.sail": "Vela",
  "catalog.water": "Acqua", "catalog.earth": "Terra", "catalog.air": "Aria", "catalog.fire": "Fuoco", "catalog.paper": "Carta", "catalog.shadow": "Ombra",
  "catalog.branch": "Ramo", "catalog.lantern": "Lanterna", "catalog.kite": "Aquilone", "catalog.tube": "Tubo", "catalog.nest": "Nido", "catalog.key": "Chiave",
  "catalog.circle": "Cerchio", "catalog.rectangle": "Rettangolo", "catalog.square": "Quadrato", "catalog.triangle": "Triangolo"
});
Object.assign(translations.en, {
  "availability.Alta": "High", "availability.Media": "Medium", "availability.Bassa": "Low", "availability.A chiamata": "On call",
  "catalog.moon": "Moon", "catalog.shell": "Shell", "catalog.seed": "Seed", "catalog.stone": "Stone", "catalog.mask": "Mask", "catalog.star": "Star",
  "catalog.thread": "Fabric", "catalog.sea": "Sea", "catalog.leaf": "Leaf", "catalog.root": "Root", "catalog.metal": "Sheet metal", "catalog.sail": "Sail",
  "catalog.water": "Water", "catalog.earth": "Earth", "catalog.air": "Air", "catalog.fire": "Fire", "catalog.paper": "Paper", "catalog.shadow": "Shadow",
  "catalog.branch": "Branch", "catalog.lantern": "Lantern", "catalog.kite": "Kite", "catalog.tube": "Tube", "catalog.nest": "Nest", "catalog.key": "Key",
  "catalog.circle": "Circle", "catalog.rectangle": "Rectangle", "catalog.square": "Square", "catalog.triangle": "Triangle"
});
Object.assign(translations.fr, {
  "availability.Alta": "Haute", "availability.Media": "Moyenne", "availability.Bassa": "Basse", "availability.A chiamata": "Sur appel",
  "catalog.moon": "Lune", "catalog.shell": "Coquillage", "catalog.seed": "Graine", "catalog.stone": "Pierre", "catalog.mask": "Masque", "catalog.star": "Etoile",
  "catalog.thread": "Tissu", "catalog.sea": "Mer", "catalog.leaf": "Feuille", "catalog.root": "Racine", "catalog.metal": "Tole", "catalog.sail": "Voile",
  "catalog.water": "Eau", "catalog.earth": "Terre", "catalog.air": "Air", "catalog.fire": "Feu", "catalog.paper": "Papier", "catalog.shadow": "Ombre",
  "catalog.branch": "Branche", "catalog.lantern": "Lanterne", "catalog.kite": "Cerf-volant", "catalog.tube": "Tube", "catalog.nest": "Nid", "catalog.key": "Cle",
  "catalog.circle": "Cercle", "catalog.rectangle": "Rectangle", "catalog.square": "Carre", "catalog.triangle": "Triangle"
});
Object.assign(translations.ar, {
  "availability.Alta": "عال", "availability.Media": "متوسط", "availability.Bassa": "منخفض", "availability.A chiamata": "عند الطلب",
  "catalog.moon": "قمر", "catalog.shell": "صدفة", "catalog.seed": "بذرة", "catalog.stone": "حجر", "catalog.mask": "قناع", "catalog.star": "نجمة",
  "catalog.thread": "قماش", "catalog.sea": "بحر", "catalog.leaf": "ورقة", "catalog.root": "جذر", "catalog.metal": "معدن", "catalog.sail": "شراع",
  "catalog.water": "ماء", "catalog.earth": "أرض", "catalog.air": "هواء", "catalog.fire": "نار", "catalog.paper": "ورق", "catalog.shadow": "ظل",
  "catalog.branch": "غصن", "catalog.lantern": "فانوس", "catalog.kite": "طائرة ورقية", "catalog.tube": "أنبوب", "catalog.nest": "عش", "catalog.key": "مفتاح",
  "catalog.circle": "دائرة", "catalog.rectangle": "مستطيل", "catalog.square": "مربع", "catalog.triangle": "مثلث"
});

const collageCatalog = {
  head: [
    { id: "moon", label: "Luna" },
    { id: "shell", label: "Conchiglia" },
    { id: "seed", label: "Seme" },
    { id: "stone", label: "Sasso" },
    { id: "mask", label: "Maschera" },
    { id: "star", label: "Stella" },
    { id: "circle", label: "Cerchio" },
    { id: "rectangle", label: "Rettangolo" },
    { id: "square", label: "Quadrato" },
    { id: "triangle", label: "Triangolo" }
  ],
  body: [
    { id: "thread", label: "Tessuto" },
    { id: "sea", label: "Mare" },
    { id: "leaf", label: "Foglia" },
    { id: "root", label: "Radice" },
    { id: "metal", label: "Lamiera" },
    { id: "sail", label: "Vela" },
    { id: "circle", label: "Cerchio" },
    { id: "rectangle", label: "Rettangolo" },
    { id: "square", label: "Quadrato" },
    { id: "triangle", label: "Triangolo" }
  ],
  element: [
    { id: "water", label: "Acqua" },
    { id: "earth", label: "Terra" },
    { id: "air", label: "Aria" },
    { id: "fire", label: "Fuoco" },
    { id: "paper", label: "Carta" },
    { id: "shadow", label: "Ombra" },
    { id: "circle", label: "Cerchio" },
    { id: "rectangle", label: "Rettangolo" },
    { id: "square", label: "Quadrato" },
    { id: "triangle", label: "Triangolo" }
  ],
  companion: [
    { id: "branch", label: "Ramo" },
    { id: "lantern", label: "Lanterna" },
    { id: "kite", label: "Aquilone" },
    { id: "tube", label: "Tubo" },
    { id: "nest", label: "Nido" },
    { id: "key", label: "Chiave" },
    { id: "circle", label: "Cerchio" },
    { id: "rectangle", label: "Rettangolo" },
    { id: "square", label: "Quadrato" },
    { id: "triangle", label: "Triangolo" }
  ]
};

const BASIC_SHAPE_IDS = new Set(["circle", "rectangle", "square", "triangle"]);
const DEFAULT_SHAPE_COLOR = "#cf7150";

const demoPeople = [
  {
    id: crypto.randomUUID(),
    name: "Amina",
    role: "Attrice e mediatrice",
    bio: "Porto il corpo in ascolto, cucio relazioni tra scena, quartiere e lingua.",
    desire: "Desidero un laboratorio stabile con adolescenti e donne del territorio.",
    offers: "Cura del gruppo, pratiche vocali, traduzione culturale, presenza in scena.",
    needs: "Piu tempo per prove condivise e un gruppo con cui sperimentare materiali sonori.",
    talents: "Voce, facilitazione, ascolto, training fisico",
    tags: "corpo, ascolto, quartiere, donne",
    availability: "Alta",
    closeness: 81,
    collage: { head: "moon", body: "thread", element: "air", companion: "lantern" },
    owner_email: "",
    updated_at: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Stefano",
    role: "Tecnico luci e compagno di scena",
    bio: "Mi muovo tra attrezzi, lampade e invenzioni povere che fanno spazio al gioco teatrale.",
    desire: "Vorrei una squadra che lavori su scenografie leggere e installazioni mobili.",
    offers: "Supporto tecnico, invenzione scenica, montaggi, cura degli spazi.",
    needs: "Nuovi materiali di recupero e una mappa chiara dei prossimi eventi.",
    talents: "Luci, scenotecnica, bricolage, allestimenti",
    tags: "spazio, tecnica, recupero, scena",
    availability: "Media",
    closeness: 63,
    collage: { head: "mask", body: "metal", element: "fire", companion: "tube" },
    owner_email: "",
    updated_at: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Lina",
    role: "Volontaria in avvicinamento",
    bio: "Sto cercando un luogo dove intrecciare arte sociale, bambini e pratiche narrative.",
    desire: "Mi piacerebbe osservare e poi facilitare laboratori di narrazione visiva.",
    offers: "Tempo a chiamata, fotografia, supporto organizzativo, scrittura.",
    needs: "Un piccolo gruppo di riferimento e occasioni per entrare gradualmente.",
    talents: "Fotografia, scrittura, organizzazione",
    tags: "bambini, immagini, narrazione, cura",
    availability: "A chiamata",
    closeness: 29,
    collage: { head: "seed", body: "sea", element: "water", companion: "kite" },
    owner_email: "",
    updated_at: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Moussa",
    role: "Musicista e pedagogo",
    bio: "Abito il margine come spazio di invenzione e faccio entrare ritmo e respiro nei gruppi.",
    desire: "Vorrei una costellazione di pratiche tra musica, gioco e rituale urbano.",
    offers: "Percussioni, conduzione ritmica, composizione collettiva.",
    needs: "Sessioni brevi ma continue e piu occasioni all'aperto.",
    talents: "Ritmo, conduzione, improvvisazione, pedagogia",
    tags: "musica, ritmo, strada, rito",
    availability: "Bassa",
    closeness: 46,
    collage: { head: "shell", body: "root", element: "earth", companion: "branch" },
    owner_email: "",
    updated_at: new Date().toISOString()
  }
];

const state = {
  people: loadLocalPeople(),
  selectedId: null,
  editorId: null,
  editorCollage: null,
  activeFragmentId: null,
  pendingFragment: null,
  editingFragmentId: null,
  dragState: null,
  previewPointers: new Map(),
  cropDragState: null,
  editMode: "move",
  filters: { search: "", availability: "all", zone: "all" },
  supabase: null,
  user: null,
  isAdmin: false,
  accessGranted: false,
  language: localStorage.getItem(LANGUAGE_KEY) || "it",
  useCloud: false,
  loading: false
};

const elements = {
  addPersonButton: document.querySelector("#addPersonButton"),
  editPersonButton: document.querySelector("#editPersonButton"),
  exportButton: document.querySelector("#exportButton"),
  importButton: document.querySelector("#importButton"),
  importFileInput: document.querySelector("#importFileInput"),
  resetButton: document.querySelector("#resetButton"),
  languageButtons: document.querySelectorAll("[data-lang]"),
  authButton: document.querySelector("#authButton"),
  storageModeLabel: document.querySelector("#storageModeLabel"),
  authStatusLabel: document.querySelector("#authStatusLabel"),
  syncStatusLabel: document.querySelector("#syncStatusLabel"),
  searchInput: document.querySelector("#searchInput"),
  availabilityFilter: document.querySelector("#availabilityFilter"),
  zoneFilter: document.querySelector("#zoneFilter"),
  mapNodes: document.querySelector("#mapNodes"),
  mapConnections: document.querySelector("#mapConnections"),
  mapSummary: document.querySelector("#mapSummary"),
  detailCard: document.querySelector("#detailCard"),
  galleryGrid: document.querySelector("#galleryGrid"),
  editorDialog: document.querySelector("#editorDialog"),
  personForm: document.querySelector("#personForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  cancelButton: document.querySelector("#cancelButton"),
  deletePersonButton: document.querySelector("#deletePersonButton"),
  hidePersonButton: document.querySelector("#hidePersonButton"),
  closenessInput: document.querySelector("#closenessInput"),
  closenessValue: document.querySelector("#closenessValue"),
  collagePreview: document.querySelector("#collagePreview"),
  nameInput: document.querySelector("#nameInput"),
  roleInput: document.querySelector("#roleInput"),
  bioInput: document.querySelector("#bioInput"),
  desireInput: document.querySelector("#desireInput"),
  offersInput: document.querySelector("#offersInput"),
  needsInput: document.querySelector("#needsInput"),
  talentsInput: document.querySelector("#talentsInput"),
  tagsInput: document.querySelector("#tagsInput"),
  availabilityInput: document.querySelector("#availabilityInput"),
  headInput: document.querySelector("#headInput"),
  bodyInput: document.querySelector("#bodyInput"),
  elementInput: document.querySelector("#elementInput"),
  companionInput: document.querySelector("#companionInput"),
  customImageInput: document.querySelector("#customImageInput"),
  customImagePlacementInput: document.querySelector("#customImagePlacementInput"),
  customImageScaleInput: document.querySelector("#customImageScaleInput"),
  customImageScaleValue: document.querySelector("#customImageScaleValue"),
  customImageRotationInput: document.querySelector("#customImageRotationInput"),
  customImageRotationValue: document.querySelector("#customImageRotationValue"),
  removeCustomImageButton: document.querySelector("#removeCustomImageButton"),
  fragmentCropDialog: document.querySelector("#fragmentCropDialog"),
  fragmentCropForm: document.querySelector("#fragmentCropForm"),
  fragmentCropPreview: document.querySelector("#fragmentCropPreview"),
  closeFragmentCropButton: document.querySelector("#closeFragmentCropButton"),
  cancelFragmentCropButton: document.querySelector("#cancelFragmentCropButton"),
  fragmentMaskInput: document.querySelector("#fragmentMaskInput"),
  fragmentCropXInput: document.querySelector("#fragmentCropXInput"),
  fragmentCropYInput: document.querySelector("#fragmentCropYInput"),
  fragmentCropZoomInput: document.querySelector("#fragmentCropZoomInput"),
  authDialog: document.querySelector("#authDialog"),
  authForm: document.querySelector("#authForm"),
  closeAuthDialogButton: document.querySelector("#closeAuthDialogButton"),
  emailInput: document.querySelector("#emailInput"),
  sendMagicLinkButton: document.querySelector("#sendMagicLinkButton"),
  signOutButton: document.querySelector("#signOutButton")
};

initialize();

async function initialize() {
  populateCollageSelects();
  bindEvents();
  hideLegacySingleFragmentControls();
  maybeInitSupabase();
  applyTranslations();

  if (!state.people.length) {
    state.people = structuredClone(demoPeople);
  }

  state.people = state.people.map((person) => ({
    ...person,
    collage: normalizeEditorCollage(person.collage || createEmptyPerson().collage)
  }));

  state.selectedId = state.people[0]?.id ?? null;
  render();

  if (state.supabase) {
    await restoreSupabaseSession();
  } else {
    updateStatus("Locale", "Accesso libero", "Compila config.js per usare Supabase e condividere i dati.");
  }
}

function hideLegacySingleFragmentControls() {
  [
    elements.customImagePlacementInput,
    elements.customImageScaleInput,
    elements.customImageRotationInput
  ].forEach((input) => {
    input?.closest("label")?.style.setProperty("display", "none");
  });
}

function bindEvents() {
  elements.addPersonButton.addEventListener("click", () => openEditorWithAccess());
  elements.editPersonButton.addEventListener("click", () => state.selectedId && openEditorWithAccess(state.selectedId));
  elements.exportButton.addEventListener("click", exportPeople);
  elements.importButton.addEventListener("click", handleImportButtonClick);
  elements.importFileInput.addEventListener("change", handleImportFileSelected);
  elements.resetButton.addEventListener("click", resetToDemo);
  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.lang || "it";
      localStorage.setItem(LANGUAGE_KEY, state.language);
      applyTranslations();
      render();
    });
  });
  elements.authButton.addEventListener("click", () => elements.authDialog.showModal());
  elements.closeAuthDialogButton.addEventListener("click", () => elements.authDialog.close());
  elements.authForm.addEventListener("submit", sendMagicLink);
  elements.signOutButton.addEventListener("click", signOut);
  elements.searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    render();
  });
  elements.availabilityFilter.addEventListener("change", (event) => {
    state.filters.availability = event.target.value;
    render();
  });
  elements.zoneFilter.addEventListener("change", (event) => {
    state.filters.zone = event.target.value;
    render();
  });
  elements.closeDialogButton.addEventListener("click", closeEditor);
  elements.cancelButton.addEventListener("click", closeEditor);
  elements.closenessInput.addEventListener("input", updateClosenessLabel);
  elements.personForm.addEventListener("submit", handleSavePerson);
  elements.deletePersonButton.addEventListener("click", handleDeletePerson);
  elements.hidePersonButton.addEventListener("click", handleHidePerson);
  elements.customImageInput.addEventListener("change", handleCustomImageSelected);
  elements.customImagePlacementInput.addEventListener("change", renderCollagePreviewFromForm);
  elements.customImageScaleInput.addEventListener("input", updateCustomImageControls);
  elements.customImageRotationInput.addEventListener("input", updateCustomImageControls);
  elements.removeCustomImageButton.addEventListener("click", removeCustomImage);
  elements.closeFragmentCropButton.addEventListener("click", closeFragmentCropDialog);
  elements.cancelFragmentCropButton.addEventListener("click", closeFragmentCropDialog);
  elements.fragmentCropForm.addEventListener("submit", confirmFragmentCrop);
  [
    elements.fragmentMaskInput,
    elements.fragmentCropXInput,
    elements.fragmentCropYInput,
    elements.fragmentCropZoomInput
  ].forEach((input) => input.addEventListener("input", updateFragmentCropPreview));
  elements.fragmentCropPreview.addEventListener("pointerdown", handleFragmentCropPointerDown);
  elements.collagePreview.addEventListener("pointerdown", handlePreviewPointerDown);
  elements.collagePreview.addEventListener("dblclick", handlePreviewDoubleClick);
  elements.collagePreview.addEventListener("wheel", handlePreviewWheel, { passive: false });

  [elements.headInput, elements.bodyInput, elements.elementInput, elements.companionInput].forEach((select) => {
    select.addEventListener("change", (event) => {
      if (state.editorCollage?.transforms?.[event.target.name]) {
        state.editorCollage.transforms[event.target.name].visible = true;
      }
      renderCollagePreviewFromForm();
    });
  });
}

function t(key, replacements = {}) {
  const dictionary = translations[state.language] || translations.it;
  let value = dictionary[key] ?? translations.it[key] ?? key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function setText(selector, key) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = t(key);
  }
}

function setPlaceholder(selector, key) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("placeholder", t(key));
  }
}

function setLabelText(inputSelector, key) {
  const input = document.querySelector(inputSelector);
  const label = input?.closest("label")?.querySelector("span");
  if (label) {
    label.textContent = t(key);
  }
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
  elements.languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.language);
  });

  setText("#heroLead", "heroLead");
  setText("#addPersonButton", "addPerson");
  setText("#exportButton", "exportMap");
  setText("#importButton", "importMap");
  setText("#resetButton", "resetDemo");
  setText("#mapTitle", "mapTitle");
  setText("#legendCore", "core");
  setText("#legendMiddle", "middlePlural");
  setText("#legendEdge", "edge");
  setText("#searchLabel", "search");
  setPlaceholder("#searchInput", "searchPlaceholder");
  setText("#availabilityFilterLabel", "availability");
  setText("#zoneFilterLabel", "zone");
  setText("#mapCenterMark", "core");
  setText("#detailKicker", "detailKicker");
  setText("#editPersonButton", "edit");
  setText("#galleryKicker", "galleryKicker");
  setText("#galleryTitle", "galleryTitle");
  setText("#editorKicker", "editorKicker");
  if (elements.dialogTitle) {
    elements.dialogTitle.textContent = state.editorId ? t("editPerson") : t("newPerson");
  }
  setText("#closeDialogButton", "close");
  setText("#hidePersonButton", "hide");
  setText("#deletePersonButton", "delete");
  setText("#cancelButton", "cancel");
  const saveButton = document.querySelector("#personForm .primary-button[type='submit']");
  if (saveButton) saveButton.textContent = t("savePerson");

  setLabelText("#nameInput", "name");
  setLabelText("#roleInput", "role");
  setPlaceholder("#roleInput", "rolePlaceholder");
  setLabelText("#bioInput", "bio");
  setPlaceholder("#bioInput", "bioPlaceholder");
  setLabelText("#desireInput", "desire");
  setLabelText("#offersInput", "offers");
  setLabelText("#needsInput", "needs");
  setLabelText("#talentsInput", "talents");
  setPlaceholder("#talentsInput", "talentsPlaceholder");
  setLabelText("#tagsInput", "tags");
  setPlaceholder("#tagsInput", "tagsPlaceholder");
  setLabelText("#availabilityInput", "timeAvailability");
  setLabelText("#closenessInput", "closeness");
  const hint = document.querySelector(".hint-box p");
  if (hint) hint.textContent = t("closenessHint");
  setText(".field-title", "puppet");
  const puppetHint = document.querySelector(".collage-head p");
  if (puppetHint) puppetHint.textContent = t("puppetHint");
  setLabelText("#headInput", "head");
  setLabelText("#bodyInput", "body");
  setLabelText("#elementInput", "element");
  setLabelText("#companionInput", "object");
  setLabelText("#customImageInput", "personalFragments");
  setLabelText("#customImagePlacementInput", "placeFragment");
  setLabelText("#customImageScaleInput", "fragmentScale");
  setLabelText("#customImageRotationInput", "fragmentRotation");
  setText("#removeCustomImageButton", "removeFragment");
  setText(".stage-hint", "stageHint");
  setText("#cropKicker", "cropKicker");
  setText("#cropTitle", "cropTitle");
  setText("#closeFragmentCropButton", "close");
  setText("#cancelFragmentCropButton", "cancel");
  setText("#confirmFragmentCropButton", "cropImport");
  setLabelText("#fragmentMaskInput", "cropShape");
  setLabelText("#fragmentCropXInput", "cropX");
  setLabelText("#fragmentCropYInput", "cropY");
  setLabelText("#fragmentCropZoomInput", "cropZoom");

  translateOption("#availabilityFilter option[value='all']", "allF");
  translateOption("#availabilityFilter option[value='Alta']", "availability.Alta");
  translateOption("#availabilityFilter option[value='Media']", "availability.Media");
  translateOption("#availabilityFilter option[value='Bassa']", "availability.Bassa");
  translateOption("#availabilityFilter option[value='A chiamata']", "availability.A chiamata");
  translateOption("#zoneFilter option[value='all']", "allF");
  translateOption("#zoneFilter option[value='core']", "zoneCore");
  translateOption("#zoneFilter option[value='middle']", "zoneMiddle");
  translateOption("#zoneFilter option[value='edge']", "zoneEdge");
  translateOption("#availabilityInput option[value='Alta']", "availability.Alta");
  translateOption("#availabilityInput option[value='Media']", "availability.Media");
  translateOption("#availabilityInput option[value='Bassa']", "availability.Bassa");
  translateOption("#availabilityInput option[value='A chiamata']", "availability.A chiamata");
  translateOption("#customImagePlacementInput option[value='body']", "onBody");
  translateOption("#customImagePlacementInput option[value='head']", "onFace");
  translateOption("#customImagePlacementInput option[value='companion']", "asObject");
  translateOption("#fragmentMaskInput option[value='rect']", "rect");
  translateOption("#fragmentMaskInput option[value='square']", "square");
  translateOption("#fragmentMaskInput option[value='oval']", "oval");
  translateOption("#fragmentMaskInput option[value='diamond']", "diamond");
  translateOption("#fragmentMaskInput option[value='torn']", "torn");

  populateCollageSelects();
}

function translateOption(selector, key) {
  const option = document.querySelector(selector);
  if (option) {
    option.textContent = t(key);
  }
}

function maybeInitSupabase() {
  if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY || !window.supabase?.createClient) {
    return;
  }

  state.supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  state.supabase.auth.onAuthStateChange(async (_event, session) => {
    state.user = session?.user ?? null;
    state.isAdmin = state.user ? await checkAdminStatus() : false;
    updateAuthUI();
    await loadPeopleFromSupabase();
  });
}

async function restoreSupabaseSession() {
  const { data, error } = await state.supabase.auth.getSession();
  if (error) {
    updateStatus("Locale", "Errore sessione", "Supabase e configurato ma la sessione non e stata ripristinata.");
    return;
  }

  state.user = data.session?.user ?? null;
  state.isAdmin = state.user ? await checkAdminStatus() : false;
  updateAuthUI();
  await loadPeopleFromSupabase();
}

async function checkAdminStatus() {
  if (!state.supabase || !state.user?.email) {
    return false;
  }
  const { data, error } = await state.supabase
    .from("admin_users")
    .select("email")
    .eq("email", state.user.email)
    .maybeSingle();
  return !error && Boolean(data);
}

async function sendMagicLink(event) {
  event.preventDefault();
  if (!state.supabase) {
    showSupabaseHelp();
    return;
  }

  const email = elements.emailInput.value.trim();
  if (!email) {
    elements.emailInput.focus();
    return;
  }

  const redirectTo = CONFIG.SITE_URL || window.location.href;
  const { error } = await state.supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
  });

  if (error) {
    updateStatus(currentModeLabel(), "Errore accesso", `Magic link non inviato: ${error.message}`);
    return;
  }

  updateStatus(currentModeLabel(), "Magic link inviato", `Controlla ${email} e apri il link di accesso.`);
  elements.authDialog.close();
}

async function signOut() {
  if (!state.supabase) {
    return;
  }
  await state.supabase.auth.signOut();
  state.user = null;
  state.isAdmin = false;
  updateAuthUI();
  await loadPeopleFromSupabase();
  updateStatus("Cloud pubblico", "Accesso libero", "Sessione admin chiusa. La mappa resta condivisa.");
}

async function loadPeopleFromSupabase() {
  if (!state.supabase) {
    return;
  }

  setLoading(true, "Sto caricando la mappa condivisa...");
  const { data, error } = await state.supabase
    .from(PEOPLE_TABLE)
    .select("*")
    .order("updated_at", { ascending: false });

  setLoading(false);

  if (error) {
    updateStatus("Locale", currentUserLabel(), `Connessione Supabase configurata ma lettura fallita: ${error.message}`);
    return;
  }

  state.people = (data || []).map(normalizeSupabaseRecord);
  state.useCloud = true;
  state.selectedId = state.people[0]?.id ?? null;
  const message = state.people.length
    ? "Le persone arrivano dal database condiviso."
    : t("cloudEmpty");
  updateStatus("Cloud pubblico", currentUserLabel(), message);
  render();
}

async function savePersonToSupabase(person, isExisting) {
  if (!state.supabase) {
    return { ok: false, message: "Supabase non configurato." };
  }

  const payload = toSupabaseRecord(person, state.user);
  const query = isExisting
    ? state.supabase.from(PEOPLE_TABLE).update(payload).eq("id", person.id)
    : state.supabase.from(PEOPLE_TABLE).insert(payload);
  const { error } = await query;
  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

async function deletePersonFromSupabase(personId) {
  if (!state.supabase) {
    return { ok: false, message: "Supabase non configurato." };
  }

  const { error } = await state.supabase.from(PEOPLE_TABLE).delete().eq("id", personId);
  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

async function hidePersonInSupabase(personId) {
  if (!state.supabase) {
    return { ok: false, message: "Supabase non configurato." };
  }

  const { error } = await state.supabase
    .from(PEOPLE_TABLE)
    .update({ is_visible: false, updated_at: new Date().toISOString() })
    .eq("id", personId);
  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

function loadLocalPeople() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(demoPeople);
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : structuredClone(demoPeople);
  } catch {
    return structuredClone(demoPeople);
  }
}

function saveLocalPeople() {
  if (state.useCloud) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.people));
}

function render() {
  const visiblePeople = getVisiblePeople();
  if (!visiblePeople.some((person) => person.id === state.selectedId)) {
    state.selectedId = visiblePeople[0]?.id ?? state.people[0]?.id ?? null;
  }

  const pointMap = renderMap(visiblePeople);
  renderConnections(visiblePeople, pointMap);
  renderDetail();
  renderGallery(visiblePeople);
  elements.mapSummary.textContent = t("visibleSummary", {
    visible: String(visiblePeople.length),
    total: String(state.people.length)
  });
  const selectedPerson = state.people.find((entry) => entry.id === state.selectedId);
  const canEditSelected = selectedPerson ? canEditPerson(selectedPerson) : false;
  elements.editPersonButton.disabled = !state.selectedId || !canEditSelected;
  elements.editPersonButton.title = !selectedPerson || canEditSelected
    ? ""
    : "Solo ADMIN puo modificare le schede pubblicate.";
  updateAuthUI();
  saveLocalPeople();
}

function getVisiblePeople() {
  return state.people.filter((person) => {
    if (person.is_visible === false) {
      return false;
    }
    const zone = getZone(person.closeness);
    const text = [
      person.name,
      person.role,
      person.bio,
      person.desire,
      person.offers,
      person.needs,
      person.talents,
      person.tags
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !state.filters.search || text.includes(state.filters.search);
    const matchesAvailability =
      state.filters.availability === "all" || person.availability === state.filters.availability;
    const matchesZone = state.filters.zone === "all" || zone === state.filters.zone;
    return matchesSearch && matchesAvailability && matchesZone;
  });
}

function renderMap(visiblePeople) {
  const sortedPeople = [...state.people].sort((a, b) => b.closeness - a.closeness);
  const visibleIds = new Set(visiblePeople.map((person) => person.id));
  const pointMap = buildMapLayout(sortedPeople);
  const totalCount = sortedPeople.length;
  const compactMode = totalCount >= 34;
  const ultraCompactMode = totalCount >= 52;
  const figureSize = totalCount >= 52 ? 48 : totalCount >= 36 ? 58 : 72;
  const nodeWidth = totalCount >= 52 ? 74 : totalCount >= 36 ? 88 : 108;
  elements.mapNodes.style.setProperty("--node-figure-size", `${figureSize}px`);
  elements.mapNodes.style.setProperty("--node-width", `${nodeWidth}px`);
  elements.mapNodes.style.setProperty("--node-label-size", compactMode ? "0.72rem" : "0.9rem");

  elements.mapNodes.innerHTML = sortedPeople
    .map((person, index) => {
      const point = pointMap.get(person.id);
      const zone = getZone(person.closeness);
      const hiddenClass = visibleIds.has(person.id) ? "" : "is-hidden";
      const selectedClass = state.selectedId === person.id ? "is-selected" : "";
      const delay = `${(index % 7) * 0.35}s`;
      const mapName = ultraCompactMode ? person.name.split(" ")[0] : person.name;

      return `
        <button
          type="button"
          class="map-node ${hiddenClass} ${selectedClass}"
          data-id="${person.id}"
          data-zone="${zone}"
          style="left:${point.x}%; top:${point.y}%; animation-delay:${delay};"
          aria-label="${escapeHtml(person.name)}, ${escapeHtml(person.role)}"
          title="${escapeHtml(person.name)}"
        >
          <div class="node-figure">${buildCollageSVG(person.collage)}</div>
          <span class="node-name">${escapeHtml(mapName)}</span>
          ${compactMode ? "" : `<span class="node-role">${escapeHtml(person.role || zoneLabel(zone))}</span>`}
        </button>
      `;
    })
    .join("");

  elements.mapNodes.querySelectorAll(".map-node").forEach((node) => {
    node.addEventListener("click", () => {
      state.selectedId = node.dataset.id;
      render();
    });
  });

  return pointMap;
}

function renderConnections(visiblePeople, pointMap) {
  const lines = [];
  for (let index = 0; index < visiblePeople.length; index += 1) {
    for (let inner = index + 1; inner < visiblePeople.length; inner += 1) {
      const first = visiblePeople[index];
      const second = visiblePeople[inner];
      const weight = connectionWeight(first, second);
      if (weight < 2) {
        continue;
      }

      const start = pointMap.get(first.id);
      const end = pointMap.get(second.id);
      const color = weight >= 3 ? "#b46a7e" : "#2d7f83";
      const controlX = (start.x + end.x) / 2 + ((stableHash(first.id + second.id) % 12) - 6);
      const controlY = (start.y + end.y) / 2 - 6;

      lines.push(`
        <path
          class="connection-line"
          d="M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}"
          stroke="${color}"
          stroke-width="${weight === 2 ? 0.6 : 1.1}"
          opacity="${weight === 2 ? 0.34 : 0.58}"
          pathLength="100"
          vector-effect="non-scaling-stroke"
        />
      `);
    }
  }

  elements.mapConnections.setAttribute("viewBox", "0 0 100 100");
  elements.mapConnections.innerHTML = lines.join("");
}

function connectionWeight(first, second) {
  let score = 0;
  const tagSet = new Set(splitKeywords(first.tags));
  const talentSet = new Set(splitKeywords(first.talents));

  splitKeywords(second.tags).forEach((value) => tagSet.has(value) && (score += 1));
  splitKeywords(second.talents).forEach((value) => talentSet.has(value) && (score += 1));

  if (first.availability === second.availability) {
    score += 1;
  }

  return score;
}

function availabilityLabel(value) {
  return t(`availability.${value}`);
}

function renderDetail() {
  const person = state.people.find((entry) => entry.id === state.selectedId);
  if (!person) {
    elements.detailCard.innerHTML = `
      <div class="empty-state">
        ${escapeHtml(t("noSelection"))}
      </div>
    `;
    return;
  }

  const zone = getZone(person.closeness);
  const owner = person.owner_email ? `<span class="pill">${escapeHtml(person.owner_email)}</span>` : "";
  const hidden = state.isAdmin && person.is_visible === false ? `<span class="pill">${escapeHtml(t("hide"))}</span>` : "";

  elements.detailCard.innerHTML = `
    <div class="detail-top">
      <div class="detail-avatar">${buildCollageSVG(person.collage)}</div>
      <div>
        <h3 class="detail-name">${escapeHtml(person.name)}</h3>
        <p class="detail-role">${escapeHtml(person.role || t("personFallback"))}</p>
      </div>
      <div class="pill-row">
        <span class="pill">${zoneLabel(zone)}</span>
        <span class="pill">${escapeHtml(t("availabilityPrefix"))} ${escapeHtml(availabilityLabel(person.availability))}</span>
        <span class="pill">${escapeHtml(t("centerPrefix"))}: ${person.closeness}/100</span>
        ${hidden}
        ${owner}
      </div>
    </div>
    ${buildDetailSection(t("selfPortrait"), person.bio)}
    ${buildDetailSection(t("desires"), person.desire)}
    ${buildDetailSection(t("offersTitle"), person.offers)}
    ${buildDetailSection(t("needsTitle"), person.needs)}
    ${buildDetailSection(t("talentsTitle"), person.talents)}
    ${buildDetailSection(t("tagsTitle"), person.tags)}
  `;
}

function renderGallery(visiblePeople) {
  if (!visiblePeople.length) {
    elements.galleryGrid.innerHTML = `
      <div class="empty-state">
        ${escapeHtml(t("noMatches"))}
      </div>
    `;
    return;
  }

  elements.galleryGrid.innerHTML = visiblePeople
    .map((person) => `
      <article class="gallery-card">
        <button type="button" data-gallery-id="${person.id}">
          <div class="collage-thumb">${buildCollageSVG(person.collage)}</div>
          <h3>${escapeHtml(person.name)}</h3>
          <p>${escapeHtml(person.role || t("personFallback"))}</p>
        </button>
      </article>
    `)
    .join("");

  elements.galleryGrid.querySelectorAll("[data-gallery-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.galleryId;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function buildDetailSection(title, value) {
  if (!value) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(value)}</p>
    </section>
  `;
}

function openEditorWithAccess(personId = null) {
  const action = personId ? t("actionEdit") : t("actionCreate");
  if (!requestAccessCode(action)) {
    return;
  }
  openEditor(personId);
}

function openEditor(personId = null) {
  state.editorId = personId;
  const person = state.people.find((entry) => entry.id === personId) || createEmptyPerson();
  if (personId && !canEditPerson(person)) {
    updateStatus(currentModeLabel(), currentUserLabel(), t("editNeedsCode"));
    return;
  }
  state.editorCollage = normalizeEditorCollage(person.collage);
  state.activeFragmentId = "library:head";
  state.editMode = "move";

  elements.dialogTitle.textContent = personId ? t("editPerson") : t("newPerson");
  elements.nameInput.value = person.name;
  elements.roleInput.value = person.role;
  elements.bioInput.value = person.bio;
  elements.desireInput.value = person.desire;
  elements.offersInput.value = person.offers;
  elements.needsInput.value = person.needs;
  elements.talentsInput.value = person.talents;
  elements.tagsInput.value = person.tags;
  elements.availabilityInput.value = person.availability;
  elements.closenessInput.value = person.closeness;
  elements.headInput.value = person.collage.head;
  elements.bodyInput.value = person.collage.body;
  elements.elementInput.value = person.collage.element;
  elements.companionInput.value = person.collage.companion;
  elements.customImageInput.value = "";
  elements.customImageInput.dataset.imageData = "";
  elements.hidePersonButton.hidden = !personId || person.is_visible === false;
  elements.deletePersonButton.hidden = !personId;
  updateClosenessLabel();
  renderCollagePreviewFromForm();
  elements.editorDialog.showModal();
}

function closeEditor() {
  elements.editorDialog.close();
  state.editorId = null;
  state.editorCollage = null;
  state.activeFragmentId = null;
  state.dragState = null;
  state.previewPointers.clear();
  state.editMode = "move";
  elements.personForm.reset();
}

async function handleSavePerson(event) {
  event.preventDefault();
  const previousPeople = state.people;
  const existingPerson = state.editorId
    ? state.people.find((entry) => entry.id === state.editorId)
    : null;

  const person = {
    id: state.editorId ?? crypto.randomUUID(),
    name: elements.nameInput.value.trim(),
    role: elements.roleInput.value.trim(),
    bio: elements.bioInput.value.trim(),
    desire: elements.desireInput.value.trim(),
    offers: elements.offersInput.value.trim(),
    needs: elements.needsInput.value.trim(),
    talents: elements.talentsInput.value.trim(),
    tags: elements.tagsInput.value.trim(),
    availability: elements.availabilityInput.value,
    closeness: Number(elements.closenessInput.value),
    collage: {
      head: elements.headInput.value,
      body: elements.bodyInput.value,
      element: elements.elementInput.value,
      companion: elements.companionInput.value,
      transforms: state.editorCollage?.transforms || defaultLibraryTransforms(),
      fragments: state.editorCollage?.fragments || [],
      customImage: null
    },
    owner_id: state.user?.id || "",
    owner_email: state.user?.email || "",
    is_visible: existingPerson?.is_visible !== false,
    updated_at: new Date().toISOString()
  };

  if (!person.name) {
    elements.nameInput.focus();
    return;
  }

  if (state.useCloud) {
    const isExisting = Boolean(state.editorId);
    updateStatus("Cloud pubblico", currentUserLabel(), "Sto salvando la persona nella mappa condivisa...");
    const result = await savePersonToSupabase(person, isExisting);
    if (!result.ok) {
      updateStatus(currentModeLabel(), currentUserLabel(), `Salvataggio cloud fallito: ${result.message}`);
      state.people = previousPeople;
      render();
      return;
    }
    updateStatus("Cloud pubblico", currentUserLabel(), "Persona salvata nella mappa condivisa.");
  } else {
    updateStatus("Locale", currentUserLabel(), "Persona salvata nel browser.");
  }

  if (state.editorId) {
    state.people = state.people.map((entry) => (entry.id === state.editorId ? person : entry));
  } else {
    state.people = [...state.people, person];
  }

  state.selectedId = person.id;
  closeEditor();
  render();
}

async function handleDeletePerson() {
  if (!state.editorId) {
    return;
  }
  if (!requestAccessCode(t("actionDelete"))) {
    return;
  }

  const person = state.people.find((entry) => entry.id === state.editorId);
  const confirmed = window.confirm(t("confirmDelete", { name: person?.name || t("thisPerson") }));
  if (!confirmed) {
    return;
  }

  if (state.useCloud) {
    const result = await deletePersonFromSupabase(state.editorId);
    if (!result.ok) {
      updateStatus(currentModeLabel(), currentUserLabel(), `Eliminazione cloud fallita: ${result.message}`);
      render();
      return;
    } else {
      updateStatus("Cloud pubblico", currentUserLabel(), "Persona cancellata dal database condiviso.");
    }
  } else {
    updateStatus("Locale", currentUserLabel(), "Persona rimossa dal browser.");
  }

  state.people = state.people.filter((entry) => entry.id !== state.editorId);
  state.selectedId = state.people[0]?.id ?? null;
  closeEditor();
  render();
}

async function handleHidePerson() {
  if (!state.editorId) {
    return;
  }
  if (!requestAccessCode(t("actionHide"))) {
    return;
  }

  const person = state.people.find((entry) => entry.id === state.editorId);
  const confirmed = window.confirm(t("confirmHide", { name: person?.name || t("thisPerson") }));
  if (!confirmed) {
    return;
  }

  if (state.useCloud) {
    const result = await hidePersonInSupabase(state.editorId);
    if (!result.ok) {
      updateStatus(currentModeLabel(), currentUserLabel(), `Nascondimento fallito: ${result.message}`);
      render();
      return;
    }
    state.people = state.people.map((entry) => (
      entry.id === state.editorId ? { ...entry, is_visible: false, updated_at: new Date().toISOString() } : entry
    ));
    updateStatus("Cloud pubblico", currentUserLabel(), "Persona nascosta dalla mappa pubblica.");
  }

  closeEditor();
  render();
}

function exportPeople() {
  const payload = {
    exportedAt: new Date().toISOString(),
    project: "Atlante Meticcio",
    storageMode: currentModeLabel(),
    people: state.people
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "atlante-meticcio.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function handleImportButtonClick() {
  if (!requestAccessCode(t("actionImport"))) {
    return;
  }
  elements.importFileInput.value = "";
  elements.importFileInput.click();
}

async function handleImportFileSelected(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const importedPeople = parseImportedPeople(await file.text());
    if (!importedPeople.length) {
      updateStatus(currentModeLabel(), currentUserLabel(), t("importEmpty"));
      return;
    }

    const confirmed = window.confirm(
      t("confirmImport", { count: String(importedPeople.length) })
    );
    if (!confirmed) {
      return;
    }

    if (state.useCloud) {
      updateStatus("Cloud pubblico", currentUserLabel(), "Sto ripristinando la mappa dal JSON...");
      const result = await replaceSupabasePeople(importedPeople);
      if (!result.ok) {
        updateStatus(currentModeLabel(), currentUserLabel(), `Import JSON fallito: ${result.message}`);
        return;
      }
    }

    state.people = importedPeople;
    state.selectedId = state.people[0]?.id ?? null;
    updateStatus(currentModeLabel(), currentUserLabel(), t("importOk"));
    render();
  } catch (error) {
    updateStatus(currentModeLabel(), currentUserLabel(), t("invalidJson", { message: error.message }));
  }
}

function parseImportedPeople(rawJson) {
  const parsed = JSON.parse(rawJson);
  const people = Array.isArray(parsed) ? parsed : parsed.people;
  if (!Array.isArray(people)) {
    throw new Error("manca l'elenco people.");
  }

  return people
    .map((person) => ({
      id: person.id || crypto.randomUUID(),
      name: String(person.name || "").trim(),
      role: String(person.role || ""),
      bio: String(person.bio || ""),
      desire: String(person.desire || ""),
      offers: String(person.offers || ""),
      needs: String(person.needs || ""),
      talents: String(person.talents || ""),
      tags: String(person.tags || ""),
      availability: ["Alta", "Media", "Bassa", "A chiamata"].includes(person.availability)
        ? person.availability
        : "Media",
      closeness: clamp(Number(person.closeness ?? 50), 0, 100),
      collage: normalizeEditorCollage(person.collage || createEmptyPerson().collage),
      owner_id: person.owner_id || "",
      owner_email: person.owner_email || "",
      is_visible: person.is_visible !== false,
      updated_at: person.updated_at || new Date().toISOString()
    }))
    .filter((person) => person.name);
}

async function replaceSupabasePeople(people) {
  if (!state.supabase) {
    return { ok: false, message: "Supabase non configurato." };
  }

  const currentIds = state.people.map((person) => person.id);
  if (currentIds.length) {
    const { error: deleteError } = await state.supabase
      .from(PEOPLE_TABLE)
      .delete()
      .in("id", currentIds);
    if (deleteError) {
      return { ok: false, message: deleteError.message };
    }
  }

  const records = people.map((person) => toSupabaseRecord(person, state.user));
  const { error: insertError } = await state.supabase.from(PEOPLE_TABLE).insert(records);
  if (insertError) {
    return { ok: false, message: insertError.message };
  }
  return { ok: true };
}

function resetToDemo() {
  const confirmed = window.confirm(t("resetConfirm"));
  if (!confirmed) {
    return;
  }

  state.people = structuredClone(demoPeople);
  state.selectedId = state.people[0]?.id ?? null;
  state.useCloud = false;
  updateStatus("Locale", currentUserLabel(), "Sono stati ripristinati i dati demo locali.");
  render();
}

function populateCollageSelects() {
  populateSelect(elements.headInput, collageCatalog.head);
  populateSelect(elements.bodyInput, collageCatalog.body);
  populateSelect(elements.elementInput, collageCatalog.element);
  populateSelect(elements.companionInput, collageCatalog.companion);
}

function populateSelect(select, options) {
  const currentValue = select.value;
  select.innerHTML = options.map((option) => {
    const translatedLabel = t(`catalog.${option.id}`);
    const label = translatedLabel === `catalog.${option.id}` ? option.label : translatedLabel;
    return `<option value="${option.id}">${escapeHtml(label)}</option>`;
  }).join("");
  if (currentValue) {
    select.value = currentValue;
  }
}

function renderCollagePreviewFromForm() {
  const collage = {
    head: elements.headInput.value,
    body: elements.bodyInput.value,
    element: elements.elementInput.value,
    companion: elements.companionInput.value,
    transforms: state.editorCollage?.transforms || defaultLibraryTransforms(),
    fragments: state.editorCollage?.fragments || []
  };
  elements.collagePreview.innerHTML = `<div class="collage-stage">${buildCollageSVG(collage, {
    withBackdrop: true,
    interactive: true,
    selectedLayerId: state.activeFragmentId,
    editMode: state.editMode
  })}${renderFloatingToolbar()}</div>`;
  bindFloatingToolbar();
}

function updateClosenessLabel() {
  elements.closenessValue.textContent = `${elements.closenessInput.value} / 100`;
}

function updateCustomImageControls() {
  elements.customImageScaleValue.textContent = `${elements.customImageScaleInput.value}%`;
  elements.customImageRotationValue.textContent = `${elements.customImageRotationInput.value}°`;
}

async function handleCustomImageSelected(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) {
    return;
  }

  const file = files[0];
  const src = await readFileAsDataUrl(file);
  state.pendingFragment = {
    id: crypto.randomUUID(),
    name: file.name || "Frammento",
    src
  };
  elements.customImageInput.value = "";
  openFragmentCropDialog();
}

function openFragmentCropDialog() {
  if (!state.pendingFragment) {
    return;
  }
  elements.fragmentMaskInput.value = "rect";
  elements.fragmentCropXInput.value = "0";
  elements.fragmentCropYInput.value = "0";
  elements.fragmentCropZoomInput.value = "100";
  updateFragmentCropPreview();
  elements.fragmentCropDialog.showModal();
}

function openFragmentCropDialogForExisting(fragment) {
  if (!fragment) {
    return;
  }
  state.editingFragmentId = fragment.id;
  state.pendingFragment = {
    id: fragment.id,
    name: fragment.name || "Frammento",
    src: fragment.src
  };
  const isSquare = fragment.mask === "rect" && Math.abs(fragment.width - fragment.height) <= 2;
  elements.fragmentMaskInput.value = isSquare ? "square" : fragment.mask || "rect";
  elements.fragmentCropXInput.value = String(Math.round(fragment.cropX || 0));
  elements.fragmentCropYInput.value = String(Math.round(fragment.cropY || 0));
  elements.fragmentCropZoomInput.value = String(Math.round((fragment.cropScale || 1) * 100));
  updateFragmentCropPreview();
  elements.fragmentCropDialog.showModal();
}

function closeFragmentCropDialog() {
  elements.fragmentCropDialog.close();
  state.pendingFragment = null;
  state.editingFragmentId = null;
}

function updateFragmentCropPreview() {
  if (!state.pendingFragment) {
    return;
  }
  const cropX = Number(elements.fragmentCropXInput.value);
  const cropY = Number(elements.fragmentCropYInput.value);
  const zoom = Number(elements.fragmentCropZoomInput.value);
  const mask = elements.fragmentMaskInput.value;
  elements.fragmentCropPreview.className = `fragment-crop-preview crop-mask-${mask}`;
  elements.fragmentCropPreview.style.backgroundImage = `url("${state.pendingFragment.src}")`;
  elements.fragmentCropPreview.style.backgroundSize = `${zoom}% ${zoom}%`;
  elements.fragmentCropPreview.style.backgroundPosition = `${50 + cropX}% ${50 + cropY}%`;
}

function handleFragmentCropPointerDown(event) {
  if (!state.pendingFragment) {
    return;
  }
  event.preventDefault();
  elements.fragmentCropPreview.setPointerCapture?.(event.pointerId);
  state.cropDragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    baseCropX: Number(elements.fragmentCropXInput.value),
    baseCropY: Number(elements.fragmentCropYInput.value),
    scaleX: 160 / Math.max(1, elements.fragmentCropPreview.clientWidth),
    scaleY: 160 / Math.max(1, elements.fragmentCropPreview.clientHeight)
  };
  window.addEventListener("pointermove", handleFragmentCropPointerMove);
  window.addEventListener("pointerup", handleFragmentCropPointerUp);
}

function handleFragmentCropPointerMove(event) {
  if (!state.cropDragState) {
    return;
  }
  const nextX = clamp(
    state.cropDragState.baseCropX - (event.clientX - state.cropDragState.startX) * state.cropDragState.scaleX,
    -80,
    80
  );
  const nextY = clamp(
    state.cropDragState.baseCropY - (event.clientY - state.cropDragState.startY) * state.cropDragState.scaleY,
    -80,
    80
  );
  elements.fragmentCropXInput.value = String(Math.round(nextX));
  elements.fragmentCropYInput.value = String(Math.round(nextY));
  updateFragmentCropPreview();
}

function handleFragmentCropPointerUp(event) {
  if (state.cropDragState?.pointerId !== undefined) {
    elements.fragmentCropPreview.releasePointerCapture?.(state.cropDragState.pointerId);
  }
  state.cropDragState = null;
  window.removeEventListener("pointermove", handleFragmentCropPointerMove);
  window.removeEventListener("pointerup", handleFragmentCropPointerUp);
}

function confirmFragmentCrop(event) {
  event.preventDefault();
  if (!state.pendingFragment || !state.editorCollage) {
    return;
  }

  const maskValue = elements.fragmentMaskInput.value;
  const isSquare = maskValue === "square";
  const fragment = {
    id: state.pendingFragment.id,
    name: state.pendingFragment.name,
    src: state.pendingFragment.src,
    x: 122,
    y: 150,
    width: isSquare ? 92 : 108,
    height: isSquare ? 92 : maskValue === "rect" ? 78 : 108,
    rotation: 0,
    opacity: 0.92,
    cropX: Number(elements.fragmentCropXInput.value),
    cropY: Number(elements.fragmentCropYInput.value),
    cropScale: Number(elements.fragmentCropZoomInput.value) / 100,
    mask: isSquare ? "rect" : maskValue,
    zIndex: Math.max(50, getMaxFragmentZIndex() + 10)
  };

  if (state.editingFragmentId) {
    state.editorCollage.fragments = state.editorCollage.fragments.map((entry) => (
      entry.id === state.editingFragmentId
        ? {
            ...entry,
            width: fragment.width,
            height: fragment.height,
            cropX: fragment.cropX,
            cropY: fragment.cropY,
            cropScale: fragment.cropScale,
            mask: fragment.mask
          }
        : entry
    ));
    state.activeFragmentId = `fragment:${state.editingFragmentId}`;
  } else {
    state.editorCollage.fragments.push(fragment);
    state.activeFragmentId = `fragment:${fragment.id}`;
  }
  elements.fragmentCropDialog.close();
  state.pendingFragment = null;
  state.editingFragmentId = null;
  renderCollagePreviewFromForm();
}

function removeCustomImage() {
  if (!state.activeFragmentId || !state.editorCollage) {
    return;
  }
  if (getActiveLibraryKey()) {
    updateActiveLibraryTransform({ x: 0, y: 0, scale: 1, rotation: 0, visible: false });
    return;
  }
  const fragmentId = String(state.activeFragmentId).replace("fragment:", "");
  state.editorCollage.fragments = state.editorCollage.fragments.filter((fragment) => fragment.id !== fragmentId);
  state.activeFragmentId = "library:head";
  renderCollagePreviewFromForm();
}

async function createFragmentFromFile(file) {
  const src = await readFileAsDataUrl(file);
  return {
    id: crypto.randomUUID(),
    name: file.name || "Frammento",
    src,
    x: 122,
    y: 150,
    width: 88,
    height: 88,
    rotation: 0,
    opacity: 0.92,
    cropX: 0,
    cropY: 0,
    cropScale: 1,
    mask: "torn",
        zIndex: Math.max(50, getMaxFragmentZIndex() + 10)
  };
}

function buildEditorFragmentsHtml(fragments) {
  return fragments
    .slice()
    .sort((left, right) => (left.zIndex || 1) - (right.zIndex || 1))
    .map((fragment) => {
      const left = (fragment.x / 240) * 100;
      const top = (fragment.y / 240) * 100;
      const width = (fragment.width / 240) * 100;
      const height = (fragment.height / 240) * 100;
      const bgSize = `${fragment.cropScale * 100}% ${fragment.cropScale * 100}%`;
      const bgPosition = `${50 + fragment.cropX}% ${50 + fragment.cropY}%`;
      const selectedClass = fragment.id === state.activeFragmentId ? "is-selected" : "";
      return `
        <button
          type="button"
          class="collage-fragment fragment-mask-${fragment.mask} ${selectedClass}"
          data-fragment-id="${fragment.id}"
          style="left:${left}%; top:${top}%; width:${width}%; height:${height}%; transform:translate(-50%, -50%) rotate(${fragment.rotation}deg); opacity:${fragment.opacity}; z-index:${fragment.zIndex || 1};"
        >
          <span class="collage-fragment-shell">
            <span class="collage-fragment-image" style="background-image:url('${escapeHtml(fragment.src)}'); background-size:${bgSize}; background-position:${bgPosition};"></span>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderFloatingToolbar() {
  const bounds = getSelectedLayerBounds();
  if (!bounds) {
    return "";
  }
  const left = `${((18 + bounds.cx * 0.86) / 280) * 100}%`;
  const top = `${((18 + bounds.y * 0.86) / 280) * 100}%`;
  const libraryKey = getActiveLibraryKey();
  const colorControl = libraryKey && isBasicShapeLayer(libraryKey)
    ? `<input type="color" class="toolbar-color-input" data-toolbar-color value="${escapeHtml(sanitizeColor(getLibraryTransform(libraryKey).color))}" title="${escapeHtml(t("chooseColor"))}" aria-label="${escapeHtml(t("chooseColor"))}">`
    : "";
  return `
    <div class="floating-toolbar" style="left:${left}; top:${top};">
      <button type="button" data-toolbar-action="rotate-left" title="${escapeHtml(t("rotateLeft"))}" aria-label="${escapeHtml(t("rotateLeft"))}">${iconRotateLeft()}</button>
      <button type="button" data-toolbar-action="rotate-right" title="${escapeHtml(t("rotateRight"))}" aria-label="${escapeHtml(t("rotateRight"))}">${iconRotateRight()}</button>
      <button type="button" data-toolbar-action="smaller" title="${escapeHtml(t("smaller"))}" aria-label="${escapeHtml(t("smaller"))}">${iconMinus()}</button>
      <button type="button" data-toolbar-action="larger" title="${escapeHtml(t("larger"))}" aria-label="${escapeHtml(t("larger"))}">${iconPlus()}</button>
      ${colorControl}
      <button type="button" data-toolbar-action="backward" title="${escapeHtml(t("backward"))}" aria-label="${escapeHtml(t("backward"))}">${iconBackward()}</button>
      <button type="button" data-toolbar-action="forward" title="${escapeHtml(t("forward"))}" aria-label="${escapeHtml(t("forward"))}">${iconForward()}</button>
      <button type="button" data-toolbar-action="remove" title="${escapeHtml(t("delete"))}" aria-label="${escapeHtml(t("delete"))}">${iconTrash()}</button>
    </div>
  `;
}

function bindFloatingToolbar() {
  const colorInput = elements.collagePreview.querySelector("[data-toolbar-color]");
  if (colorInput) {
    colorInput.addEventListener("pointerdown", (event) => event.stopPropagation());
    colorInput.addEventListener("click", (event) => event.stopPropagation());
    colorInput.addEventListener("input", (event) => {
      const key = getActiveLibraryKey();
      if (key && isBasicShapeLayer(key)) {
        updateActiveLibraryTransform({ color: event.target.value });
      }
    });
  }
  elements.collagePreview.querySelectorAll("[data-toolbar-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = button.dataset.toolbarAction;
      if (action === "remove") removeCustomImage();
      if (action === "rotate-left") transformActiveLayer({ rotationDelta: -12 });
      if (action === "rotate-right") transformActiveLayer({ rotationDelta: 12 });
      if (action === "smaller") transformActiveLayer({ scaleFactor: 0.9 });
      if (action === "larger") transformActiveLayer({ scaleFactor: 1.1 });
      if (action === "backward") moveActiveLayer(-1);
      if (action === "forward") moveActiveLayer(1);
    });
  });
}

function transformActiveLayer({ rotationDelta = 0, scaleFactor = 1 }) {
  const fragment = getActiveFragment();
  if (fragment) {
    fragment.rotation = clamp(fragment.rotation + rotationDelta, -360, 360);
    fragment.width = clamp(fragment.width * scaleFactor, 24, 210);
    fragment.height = clamp(fragment.height * scaleFactor, 24, 210);
    renderCollagePreviewFromForm();
    return;
  }

  const key = getActiveLibraryKey();
  if (!key) {
    return;
  }
  const transform = getLibraryTransform(key);
  updateActiveLibraryTransform({
    rotation: clamp((transform.rotation || 0) + rotationDelta, -360, 360),
    scale: clamp((transform.scale || 1) * scaleFactor, 0.3, 2.2)
  });
}

function moveActiveLayer(direction) {
  if (!state.editorCollage || !state.activeFragmentId) {
    return;
  }

  const layers = getLayerOrderEntries();
  const currentIndex = layers.findIndex((layer) => layer.id === state.activeFragmentId);
  const targetIndex = currentIndex + direction;
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= layers.length) {
    return;
  }

  const current = layers[currentIndex];
  const target = layers[targetIndex];
  setLayerZIndex(current.id, target.zIndex);
  setLayerZIndex(target.id, current.zIndex);
  renderCollagePreviewFromForm();
}

function getLayerOrderEntries() {
  const transforms = state.editorCollage?.transforms || defaultLibraryTransforms();
  const libraryLayers = ["element", "body", "companion", "head"].map((key) => ({
    id: `library:${key}`,
    zIndex: Number(transforms[key]?.zIndex ?? defaultLibraryTransforms()[key].zIndex)
  }));
  const fragmentLayers = (state.editorCollage?.fragments || []).map((fragment) => ({
    id: `fragment:${fragment.id}`,
    zIndex: Number(fragment.zIndex || 50)
  }));
  return [...libraryLayers, ...fragmentLayers].sort((left, right) => left.zIndex - right.zIndex);
}

function setLayerZIndex(layerId, zIndex) {
  if (layerId.startsWith("library:")) {
    const key = layerId.replace("library:", "");
    state.editorCollage.transforms[key] = {
      ...getLibraryTransform(key),
      zIndex
    };
    return;
  }
  const fragmentId = layerId.replace("fragment:", "");
  const fragment = state.editorCollage.fragments.find((entry) => entry.id === fragmentId);
  if (fragment) {
    fragment.zIndex = zIndex;
  }
}

function getSelectedLayerBounds() {
  const fragment = getActiveFragment();
  if (fragment) {
    return {
      x: fragment.x - fragment.width / 2,
      y: fragment.y - fragment.height / 2 - 10,
      cx: fragment.x
    };
  }
  const key = getActiveLibraryKey();
  if (!key) {
    return null;
  }
  const transform = getLibraryTransform(key);
  const boxes = {
    element: { x: 24, y: 22, width: 196, height: 188 },
    body: { x: 52, y: 94, width: 140, height: 124 },
    head: { x: 74, y: 30, width: 118, height: 118 },
    companion: { x: 138, y: 42, width: 88, height: 150 }
  };
  const box = boxes[key];
  return {
    x: box.x + transform.x,
    y: box.y + transform.y - 10,
    cx: box.x + transform.x + box.width / 2
  };
}

function createEmptyPerson() {
  return {
    name: "",
    role: "",
    bio: "",
    desire: "",
    offers: "",
    needs: "",
    talents: "",
    tags: "",
    availability: "Media",
    closeness: 50,
    collage: {
      head: collageCatalog.head[0].id,
      body: collageCatalog.body[0].id,
      element: collageCatalog.element[0].id,
      companion: collageCatalog.companion[0].id,
      transforms: defaultLibraryTransforms(),
      fragments: [],
      customImage: null
    }
  };
}

function defaultLibraryTransforms() {
  return {
    element: { x: 0, y: 0, scale: 1, rotation: 0, visible: true, zIndex: 10, color: DEFAULT_SHAPE_COLOR },
    body: { x: 0, y: 0, scale: 1, rotation: 0, visible: true, zIndex: 20, color: DEFAULT_SHAPE_COLOR },
    companion: { x: 0, y: 0, scale: 1, rotation: 0, visible: true, zIndex: 30, color: DEFAULT_SHAPE_COLOR },
    head: { x: 0, y: 0, scale: 1, rotation: 0, visible: true, zIndex: 40, color: DEFAULT_SHAPE_COLOR }
  };
}

function mapLegacyAuraToElement(auraId) {
  return {
    mist: "air",
    flare: "fire",
    chorus: "paper",
    tide: "water"
  }[auraId] || "";
}

function normalizeEditorCollage(collage) {
  const base = createEmptyPerson().collage;
  const fragments = Array.isArray(collage?.fragments) ? collage.fragments : [];
  const legacy = collage?.customImage?.src
    ? [{
        id: crypto.randomUUID(),
        name: "Frammento legacy",
        src: collage.customImage.src,
        x: collage.customImage.placement === "head" ? 126 : collage.customImage.placement === "companion" ? 184 : 122,
        y: collage.customImage.placement === "head" ? 88 : collage.customImage.placement === "companion" ? 108 : 156,
        width: collage.customImage.placement === "companion" ? 56 : 84,
        height: collage.customImage.placement === "companion" ? 92 : 84,
        rotation: Number(collage.customImage.rotation || 0),
        opacity: 0.92,
        cropX: 0,
        cropY: 0,
        cropScale: Number(collage.customImage.scale || 100) / 100,
        mask: collage.customImage.placement === "head" ? "oval" : "torn",
        zIndex: 1
      }]
    : [];

  return {
    ...base,
    ...collage,
    element: collage?.element || mapLegacyAuraToElement(collage?.aura) || base.element,
    transforms: {
      element: { ...base.transforms.element, ...(collage?.transforms?.element || {}) },
      body: { ...base.transforms.body, ...(collage?.transforms?.body || {}) },
      companion: { ...base.transforms.companion, ...(collage?.transforms?.companion || {}) },
      head: { ...base.transforms.head, ...(collage?.transforms?.head || {}) }
    },
    fragments: [...fragments, ...legacy]
      .map((fragment, index) => ({
        id: fragment.id || crypto.randomUUID(),
        name: fragment.name || `Frammento ${index + 1}`,
        src: sanitizeImageSrc(fragment.src),
        x: clamp(Number(fragment.x ?? 122), 0, 240),
        y: clamp(Number(fragment.y ?? 150), 0, 240),
        width: clamp(Number(fragment.width ?? 88), 24, 210),
        height: clamp(Number(fragment.height ?? 88), 24, 210),
        rotation: clamp(Number(fragment.rotation ?? 0), -360, 360),
        opacity: clamp(Number(fragment.opacity ?? 0.92), 0.05, 1),
        cropX: clamp(Number(fragment.cropX ?? 0), -80, 80),
        cropY: clamp(Number(fragment.cropY ?? 0), -80, 80),
        cropScale: clamp(Number(fragment.cropScale ?? 1), 0.6, 4),
        mask: ["torn", "oval", "rect", "diamond"].includes(fragment.mask) ? fragment.mask : "torn",
        zIndex: clamp(Number(fragment.zIndex ?? index + 1), 1, 999)
      }))
      .filter((fragment) => fragment.src)
  };
}

function getActiveFragment() {
  if (String(state.activeFragmentId || "").startsWith("fragment:")) {
    const fragmentId = String(state.activeFragmentId).replace("fragment:", "");
    return state.editorCollage?.fragments.find((fragment) => fragment.id === fragmentId) || null;
  }
  return null;
}

function getActiveLibraryKey() {
  if (String(state.activeFragmentId || "").startsWith("library:")) {
    return String(state.activeFragmentId).replace("library:", "");
  }
  return null;
}

function getLibraryVariant(key) {
  return {
    head: elements.headInput.value,
    body: elements.bodyInput.value,
    element: elements.elementInput.value,
    companion: elements.companionInput.value
  }[key] || "";
}

function isBasicShapeLayer(key) {
  return BASIC_SHAPE_IDS.has(getLibraryVariant(key));
}

function openShapeColorPicker(key) {
  const input = document.createElement("input");
  input.type = "color";
  input.value = sanitizeColor(getLibraryTransform(key).color);
  input.style.position = "fixed";
  input.style.left = "-9999px";
  input.setAttribute("aria-label", "Scegli colore");
  document.body.append(input);
  input.addEventListener("input", () => {
    state.activeFragmentId = `library:${key}`;
    updateActiveLibraryTransform({ color: input.value });
  });
  input.addEventListener("change", () => input.remove(), { once: true });
  input.click();
}

function getLibraryTransform(key) {
  return state.editorCollage?.transforms?.[key] || defaultLibraryTransforms()[key];
}

function updateActiveFragment(patch) {
  const fragment = getActiveFragment();
  if (!fragment) {
    return;
  }
  Object.assign(fragment, patch);
  renderCollagePreviewFromForm();
}

function updateActiveLibraryTransform(patch) {
  const key = getActiveLibraryKey();
  if (!key || !state.editorCollage) {
    return;
  }
  state.editorCollage.transforms[key] = {
    ...getLibraryTransform(key),
    ...patch
  };
  renderCollagePreviewFromForm();
}

function duplicateActiveFragment() {
  const fragment = getActiveFragment();
  if (!fragment || !state.editorCollage) {
    return;
  }
  const clone = {
    ...fragment,
    id: crypto.randomUUID(),
    name: `${fragment.name || "Frammento"} copia`,
    x: clamp(fragment.x + 12, 20, 220),
    y: clamp(fragment.y + 12, 20, 220),
    zIndex: Math.max(50, getMaxFragmentZIndex() + 10)
  };
  state.editorCollage.fragments.push(clone);
  state.activeFragmentId = `fragment:${clone.id}`;
  renderCollagePreviewFromForm();
}

function moveActiveFragment(direction) {
  const fragment = getActiveFragment();
  if (!fragment) {
    return;
  }
  fragment.zIndex = clamp((fragment.zIndex || 50) + direction * 10, 1, 99);
  renderCollagePreviewFromForm();
}

function normalizeFragmentZOrder() {
  if (!state.editorCollage) {
    return;
  }
  state.editorCollage.fragments
    .sort((left, right) => (left.zIndex || 1) - (right.zIndex || 1))
    .forEach((fragment, index) => {
      fragment.zIndex = Number(fragment.zIndex || (50 + index * 10));
    });
}

function getMaxFragmentZIndex() {
  return Math.max(0, ...(state.editorCollage?.fragments.map((fragment) => fragment.zIndex || 1) || [0]));
}

function normalizeAngleDelta(angle) {
  let normalized = angle;
  while (normalized > 180) normalized -= 360;
  while (normalized < -180) normalized += 360;
  return normalized;
}

function dampRotationDelta(angle) {
  const deadZone = 2.5;
  const magnitude = Math.abs(angle);
  if (magnitude <= deadZone) {
    return 0;
  }
  return Math.sign(angle) * (magnitude - deadZone) * 0.72;
}

function dampScaleRatio(ratio) {
  const delta = ratio - 1;
  const deadZone = 0.035;
  const magnitude = Math.abs(delta);
  if (magnitude <= deadZone) {
    return 1;
  }
  return 1 + Math.sign(delta) * (magnitude - deadZone) * 0.68;
}

function getStagePoint(event, stage) {
  const rect = stage.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * (280 / rect.width) - 18) / 0.86,
    y: ((event.clientY - rect.top) * (280 / rect.height) - 18) / 0.86,
    scaleX: 280 / rect.width / 0.86,
    scaleY: 280 / rect.height / 0.86
  };
}

function getPointerStagePoint(pointer) {
  const stage = elements.collagePreview.querySelector(".collage-svg");
  return stage ? getStagePoint(pointer, stage) : null;
}

function getGestureSnapshot(pointers) {
  const first = getPointerStagePoint(pointers[0]);
  const second = getPointerStagePoint(pointers[1]);
  if (!first || !second) {
    return null;
  }
  return {
    midX: (first.x + second.x) / 2,
    midY: (first.y + second.y) / 2,
    distance: Math.max(12, Math.hypot(second.x - first.x, second.y - first.y)),
    angle: Math.atan2(second.y - first.y, second.x - first.x) * (180 / Math.PI)
  };
}

function startPreviewGesture(layerId) {
  const pointers = Array.from(state.previewPointers.values()).slice(-2);
  const snapshot = getGestureSnapshot(pointers);
  if (!snapshot) {
    return;
  }
  const fragment = getActiveFragment();
  const libraryKey = getActiveLibraryKey();
  const transform = libraryKey ? getLibraryTransform(libraryKey) : null;
  state.dragState = {
    layerId,
    mode: "gesture",
    startMidX: snapshot.midX,
    startMidY: snapshot.midY,
    startDistance: snapshot.distance,
    startAngle: snapshot.angle,
    baseRotation: fragment ? fragment.rotation : transform?.rotation ?? 0,
    baseWidth: fragment ? fragment.width : 100,
    baseHeight: fragment ? fragment.height : 100,
    baseScale: transform?.scale ?? 1,
    baseX: fragment ? fragment.x : (transform?.x ?? 0) + 122,
    baseY: fragment ? fragment.y : (transform?.y ?? 0) + 122
  };
}

function handlePreviewDoubleClick(event) {
  const targetLayer = event.target.closest("[data-layer-id]");
  if (!targetLayer?.dataset.layerId?.startsWith("library:")) {
    return;
  }
  const key = targetLayer.dataset.layerId.replace("library:", "");
  if (!isBasicShapeLayer(key)) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  state.activeFragmentId = targetLayer.dataset.layerId;
  renderCollagePreviewFromForm();
  openShapeColorPicker(key);
}

function handlePreviewPointerDown(event) {
  const doubleClickLayer = event.target.closest("[data-layer-id]");
  if (event.detail >= 2 && doubleClickLayer?.dataset.layerId?.startsWith("library:")) {
    const key = doubleClickLayer.dataset.layerId.replace("library:", "");
    if (isBasicShapeLayer(key)) {
      event.preventDefault();
      state.activeFragmentId = doubleClickLayer.dataset.layerId;
      renderCollagePreviewFromForm();
      openShapeColorPicker(key);
      return;
    }
  }
  if (event.detail >= 2 && doubleClickLayer?.dataset.layerId?.startsWith("fragment:")) {
    event.preventDefault();
    const fragmentId = doubleClickLayer.dataset.layerId.replace("fragment:", "");
    const fragment = state.editorCollage?.fragments.find((entry) => entry.id === fragmentId);
    state.activeFragmentId = doubleClickLayer.dataset.layerId;
    renderCollagePreviewFromForm();
    openFragmentCropDialogForExisting(fragment);
    return;
  }

  const handle = event.target.closest("[data-handle-action]");
  if (handle && state.editorCollage) {
    event.preventDefault();
    state.activeFragmentId = handle.dataset.layerId;
    const stage = elements.collagePreview.querySelector(".collage-svg");
    if (!stage) {
      return;
    }
    const fragment = getActiveFragment();
    const libraryKey = getActiveLibraryKey();
    const transform = libraryKey ? getLibraryTransform(libraryKey) : null;
    const centerX = fragment ? fragment.x : 122 + transform.x;
    const centerY = fragment ? fragment.y : 122 + transform.y;
    const startPoint = getStagePoint(event, stage);
    const startDistance = Math.max(
      12,
      Math.hypot(startPoint.x - centerX, startPoint.y - centerY)
    );
    const startAngle = Math.atan2(startPoint.y - centerY, startPoint.x - centerX) * (180 / Math.PI);
    state.dragState = {
      layerId: state.activeFragmentId,
      mode: handle.dataset.handleAction,
      startX: event.clientX,
      startY: event.clientY,
      scaleX: startPoint.scaleX,
      scaleY: startPoint.scaleY,
      baseRotation: fragment ? fragment.rotation : transform.rotation,
      baseWidth: fragment ? fragment.width : 100,
      baseHeight: fragment ? fragment.height : 100,
      centerX,
      centerY,
      baseScale: transform?.scale ?? 1,
      startDistance,
      startAngle
    };
    window.addEventListener("pointermove", handlePreviewPointerMove);
    window.addEventListener("pointerup", handlePreviewPointerUp);
    renderCollagePreviewFromForm();
    return;
  }

  let targetLayer = event.target.closest("[data-layer-id]");
  if (!targetLayer && state.previewPointers.size > 0 && state.activeFragmentId) {
    targetLayer = { dataset: { layerId: state.activeFragmentId } };
  }
  if (!targetLayer || !state.editorCollage) {
    return;
  }
  event.preventDefault();
  state.previewPointers.set(event.pointerId, {
    pointerId: event.pointerId,
    clientX: event.clientX,
    clientY: event.clientY
  });
  state.activeFragmentId = targetLayer.dataset.layerId;
  if (state.previewPointers.size >= 2) {
    startPreviewGesture(state.activeFragmentId);
    window.addEventListener("pointermove", handlePreviewPointerMove);
    window.addEventListener("pointerup", handlePreviewPointerUp);
    window.addEventListener("pointercancel", handlePreviewPointerUp);
    renderCollagePreviewFromForm();
    return;
  }
  const stage = elements.collagePreview.querySelector(".collage-svg");
  if (!stage) {
    return;
  }
  const startPoint = getStagePoint(event, stage);
  const fragment = getActiveFragment();
  const libraryKey = getActiveLibraryKey();
  const baseX = fragment ? fragment.x : getLibraryTransform(libraryKey).x + 122;
  const baseY = fragment ? fragment.y : getLibraryTransform(libraryKey).y + 122;
  state.dragState = {
    layerId: state.activeFragmentId,
    mode: state.editMode === "crop" && fragment ? "crop" : "move",
    startX: event.clientX,
    startY: event.clientY,
    baseX,
    baseY,
    baseCropX: fragment?.cropX ?? 0,
    baseCropY: fragment?.cropY ?? 0,
    scaleX: startPoint.scaleX,
    scaleY: startPoint.scaleY
  };
  window.addEventListener("pointermove", handlePreviewPointerMove);
  window.addEventListener("pointerup", handlePreviewPointerUp);
  window.addEventListener("pointercancel", handlePreviewPointerUp);
  renderCollagePreviewFromForm();
}

function handlePreviewPointerMove(event) {
  if (!state.dragState) {
    return;
  }
  event.preventDefault();
  if (state.previewPointers.has(event.pointerId)) {
    state.previewPointers.set(event.pointerId, {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY
    });
  }
  const fragment = getActiveFragment();
  if (state.dragState.mode === "gesture") {
    const snapshot = getGestureSnapshot(Array.from(state.previewPointers.values()).slice(-2));
    if (!snapshot) {
      return;
    }
    const ratio = dampScaleRatio(snapshot.distance / state.dragState.startDistance);
    const rotation = state.dragState.baseRotation + normalizeAngleDelta(snapshot.angle - state.dragState.startAngle);
    const dx = snapshot.midX - state.dragState.startMidX;
    const dy = snapshot.midY - state.dragState.startMidY;
    if (fragment && `fragment:${fragment.id}` === state.dragState.layerId) {
      fragment.x = clamp(state.dragState.baseX + dx, 0, 240);
      fragment.y = clamp(state.dragState.baseY + dy, 0, 240);
      fragment.width = clamp(state.dragState.baseWidth * ratio, 24, 210);
      fragment.height = clamp(state.dragState.baseHeight * ratio, 24, 210);
      fragment.rotation = clamp(rotation, -360, 360);
      renderCollagePreviewFromForm();
      return;
    }
    const libraryKey = getActiveLibraryKey();
    if (!libraryKey) {
      return;
    }
    updateActiveLibraryTransform({
      x: clamp(state.dragState.baseX + dx - 122, -100, 100),
      y: clamp(state.dragState.baseY + dy - 122, -100, 100),
      scale: clamp(state.dragState.baseScale * ratio, 0.3, 2.2),
      rotation: clamp(rotation, -360, 360)
    });
    return;
  }
  const dx = (event.clientX - state.dragState.startX) * state.dragState.scaleX;
  const dy = (event.clientY - state.dragState.startY) * state.dragState.scaleY;
  const stage = elements.collagePreview.querySelector(".collage-svg");
  const point = stage ? getStagePoint(event, stage) : null;
  const pointX = point ? point.x : state.dragState.centerX;
  const pointY = point ? point.y : state.dragState.centerY;
  if (state.dragState.mode === "rotate") {
    const currentAngle = Math.atan2(pointY - state.dragState.centerY, pointX - state.dragState.centerX) * (180 / Math.PI);
    const angle = dampRotationDelta(normalizeAngleDelta(currentAngle - state.dragState.startAngle));
    if (fragment && `fragment:${fragment.id}` === state.dragState.layerId) {
      fragment.rotation = state.dragState.baseRotation + angle;
    } else {
      updateActiveLibraryTransform({ rotation: state.dragState.baseRotation + angle });
      return;
    }
    renderCollagePreviewFromForm();
    return;
  }
  if (state.dragState.mode === "resize") {
    const currentDistance = Math.max(
      12,
      Math.hypot(pointX - state.dragState.centerX, pointY - state.dragState.centerY)
    );
    const ratio = dampScaleRatio(currentDistance / state.dragState.startDistance);
    if (fragment && `fragment:${fragment.id}` === state.dragState.layerId) {
      fragment.width = clamp(state.dragState.baseWidth * ratio, 24, 210);
      fragment.height = clamp(state.dragState.baseHeight * ratio, 24, 210);
    } else {
      updateActiveLibraryTransform({ scale: clamp(state.dragState.baseScale * ratio, 0.3, 2.2) });
      return;
    }
    renderCollagePreviewFromForm();
    return;
  }
  if (state.dragState.mode === "crop" && fragment) {
    fragment.cropX = clamp(state.dragState.baseCropX + dx / 2, -80, 80);
    fragment.cropY = clamp(state.dragState.baseCropY + dy / 2, -80, 80);
    renderCollagePreviewFromForm();
    return;
  }
  if (fragment && `fragment:${fragment.id}` === state.dragState.layerId) {
    fragment.x = clamp(state.dragState.baseX + dx, 0, 240);
    fragment.y = clamp(state.dragState.baseY + dy, 0, 240);
  } else {
    const libraryKey = getActiveLibraryKey();
    if (!libraryKey) {
      return;
    }
    updateActiveLibraryTransform({
      x: clamp(state.dragState.baseX + dx - 122, -100, 100),
      y: clamp(state.dragState.baseY + dy - 122, -100, 100)
    });
    return;
  }
  renderCollagePreviewFromForm();
}

function handlePreviewPointerUp(event) {
  if (event?.pointerId !== undefined) {
    state.previewPointers.delete(event.pointerId);
  } else {
    state.previewPointers.clear();
  }

  if (state.dragState?.mode === "gesture" && state.previewPointers.size === 1) {
    const remaining = Array.from(state.previewPointers.values())[0];
    const stage = elements.collagePreview.querySelector(".collage-svg");
    const point = stage ? getStagePoint(remaining, stage) : null;
    const fragment = getActiveFragment();
    const libraryKey = getActiveLibraryKey();
    state.dragState = {
      layerId: state.activeFragmentId,
      mode: state.editMode === "crop" && fragment ? "crop" : "move",
      startX: remaining.clientX,
      startY: remaining.clientY,
      baseX: fragment ? fragment.x : getLibraryTransform(libraryKey).x + 122,
      baseY: fragment ? fragment.y : getLibraryTransform(libraryKey).y + 122,
      baseCropX: fragment?.cropX ?? 0,
      baseCropY: fragment?.cropY ?? 0,
      scaleX: point?.scaleX ?? 1,
      scaleY: point?.scaleY ?? 1
    };
    return;
  }

  if (state.previewPointers.size === 0) {
    state.dragState = null;
    window.removeEventListener("pointermove", handlePreviewPointerMove);
    window.removeEventListener("pointerup", handlePreviewPointerUp);
    window.removeEventListener("pointercancel", handlePreviewPointerUp);
  }
}

function handlePreviewWheel(event) {
  const fragment = getActiveFragment();
  if (!fragment || state.editMode !== "crop") {
    return;
  }
  event.preventDefault();
  const direction = event.deltaY > 0 ? -0.08 : 0.08;
  fragment.cropScale = clamp(fragment.cropScale + direction, 0.6, 4);
  renderCollagePreviewFromForm();
}

function toggleCropMode() {
  if (!getActiveFragment()) {
    state.editMode = "move";
    renderCollagePreviewFromForm();
    return;
  }
  state.editMode = state.editMode === "crop" ? "move" : "crop";
  renderCollagePreviewFromForm();
}

function getZone(closeness) {
  if (closeness >= 68) {
    return "core";
  }
  if (closeness >= 36) {
    return "middle";
  }
  return "edge";
}

function zoneLabel(zone) {
  return {
    core: t("zoneCore"),
    middle: t("zoneMiddle"),
    edge: t("zoneEdge")
  }[zone] || t("personFallback");
}

function getMapPosition(person, index, total) {
  const closeness = Number(person.closeness);
  const baseAngle = stableHash(person.id) % 360;
  const angle = (baseAngle + index * (180 / Math.max(total, 1))) * (Math.PI / 180);
  const radius = 38 - closeness * 0.28;
  const wobble = (stableHash(`${person.id}-wobble`) % 5) - 2;
  return {
    x: clamp(50 + Math.cos(angle) * (radius + wobble), 10, 90),
    y: clamp(50 + Math.sin(angle) * (radius + wobble * 0.9), 10, 90)
  };
}

function buildMapLayout(people) {
  const grouped = {
    core: people.filter((person) => getZone(person.closeness) === "core"),
    middle: people.filter((person) => getZone(person.closeness) === "middle"),
    edge: people.filter((person) => getZone(person.closeness) === "edge")
  };
  const layout = new Map();

  [
    { key: "core", minRadius: 9, maxRadius: 23, capacity: 9 },
    { key: "middle", minRadius: 26, maxRadius: 37, capacity: 16 },
    { key: "edge", minRadius: 40, maxRadius: 46, capacity: 24 }
  ].forEach(({ key, minRadius, maxRadius, capacity }) => {
    const items = grouped[key];
    items.forEach((person, index) => {
      const ringIndex = Math.floor(index / capacity);
      const inRingIndex = index % capacity;
      const ringCount = Math.min(capacity, items.length - ringIndex * capacity);
      const radiusStep = Math.max(3.4, (maxRadius - minRadius) / Math.max(1, Math.ceil(items.length / capacity)));
      const radius = clamp(
        minRadius + ringIndex * radiusStep + ((stableHash(`${person.id}-r`) % 5) - 2) * 0.55,
        minRadius,
        maxRadius
      );
      const goldenOffset = ringIndex * 137.508;
      const personalOffset = stableHash(person.id) % 23;
      const angle = (((360 / Math.max(1, ringCount)) * inRingIndex + goldenOffset + personalOffset) % 360) * (Math.PI / 180);
      layout.set(person.id, {
        x: clamp(50 + Math.cos(angle) * radius, 7, 93),
        y: clamp(50 + Math.sin(angle) * radius, 7, 93)
      });
    });
  });

  return layout;
}

function normalizeSupabaseRecord(record) {
  const normalizedCollage = normalizeEditorCollage(record.collage || createEmptyPerson().collage);
  return {
    id: record.id,
    name: record.name || "",
    role: record.role || "",
    bio: record.bio || "",
    desire: record.desire || "",
    offers: record.offers || "",
    needs: record.needs || "",
    talents: record.talents || "",
    tags: record.tags || "",
    availability: record.availability || "Media",
    closeness: Number(record.closeness || 50),
    collage: normalizedCollage,
    owner_id: record.owner_id || "",
    owner_email: record.owner_email || "",
    is_visible: record.is_visible !== false,
    updated_at: record.updated_at || new Date().toISOString()
  };
}

function toSupabaseRecord(person, user) {
  return {
    id: person.id,
    owner_id: user?.id || null,
    name: person.name,
    role: person.role,
    bio: person.bio,
    desire: person.desire,
    offers: person.offers,
    needs: person.needs,
    talents: person.talents,
    tags: person.tags,
    availability: person.availability,
    closeness: person.closeness,
    collage: person.collage,
    owner_email: user?.email || "",
    is_visible: person.is_visible !== false,
    updated_at: new Date().toISOString()
  };
}

function buildCollageSVG(collage, options = {}) {
  const includeFragments = options.includeFragments !== false;
  const withBackdrop = options.withBackdrop === true;
  const interactive = options.interactive === true;
  const selectedLayerId = options.selectedLayerId || "";
  const editMode = options.editMode || "move";
  const fragments = Array.isArray(collage.fragments) ? collage.fragments : [];
  const transforms = collage.transforms || defaultLibraryTransforms();
  const layerEntries = [
    { type: "library", key: "element", variant: collage.element, zIndex: transforms.element?.zIndex ?? defaultLibraryTransforms().element.zIndex },
    { type: "library", key: "body", variant: collage.body, zIndex: transforms.body?.zIndex ?? defaultLibraryTransforms().body.zIndex },
    { type: "library", key: "companion", variant: collage.companion, zIndex: transforms.companion?.zIndex ?? defaultLibraryTransforms().companion.zIndex },
    { type: "library", key: "head", variant: collage.head, zIndex: transforms.head?.zIndex ?? defaultLibraryTransforms().head.zIndex },
    ...fragments.map((fragment) => ({ type: "fragment", fragment, zIndex: Number(fragment.zIndex || 50) }))
  ].sort((left, right) => left.zIndex - right.zIndex);
  const renderedLayers = layerEntries.map((entry) => (
    entry.type === "library"
      ? renderLibraryLayer(entry.key, entry.variant, transforms[entry.key], interactive, selectedLayerId, editMode)
      : renderCollageFragment(entry.fragment, interactive, selectedLayerId, editMode)
  )).join("");
  return `
    <svg class="collage-svg" viewBox="0 0 280 280" role="img" aria-label="${escapeHtml(t("puppet"))}">
      <g transform="translate(18 18) scale(0.86)">
      <defs>
        <linearGradient id="bgWash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff7ea"></stop>
          <stop offset="45%" stop-color="#efd8b8"></stop>
          <stop offset="100%" stop-color="#dcc2a6"></stop>
        </linearGradient>
        <linearGradient id="seaBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8fd4d5"></stop>
          <stop offset="45%" stop-color="#4f9da2"></stop>
          <stop offset="100%" stop-color="#235e63"></stop>
        </linearGradient>
        <linearGradient id="threadBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#efcb8a"></stop>
          <stop offset="55%" stop-color="#cf8758"></stop>
          <stop offset="100%" stop-color="#964730"></stop>
        </linearGradient>
        <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b6c2ca"></stop>
          <stop offset="45%" stop-color="#738d99"></stop>
          <stop offset="100%" stop-color="#455d69"></stop>
        </linearGradient>
        <linearGradient id="rootBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9bbc82"></stop>
          <stop offset="50%" stop-color="#6f8b5b"></stop>
          <stop offset="100%" stop-color="#486045"></stop>
        </linearGradient>
        <radialGradient id="paperGlow" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.96)"></stop>
          <stop offset="55%" stop-color="rgba(255,250,243,0.32)"></stop>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="8"></feGaussianBlur>
        </filter>
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.07"></feFuncA>
          </feComponentTransfer>
        </filter>
        <pattern id="threadPattern" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(16)">
          <path d="M0 9 H18" stroke="rgba(255,245,232,0.22)" stroke-width="4"></path>
          <path d="M9 0 V18" stroke="rgba(120,53,34,0.12)" stroke-width="2"></path>
        </pattern>
        <pattern id="seaPattern" width="32" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 C6 4, 10 4, 16 10 C22 16, 26 16, 32 10" fill="none" stroke="rgba(255,255,255,0.24)" stroke-width="2"></path>
        </pattern>
        <pattern id="metalPattern" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <path d="M0 10 H20" stroke="rgba(235,242,246,0.12)" stroke-width="2"></path>
        </pattern>
        <pattern id="rootPattern" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 0 C10 6, 10 18, 12 24" stroke="rgba(236,244,224,0.16)" stroke-width="2" fill="none"></path>
          <path d="M4 8 C10 10, 14 12, 20 18" stroke="rgba(236,244,224,0.12)" stroke-width="2" fill="none"></path>
        </pattern>
        <clipPath id="bodyClipSea">
          <path d="M68 120 C74 92, 106 88, 124 98 C142 86, 170 96, 176 124 L186 194 C188 210, 56 212, 58 194 Z"></path>
        </clipPath>
        <clipPath id="bodyClipThread">
          <path d="M68 112 C84 98, 106 96, 122 106 C138 96, 162 102, 174 118 C184 132, 182 160, 178 194 C176 208, 62 210, 62 192 C60 154, 58 128, 68 112 Z"></path>
        </clipPath>
        <clipPath id="bodyClipMetal">
          <path d="M78 106 L158 98 L176 118 L170 202 L82 206 L66 186 L68 124 Z"></path>
        </clipPath>
        <clipPath id="bodyClipRoot">
          <path d="M122 102 C92 108, 68 132, 70 170 C72 198, 92 212, 122 214 C150 212, 172 198, 174 170 C176 132, 150 108, 122 102 Z"></path>
        </clipPath>
        <clipPath id="bodyClipLeaf">
          <path d="M122 96 C84 108, 62 136, 60 166 C58 196, 82 220, 122 220 C160 220, 186 196, 184 164 C182 132, 156 106, 122 96 Z"></path>
        </clipPath>
        <clipPath id="bodyClipSail">
          <path d="M80 108 C112 94, 152 98, 176 126 C188 140, 188 160, 182 206 L68 206 C62 158, 64 126, 80 108 Z"></path>
        </clipPath>
        <clipPath id="headClipShell">
          <path d="M86 94 C84 64, 110 42, 140 42 C168 42, 190 64, 186 92 C184 116, 164 132, 138 132 C114 132, 88 118, 86 94 Z"></path>
        </clipPath>
        <clipPath id="headClipMoon">
          <path d="M86 84 C90 56, 118 40, 146 48 C170 54, 182 82, 172 108 C162 134, 134 142, 108 132 C86 122, 80 104, 86 84 Z"></path>
        </clipPath>
        <clipPath id="headClipMask">
          <path d="M82 86 C82 54, 102 42, 124 58 C148 38, 172 52, 176 84 C180 118, 158 142, 126 136 C96 144, 78 118, 82 86 Z"></path>
        </clipPath>
        <clipPath id="headClipSeed">
          <path d="M122 36 C150 40, 170 64, 170 90 C170 116, 152 136, 122 138 C92 136, 74 116, 74 88 C74 62, 92 40, 122 36 Z"></path>
        </clipPath>
        <clipPath id="headClipStone">
          <path d="M88 88 C90 60, 114 44, 142 44 C164 44, 184 62, 184 88 C184 118, 164 138, 136 140 C108 140, 86 120, 88 88 Z"></path>
        </clipPath>
        <clipPath id="headClipStar">
          <path d="M126 40 L142 68 L174 72 L152 94 L158 126 L126 112 L94 126 L100 94 L78 72 L110 68 Z"></path>
        </clipPath>
        ${buildFragmentClipDefs(fragments)}
      </defs>
      ${withBackdrop ? `
        <rect x="0" y="0" width="240" height="240" rx="44" fill="url(#bgWash)"></rect>
        <rect x="0" y="0" width="240" height="240" rx="44" fill="url(#paperGlow)"></rect>
        <rect x="0" y="0" width="240" height="240" rx="44" filter="url(#grainy)" opacity="0.6"></rect>
        <g opacity="0.38" filter="url(#softBlur)">
          <ellipse cx="80" cy="62" rx="44" ry="30" fill="#f2d2c8"></ellipse>
          <ellipse cx="176" cy="82" rx="38" ry="26" fill="#f6d891"></ellipse>
          <ellipse cx="138" cy="164" rx="54" ry="34" fill="#c4dee2"></ellipse>
        </g>
      ` : ""}
      ${includeFragments ? renderedLayers : layerEntries.filter((entry) => entry.type === "library").map((entry) => renderLibraryLayer(entry.key, entry.variant, transforms[entry.key], interactive, selectedLayerId, editMode)).join("")}
      <ellipse cx="122" cy="214" rx="64" ry="12" fill="rgba(77, 50, 40, 0.10)"></ellipse>
      </g>
    </svg>
  `;
}

function renderLibraryLayer(kind, variantId, transform, interactive, selectedLayerId, editMode) {
  const boxes = {
    element: { x: 24, y: 22, width: 196, height: 188 },
    body: { x: 52, y: 94, width: 140, height: 124 },
    head: { x: 74, y: 30, width: 118, height: 118 },
    companion: { x: 138, y: 42, width: 88, height: 150 }
  };
  const box = boxes[kind];
  const layerId = `library:${kind}`;
  const scale = clamp(Number(transform?.scale ?? 1), 0.3, 2.2);
  const x = clamp(Number(transform?.x ?? 0), -100, 100);
  const y = clamp(Number(transform?.y ?? 0), -100, 100);
  const rotation = clamp(Number(transform?.rotation ?? 0), -360, 360);
  const visible = transform?.visible !== false;
  const selected = selectedLayerId === layerId;
  const contentMap = {
    element: renderElement,
    body: renderBody,
    head: renderHead,
    companion: renderCompanion
  };
  if (!visible) {
    return "";
  }

  return `
    <g
      data-layer-id="${interactive ? layerId : ""}"
      transform="translate(${x} ${y})"
      ${interactive ? `style="cursor:grab;"` : ""}
    >
      <g transform="translate(122 122) rotate(${rotation}) scale(${scale}) translate(-122 -122)">
        ${contentMap[kind](variantId, sanitizeColor(transform?.color), kind)}
        ${interactive && selected ? renderSelectionHandles(box, layerId, editMode, false) : ""}
      </g>
    </g>
  `;
}

function buildFragmentClipDefs(fragments) {
  return fragments
    .map((fragment) => {
      const id = `frag-${sanitizeId(fragment.id)}`;
      const x = fragment.x - fragment.width / 2;
      const y = fragment.y - fragment.height / 2;
      if (fragment.mask === "oval") {
        return `<clipPath id="${id}"><ellipse cx="${fragment.x}" cy="${fragment.y}" rx="${fragment.width / 2}" ry="${fragment.height / 2}"></ellipse></clipPath>`;
      }
      if (fragment.mask === "diamond") {
        return `<clipPath id="${id}"><path d="M ${fragment.x} ${y} L ${x + fragment.width} ${fragment.y} L ${fragment.x} ${y + fragment.height} L ${x} ${fragment.y} Z"></path></clipPath>`;
      }
      if (fragment.mask === "rect") {
        return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${fragment.width}" height="${fragment.height}" rx="12"></rect></clipPath>`;
      }
      return `<clipPath id="${id}"><path d="M ${x + fragment.width * 0.08} ${y + fragment.height * 0.05} L ${x + fragment.width * 0.34} ${y + fragment.height * 0.1} L ${x + fragment.width * 0.62} ${y + fragment.height * 0.04} L ${x + fragment.width * 0.95} ${y + fragment.height * 0.12} L ${x + fragment.width * 0.91} ${y + fragment.height * 0.34} L ${x + fragment.width * 0.97} ${y + fragment.height * 0.58} L ${x + fragment.width * 0.92} ${y + fragment.height * 0.92} L ${x + fragment.width * 0.63} ${y + fragment.height * 0.97} L ${x + fragment.width * 0.38} ${y + fragment.height * 0.93} L ${x + fragment.width * 0.08} ${y + fragment.height * 0.97} L ${x + fragment.width * 0.04} ${y + fragment.height * 0.68} L ${x + fragment.width * 0.09} ${y + fragment.height * 0.38} Z"></path></clipPath>`;
    })
    .join("");
}

function renderCollageFragments(fragments, interactive = false, selectedLayerId = "", editMode = "move") {
  return fragments
    .slice()
    .sort((left, right) => (left.zIndex || 1) - (right.zIndex || 1))
    .map((fragment) => renderCollageFragment(fragment, interactive, selectedLayerId, editMode))
    .join("");
}

function renderCollageFragment(fragment, interactive = false, selectedLayerId = "", editMode = "move") {
  const clipId = `frag-${sanitizeId(fragment.id)}`;
  const imageWidth = fragment.width * fragment.cropScale;
  const imageHeight = fragment.height * fragment.cropScale;
  const clipX = fragment.x - fragment.width / 2;
  const clipY = fragment.y - fragment.height / 2;
  const positionX = clamp(50 + Number(fragment.cropX || 0), 0, 100) / 100;
  const positionY = clamp(50 + Number(fragment.cropY || 0), 0, 100) / 100;
  const x = clipX + (fragment.width - imageWidth) * positionX;
  const y = clipY + (fragment.height - imageHeight) * positionY;
  return `
    <g data-layer-id="${interactive ? `fragment:${fragment.id}` : ""}" transform="rotate(${fragment.rotation} ${fragment.x} ${fragment.y})" opacity="${fragment.opacity}" ${interactive ? `style="cursor:grab;"` : ""}>
      <image
        href="${escapeHtml(fragment.src)}"
        x="${x}"
        y="${y}"
        width="${imageWidth}"
        height="${imageHeight}"
        preserveAspectRatio="none"
        clip-path="url(#${clipId})"
      ></image>
      ${interactive && selectedLayerId === `fragment:${fragment.id}` ? renderSelectionHandles({
        x: fragment.x - fragment.width / 2,
        y: fragment.y - fragment.height / 2,
        width: fragment.width,
        height: fragment.height
      }, `fragment:${fragment.id}`, editMode, true) : ""}
    </g>
  `;
}

function renderSelectionHandles(bounds, layerId, editMode, isFragment) {
  const left = bounds.x;
  const top = bounds.y;
  return `
    <rect data-layer-id="${layerId}" x="${left}" y="${top}" width="${bounds.width}" height="${bounds.height}" rx="10" fill="none" stroke="rgba(187,88,53,0.74)" stroke-dasharray="6 4" stroke-width="2" pointer-events="none"></rect>
  `;
}

function renderBasicShape(id, color = DEFAULT_SHAPE_COLOR, kind = "body") {
  const layout = {
    element: { cx: 122, cy: 134, w: 146, h: 118, opacity: 0.56 },
    body: { cx: 122, cy: 156, w: 116, h: 116, opacity: 0.88 },
    head: { cx: 126, cy: 88, w: 82, h: 82, opacity: 0.92 },
    companion: { cx: 184, cy: 126, w: 70, h: 70, opacity: 0.86 }
  }[kind] || { cx: 122, cy: 122, w: 96, h: 96, opacity: 0.86 };
  const x = layout.cx - layout.w / 2;
  const y = layout.cy - layout.h / 2;
  const fill = sanitizeColor(color);
  const stroke = "rgba(77,50,40,0.2)";
  const highlight = "rgba(255,255,255,0.42)";
  const shape = {
    circle: `<ellipse cx="${layout.cx}" cy="${layout.cy}" rx="${layout.w / 2}" ry="${layout.h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="3"></ellipse>`,
    rectangle: `<rect x="${x}" y="${y}" width="${layout.w}" height="${layout.h * 0.72}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="3"></rect>`,
    square: `<rect x="${layout.cx - Math.min(layout.w, layout.h) / 2}" y="${layout.cy - Math.min(layout.w, layout.h) / 2}" width="${Math.min(layout.w, layout.h)}" height="${Math.min(layout.w, layout.h)}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="3"></rect>`,
    triangle: `<path d="M ${layout.cx} ${y} L ${x + layout.w} ${y + layout.h} L ${x} ${y + layout.h} Z" fill="${fill}" stroke="${stroke}" stroke-width="3"></path>`
  }[id] || "";
  return `
    <g opacity="${layout.opacity}">
      ${shape}
      <path d="M ${x + layout.w * 0.22} ${y + layout.h * 0.28} C ${x + layout.w * 0.42} ${y + layout.h * 0.14}, ${x + layout.w * 0.66} ${y + layout.h * 0.16}, ${x + layout.w * 0.82} ${y + layout.h * 0.34}" stroke="${highlight}" stroke-width="4" fill="none" stroke-linecap="round"></path>
    </g>
  `;
}

function renderBody(id, color = DEFAULT_SHAPE_COLOR) {
  if (BASIC_SHAPE_IDS.has(id)) {
    return renderBasicShape(id, color, "body");
  }
  switch (id) {
    case "sea":
      return `
        <g transform="rotate(-4 122 154)">
          <path d="M68 120 C74 92, 106 88, 124 98 C142 86, 170 96, 176 124 L186 194 C188 210, 56 212, 58 194 Z" fill="url(#seaBody)"></path>
          <g clip-path="url(#bodyClipSea)">
            <rect x="54" y="108" width="140" height="106" fill="url(#seaPattern)" opacity="0.9"></rect>
            <path d="M60 142 C82 126, 104 128, 126 142 C148 156, 170 156, 188 144" stroke="rgba(255,255,255,0.34)" stroke-width="4" fill="none"></path>
            <path d="M54 170 C78 154, 100 154, 124 170 C148 186, 170 186, 194 172" stroke="rgba(255,255,255,0.26)" stroke-width="3" fill="none"></path>
          </g>
          <path d="M84 120 C96 126, 112 126, 124 118 C136 126, 152 126, 164 120" stroke="rgba(255,247,238,0.52)" stroke-width="5" fill="none"></path>
        </g>
      `;
    case "thread":
      return `
        <g transform="rotate(3 122 154)">
          <path d="M68 112 C84 98, 106 96, 122 106 C138 96, 162 102, 174 118 C184 132, 182 160, 178 194 C176 208, 62 210, 62 192 C60 154, 58 128, 68 112 Z" fill="url(#threadBody)"></path>
          <g clip-path="url(#bodyClipThread)">
            <rect x="60" y="104" width="124" height="106" fill="url(#threadPattern)" opacity="0.95"></rect>
            <path d="M82 118 C96 148, 110 166, 126 196" stroke="rgba(255,246,230,0.48)" stroke-width="4" fill="none"></path>
            <path d="M154 112 C138 140, 126 162, 114 194" stroke="rgba(120,53,34,0.22)" stroke-width="3" fill="none"></path>
            <path d="M72 154 C108 140, 144 144, 176 162" stroke="rgba(255,245,232,0.3)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    case "metal":
      return `
        <g transform="rotate(-6 122 154)">
          <path d="M78 106 L158 98 L176 118 L170 202 L82 206 L66 186 L68 124 Z" fill="url(#metalBody)"></path>
          <g clip-path="url(#bodyClipMetal)">
            <rect x="62" y="96" width="122" height="116" fill="url(#metalPattern)" opacity="0.88"></rect>
            <path d="M72 128 L168 120" stroke="rgba(245,250,252,0.28)" stroke-width="3"></path>
            <path d="M76 154 L164 146" stroke="rgba(245,250,252,0.18)" stroke-width="2"></path>
            <path d="M84 188 L162 180" stroke="rgba(38,57,67,0.24)" stroke-width="4"></path>
          </g>
          <circle cx="96" cy="140" r="4" fill="#dfe7eb" opacity="0.68"></circle>
          <circle cx="150" cy="166" r="4" fill="#dfe7eb" opacity="0.54"></circle>
          <path d="M112 104 L102 204" stroke="rgba(255,255,255,0.22)" stroke-width="3"></path>
        </g>
      `;
    case "root":
      return `
        <g transform="rotate(2 122 156)">
          <path d="M122 102 C92 108, 68 132, 70 170 C72 198, 92 212, 122 214 C150 212, 172 198, 174 170 C176 132, 150 108, 122 102 Z" fill="url(#rootBody)"></path>
          <g clip-path="url(#bodyClipRoot)">
            <rect x="66" y="102" width="112" height="116" fill="url(#rootPattern)" opacity="0.9"></rect>
            <path d="M122 118 C118 144, 114 170, 102 212" stroke="#d8e6c8" stroke-width="5" fill="none"></path>
            <path d="M122 142 C136 166, 146 188, 150 212" stroke="#d8e6c8" stroke-width="5" fill="none"></path>
            <path d="M108 126 C96 148, 88 164, 80 184" stroke="rgba(232,240,220,0.42)" stroke-width="3" fill="none"></path>
            <path d="M136 132 C148 144, 158 158, 166 176" stroke="rgba(232,240,220,0.34)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    case "leaf":
      return `
        <g transform="rotate(-2 122 156)">
          <path d="M122 96 C84 108, 62 136, 60 166 C58 196, 82 220, 122 220 C160 220, 186 196, 184 164 C182 132, 156 106, 122 96 Z" fill="#89a85f"></path>
          <g clip-path="url(#bodyClipLeaf)">
            <path d="M122 104 C120 132, 120 172, 122 218" stroke="#f0f5df" stroke-width="5" fill="none"></path>
            <path d="M122 126 C96 136, 80 152, 68 176" stroke="rgba(240,245,223,0.75)" stroke-width="3" fill="none"></path>
            <path d="M122 136 C144 144, 160 156, 176 178" stroke="rgba(74,96,48,0.34)" stroke-width="3" fill="none"></path>
            <path d="M90 114 C104 124, 112 132, 120 146" stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none"></path>
          </g>
        </g>
      `;
    case "sail":
      return `
        <g transform="rotate(4 122 154)">
          <path d="M80 108 C112 94, 152 98, 176 126 C188 140, 188 160, 182 206 L68 206 C62 158, 64 126, 80 108 Z" fill="#efe3cf"></path>
          <g clip-path="url(#bodyClipSail)">
            <path d="M72 204 L170 108" stroke="#cf7e59" stroke-width="4" fill="none"></path>
            <path d="M82 206 L182 144" stroke="rgba(93,118,126,0.28)" stroke-width="3" fill="none"></path>
            <path d="M78 130 C112 118, 144 118, 174 134" stroke="rgba(255,255,255,0.58)" stroke-width="4" fill="none"></path>
            <path d="M86 160 C118 150, 146 152, 176 170" stroke="rgba(201,130,92,0.24)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    default:
      return "";
  }
}

function renderElement(id, color = DEFAULT_SHAPE_COLOR) {
  if (BASIC_SHAPE_IDS.has(id)) {
    return renderBasicShape(id, color, "element");
  }
  switch (id) {
    case "water":
      return `
        <g opacity="0.72">
          <path d="M32 156 C54 136, 76 136, 98 156 C120 176, 142 176, 164 156 C186 136, 208 136, 224 148" stroke="#4ea3aa" stroke-width="8" fill="none" stroke-linecap="round"></path>
          <path d="M24 182 C48 164, 74 164, 98 182 C122 200, 148 200, 172 182 C196 164, 218 164, 232 176" stroke="#88cdd1" stroke-width="4" fill="none" stroke-linecap="round"></path>
          <path d="M46 126 C70 112, 92 112, 114 126 C136 140, 158 140, 180 126" stroke="rgba(255,255,255,0.42)" stroke-width="3" fill="none" stroke-linecap="round"></path>
        </g>
      `;
    case "earth":
      return `
        <g opacity="0.76">
          <ellipse cx="122" cy="166" rx="78" ry="44" fill="rgba(152,118,81,0.18)"></ellipse>
          <path d="M52 174 C70 152, 98 140, 122 140 C146 140, 176 150, 194 174" stroke="#7c5b3d" stroke-width="8" fill="none" stroke-linecap="round"></path>
          <path d="M64 188 C84 172, 102 166, 122 166 C142 166, 160 172, 180 188" stroke="#b58c64" stroke-width="4" fill="none" stroke-linecap="round"></path>
          <circle cx="84" cy="156" r="5" fill="#b99363"></circle>
          <circle cx="170" cy="160" r="4" fill="#c8a378"></circle>
        </g>
      `;
    case "air":
      return `
        <g opacity="0.68">
          <path d="M34 118 C64 86, 108 82, 146 96 C176 108, 196 108, 222 90" stroke="#7fb0bc" stroke-width="6" fill="none" stroke-linecap="round"></path>
          <path d="M26 152 C54 126, 94 122, 128 132 C158 140, 182 138, 214 118" stroke="#c8dde4" stroke-width="4" fill="none" stroke-linecap="round"></path>
          <path d="M46 188 C72 168, 102 166, 132 176 C156 184, 182 182, 204 168" stroke="rgba(255,255,255,0.52)" stroke-width="3" fill="none" stroke-linecap="round"></path>
        </g>
      `;
    case "fire":
      return `
        <g opacity="0.8">
          <path d="M94 194 C86 170, 96 150, 108 138 C118 128, 122 116, 120 96 C138 108, 148 126, 148 146 C158 138, 166 126, 166 110 C180 130, 184 150, 178 172 C170 198, 150 214, 124 214 C110 214, 98 206, 94 194 Z" fill="rgba(216,107,58,0.22)"></path>
          <path d="M104 190 C98 170, 108 154, 118 144 C126 136, 130 126, 130 112 C142 122, 150 136, 150 150 C156 144, 160 136, 162 126 C170 140, 170 156, 166 170 C160 190, 144 202, 126 202 C116 202, 108 198, 104 190 Z" stroke="#d16b3a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M124 184 C122 170, 128 160, 136 152" stroke="#f0bb68" stroke-width="4" fill="none" stroke-linecap="round"></path>
        </g>
      `;
    case "paper":
      return `
        <g opacity="0.74">
          <rect x="54" y="52" width="72" height="92" rx="10" fill="rgba(252,245,228,0.66)" transform="rotate(-10 90 98)"></rect>
          <rect x="122" y="96" width="68" height="84" rx="10" fill="rgba(242,229,206,0.72)" transform="rotate(8 156 138)"></rect>
          <path d="M62 98 L114 88" stroke="rgba(160,124,91,0.24)" stroke-width="2"></path>
          <path d="M132 138 L182 146" stroke="rgba(160,124,91,0.24)" stroke-width="2"></path>
        </g>
      `;
    case "shadow":
      return `
        <g opacity="0.52">
          <ellipse cx="122" cy="120" rx="86" ry="64" fill="rgba(70,64,78,0.12)"></ellipse>
          <ellipse cx="122" cy="156" rx="64" ry="88" fill="rgba(70,64,78,0.1)"></ellipse>
          <path d="M62 86 C86 64, 152 62, 184 92" stroke="rgba(86,79,94,0.28)" stroke-width="5" fill="none" stroke-linecap="round"></path>
        </g>
      `;
    default:
      return "";
  }
}

function renderHead(id, color = DEFAULT_SHAPE_COLOR) {
  if (BASIC_SHAPE_IDS.has(id)) {
    return renderBasicShape(id, color, "head");
  }
  switch (id) {
    case "shell":
      return `
        <g transform="rotate(-7 136 88)">
          <path d="M86 94 C84 64, 110 42, 140 42 C168 42, 190 64, 186 92 C184 116, 164 132, 138 132 C114 132, 88 118, 86 94 Z" fill="#f1c7a4"></path>
          <g clip-path="url(#headClipShell)">
            <path d="M92 92 C114 88, 130 74, 142 54" stroke="#d58e67" stroke-width="5" fill="none"></path>
            <path d="M102 110 C126 100, 146 88, 162 68" stroke="#d58e67" stroke-width="5" fill="none"></path>
            <path d="M90 80 C112 84, 132 74, 154 52" stroke="rgba(255,243,230,0.52)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    case "moon":
      return `
        <g transform="rotate(9 126 86)">
          <path d="M86 84 C90 56, 118 40, 146 48 C170 54, 182 82, 172 108 C162 134, 134 142, 108 132 C86 122, 80 104, 86 84 Z" fill="#f8efdd"></path>
          <g clip-path="url(#headClipMoon)">
            <circle cx="126" cy="84" r="42" fill="#f4e8bf"></circle>
            <circle cx="144" cy="72" r="32" fill="#ead9a4"></circle>
            <circle cx="112" cy="74" r="5" fill="rgba(214,188,124,0.55)"></circle>
            <circle cx="126" cy="98" r="3.5" fill="rgba(214,188,124,0.45)"></circle>
          </g>
        </g>
      `;
    case "mask":
      return `
        <g transform="rotate(4 126 92)">
          <path d="M82 86 C82 54, 102 42, 124 58 C148 38, 172 52, 176 84 C180 118, 158 142, 126 136 C96 144, 78 118, 82 86 Z" fill="#f8f2e7"></path>
          <g clip-path="url(#headClipMask)">
            <path d="M94 80 C104 66, 120 70, 122 88 C108 96, 98 92, 94 80 Z" fill="#4e4c56"></path>
            <path d="M132 86 C134 68, 152 64, 162 78 C158 92, 146 98, 132 86 Z" fill="#4e4c56"></path>
            <path d="M102 116 C116 108, 136 108, 152 116" stroke="#b15e46" stroke-width="5" fill="none" stroke-linecap="round"></path>
            <path d="M96 58 C112 48, 142 48, 160 58" stroke="rgba(121,84,67,0.34)" stroke-width="4" fill="none"></path>
            <path d="M88 104 C100 112, 112 116, 126 116 C140 116, 154 112, 168 102" stroke="rgba(130,95,80,0.18)" stroke-width="3" fill="none"></path>
            <path d="M126 60 C120 82, 120 104, 126 132" stroke="rgba(207,113,80,0.34)" stroke-width="3" fill="none"></path>
          </g>
          <path d="M82 86 C82 54, 102 42, 124 58 C148 38, 172 52, 176 84 C180 118, 158 142, 126 136 C96 144, 78 118, 82 86 Z" fill="none" stroke="rgba(77,50,40,0.2)" stroke-width="3"></path>
        </g>
      `;
    case "seed":
      return `
        <g transform="rotate(-3 122 88)">
          <path d="M122 36 C150 40, 170 64, 170 90 C170 116, 152 136, 122 138 C92 136, 74 116, 74 88 C74 62, 92 40, 122 36 Z" fill="#9e6f46"></path>
          <g clip-path="url(#headClipSeed)">
            <path d="M122 46 C136 62, 146 86, 142 120" stroke="#f0dfbf" stroke-width="4" fill="none"></path>
            <path d="M110 54 C96 72, 96 96, 108 120" stroke="rgba(245,228,194,0.32)" stroke-width="3" fill="none"></path>
            <path d="M126 58 C140 70, 148 84, 152 104" stroke="rgba(82,53,32,0.22)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    case "stone":
      return `
        <g transform="rotate(6 136 90)">
          <path d="M88 88 C90 60, 114 44, 142 44 C164 44, 184 62, 184 88 C184 118, 164 138, 136 140 C108 140, 86 120, 88 88 Z" fill="#a8a39a"></path>
          <g clip-path="url(#headClipStone)">
            <path d="M100 78 C120 64, 146 62, 170 74" stroke="rgba(242,238,231,0.55)" stroke-width="4" fill="none"></path>
            <path d="M100 116 C118 104, 142 100, 166 108" stroke="rgba(93,88,80,0.28)" stroke-width="4" fill="none"></path>
            <path d="M122 52 C130 76, 132 102, 128 132" stroke="rgba(255,255,255,0.18)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    case "star":
      return `
        <g transform="rotate(-8 126 88)">
          <path d="M126 40 L142 68 L174 72 L152 94 L158 126 L126 112 L94 126 L100 94 L78 72 L110 68 Z" fill="#efc86a"></path>
          <g clip-path="url(#headClipStar)">
            <path d="M96 78 C112 72, 136 72, 156 82" stroke="rgba(255,248,227,0.65)" stroke-width="4" fill="none"></path>
            <circle cx="126" cy="84" r="16" fill="rgba(255,242,204,0.24)"></circle>
          </g>
        </g>
      `;
    default:
      return "";
  }
}

function renderCompanion(id, color = DEFAULT_SHAPE_COLOR) {
  if (BASIC_SHAPE_IDS.has(id)) {
    return renderBasicShape(id, color, "companion");
  }
  switch (id) {
    case "tube":
      return `
        <g transform="rotate(-22 182 154)">
          <rect x="168" y="106" width="18" height="88" rx="3" fill="#80b1c8"></rect>
          <rect x="172" y="112" width="10" height="76" rx="2" fill="#d8eef6"></rect>
          <path d="M170 124 H184" stroke="rgba(255,255,255,0.42)" stroke-width="2"></path>
          <path d="M170 158 H184" stroke="rgba(42,88,106,0.24)" stroke-width="2"></path>
        </g>
      `;
    case "kite":
      return `
        <g transform="rotate(10 176 92)">
          <path d="M176 58 L206 84 L176 110 L146 84 Z" fill="#cf7150"></path>
          <path d="M176 58 L176 110 M146 84 L206 84" stroke="rgba(255,243,232,0.4)" stroke-width="2"></path>
          <path d="M146 84 C138 122, 152 142, 170 164" stroke="#8b674a" stroke-width="4" fill="none"></path>
          <path d="M168 166 C174 170, 178 176, 180 184" stroke="#8b674a" stroke-width="4" fill="none"></path>
        </g>
      `;
    case "lantern":
      return `
        <g transform="rotate(-8 198 94)">
          <path d="M176 78 C176 62, 188 54, 198 54 C208 54, 220 62, 220 78 C220 92, 210 102, 210 118 C210 130, 206 140, 198 140 C190 140, 186 130, 186 118 C186 102, 176 92, 176 78 Z" fill="#f2c56f"></path>
          <path d="M188 84 H208" stroke="#fff5dc" stroke-width="5" stroke-linecap="round"></path>
          <path d="M198 54 V38" stroke="#83624a" stroke-width="4"></path>
          <circle cx="198" cy="96" r="24" fill="rgba(248,224,153,0.16)" filter="url(#softBlur)"></circle>
        </g>
      `;
    case "branch":
      return `
        <g transform="rotate(12 188 108)">
          <path d="M164 130 C176 120, 188 104, 196 84" stroke="#6c5439" stroke-width="7" fill="none" stroke-linecap="round"></path>
          <path d="M186 110 C196 112, 204 116, 214 124" stroke="#7b8f59" stroke-width="5" fill="none" stroke-linecap="round"></path>
          <path d="M174 96 C182 92, 188 86, 194 76" stroke="#7b8f59" stroke-width="5" fill="none" stroke-linecap="round"></path>
          <circle cx="210" cy="124" r="4" fill="#a9c17d"></circle>
          <circle cx="194" cy="76" r="4" fill="#a9c17d"></circle>
        </g>
      `;
    case "nest":
      return `
        <g transform="rotate(-14 186 126)">
          <ellipse cx="186" cy="126" rx="26" ry="18" fill="#9b7149"></ellipse>
          <ellipse cx="186" cy="124" rx="19" ry="11" fill="#d8c3a0"></ellipse>
          <path d="M162 126 C170 114, 202 114, 210 126" stroke="#6b4f35" stroke-width="4" fill="none"></path>
          <path d="M164 134 C174 144, 198 144, 208 134" stroke="rgba(89,63,42,0.55)" stroke-width="3" fill="none"></path>
          <path d="M168 116 L204 138" stroke="rgba(255,240,216,0.24)" stroke-width="2"></path>
        </g>
      `;
    case "key":
      return `
        <g transform="rotate(24 184 130)">
          <circle cx="174" cy="108" r="12" fill="none" stroke="#d2a85c" stroke-width="6"></circle>
          <path d="M182 114 L204 142" stroke="#d2a85c" stroke-width="7" stroke-linecap="round"></path>
          <path d="M198 136 L210 130 M204 144 L216 138" stroke="#f4dfae" stroke-width="4" stroke-linecap="round"></path>
        </g>
      `;
    default:
      return "";
  }
}

function updateAuthUI() {
  elements.authButton.hidden = hasAccessCode();
  elements.authButton.textContent = state.isAdmin ? "Admin attivo" : "Admin";
  elements.signOutButton.hidden = !state.user;
  elements.exportButton.hidden = false;
  elements.resetButton.hidden = state.useCloud;
}

function updateStatus(mode, auth, message) {
  if (!elements.storageModeLabel || !elements.authStatusLabel || !elements.syncStatusLabel) {
    return;
  }
  elements.storageModeLabel.textContent = mode;
  elements.authStatusLabel.textContent = auth;
  elements.syncStatusLabel.textContent = message;
}

function setLoading(isLoading, message = "") {
  state.loading = isLoading;
  if (isLoading) {
    updateStatus(currentModeLabel(), currentUserLabel(), message);
  }
}

function currentModeLabel() {
  return state.useCloud ? "Cloud pubblico" : "Locale";
}

function currentUserLabel() {
  if (state.isAdmin) {
    return `ADMIN ${state.user.email}`;
  }
  if (state.user) {
    return "Login non admin";
  }
  return state.useCloud ? "Accesso libero" : "Locale";
}

function canEditPerson(person) {
  if (!state.useCloud) {
    return true;
  }
  return Boolean(person);
}

function hasAccessCode() {
  return Boolean(String(CONFIG.ACCESS_CODE || "").trim());
}

function requestAccessCode(action) {
  const expectedCode = String(CONFIG.ACCESS_CODE || "").trim();
  if (!expectedCode || state.accessGranted) {
    return true;
  }

  const enteredCode = window.prompt(t("codePrompt", { action }));
  if (enteredCode === null) {
    return false;
  }
  if (enteredCode.trim() === expectedCode) {
    state.accessGranted = true;
    return true;
  }

  updateStatus(currentModeLabel(), currentUserLabel(), t("wrongCode"));
  return false;
}

function splitKeywords(value) {
  return String(value || "")
    .toLowerCase()
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function showSupabaseHelp() {
  const message = [
    "Per attivare la mappa condivisa:",
    "1. Apri config.js e inserisci SUPABASE_URL e SUPABASE_ANON_KEY.",
    "2. Esegui lo script SQL in supabase/schema.sql.",
    "3. Imposta ACCESS_CODE con il codice laboratorio.",
    "4. Pubblica su GitHub Pages."
  ].join("\n");
  window.alert(message);
}

function stableHash(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return min;
  }
  return Math.min(max, Math.max(min, number));
}

function sanitizeImageSrc(value) {
  const src = String(value || "").trim();
  if (/^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,/i.test(src)) {
    return src;
  }
  if (/^https?:\/\//i.test(src)) {
    return src;
  }
  return "";
}

function sanitizeColor(value) {
  const text = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(text) ? text : DEFAULT_SHAPE_COLOR;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function sanitizeId(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "");
}

function iconCrop() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v11a4 4 0 0 0 4 4h11"></path><path d="M9 21V10a4 4 0 0 1 4-4h8"></path></svg>`;
}

function iconCropOff() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v11a4 4 0 0 0 4 4h11"></path><path d="M3 3l18 18"></path></svg>`;
}

function iconDuplicate() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="2"></rect><rect x="5" y="5" width="10" height="10" rx="2"></rect></svg>`;
}

function iconBackward() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7v10"></path><path d="M18 7l-6 5 6 5"></path></svg>`;
}

function iconForward() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 7v10"></path><path d="M6 7l6 5-6 5"></path></svg>`;
}

function iconRotateLeft() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7v6h6"></path><path d="M5 13a7 7 0 1 0 2-7"></path></svg>`;
}

function iconRotateRight() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v6h-6"></path><path d="M19 13a7 7 0 1 1-2-7"></path></svg>`;
}

function iconMinus() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"></path></svg>`;
}

function iconPlus() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12"></path><path d="M6 12h12"></path></svg>`;
}

function iconTrash() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M9 7V4h6v3"></path><path d="M8 7l1 12h6l1-12"></path></svg>`;
}

function iconTorn() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5l6 2 4-2 6 3-2 11-12 1-2-8z"></path></svg>`;
}

function iconOval() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12" rx="7" ry="9"></ellipse></svg>`;
}

function iconRect() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="6" width="14" height="12" rx="2"></rect></svg>`;
}

function iconDiamond() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l7 8-7 8-7-8z"></path></svg>`;
}
