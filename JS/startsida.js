const { element } = require("prop-types");

function init(){
const buttons = document.querySelectorAll("");
buttons.forEach(button => {
        button.addEventListener("click", e =>{
            buildAndSaveMushroomObject();
})
window.onload = init;

async function saveMushroom (mushroom){
    const mushroomList = JSON.parse(localStorage.getItem("mushroom")) || []; 
    mushroomList.push(mushroom);
    mushroomList.sort();
    localStorage.setItem("mushroom", JSON.stringify(mushroomList))
    };

async function buildAndSaveMushroomObject(){
    
    const swedishName = document.getElementById("");
    const latinName = document.getElementById("");
    const img = document.getElementById("");
    const newMushroomObject = {
            svenskt_namn: swedishName,
            latinskt_namn: latinName,
            bild: img,
        }
        saveMushroom(newMushroomObject);
        }
    });
};