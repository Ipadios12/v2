const nav = document.querySelector(".nav");

window.addEventListener("scroll", function () {
  nav.classList.toggle("active", window.scrollY > 0);
});

////////////////////////////////////////////////////////////
//

// Aceasta este o funcție care primește un parametru numit contacts, care reprezintă un array ce conține informații despre contacte.
// Scopul funcției este de a afișa aceste informații pe pagină, în elementul HTML cu id-ul 'contacts'
function displayContactInfo(contacts) {
  // Această linie obține o referință către elementul HTML cu id-ul 'contacts'.
  // Acest element va fi containerul în care vor fi afișate informațiile despre contacte
  const contactsDiv = document.getElementById("contacts");
  //   Această linie golește conținutul elementului 'contacts' în cazul în care există deja informații acolo.
  //   Astfel, asigurăm că se afișează doar informațiile noi și nu se acumulează informații vechi.
  contactsDiv.innerHTML = "";
  // Această linie creează un nou element HTML de tip div, care va fi containerul pentru fiecare informație de contact.
  const containerDiv = document.createElement("div");
  //  ceastă linie adaugă clasa CSS 'contact-container' la noul element div creat.
  //   Prin adăugarea acestei clase, se aplică stilurile corespunzătoare definite în fișierul CSS.
  containerDiv.classList.add("contact-container");
  // Această linie verifică dacă contacts este un array utilizând funcția Array.isArray().
  //   Dacă contacts este un array, se intră în blocul de cod din interiorul lui.
  //   Dacă contacts nu este un array, se intră în blocul de cod din else și se afișează un mesaj de eroare în consolă.
  if (Array.isArray(contacts)) {
    // Această linie iterează prin fiecare element din array-ul contacts.
    contacts.forEach((contact) => {
      // Pentru fiecare element, se execută un bloc de cod care creează un element div (contactDiv) și îi atribuie informațiile despre nume, email și telefon utilizând template literals.
      const contactDiv = document.createElement("div");
      contactDiv.innerHTML = `
     <h2>${contact.name}</h2>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.phone}</p>
      `;
      containerDiv.appendChild(contactDiv);
    });
  } else {
    console.error("contacts nu este un array!");
  }
  // Această linie adaugă containerDiv, care conține informațiile despre contacte, în elementul 'contacts' de pe pagină.
  contactsDiv.appendChild(containerDiv);
}
// Aceasta este o funcție care realizează o cerere de rețea pentru a obține fișierul JSON
function fetchAndDisplayContactInfo() {
  // Această linie realizează o cerere de rețea folosind funcția fetch() pentru a obține fișierul JSON "contacts.json".
  fetch("contacts.json")
    //  then este utilizat pentru a prelucra răspunsul primit de la cerere.
    .then((response) => response.json())
    // Parametrul data reprezintă obiectul JSON care conține informațiile despre contacte.
    .then((data) => {
      const contacts = data.contacts;
      //   Această linie apelează funcția displayContactInfo() și îi transmite array-ul
      displayContactInfo(contacts);
    })
    // Această linie capturează orice eroare care poate apărea în timpul procesului de preluare a datelor JSON.
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Această linie obține elementul HTML cu id-ul 'contact-link'.
const contactLink = document.getElementById("contact-link");
contactLink.addEventListener("click", function (event) {
  // Această linie previne comportamentul implicit al linkului atunci când este apăsat
  event.preventDefault();
  fetchAndDisplayContactInfo();
});

// /////////////////////////////////////////////////

const homeLink = document.getElementById("home-link");

homeLink.addEventListener("click", function (event) {
  event.preventDefault();
  // Redirecționează utilizatorul către pagina principală (home)
  window.location.href = "index.html";
});
