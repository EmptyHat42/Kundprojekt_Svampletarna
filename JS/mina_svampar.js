const mushroomCards = document.getElementById("muschroom-list");

function init(){
    const articel = showMushroomData()
    mushroomCards.appendChild(articel)
    const deleteButton = document.getElementById("red.button");
    deleteButton.addEventListener("click", deleteMushroomList);
}
window.onload = init;

async function deleteMushroomList() {
    localStorage.clear("mushroom");
    showMushroomData();
}

async function showMushroomData (){
    const mushroomList = JSON.parse(localStorage.getItem("mushroom")) || [];
    if(mushroomList.length > 0){
        mushroomList.forEach(svamp => {
            const article = document.createElement('article');
            article.classList.add('svamp');

            article.innerHTML = `
            <img src="../svampar/${svamp.bild}" alt="${svamp.svenskt_namn}">
            <div class="svamp-info">
            <h3>${svamp.svenskt_namn}</h3>
            <p><em>${svamp.latinskt_namn}</em></p>
            </div>
  `         ;
            return article;

        
        });
    }
    else{
        const noMushroomsMessage = document.createElement('p');
        noMushroomsMessage.textContent = "Inga svampar sparade.";
        mushroomCards.appendChild(noMushroomsMessage);
    }
}