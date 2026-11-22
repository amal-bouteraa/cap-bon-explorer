const activities = {
    A01: {
        title: "Découverte de la médina",
        category: "Culture",
        location: "Nabeul",
        duration: "2h",
        price: 20,
        description: "Explorez les ruelles de la médina de Nabeul et découvrez son patrimoine traditionnel.",
        details:"Partez à la découverte de la médina de Nabeul et de ses ruelles traditionnelle.Admirez l'architecture locale et découvrez l'histoire de la ville. Explorez les boutiques artisanales et les produits typiques de la région.Cette visite vous permettra de mieux connaître la culture et les traditions de Nabeul."
    },

    A02: {
        title: "Atelier d’initiation à la poterie",
        category: "Artisanat",
        location: "Nabeul",
        duration: "1 h 30",
        price: 35,
        description: "Découvrez les techniques traditionnelles de fabrication de la poterie.",
        details:"Découvrez l'art traditionnel de la poterie à Nabeul, une ville réputée pour son savoir-faire artisanal. Participez à un atelier et apprenez les différentes étapes de fabrication des objets en céramique. Accompagné par des techniques traditionnelles, vous pourrez découvrir le travail de l'argile et les outils utilisés par les artisans. Une expérience enrichissante pour découvrir l'artisanat local."
    },

    A03: {
        title: "Parcours découverte de Kerkouane",
        category: "Culture",
        location: "Kerkouane",
        duration: "2 h 30",
        price: 30,
        description: "Découvrez les vestiges historiques de l'ancienne cité de Kerkouane.",
        details: "Explorez le site archéologique de Kerkouane et découvrez les vestiges d'une ancienne cité punique. Observez les ruines, les anciennes habitations et les traces de la vie quotidienne de ses habitants. Cette visite vous permettra d'en apprendre davantage sur l'histoire et la civilisation punique. Profitez d'un parcours culturel au cœur d'un site historique exceptionnel."
    },

    A04: {
        title: "Randonnée découverte",
        category: "Nature",
        location: "Djebel Abderrahmane",
        duration: "3h",
        price: 25,
        description: "Profitez d'une randonnée et découvrez les paysages naturels de la région.",
        details:"Partez pour une randonnée au Djebel Abderrahmane et profitez de la beauté des paysages naturels du Cap Bon. Découvrez les chemins, la végétation et les panoramas de la région. Cette activité vous permettra de passer un moment en plein air tout en explorant la nature. N'oubliez pas de profiter des pauses pour admirer les paysages et prendre des photos."
    },

    A05: {
        title: "Circuit du littoral",
        category: "Nature",
        location: "Kélibia",
        duration: "3h",
        price: 40,
        description: "Admirez les paysages côtiers et découvrez le littoral de Kélibia.",
        details: "Découvrez le littoral de Kélibia et admirez ses paysages entre mer, plages et nature. Profitez d'une promenade pour observer les différentes vues sur la côte et apprécier la beauté de la Méditerranée. Le circuit vous permettra de découvrir les particularités de la région et ses paysages marins. Une expérience idéale pour les amoureux de la nature et des panoramas côtiers."
    },

    A06: {
        title: "Peinture sur céramique",
        category: "Artisanat",
        location: "Nabeul",
        duration: "2h",
        price: 25,
        description: "Exprimez votre créativité avec les motifs et les couleurs de la céramique.",
        details:"Participez à une activité artistique autour de la peinture sur céramique à Nabeul. Découvrez les motifs traditionnels, les couleurs et les techniques de décoration utilisées par les artisans. Laissez libre cours à votre créativité en imaginant votre propre décoration. Cette expérience vous permettra de découvrir un aspect important du patrimoine artisanal de la région."
    },

    A07: {
        title: "Découverte d’un marché local",
        category: "Découverte",
        location: "Nabeul",
        duration: "1 h 30",
        price: 15,
        description: "Découvrez les produits locaux et l'ambiance d'un marché traditionnel.",
        details:"Explorez un marché traditionnel de Nabeul et découvrez son ambiance animée. Parcourez les différents stands proposant des produits locaux, des fruits, des épices et des articles artisanaux. Observez les habitudes des commerçants et découvrez les spécialités de la région. Cette visite vous permettra de vivre une expérience authentique au cœur de la vie locale."
    },

    A08: {
        title: "Promenade photographique",
        category: "Découverte",
        location: "Hammamet",
        duration: "2h",
        price: 30,
        description: "Capturez les paysages et les endroits remarquables de Hammamet.",
        details: "Partez pour une promenade photographique à Hammamet et découvrez les endroits les plus charmants de la ville. Explorez les ruelles, les paysages, les détails architecturaux et les vues sur la mer. Profitez de cette balade pour capturer vos meilleurs souvenirs à travers vos photos. Cette activité combine découverte, créativité et exploration de la ville."
    }
};
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const activitiesContainer = document.getElementById("activitiesContainer");
const activitiesCount = document.getElementById("activitiesCount");
const noResults = document.getElementById("noResults");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");


function filterActivities() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const cards = document.querySelectorAll(".activity-card");
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const location = card.dataset.location.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            location.includes(searchText);

        const matchesCategory =
            selectedCategory === "Toutes" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove("d-none");
            visibleCount++;
        } else {
            card.classList.add("d-none");
        }
    });

    activitiesCount.textContent =
        visibleCount + (visibleCount > 1 ? " activités disponibles" : " activité disponible");

    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterActivities);
categoryFilter.addEventListener("change", filterActivities);

document.querySelectorAll(".details-button").forEach(button => {

    button.addEventListener("click", function () {

        const activityId = this.dataset.activityId;
        const activity = activities[activityId];

        if (!activity) {
            modalBody.textContent = "Informations indisponibles.";
            return;
        }

        modalTitle.textContent = activity.title;

        modalBody.innerHTML = `
            <div class="mb-3">
                <h5>Description</h5>
                <p>${activity.description}</p>
            </div>

            <p><strong>Catégorie :</strong> ${activity.category}</p>
            <p><strong>Lieu :</strong> ${activity.location}</p>
            <p><strong>Durée :</strong> ${activity.duration}</p>
            <p><strong>Prix :</strong> ${activity.price} TND / personne</p>

            <hr>

            <h5>À propos de cette activité</h5>
            <p>${activity.details}</p>
        `;
    });

});