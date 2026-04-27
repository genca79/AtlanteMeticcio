# Atlante Meticcio

Prototipo statico per Cantieri Meticci, pronto per GitHub Pages e Supabase.

## File principali

- `index.html`: struttura dell'app
- `styles.css`: interfaccia e animazioni
- `app.js`: mappa, filtri, editor, connessioni e sync
- `config.js`: configurazione Supabase e codice laboratorio
- `supabase/schema.sql`: tabella e policy iniziali
- `../.github/workflows/deploy-pages.yml`: deploy automatico su GitHub Pages

## Modalita scelta

Questa versione usa un codice laboratorio condiviso:

- chiunque apre il link puo vedere la mappa
- per creare un pupazzo serve il codice laboratorio
- per modificare, nascondere o cancellare serve lo stesso codice
- non servono email, account o magic link

Il codice e configurato in `config.js`:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_ANON_KEY",
  SITE_URL: "https://TUO-ACCOUNT.github.io/TUO-REPO/",
  ACCESS_CODE: "meticci2026"
};
```

Nota: e una protezione leggera, adatta a un esperimento o laboratorio interno. In una app statica il codice non e un segreto forte.

## Configurare Supabase

1. Crea un progetto Supabase.
2. Copia `Project URL` e `anon public key`.
3. Apri Supabase SQL Editor.
4. Incolla ed esegui `supabase/schema.sql`.
5. Compila `config.js`.

Lo schema abilita:

- lettura pubblica dei profili visibili
- creazione pubblica
- modifica pubblica
- cancellazione pubblica

La limitazione pratica avviene nell'interfaccia tramite `ACCESS_CODE`.

## Pubblicazione GitHub Pages

Il workflow:

- [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml)

pubblica la cartella `cantieri-meticci-prototype` quando fai push su `main`.

Su GitHub:

1. vai in `Settings > Pages`
2. imposta `Build and deployment` su `GitHub Actions`
3. fai push su `main`

## Uso

Se `config.js` e compilato, l'app usa Supabase come mappa condivisa.

Se `config.js` resta vuoto, l'app funziona in locale con `localStorage`, ma i dati non sono condivisi.

Per cambiare il codice laboratorio, modifica `ACCESS_CODE` in `config.js` e ripubblica.
