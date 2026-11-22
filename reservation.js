
const prixActivites = {
    A01: 20,
    A02: 35,
    A03: 30,
    A04: 25,
    A05: 40,
    A06: 25,
    A07: 15,
    A08: 30
};

const choixActivite = document.getElementById("activity");
const nombrePersonnes = document.getElementById("participants");

const prixUnitaire = document.getElementById("unitPrice");
const sousTotal = document.getElementById("subtotal");
const reduction = document.getElementById("discount");
const prixTotal = document.getElementById("total");

const formulaire = document.getElementById("reservationForm");
const confirmation = document.getElementById("confirmation");
 
const dateReservation = document.getElementById("date");function definirDateMinimale() {
    const aujourdHui = new Date();

    const annee = aujourdHui.getFullYear();
    const mois = String(aujourdHui.getMonth() + 1).padStart(2, "0");
    const jour = String(aujourdHui.getDate()).padStart(2, "0");

    const dateMin = `${annee}-${mois}-${jour}`;

    dateReservation.min = dateMin;
}

definirDateMinimale();



function calculerPrix() {

    const activite = choixActivite.value;
    const nombre = parseInt(nombrePersonnes.value) || 0;

    const prix = prixActivites[activite] || 0;

    const subtotal = prix * nombre;

    let remise = 0;

    if (nombre >= 4) {
        remise = subtotal * 0.10;
    }

    const montantFinal = subtotal - remise;

    prixUnitaire.textContent = prix + " TND";
    sousTotal.textContent = subtotal.toFixed(2) + " TND";
    reduction.textContent = remise.toFixed(2) + " TND";
    prixTotal.textContent = montantFinal.toFixed(2) + " TND";
}


     nombrePersonnes.addEventListener("input", function() {
    calculerPrix();
    confirmation.hidden = true;
});
    choixActivite.addEventListener("change", function() {
    calculerPrix();
    confirmation.hidden = true;
});

formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    confirmation.hidden = true;

    const formError = document.getElementById("formError");

    formError.hidden = true;
    formError.textContent = "";
    if (!formulaire.checkValidity()) {
        formError.textContent =
            "Veuillez remplir correctement tous les champs obligatoires.";
        formError.hidden = false;
        formulaire.reportValidity();
        return;
    }

    const email = formulaire.querySelector('input[type="email"]');

    if (!email || !email.validity.valid) {
        formError.textContent =
            "Veuillez saisir une adresse e-mail valide.";
        formError.hidden = false;
        return;
    }

    const telephone = formulaire.querySelector('input[type="tel"]');

    if (!telephone || telephone.value.trim() === "") {
        formError.textContent =
            "Veuillez saisir votre numéro de téléphone.";
        formError.hidden = false;
        return;
    }

    const nombre = Number(nombrePersonnes.value);

    if (!Number.isInteger(nombre) || nombre < 1 || nombre > 6) {
        formError.textContent =
            "Le nombre de participants doit être compris entre 1 et 6.";
        formError.hidden = false;
        return;
    }

    const dateChoisie = dateReservation.value;

    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const dateSelectionnee = new Date(dateChoisie + "T00:00:00");

    if (!dateChoisie || dateSelectionnee < aujourdHui) {
        formError.textContent =
            "La date choisie est invalide. Veuillez choisir aujourd'hui ou une date future.";
        formError.hidden = false;
        return;
    }

    if (!choixActivite.value) {
        formError.textContent =
            "Veuillez choisir une activité.";
        formError.hidden = false;
        return;
    }

    const conditions = formulaire.querySelector('input[type="checkbox"]');

    if (!conditions || !conditions.checked) {
        formError.textContent =
            "Vous devez accepter les conditions de simulation.";
        formError.hidden = false;
        return;
    }
    confirmation.hidden = false;

    confirmation.className = "alert alert-success mt-4";

    const nomActivite =
        choixActivite.options[choixActivite.selectedIndex].text;

    confirmation.innerHTML = `
        <h5>Simulation enregistrée avec succès !</h5>
        <p><strong>Activité :</strong> ${nomActivite}</p>
        <p><strong>Date :</strong> ${dateReservation.value}</p>
        <p><strong>Participants :</strong> ${nombrePersonnes.value}</p>
        <p><strong>Total :</strong> ${prixTotal.textContent}</p>
        <hr>
        <p>Simulation enregistrée localement à l'écran :
        aucune réservation réelle n'a été effectuée.</p>
    `;

});
formulaire.addEventListener("reset", function() {
    confirmation.hidden = true;
    setTimeout(calculerPrix, 0);
});

calculerPrix();

    