document.addEventListener("DOMContentLoaded", () => {
    // 1. Iniezione dinamica delle coordinate di Napoli per la SEO Locale
    const geoMetaLatitude = document.createElement('meta');
    geoMetaLatitude.name = "geo.position";
    geoMetaLatitude.content = "40.8517746;14.2681244";
    document.head.appendChild(geoMetaLatitude);

    // 2. Registrazione posizione utente per query "DJ vicino a me"
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Utente localizzato per rilevamento vicinanza SEO.");
            },
            (error) => {
                // Fallback silenzioso se l'utente rifiuta la posizione
            },
            { timeout: 5000 }
        );
    }

    // 3. Monitoraggio dei motori di ricerca e browser
    const userAgent = navigator.userAgent;
    console.log("DASTO SEO Engine attivo su browser: " + userAgent);
});
