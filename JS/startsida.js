const svamparContainer = document.getElementById('svamp-section');

async function fetchDataFromJson() {
  try{
    const response = await fetch('../JSON/svampar.json');
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Funktion för att korta ner texten som visas i korten
function getEatable(text) {
  return text.split("–")[0].trim();
}
// Funktion för att korta ner texten som visas i korten
function getKommun(fyndplats) {
  return fyndplats.split(",")[0].trim();
}

function createArticle(svamp) {
  const article = document.createElement('article');
  article.classList.add('svamp');

  article.innerHTML = `
    <img src="../svampar/${svamp.bild}" alt="${svamp.svenskt_namn}">
    <div class="svamp-info">
      <h3>${svamp.svenskt_namn}</h3>
      <p><em>${svamp.latinskt_namn}</em></p>
      <p>${getEatable(svamp["ätlig"])}</p>
      <p><strong>Fyndplats:</strong> ${getKommun(svamp.fyndplats)}</p>
      <button class="svampButton">Spara till mina svampar</button>
    </div>
  `;

  return article;
}
// Funktion för att markera ätliga och giftiga svampar med olika färger
function highlightEatable(){
  const stycken = document.querySelectorAll('.svamp-info p');

  stycken.forEach(p => {
    const text = p.textContent.toLowerCase().trim();
    
    if (text.includes("ätlig")) {
      p.classList.add("eatable", "highlight-green");
    } else if (text.includes("giftig")) {
      p.classList.add("eatable", "highlight-red");
    }
  });
}

async function saveMushroom (mushroom){
    const mushroomList = JSON.parse(localStorage.getItem('mushroom')) || [];
    mushroomList.push(mushroom);
    localStorage.setItem('mushroom', JSON.stringify(mushroomList))
    };

function buildMushroomObject(sName, lName, sBild){
    return  {
            svenskt_namn: sName,
            latinskt_namn: lName,
            bild: sBild,
        };
}

async function searchArticles() {
    const articles = document.querySelectorAll(".svamp")
    articles.forEach(articel =>{
        const swedishName = articel.querySelector(".h3")
        const latinName = articel.querySelector(".em")
        const bild = articel.querySelector(".img")
        const button = articel.querySelector(".svampButton")
        button.addEventListener("click", () => {
            const mushroomObject = buildMushroomObject(swedishName, latinName, bild)
            saveMushroom(mushroomObject)
        });
        
    });
    
}

// Initiering funktion för att köra alla funktioner som behövs för att visa svamparna på startsidan
async function init() {
  const data = await fetchDataFromJson();
  const svampar = data.svampar;
  svampar.forEach(svamp => {
    const article = createArticle(svamp);
    svamparContainer.appendChild(article);
  });
  highlightEatable();
}

init();
