# CLAG — versione installabile

Cartella pronta da pubblicare: serve un indirizzo **https** (va bene GitHub Pages,
Netlify, o qualsiasi spazio web). Aperta da lì, la pagina si installa come app e
funziona anche senza rete.

## Contenuto

- `index.html` — il gioco (file unico, nessuna dipendenza esterna)
- `manifest.webmanifest` — nome, icona, colori, avvio a schermo intero
- `sw.js` — tiene la copia locale del gioco
- `icons/` — le icone

## Come si installa

- **Android / Chrome:** apri l'indirizzo, menù ⋮ → *Installa app* (o *Aggiungi a schermata Home*).
- **iPhone / Safari:** apri l'indirizzo, tasto Condividi → *Aggiungi a Home*.

## Quando ti mando una versione nuova

Sostituisci tutti i file e **cambia il numero in `sw.js`**, riga `CACHE_VERSION`:
da `'clag-v9'` a `'clag-v10'`. È quello che dice al telefono di buttare la copia
vecchia. Senza quel cambio potresti continuare a giocare con la versione di prima.

Versione attuale della cache: **clag-v9**.
