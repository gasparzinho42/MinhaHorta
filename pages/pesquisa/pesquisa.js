import data from "../../data/data.js"; //importo o arquivo data.js onde contém o json
console.log(data); // serve para visualmente verificar se data está retornando o json corretamente
const cardContainer = document.querySelector(".cards"); //cardContainer armazena o elemento com class "cards" que é onde um card fica dentro
//um card é o elemento/container/quadrado branco onde aparecem os dados da planta

//aqui estou dizendo para adicionar html dentro deste cardContainer,  esse html é o card onde contém informações da planta
cardContainer.innerHTML = `
    ${data.map((planta) => {
        //aqui é mapeado o json. ele vai repetir este html para cada objeto(plantaa) que existir no json
        // o map instância o objeto json atual numa variável que tem o nome determinado ali em cima em parênteses
        // agora você pode chamar a planta.img, planta.nome planta.plantio etc... 
			return `
        <div class="card hide">  
         <header>
             <div class="circle">
             <img src="${planta.img}" alt="${planta.nome}"/>
             </div>
             <h2 class="title">${planta.nome}</h2>
         </header>

         <section class="info">
             <h3 class="title">Melhor estação para cultivo:</h3>
             <p class="content">${planta.epoca}</p>
             <h3 class="title">Forma de cultivo:</h3>
             <p class="content">${planta.plantio}</p>
         </section>
	 </div>
        `;
		})
		.join("")} 
`;
// este .join("") serve para substituir virgulas que são imprimidas ao fim de cada json por uma string vazia ""

/* O window.onload = () => { seu código aqui } serve para que o código dentro seja rodado apenas depois
    que o conteúdo da página for carregado ( onLoad = ao carregar), se não for feito dessa forma, você não consegue acessar o 
    elemento .card acima, pois o DOM iria acusar que esse elemento com classe .card não existe no documento. 
*/
window.onload = () => {
	const cards = cardContainer.querySelectorAll(".card"); // A variável card agora é um array que contém todos os elementos com a classe "card"
	const input = document.getElementById("pesquisa");	// A variável input armazena o elemento input que contém o ID pesquisa
	input.addEventListener("input", (evt) => { //é adicionado um escutador de eventos do tipo input, que é disparado cada vez que é digitado no campo da variavel input
		var value = evt.target.value; //armazena o valor atual do input no value
        const title = document.querySelector("#inputTitle"); // A variável title agora armazena o elemento com ID inputTitle
        for (let i = 0; i < cards.length; i++) { //O for é um laço de repetição que vai repetir o código abaixo um número de vezes igual ao comprimento do array card

            const nomeDaPLanta = cards[i].querySelector(".title").innerHTML //pega o nome da planta da posição atual do array
            if(value == nomeDaPLanta) { //se o valor do input da busca for igual ao nome da planta da posição atual ele tira a classe hide deste card, que faz ele ser mostrado na tela
                cards[i].className = "card";
                title.innerHTML = "Ótima escolha" // muda o título do para Ótima escolha
                break; // o break; serve para quebrar a repetição do for. ele diz pro for que se chegar aqui, ele não deve mais repetir este código
                
            } else{ // se o if for falso ele adiciona a classe hide  ao elemento atual
                cards[i].className = "card hide";
			    title.innerHTML = "O que vamos plantar ?";
            }
        }

        //  Poderia ser feito com um forEach ou map também, mas esses métodos não permitem o uso do break, então se houvesse um json com 100 posições
        //  mesmo que o resultado fosse encontrado na posição 3 ele iria continuar repetindo o código mais 97 vezes
        //  resultando assim numa queda de performance do nosso site

        // card.forEach( planta => {
        //     const nomeDaPLanta = planta.querySelector(".title").innerHTML
        //     if(value == nomeDaPLanta) {
        //         planta.className = "card";
        //         return title.innerHTML = "Ótima escolha"
                
        //     } else{
        //         planta.className = "card hide";
		// 	    title.innerHTML = "O que vamos plantar ?";
        //     }
        // })			
	});
};