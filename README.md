# Atlante Meticcio

Prototipo statico per Cantieri Meticci, pronto per GitHub Pages e predisposto per Supabase.

## File principali

- `index.html`: struttura dell'app
- `styles.css`: interfaccia, atmosfera visiva, animazioni
- `app.js`: mappa, filtri, editor, connessioni, accesso admin, sync
- `config.js`: configurazione locale del progetto Supabase
- `supabase/schema.sql`: tabella e policy iniziali
- `../.github/workflows/deploy-pages.yml`: deploy automatico su GitHub Pages

## Cosa fa ora

- mappa relazionale centro/periferia
- galleria di pupazzi digitali
- filtri per ricerca, disponibilita e zona
- editor per creare o modificare una presenza
- connessioni visive tra persone con parole chiave o talenti in comune
- animazioni leggere dei nodi e delle linee
- modalita locale con `localStorage`
- modalita cloud pubblica con Supabase
- creazione profili senza login
- login solo admin via magic link
- admin puo modificare, nascondere, cancellare ed esportare

## Configurare Supabase

### 1. Crea un progetto Supabase

Ti servono:

- `Project URL`
- `anon public key`

### 2. Esegui lo schema SQL

Apri Supabase SQL Editor e incolla il contenuto di:

- [schema.sql](./supabase/schema.sql)

Questo crea le tabelle `community_profiles` e `admin_users` e abilita policy RLS:

- chiunque apre la pagina puo leggere i profili visibili
- chiunque apre la pagina puo creare un nuovo profilo senza login
- solo gli admin possono vedere profili nascosti
- solo gli admin possono modificare, nascondere o cancellare profili

### 3. Abilita gli admin

Dopo avere creato il tuo utente admin con magic link, aggiungi la sua email nella tabella `admin_users`.

Nel SQL Editor puoi eseguire:

```sql
insert into public.admin_users (email)
values ('nome@cantierimeticci.org');
```

### 4. Configura `config.js`

Apri:

- [config.js](./config.js)

e sostituisci i valori vuoti:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_ANON_KEY",
  SITE_URL: "https://TUO-ACCOUNT.github.io/TUO-REPO/"
};
```

`SITE_URL` deve essere l'URL pubblico della GitHub Page finale.

### 5. Configura il redirect URL in Supabase Auth

In Supabase vai in `Authentication > URL Configuration` e aggiungi:

- l'URL della tua GitHub Page
- se vuoi testare in locale, anche l'URL locale che usi

Esempio:

- `https://tuo-account.github.io/tuo-repo/`

## Pubblicazione automatica su GitHub Pages

Il workflow:

- [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml)

pubblica la cartella `cantieri-meticci-prototype` quando fai push su `main`.

### Cosa fare su GitHub

1. carica il repository su GitHub
2. vai in `Settings > Pages`
3. imposta `Build and deployment` su `GitHub Actions`
4. fai push su `main`

Il workflow usa le action ufficiali GitHub Pages.

## Uso

### Modalita locale

Se `config.js` resta vuoto, l'app funziona comunque:

- salva nel browser
- non condivide i dati con altri utenti

### Modalita cloud pubblica

Se `config.js` e compilato:

1. la mappa legge i profili visibili da Supabase
2. chiunque puo premere `Aggiungi persona`
3. il profilo viene salvato nel database condiviso senza login
4. il pulsante `Admin` serve solo a chi ha la mail presente in `admin_users`

Se il database condiviso e vuoto, l'app resta in modalita cloud ma mostra una mappa vuota. Aggiungi la prima persona per popolare lo spazio condiviso.

### Area admin

Gli admin accedono con magic link e possono:

- modificare profili pubblicati
- nascondere un profilo dalla mappa pubblica
- cancellare definitivamente un profilo
- esportare il JSON completo

## Note progettuali

Questa versione e pensata per condivisione interna o semi-pubblica: la creazione e libera, ma moderazione e cancellazione restano riservate agli admin.

Se vuoi il passo successivo corretto, io farei:

- approvazione preventiva dei nuovi profili
- codice laboratorio anti-spam
- upload di immagini vere per il collage
- relazioni esplicite tra persone oltre alle affinita automatiche
- vista timeline dei movimenti verso centro e periferia
