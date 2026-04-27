"use strict";

const STORAGE_KEY = "cantieri-meticci-atlante-v2";
const PEOPLE_TABLE = "community_profiles";
const CONFIG = window.APP_CONFIG || {};

const collageCatalog = {
  head: [
    { id: "moon", label: "Luna" },
    { id: "shell", label: "Conchiglia" },
    { id: "seed", label: "Seme" },
    { id: "stone", label: "Sasso" },
    { id: "mask", label: "Maschera" },
    { id: "star", label: "Stella" }
  ],
  body: [
    { id: "thread", label: "Tessuto" },
    { id: "sea", label: "Mare" },
    { id: "leaf", label: "Foglia" },
    { id: "root", label: "Radice" },
    { id: "metal", label: "Lamiera" },
    { id: "sail", label: "Vela" }
  ],
  element: [
    { id: "water", label: "Acqua" },
    { id: "earth", label: "Terra" },
    { id: "air", label: "Aria" },
    { id: "fire", label: "Fuoco" },
    { id: "paper", label: "Carta" },
    { id: "shadow", label: "Ombra" }
  ],
  companion: [
    { id: "branch", label: "Ramo" },
    { id: "lantern", label: "Lanterna" },
    { id: "kite", label: "Aquilone" },
    { id: "tube", label: "Tubo" },
    { id: "nest", label: "Nido" },
    { id: "key", label: "Chiave" }
  ]
};

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
  dragState: null,
  editMode: "move",
  filters: { search: "", availability: "all", zone: "all" },
  supabase: null,
  user: null,
  isAdmin: false,
  useCloud: false,
  loading: false
};

const elements = {
  addPersonButton: document.querySelector("#addPersonButton"),
  editPersonButton: document.querySelector("#editPersonButton"),
  exportButton: document.querySelector("#exportButton"),
  resetButton: document.querySelector("#resetButton"),
  connectButton: document.querySelector("#connectButton"),
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
  elements.addPersonButton.addEventListener("click", () => openEditor());
  elements.editPersonButton.addEventListener("click", () => state.selectedId && openEditor(state.selectedId));
  elements.exportButton.addEventListener("click", exportPeople);
  elements.resetButton.addEventListener("click", resetToDemo);
  elements.connectButton.addEventListener("click", showSupabaseHelp);
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
  elements.collagePreview.addEventListener("pointerdown", handlePreviewPointerDown);
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
    : "Database condiviso vuoto. Aggiungi la prima persona per popolare la mappa.";
  updateStatus("Cloud pubblico", currentUserLabel(), message);
  render();
}

async function savePersonToSupabase(person, isExisting) {
  if (!state.supabase) {
    return { ok: false, message: "Supabase non configurato." };
  }

  const payload = toSupabaseRecord(person, state.user);
  const query = isExisting && state.isAdmin
    ? state.supabase.from(PEOPLE_TABLE).update(payload).eq("id", person.id)
    : state.supabase.from(PEOPLE_TABLE).insert(payload);
  const { error } = await query;
  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

async function deletePersonFromSupabase(personId) {
  if (!state.supabase || !state.isAdmin) {
    return { ok: false, message: "Serve un accesso ADMIN." };
  }

  const { error } = await state.supabase.from(PEOPLE_TABLE).delete().eq("id", personId);
  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

async function hidePersonInSupabase(personId) {
  if (!state.supabase || !state.isAdmin) {
    return { ok: false, message: "Serve un accesso ADMIN." };
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
  elements.mapSummary.textContent = `${visiblePeople.length} persone visibili su ${state.people.length}.`;
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

function renderDetail() {
  const person = state.people.find((entry) => entry.id === state.selectedId);
  if (!person) {
    elements.detailCard.innerHTML = `
      <div class="empty-state">
        Nessuna persona selezionata. Aggiungi una nuova persona oppure usa i filtri per esplorare la costellazione.
      </div>
    `;
    return;
  }

  const zone = getZone(person.closeness);
  const owner = person.owner_email ? `<span class="pill">Scheda di ${escapeHtml(person.owner_email)}</span>` : "";
  const hidden = state.isAdmin && person.is_visible === false ? `<span class="pill">Nascosta</span>` : "";

  elements.detailCard.innerHTML = `
    <div class="detail-top">
      <div class="detail-avatar">${buildCollageSVG(person.collage)}</div>
      <div>
        <h3 class="detail-name">${escapeHtml(person.name)}</h3>
        <p class="detail-role">${escapeHtml(person.role || "Persona della compagnia")}</p>
      </div>
      <div class="pill-row">
        <span class="pill">${zoneLabel(zone)}</span>
        <span class="pill">Disponibilita ${escapeHtml(person.availability)}</span>
        <span class="pill">Vicino al centro: ${person.closeness}/100</span>
        ${hidden}
        ${owner}
      </div>
    </div>
    ${buildDetailSection("Autoritratto", person.bio)}
    ${buildDetailSection("Desideri", person.desire)}
    ${buildDetailSection("Cosa offre", person.offers)}
    ${buildDetailSection("Bisogni", person.needs)}
    ${buildDetailSection("Talenti e competenze", person.talents)}
    ${buildDetailSection("Parole chiave", person.tags)}
  `;
}

function renderGallery(visiblePeople) {
  if (!visiblePeople.length) {
    elements.galleryGrid.innerHTML = `
      <div class="empty-state">
        Nessuna persona corrisponde ai filtri attivi.
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
          <p>${escapeHtml(person.role || "Persona della compagnia")}</p>
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

function openEditor(personId = null) {
  state.editorId = personId;
  const person = state.people.find((entry) => entry.id === personId) || createEmptyPerson();
  if (personId && !canEditPerson(person)) {
    updateStatus(currentModeLabel(), currentUserLabel(), "Solo ADMIN puo modificare le schede pubblicate.");
    return;
  }
  state.editorCollage = normalizeEditorCollage(person.collage);
  state.activeFragmentId = "library:head";
  state.editMode = "move";

  elements.dialogTitle.textContent = personId ? "Modifica persona" : "Nuova persona";
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
  elements.hidePersonButton.hidden = !personId || !state.isAdmin || person.is_visible === false;
  elements.deletePersonButton.hidden = !personId || !state.isAdmin;
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

  const person = state.people.find((entry) => entry.id === state.editorId);
  const confirmed = window.confirm(`Eliminare ${person?.name || "questa persona"}?`);
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

  const person = state.people.find((entry) => entry.id === state.editorId);
  const confirmed = window.confirm(`Nascondere ${person?.name || "questa persona"} dalla mappa pubblica?`);
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

function resetToDemo() {
  const confirmed = window.confirm("Ripristinare i dati demo? I dati locali verranno sostituiti.");
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
  select.innerHTML = options.map((option) => `<option value="${option.id}">${escapeHtml(option.label)}</option>`).join("");
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

  const fragments = await Promise.all(files.map(createFragmentFromFile));
  state.editorCollage.fragments.push(...fragments);
  state.activeFragmentId = fragments.at(-1) ? `fragment:${fragments.at(-1).id}` : state.activeFragmentId;
  elements.customImageInput.value = "";
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
    zIndex: (state.editorCollage?.fragments.length || 0) + 1
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
  const left = `${(bounds.cx / 240) * 100}%`;
  const top = `${(bounds.y / 240) * 100}%`;
  return `
    <div class="floating-toolbar" style="left:${left}; top:${top};">
      <button type="button" data-toolbar-action="remove" title="Elimina" aria-label="Elimina">${iconTrash()}</button>
    </div>
  `;
}

function bindFloatingToolbar() {
  elements.collagePreview.querySelectorAll("[data-toolbar-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = button.dataset.toolbarAction;
      if (action === "remove") removeCustomImage();
    });
  });
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
    element: { x: 0, y: 0, scale: 1, rotation: 0, visible: true },
    body: { x: 0, y: 0, scale: 1, rotation: 0, visible: true },
    head: { x: 0, y: 0, scale: 1, rotation: 0, visible: true },
    companion: { x: 0, y: 0, scale: 1, rotation: 0, visible: true }
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
      ...base.transforms,
      ...(collage?.transforms || {})
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
    zIndex: getMaxFragmentZIndex() + 1
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
  fragment.zIndex = clamp((fragment.zIndex || 1) + direction, 1, getMaxFragmentZIndex() + 1);
  normalizeFragmentZOrder();
  renderCollagePreviewFromForm();
}

function normalizeFragmentZOrder() {
  if (!state.editorCollage) {
    return;
  }
  state.editorCollage.fragments
    .sort((left, right) => (left.zIndex || 1) - (right.zIndex || 1))
    .forEach((fragment, index) => {
      fragment.zIndex = index + 1;
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

function handlePreviewPointerDown(event) {
  const handle = event.target.closest("[data-handle-action]");
  if (handle && state.editorCollage) {
    event.preventDefault();
    state.activeFragmentId = handle.dataset.layerId;
    const stage = elements.collagePreview.querySelector(".collage-svg");
    if (!stage) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    const fragment = getActiveFragment();
    const libraryKey = getActiveLibraryKey();
    const transform = libraryKey ? getLibraryTransform(libraryKey) : null;
    const centerX = fragment ? fragment.x : 122 + transform.x;
    const centerY = fragment ? fragment.y : 122 + transform.y;
    const startPointX = (event.clientX - rect.left) * (240 / rect.width);
    const startPointY = (event.clientY - rect.top) * (240 / rect.height);
    const startDistance = Math.max(
      12,
      Math.hypot(startPointX - centerX, startPointY - centerY)
    );
    const startAngle = Math.atan2(startPointY - centerY, startPointX - centerX) * (180 / Math.PI);
    state.dragState = {
      layerId: state.activeFragmentId,
      mode: handle.dataset.handleAction,
      startX: event.clientX,
      startY: event.clientY,
      scaleX: 240 / rect.width,
      scaleY: 240 / rect.height,
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

  const targetLayer = event.target.closest("[data-layer-id]");
  if (!targetLayer || !state.editorCollage) {
    return;
  }
  event.preventDefault();
  state.activeFragmentId = targetLayer.dataset.layerId;
  const stage = elements.collagePreview.querySelector(".collage-svg");
  if (!stage) {
    return;
  }
  const rect = stage.getBoundingClientRect();
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
    scaleX: 240 / rect.width,
    scaleY: 240 / rect.height
  };
  window.addEventListener("pointermove", handlePreviewPointerMove);
  window.addEventListener("pointerup", handlePreviewPointerUp);
  renderCollagePreviewFromForm();
}

function handlePreviewPointerMove(event) {
  if (!state.dragState) {
    return;
  }
  const fragment = getActiveFragment();
  const dx = (event.clientX - state.dragState.startX) * state.dragState.scaleX;
  const dy = (event.clientY - state.dragState.startY) * state.dragState.scaleY;
  const stage = elements.collagePreview.querySelector(".collage-svg");
  const rect = stage?.getBoundingClientRect();
  const pointX = rect ? (event.clientX - rect.left) * state.dragState.scaleX : state.dragState.centerX;
  const pointY = rect ? (event.clientY - rect.top) * state.dragState.scaleY : state.dragState.centerY;
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

function handlePreviewPointerUp() {
  state.dragState = null;
  window.removeEventListener("pointermove", handlePreviewPointerMove);
  window.removeEventListener("pointerup", handlePreviewPointerUp);
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
    core: "Nucleo vicino",
    middle: "Persona attiva",
    edge: "Margine fertile"
  }[zone] || "Persona";
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
    { key: "core", baseRadius: 16, step: 8 },
    { key: "middle", baseRadius: 31, step: 7.5 },
    { key: "edge", baseRadius: 45, step: 6.8 }
  ].forEach(({ key, baseRadius, step }) => {
    const items = grouped[key];
    items.forEach((person, index) => {
      const ringIndex = Math.floor(index / 14);
      const inRingIndex = index % 14;
      const ringCount = Math.min(14, items.length - ringIndex * 14);
      const angle = ((Math.PI * 2) / ringCount) * inRingIndex + ((stableHash(person.id) % 17) * Math.PI) / 180;
      const radius = baseRadius + ringIndex * step + (stableHash(`${person.id}-j`) % 4) - 2;
      layout.set(person.id, {
        x: clamp(50 + Math.cos(angle) * radius, 8, 92),
        y: clamp(50 + Math.sin(angle) * radius, 8, 92)
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
  return `
    <svg class="collage-svg" viewBox="0 0 280 280" role="img" aria-label="Pupazzo digitale">
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
          <path d="M86 84 C90 56, 158 48, 170 82 C178 106, 164 130, 126 136 C96 136, 82 110, 86 84 Z"></path>
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
      ${renderLibraryLayer("element", collage.element, transforms.element, interactive, selectedLayerId, editMode)}
      ${renderLibraryLayer("body", collage.body, transforms.body, interactive, selectedLayerId, editMode)}
      ${renderLibraryLayer("companion", collage.companion, transforms.companion, interactive, selectedLayerId, editMode)}
      ${renderLibraryLayer("head", collage.head, transforms.head, interactive, selectedLayerId, editMode)}
      ${includeFragments ? renderCollageFragments(fragments, interactive, selectedLayerId, editMode) : ""}
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
        ${contentMap[kind](variantId)}
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
    .map((fragment) => {
      const clipId = `frag-${sanitizeId(fragment.id)}`;
      const width = fragment.width * fragment.cropScale;
      const height = fragment.height * fragment.cropScale;
      const x = fragment.x - width / 2 + (fragment.cropX / 100) * fragment.width;
      const y = fragment.y - height / 2 + (fragment.cropY / 100) * fragment.height;
      return `
        <g data-layer-id="${interactive ? `fragment:${fragment.id}` : ""}" transform="rotate(${fragment.rotation} ${fragment.x} ${fragment.y})" opacity="${fragment.opacity}" ${interactive ? `style="cursor:grab;"` : ""}>
          <image
            href="${escapeHtml(fragment.src)}"
            x="${x}"
            y="${y}"
            width="${width}"
            height="${height}"
            preserveAspectRatio="xMidYMid slice"
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
    })
    .join("");
}

function renderSelectionHandles(bounds, layerId, editMode, isFragment) {
  const left = bounds.x;
  const top = bounds.y;
  const right = bounds.x + bounds.width;
  const bottom = bounds.y + bounds.height;
  const cx = bounds.x + bounds.width / 2;
  return `
    <rect x="${left}" y="${top}" width="${bounds.width}" height="${bounds.height}" rx="10" fill="none" stroke="rgba(187,88,53,0.74)" stroke-dasharray="6 4" stroke-width="2"></rect>
    <g class="editor-handle editor-handle-resize" data-layer-id="${layerId}" data-handle-action="resize" transform="translate(${right} ${bottom})">
      <circle r="11" fill="#fff7ef" stroke="#bb5835" stroke-width="2.5"></circle>
      <path d="M-4 4 L4 -4 M1 -4 H4 V-1 M-4 1 V4 H-1" stroke="#bb5835" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    <g class="editor-handle editor-handle-rotate" data-layer-id="${layerId}" data-handle-action="rotate" transform="translate(${cx} ${top - 20})">
      <circle r="10" fill="#2d7f83" stroke="#fff7ef" stroke-width="2.5"></circle>
      <path d="M-3 3 A5 5 0 1 1 4 -2" stroke="#fff7ef" stroke-width="2" fill="none" stroke-linecap="round"></path>
      <path d="M2 -5 L5 -2 L1 -1" fill="none" stroke="#fff7ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    <text x="${right - 18}" y="${bottom + 20}" text-anchor="end" font-size="10" font-weight="600" fill="rgba(187,88,53,0.82)">scala</text>
    <text x="${cx}" y="${top - 34}" text-anchor="middle" font-size="10" font-weight="600" fill="rgba(45,127,131,0.9)">ruota</text>
    ${isFragment ? `<text x="${cx}" y="${bottom + 36}" text-anchor="middle" font-size="10" fill="rgba(47,33,30,0.75)">${editMode === "crop" ? "ritaglio" : "sposta"}</text>` : ""}
  `;
}

function renderBody(id) {
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
            <path d="M72 134 L166 126" stroke="rgba(245,250,252,0.26)" stroke-width="3"></path>
            <path d="M84 182 L162 174" stroke="rgba(38,57,67,0.22)" stroke-width="4"></path>
          </g>
          <circle cx="90" cy="126" r="7" fill="#dfe7eb"></circle>
          <circle cx="152" cy="120" r="7" fill="#dfe7eb"></circle>
          <path d="M86 164 L154 158" stroke="#d7e0e4" stroke-width="7" stroke-linecap="round"></path>
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

function renderElement(id) {
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

function renderHead(id) {
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
          <path d="M86 84 C90 56, 158 48, 170 82 C178 106, 164 130, 126 136 C96 136, 82 110, 86 84 Z" fill="#f8f2e7"></path>
          <g clip-path="url(#headClipMask)">
            <ellipse cx="108" cy="88" rx="10" ry="7" fill="#4e4c56"></ellipse>
            <ellipse cx="140" cy="88" rx="10" ry="7" fill="#4e4c56"></ellipse>
            <path d="M108 112 C122 120, 136 120, 148 110" stroke="#b15e46" stroke-width="5" fill="none" stroke-linecap="round"></path>
            <path d="M98 62 C114 54, 142 54, 156 62" stroke="rgba(121,84,67,0.34)" stroke-width="3" fill="none"></path>
            <path d="M90 100 C100 108, 110 110, 118 112" stroke="rgba(130,95,80,0.18)" stroke-width="2" fill="none"></path>
          </g>
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
            <path d="M116 96 C124 100, 130 100, 138 96" stroke="rgba(160,95,40,0.34)" stroke-width="3" fill="none"></path>
          </g>
        </g>
      `;
    default:
      return "";
  }
}

function renderCompanion(id) {
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
  elements.authButton.textContent = state.isAdmin ? "Admin attivo" : "Admin";
  elements.signOutButton.hidden = !state.user;
  elements.exportButton.hidden = state.useCloud && !state.isAdmin;
  elements.resetButton.hidden = state.useCloud;
}

function updateStatus(mode, auth, message) {
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
  return state.isAdmin && Boolean(person);
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
    "3. Inserisci le email admin nella tabella admin_users.",
    "4. In Supabase Auth aggiungi l'URL della GitHub Page come redirect.",
    "5. Pubblica su GitHub Pages."
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
