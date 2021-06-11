var estados;
var cidades;
var ufSelected;
const API_KEY = "AIzaSyA9vXdZoYILpHoDeA6U9THCrTw_sKnJoAA";
import data from "../../data/estabelecimentos.js";
const uf = document.getElementById("UF");
const cards = document.getElementById("cards");
const cidade = document.getElementById("cidade");
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
	.then((estado) => estado.json())
	.then((estado) => {
		estados = estado;
		uf.innerHTML = `${estados.map((estado) => {
			return `<option value="${estado.id}">${estado.sigla}</option>`;
		})}
        `;
	});
uf.addEventListener("change", (evt) => {
	const { value } = evt.target;
	ufSelected = value;
	cidade.removeAttribute("disabled");
	fetch(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`
	)
		.then((municipios) => municipios.json())
		.then((municipios) => {
			cidades = municipios;
			cidade.innerHTML = `${cidades.map((cidade) => {
				return `<option value="${cidade.nome}">${cidade.nome}</option>`;
			})}`;
		});
    });
cidade.addEventListener("change",(evt)=>{
    const filteredData = data.filter((estabelecimento)=>{return estabelecimento.cidade === evt.target.value});
    if (filteredData.length === 0){
        cards.innerHTML = `
        <div class="card">  
            <header>
                <h1 class="title">Sinto muito :(</h1>
                <h2 class="subTitle">não há estabelecimentos nesta região</h2>
            </header>
        </div>
        `
    }else{
        cards.innerHTML = `
    ${filteredData.map((estabelecimento)=>{
        var endereco = estabelecimento.rua.split(" ");
        endereco = endereco.join("+")
        return(`
        <div class="card">  
            <header>
                <h1 class="title">${estabelecimento.nome}</h1>
                <h2 class="subTitle">Onde me encontrar?</h2>
            </header>

            <section class="info">
                <span style="text-transform: capitalize;,font-size: 12px;">${estabelecimento.rua}, ${estabelecimento.numero},${estabelecimento.uf}</span>
                <iframe
                class="map"
                loading="lazy"
                allowfullscreen
                src=https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${endereco},${estabelecimento.numero},${estabelecimento.uf},${estabelecimento.cidade}">
                </iframe>
            </section>
            <footer class="footer">
            <h1 class="title">Contate-nos</h1>
            <span>${estabelecimento.telefone}</span>
            <span>${estabelecimento.email}</span>
            </footer>
        </div>
        
        `)
    })} 
    `
    }
    
})
