async function fetchData() {
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

const svamparContainer = document.getElementById('svamp-section');

function createArticle(svamp) {
  const article = document.createElement('article');
  article.classList.add('svamp');

  article.innerHTML = `
    <img src="../svampar/${svamp.bild}" alt="${svamp.svenskt_namn}">
    <div class="svamp-info">
      <h3>${svamp.svenskt_namn}</h3>
      <p><em>${svamp.latinskt_namn}</em></p>
      <p>${svamp["ätlig"]}</p>
      <p>Fyndplats: ${svamp.fyndplats}</p>
    </div>
  `;

  return article;
}



async function init() {
  const data = await fetchData();
  const svampar = data.svampar;
  svampar.forEach(svamp => {
    const article = createArticle(svamp);
    svamparContainer.appendChild(article);
  });
}

init();