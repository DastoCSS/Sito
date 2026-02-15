# DASTO DJ - Sito Web Ottimizzato SEO

## 🎵 Panoramica

Sito web professionale per DASTO DJ, ottimizzato per SEO e performance. Include:
- Design responsive moderno
- Animazioni canvas fluide
- SEO on-page completo
- Structured data (Schema.org)
- Performance ottimizzate
- Accessibilità WCAG 2.1

---

## 📁 Struttura File

```
DASTO-DJ-Website/
│
├── index.html              # Pagina principale (HTML ottimizzato)
├── CSS/
│   └── style.css          # Stili completi (CSS ottimizzato)
├── JS/
│   └── main.js            # JavaScript (animazioni + analytics)
├── img/                   # Immagini
│   ├── copertina_GT.png
│   └── copertina_flashmob.png
├── pdf/                   # PDF scaricabili
│   ├── Listino-Prezzi-DASTO-DJ-2026.pdf
│   └── dasto-dj-producer-press-kit-2026.pdf
│
└── SEO-IMPROVEMENTS-GUIDE.md  # Documentazione miglioramenti
```

---

## 🚀 Installazione

### Opzione 1: Sostituzione File su GitHub Pages

1. **Backup file esistenti** (importante!)
   ```bash
   # Clona il repository attuale
   git clone https://github.com/dastocss/Sito.git dasto-backup
   ```

2. **Sostituisci i file**
   - Sostituisci `index.html` con il nuovo
   - Sostituisci `CSS/style.css` con il nuovo
   - Sostituisci `JS/main.js` con il nuovo

3. **Commit e push**
   ```bash
   git add .
   git commit -m "SEO optimization - improved meta tags, structured data, performance"
   git push origin main
   ```

4. **Verifica** su https://dastocss.github.io/Sito/

### Opzione 2: Deploy da Zero

1. **Crea struttura cartelle**
   ```bash
   mkdir -p DASTO-DJ-Website/{CSS,JS,img,pdf}
   ```

2. **Copia file**
   - `index.html` nella root
   - `style.css` in `CSS/`
   - `main.js` in `JS/`
   - Immagini in `img/`
   - PDF in `pdf/`

3. **Rinomina PDF** (importante per SEO)
   - `Listino Prezzi.pdf` → `Listino-Prezzi-DASTO-DJ-2026.pdf`
   - `dasto-dj-producer-press-kit-2026.pdf` (ok come è)

4. **Test locale**
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (se hai live-server)
   npx live-server
   ```

5. **Deploy su GitHub Pages**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SEO optimized site"
   git branch -M main
   git remote add origin https://github.com/dastocss/Sito.git
   git push -u origin main
   ```

---

## ✅ Checklist Post-Installazione

### Verifica Tecnica
- [ ] Sito carica correttamente
- [ ] Animazione canvas funziona
- [ ] SoundCloud player visibile
- [ ] Link social funzionanti
- [ ] Mappa Google Maps visibile
- [ ] PDF scaricabili funzionano
- [ ] Responsive su mobile (test iPhone, Android)
- [ ] Test browser (Chrome, Safari, Firefox, Edge)

### Test Performance
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
  - Target: Score >90 mobile e desktop
- [ ] Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- [ ] Lighthouse (Chrome DevTools)
  - Performance: >90
  - Accessibility: >90
  - Best Practices: >90
  - SEO: 100

### Verifica SEO
- [ ] Google Search Console: Submit sitemap
- [ ] Structured Data Test: https://validator.schema.org/
  - Incolla URL del sito
  - Verifica 3 schema: ProfessionalService, Person, FAQPage
- [ ] Rich Results Test: https://search.google.com/test/rich-results
- [ ] Meta tags con: https://metatags.io/

---

## 🔧 Configurazioni Aggiuntive

### 1. Google Search Console

1. Vai su: https://search.google.com/search-console
2. Aggiungi proprietà: `https://dastocss.github.io/Sito/`
3. Verifica proprietà (meta tag già presente nell'HTML ✅)
4. Submit sitemap (da creare - vedi sotto)

### 2. Crea Sitemap.xml

Crea file `sitemap.xml` nella root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dastocss.github.io/Sito/</loc>
    <lastmod>2026-02-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Submit a Google Search Console.

### 3. Crea Robots.txt

Crea file `robots.txt` nella root:

```
User-agent: *
Allow: /
Sitemap: https://dastocss.github.io/Sito/sitemap.xml

User-agent: GPTBot
Disallow: /
```

### 4. Google My Business (PRIORITÀ MASSIMA)

1. Vai su: https://www.google.com/business/
2. Crea nuovo profilo business
3. Compila tutti i campi:
   - Nome: DASTO DJ
   - Categoria: DJ Service / Entertainment Service
   - Indirizzo: Via Salita Vetriera, 80132 Napoli
   - Telefono: +39 351 409 0392
   - Sito web: https://dastocss.github.io/Sito/
   - Orari: Lun-Dom 9:00-22:00
4. Carica foto (minimo 10):
   - Logo
   - Setup attrezzatura
   - Eventi
   - Location
5. Verifica proprietà (cartolina o telefono)

### 5. Google Analytics 4

Il codice è già nel sito (G-7E2MJ7PNF5 ✅).

Verifica che sia attivo:
1. Google Analytics → Admin → Property → Data Streams
2. Controlla che il sito riceva dati

---

## 🎨 Personalizzazioni

### Cambio Colori Brand

Nel file `CSS/style.css`, modifica le variabili:

```css
:root {
    --bg: #050505;              /* Sfondo principale */
    --accent: #25d366;          /* Verde WhatsApp (brand) */
    --accent-hover: #1faa52;    /* Hover */
    --glass: rgba(10, 10, 10, 0.75);  /* Effetto vetro */
}
```

### Modifica Animazione Canvas

Nel file `JS/main.js`, sezione `BLOB_CONFIG`:

```javascript
const BLOB_CONFIG = {
    count: 5,              // Numero di blob (3-7)
    minRadius: 40,         // Dimensione minima
    maxRadius: 120,        // Dimensione massima
    minSpeed: 0.15,        // Velocità minima
    maxSpeed: 0.3,         // Velocità massima
    colors: [              // Palette colori
        '#0f051a',
        '#1a0033',
        '#220000',
        '#0a0a0a',
        '#001a1a'
    ]
};
```

### Aggiungi Nuove Sezioni

Nel file `index.html`, dopo la sezione esistente:

```html
<section id="nuova-sezione" class="custom-section">
    <h2 class="section-title">Titolo Nuova Sezione</h2>
    <div class="content">
        <!-- Contenuto qui -->
    </div>
</section>
```

Aggiungi CSS in `style.css`:

```css
.custom-section {
    margin: 50px 0;
    padding: 30px;
    background: var(--glass-light);
    border-radius: 20px;
}
```

---

## 📱 Test Mobile

### iPhone
```
Safari iOS
- Verifica touch targets
- Verifica swipe scroll
- Verifica WhatsApp button
```

### Android
```
Chrome Android
- Verifica animazioni
- Verifica font size
- Verifica form (se presenti)
```

### Strumenti di Test
- Chrome DevTools (Device Mode)
- Firefox Responsive Design Mode
- BrowserStack (per test reali)
- LambdaTest

---

## 🐛 Troubleshooting

### Problema: Canvas non si vede

**Soluzione**:
1. Controlla console browser (F12)
2. Verifica che `canvas-bg` sia nel HTML
3. Verifica che `main.js` sia caricato
4. Controlla z-index CSS

### Problema: Mappa Google non carica

**Soluzione**:
1. Verifica connessione internet
2. Controlla iframe src nell'HTML
3. Verifica Google Maps API (se necessaria)
4. Testa su browser diverso

### Problema: Link WhatsApp non funziona su desktop

**Comportamento normale**: WhatsApp Web si apre se app non installata.

**Alternativa**: Cambia link in:
```html
<a href="tel:+393514090392">Chiama</a>
```

### Problema: Performance basse su mobile

**Soluzioni**:
1. Riduci numero blob nel canvas (da 5 a 3)
2. Comprimi immagini ulteriormente (TinyPNG)
3. Converti PNG → WebP
4. Abilita Gzip compression su server

---

## 📊 Monitoraggio Prestazioni

### KPI da Tracciare (Settimanalmente)

**Google Analytics**:
- Utenti
- Sessioni
- Durata media sessione
- Frequenza rimbalzo
- Conversioni (click WhatsApp, download PDF)

**Google Search Console**:
- Impressions
- Click
- CTR
- Posizione media
- Query di ricerca

**Google My Business**:
- Visualizzazioni
- Click "Chiama"
- Click "Indicazioni"
- Ricerche dirette vs ricerche discovery

### Target 6 Mesi

| Metrica | Attuale | Target 6m | Crescita |
|---------|---------|-----------|----------|
| Utenti/mese | 16 | 200+ | +1150% |
| Keyword ranking | - | Top 10 | - |
| Backlinks | 0 | 20+ | - |
| Recensioni | 0 | 15+ | - |

---

## 🔐 Sicurezza

### Headers Consigliati

Se hai accesso alla configurazione server, aggiungi:

```
Content-Security-Policy: default-src 'self' 'unsafe-inline' https:
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```

### Privacy

- Cookie policy (se necessaria per GDPR)
- Privacy policy (link footer)
- Terms of service (opzionale)

---

## 📞 Supporto

Per domande o assistenza:

**Email**: [inserire email]  
**WhatsApp**: +39 351 409 0392  
**Instagram**: @dastodj  
**SoundCloud**: /dasto

---

## 🎉 Prossimi Step

1. **Immediato** (Questa settimana)
   - [ ] Deploy nuovi file
   - [ ] Test completo funzionalità
   - [ ] Crea Google My Business
   - [ ] Submit sitemap

2. **Breve termine** (Questo mese)
   - [ ] Raccogli 5 recensioni Google
   - [ ] Outreach 5 directory locali
   - [ ] Pubblica 2 video YouTube
   - [ ] Ottimizza social media

3. **Medio termine** (Prossimi 3 mesi)
   - [ ] Avvia blog (2 articoli/mese)
   - [ ] Acquisici 10 backlinks
   - [ ] 15+ recensioni Google
   - [ ] Partnership venue

---

## 📜 Licenza

© 2026 DASTO DJ - Tutti i diritti riservati

---

## 📚 Risorse Aggiuntive

- **SEO**: [Guida completa SEO-IMPROVEMENTS-GUIDE.md](SEO-IMPROVEMENTS-GUIDE.md)
- **Google Docs SEO**: https://developers.google.com/search
- **Schema.org**: https://schema.org/
- **Web.dev**: https://web.dev/measure/

---

**Ultima modifica**: 15 Febbraio 2026  
**Versione**: 1.0  
**Autore**: Claude (Anthropic)
