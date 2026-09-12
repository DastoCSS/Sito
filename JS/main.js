document.addEventListener("DOMContentLoaded", () => {
    // Iniezione dinamica coordinate
    const geoMeta = document.createElement('meta');
    geoMeta.name = "geo.position";
    geoMeta.content = "40.8517746;14.2681244";
    document.head.appendChild(geoMeta);

    // Geolocalizzazione utente per ricerche locali
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
