import axios from "axios";

const formSimulator = document.getElementById('form-simulador');

function saveData() {
    var aporteInicial = document.getElementById('para-comecar');
    var aporteMensal = document.getElementById('por-mes');
    var taxaAA = document.getElementById('porcen');
    var meses = document.getElementById('tempo');

    console.log(paracomecar.value);
    
    axios.post('url/route', {
        aporteInicial,
        aporteMensal ,
        taxaAA ,
        meses,
    });
};