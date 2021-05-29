var estados;
const uf = document.getElementById("UF");
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((estado)=> estado.json())
    .then((estado)=>{
        estados = estado;
        
        uf.innerHTML = 
        `${estados.map((estado)=>{
            console.log("estados dentro do map", estado)
             return `<option value="${estado.nome}">${estado.sigla}</option>`       
        })}
        `
        
    })
