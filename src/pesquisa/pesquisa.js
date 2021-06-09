import data from "../../data/data.js"; //importo o arquivo data.js onde contém o json
const cardContainer = document.querySelector(".cards"); //cardContainer armazena o elemento com class "cards" que é onde um card fica dentro
const select = document.getElementById("filter");
//um card é o elemento/container/quadrado branco onde aparecem os dados da planta
var sortedData = data;
var filteredAndOrderedList = data;

function renderCard() {
	cardContainer.innerHTML = `
    ${filteredAndOrderedList
		.map((planta) => {
			//aqui é mapeado o json. ele vai repetir este html para cada objeto(planta) que existir no json
			// o map instância o objeto json atual numa variável que tem o nome determinado ali em cima em parênteses
			// agora você pode chamar a planta.img, planta.nome planta.plantio etc...
			return `
        <div class="card">  
         <header>
             <div class="circle">
             <img src="${planta.img}" alt="${planta.nome}"/>
             </div>
             <h2 class="title">${planta.nome}</h2>
         </header>

         <section class="info">
             <h3 class="title">Melhor estação para cultivo:</h3>
             <p class="content epoca">${planta.epoca}</p>
             <h3 class="title">Como regar? 💧</h3>
             <p class="content">Você deve regar ${planta.agua.QTDvezes} ${planta.agua.QTDvezes > 1 ? "vezes" : "vez"}  a cada ${planta.agua.aCada} ${planta.agua.aCada > 1 ? "dias" : "dia"}.</p>
             <h3 class="title">Como iluminar? ☀️</h3>
             <p class="content">A planta precisa de ${planta.sol} horinhas de sol por dia.</p>
             <h3 class="title">Como plantar? 🌱</h3>
             <p class="content">${planta.plantio}</p>
         </section>
         <footer class="footer">
            <div class="item">
                <p class="title small">Germinação</p>
                <span class="footerSpan">${planta.ciclo.germinação} ${planta.ciclo.germinação > 1 ? "dias" : "dia"}</span>
            </div>
            <div class="item">
                <p class="title small">Crescimento</p>
                <span class="footerSpan">${planta.ciclo.crescimento} ${planta.ciclo.crescimento > 1 ? "dias" : "dia"}</span>
            </div>
            <div class="item">
                <p class="title small">Produção</p>
                <span class="footerSpan">${planta.ciclo.produção} ${planta.ciclo.produção > 1 ? "dias" : "dia"}</span>
            </div>
            <div class="item">
                <p class="title small">Colheita</p>
                <span class="footerSpan">${planta.ciclo.colheita} ${planta.ciclo.colheita > 1 ? "dias" : "dia"}</span>
            </div>
         </footer>
         <div class="buttonContainer">
            <a href="../estabelecimentos/estabelecimentos.html">
                <button class="alt"> Onde Comprar? </button>
            </a>
         </div>
        
	 </div>
        `;
		})
		.join("")} 
`;
}
renderCard()

const input = document.getElementById("pesquisa"); // A variável input armazena o elemento input que contém o ID pesquisa
input.addEventListener("input", (evt) => {
	//é adicionado um escutador de eventos do tipo input, que é disparado cada vez que é digitado no campo da variavel input
	var {value} = evt.target; //armazena o valor atual do input no value
    if (value == ""){
        filteredAndOrderedList = data
        renderCard()
        order()
    }else {
        filteredAndOrderedList = sortedData.filter((planta) => {
            return planta.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
        renderCard()
        order()
    }
});

function order() {
	switch (select.value) {
		case "0":
			sortedData = data;
            renderCard()
			break;

		case "1":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
                return plantaB.ciclo.colheita - plantaA.ciclo.colheita});
			renderCard();
			break;

		case "2":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
                return plantaA.ciclo.colheita - plantaB.ciclo.colheita});    
			renderCard();
			break;

		case "3":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
				return plantaB.ciclo.germinação - plantaA.ciclo.germinação});
			renderCard();
			break;

		case "4":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
				return plantaA.ciclo.germinação - plantaB.ciclo.germinação});
			renderCard();
			break;
		case "5":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
				return plantaB.ciclo.produção - plantaA.ciclo.produção});
			renderCard();
			break;
		case "6":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
				return plantaA.ciclo.produção - plantaB.ciclo.produção});
			renderCard();
			break;
		case "7":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
                return plantaB.ciclo.crescimento - plantaA.ciclo.crescimento});
			renderCard();
			break;
		case "8":
			sortedData = filteredAndOrderedList.sort((plantaA, plantaB) => {
                return plantaA.ciclo.crescimento - plantaB.ciclo.crescimento});
			renderCard();
			break;
	}
}
select.addEventListener('change',()=>{
    order()
})

