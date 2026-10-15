const { element } = require("prop-types");

function init(){
    const mushroomCard = document.creatElement("article")
    showMushroomData(mushroomCard)

}
window.onload = init;

async function deleteMushroomList() {
    localStorage.clear("mushroom");
}

async function showMushroomData (mushroomCard){
    const mushroomList = JSON.parse(localStorage.getItem("mushroom")) || [];
    if(mushroomList != []){
        mushroomList.forEach(element => {
            const swedishName = element.svenskt_namn;
            const latinName = element.latinskt_namn;
            const img = element.bild;
            const latinNameText = document.createElement("p");
            const swedishNameText = document.creatElement("p");
            const showImg = document.creatElement("img");
            latinNameText.textContent = latinName;
            swedishNameText.textContent = swedishName;
            showImg.textContent = img;
            mushroomCard.appendChild(latinName)
            mushroomCard.appendChild(swedishName)
            mushroomCard.appendChild(img)
        });
    }
}