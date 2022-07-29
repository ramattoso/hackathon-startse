
import getSimulator from "./getSimulator.js";

function valida() {
    
    var aporteInicial = document.getElementById('para-comecar').value;
    var aporteMensal = document.getElementById('por-mes').value;
    var taxaAA = document.getElementById('porcen').value;
    var prazoMeses = document.getElementById('tempo').value;
    var email = document.getElementById('email').value;
    
    if(aporteInicial.value < 0){
        alert("Valor Inválido");
        aporteInicial.focus();
        return false;
    }
        
    if(aporteMensal.value < 0){
        alert("Valor Inválido");
        aporteMensal.focus();
        return false;
    }

    if(prazoMeses.value < 1){
        alert("Valor Inválido");
        prazoMeses.focus();
        return false;
    }

    if(taxaAA.value < 0){
        alert("Valor Inválido - dese ser maior que 0");
        taxaAA.focus();
        return false;
    }

    var vm = email.value;
    if(vm.search("@")==-1){
        
        alert("Digite um e-mail válido");
        email.focus();
        return false;
    }

    getSimulator(aporteInicial,aporteMensal,taxaAA,prazoMeses,email);
};
