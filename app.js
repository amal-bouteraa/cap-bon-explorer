const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".navbar .nav-link");

navLinks.forEach(function(link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("CAP BON EXPLORER : JavaScript fonctionne !");
const contactForm = document.getElementById("contactForm");
const contactConfirmation = document.getElementById("contactConfirmation");

if (contactForm && contactConfirmation) {

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        contactConfirmation.hidden = false;
        contactConfirmation.textContent =
            "Votre message a été envoyé avec succès ! Aucune donnée n'a été envoyée à un serveur : il s'agit d'une simulation."
        contactForm.reset();
        contactConfirmation.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

}

