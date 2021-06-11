var estados;
const uf = document.getElementById("UF");
const telefone = document.getElementById("telefone");
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((estado)=> estado.json())
    .then((estado)=>{
        estados = estado;
        uf.innerHTML = 
        `${estados.map((estado)=>{
             return `<option value="${estado.nome}">${estado.sigla}</option>`       
        })}
        `
    })

telefone.addEventListener('input',(evt)=>{
    let value = evt.target.value;
    let formatedValue = value.replace(/\D/g,"")
    formatedValue = formatedValue.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2")
    value = formatedValue
    return event.target.value = value;
})


/*Logica de CEP */ 

$("#cep").focusout(function(){
    
    $.ajax({
       
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        
        dataType: 'json',
       
        success: function(resposta){
            
            $("#logradouro").val(resposta.logradouro);
            $("#complemento").val(resposta.complemento);
            $("#bairro").val(resposta.bairro);
            $("#cidade").val(resposta.localidade);
            $("#uf").val(resposta.uf);
            
            $("#numero").focus();
        }
    });
});



