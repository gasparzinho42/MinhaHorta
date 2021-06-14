const cnpj = document.getElementById("cnpj");

cnpj.addEventListener("input",(event) => {
    let value = event.target.value;
    let formatedValue = value.replace(/\D/g,"");
    formatedValue = formatedValue
                    .replace(/(\d{2})(\d)/,"$1.$2")
                    .replace(/(\d{3})(\d)/,"$1.$2")
                    .replace(/(\d{3})(\d)/,"$1/$2")
                    .replace(/(\d{4})(\d)/,"$1-$2")
    event.target.value = formatedValue;
})