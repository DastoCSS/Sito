document.addEventListener("DOMContentLoaded", () => {
    // Iniezione dinamica coordinate di Napoli per SEO Locale
    const geoMeta = document.createElement('meta');
    geoMeta.name = "geo.position";
    geoMeta.content = "40.8517746;14.2681244";
    document.head.appendChild(geoMeta);

    // Geolocalizzazione per query "DJ vicino a me"
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Posizione verificata per rilevamento vicinanza.");
            },
            (error) => {},
            { timeout: 5000 }
        );
    }
});
