document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;


    if(cepInformado.length !== 8){
        return;
    }


    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
       .then(response => response.json())
       .then(data => {
        if(!data.erro){
            document.getElementById("logradouro").value = data.logradouro
            document.getElementById("bairro").value = data.bairro
            document.getElementById("localidade").value = data.localidade
            document.getElementById("unidade").value = data.unidade
        } else {
            alert("cep não encontrado.")
        }
        })
      .catch(error => console.error("erro ao buscar o cep:", error))
});

document.getElementById("enviar").addEventListener("click", () => {
    const dadosInseridos = {
    cep: document.getElementById("cep").value,
    logradouro: document.getElementById("logradouro").value,
    bairro: document.getElementById("bairro").value,
    localidade: document.getElementById("localidade").value,
    unidade: document.getElementById("unidade").value,
    }

    localStorage.setItem("dadosInseridos", JSON.stringify(dadosInseridos));
});

window.onload = function () { 
    const dadosInseridos =  JSON.parse(localStorage.getItem("dadosInseridos"));
    document.getElementById("cep").value = dadosInseridos.cep;
    document.getElementById("logradouro").value = dadosInseridos.logradouro;
    document.getElementById("bairro").value = dadosInseridos.bairro;
    document.getElementById("localidade").value = dadosInseridos.localidade;
    document.getElementById("unidade").value = dadosInseridos.unidade;  
}




