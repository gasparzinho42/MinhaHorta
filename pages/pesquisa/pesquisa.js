const input = document.getElementById("pesquisa")
const card = document.querySelector(".card")
const title = document.querySelector("#inputTitle")
input.addEventListener("input", (evt) => {
   if (evt.target.value == "orégano"){
    card.className = "card"
    title.innerHTML = "Ótima escoha"
   }  else{
       card.className = "card hide"
       title.innerHTML = "O que vamos plantar ?"
    } 
})