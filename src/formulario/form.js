var estados;
var uf = document.getElementById("UF");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");
var rua = document.getElementById("rua");
var bairro = document.getElementById("bairro");
var cidade = document.getElementById("cidade");

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then((estado) => estado.json())
	.then((estado) => {
		estados = estado;
		uf.innerHTML = `${estados.map((estado) => {
			return `<option value="${estado.sigla}">${estado.sigla}</option>`;
		})}
        `;
	});

telefone.addEventListener("input", (evt) => {
	let value = evt.target.value;
	let formatedValue = value.replace(/\D/g, "");
	formatedValue = formatedValue
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2");
	value = formatedValue;
	return (evt.target.value = value);
});

/*Logica de CEP */
cep.addEventListener("input", (evt) => {
	let value = evt.target.value;
	let formatedValue = value.replace(/\D/g, "");
	formatedValue = formatedValue.replace(/(\d{5})(\d{3})/g, "$1-$2");
	evt.target.value = formatedValue;
	if (value.length === 8) {
		fetch(`https://brasilapi.com.br/api/cep/v1/${value}`)
			.then((response) => response.json())
			.then((response) => {
				if (!response.errors) {
					bairro.value = response.neighborhood;
					rua.value = response.street;
					uf.value = response.state;
					cidade.value = response.city;
				} else {
					bairro.value = "";
					rua.value = "";
					uf.value = "";
					cidade.value = "";
				}
			});
	}
});
