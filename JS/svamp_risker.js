let articleSectionRef

function init(){
    articleSectionRef = document.getElementById("articles"); // Hämta data från element med id "articles" //
    fetchProducts(); // Kör vår funktion för att hämta JSON-data //
}
window.onload = init;

// Async funktion för att hämta data från vårt json-dokument //
async function fetchProducts(){
    try{
        const response = await fetch("/JSON/speciellaEgenskaper.json"); // Vi väntar på att få respons data från produkter.json  //

        if (!response.ok){ // OM nåt går fel när vi hämtar respons datan så säg att nåt gick fel och hoppa till catch //
            throw new Error("Någonting gick fel vid hämtningen");
        }
        
        const data = await response.json(); // Vänta på att göra om respons datan till JS-format vi kan använda oss av. //
        createArticles(data);
    }
    catch(error){
        console.error("Fel:", error); // Ge oss error data så vi kan felsöka //
    }
}

// Funktion för att skapa våra artiklar //
function createArticles(data){
    data.särskiljande_egenskaper.forEach(article => { // FÖR VARJE produkt i vårt json dokument kör funktion med produkt array som bas //
        const articleElement = document.createElement("article"); // Skapa ett html-element för artiklar //

        let element = createElement("h2", article.par); // Skapa en h2 med värdet av "namn" från json-dokumentet //
        articleElement.appendChild(element); // Lägg till inuti article elementet //

        element = createElement("p", article.risk);
        articleElement.appendChild(element);

        element = createElement("p", article.särskiljande);
        articleElement.appendChild(element);

        articleSectionRef.appendChild(articleElement); // Lägg till hela artikeln med barn i vår section //
    });
}

// Funktion för att skapa våra element inuti artiklarna //
function createElement(elementType, productContent){
    const element = document.createElement(elementType); // Skapa ett html-element med inmatat värde //
    element.textContent = productContent; // Skriv in inmatat värde mellan <> och </> //
    return element;
}