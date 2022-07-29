
    async function getSimulatorBack(aporteInicial,aporteMensal, taxaAA, prazoMeses,email) {
    const data = { 
        aporteInicial,
        aporteMensal,
        taxaAA,
        prazoMeses,
        email
    };
    
    const url = 'http://localhost:3000/simulacao';
    
    fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(function(res){ console.log(res.json()) })
    .catch(function(res){ console.log(res) });
  };

var chartExist;

 function valida(){

    if(document.getElementById('para-comecar').value < 0){
        alert("Valor Inválido");
        document.getElementById('para-comecar').focus();
        return false;
    }
        
    if(document.getElementById('por-mes').value < 0){
        alert("Valor Inválido");
        document.getElementById('por-mes').focus();
        return false;
    }

    if(document.getElementById('tempo').value < 1){
        alert("Valor Inválido");
        document.getElementById('tempo').focus();
        return false;
    }

    if(document.getElementById('porcen').value < 0){
        alert("Valor Inválido - dese ser maior que 0");
        document.getElementById('porcen').focus();
        return false;
    }

    var vm=document.getElementById('email').value;
    if(vm.search("@")==-1){
        
        alert("Digite um e-mail válido");
        document.getElementById('email').focus();
        return false;
    }
    getSimulator();
}

async function getSimulator() {
    var aporteInicial = document.getElementById('para-comecar').value;
    var aporteMensal = document.getElementById('por-mes').value;
    var taxaAA = document.getElementById('porcen').value;
    var prazoMeses = document.getElementById('tempo').value;
    var email = document.getElementById('email').value;

    getSimulatorBack(aporteInicial,aporteMensal, taxaAA, prazoMeses,email);

    const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAA); //,prazoMeses);
    const resultAporteInicial = [];
    const resultAporteMensal = [];
    const resultSimulacao = [];
    const resultRendimento = [];
    const resultImpostoRF = [];

    let modalHTM;
    let prazoMesesResult;

    let resultInicio;
    let resultMes;
    let totalValorFuturo;
    let impostoRendaFixa;

    for (let i = 0;i<=prazoMeses;i++) {

        resultInicio = valorFuturoDoAporteInicial(aporteInicial,taxaConvertidaAoMes,i);
        resultMes = valorFuturoDosAportesMensais(aporteMensal,taxaConvertidaAoMes,i);
        totalValorFuturo = pegaValorFuturoERendimentoTotal(aporteInicial,aporteMensal,taxaAA,i);
        impostoRendaFixa = calculaIRRendaFixa(totalValorFuturo.rendimentoTotal,prazoMeses);
        
        resultAporteInicial.push(resultInicio);
        resultAporteMensal.push(resultMes);
        resultSimulacao.push(totalValorFuturo.totalValorFuturo);
        resultRendimento.push(totalValorFuturo.rendimentoTotal);
        resultImpostoRF.push(impostoRendaFixa);
        
    }

    if (isNaN(resultInicio)) {
        resultInicio = 0
    }

    if (isNaN(resultMes)) {
        resultMes = 0
    }

    if (isNaN(totalValorFuturo.totalValorFuturo)) {
        totalValorFuturo.totalValorFuturo = 0
    }

    if (isNaN(totalValorFuturo.rendimentoTotal)) {
        totalValorFuturo.rendimentoTotal = 0
    }

    if (isNaN(impostoRendaFixa)) {
        impostoRendaFixa = 0
    }

    if (prazoMeses < 2) {
        prazoMesesResult = (prazoMeses+ ' mês');
    } else {
        prazoMesesResult = (prazoMeses+ ' meses');
    }

    modalHTM = (`
    <br>
    <h3>Total Aculumado</h3>
    <p class = "modal-msg">Periodo de Captação:  &emsp; ${prazoMesesResult}</p>
    <p class = "modal-msg">Valor Futuro Total do Investimento: R$ &emsp; ${Math.floor(totalValorFuturo.totalValorFuturo)} </p>
    <p class = "modal-msg">Aporte Inicial: R$ &emsp; ${Math.floor(aporteInicial)}</p>
    <p class = "modal-msg">Aporte Mensal: R$ &emsp; ${Math.floor(resultMes)}</p>
    <p class = "modal-msg">Rendimentos: R$ &emsp;${Math.floor(totalValorFuturo.rendimentoTotal)}</p>
    <p class = "modal-msg">Imposto Renda Fixa: R$ &emsp; ${Math.floor(impostoRendaFixa)} </p>
    `);

    const p = document.getElementById('modal-msg');
    p.innerHTML = modalHTM;

    const modal = document.getElementById('modal');
    
    function labelPrazo(prazoMeses) {
        prazo = [];
        for (i = 0; i <= prazoMeses; i++) {
            prazo.push(i);
        }
        return prazo;
    }

    const labels = labelPrazo(prazoMeses);

      const data = {
        labels: labels,
        datasets: [{
            label: 'Valor Futuro Total do Investimento',
            backgroundColor: 'rgb(92, 240, 160)',
            borderColor: 'rgb(92, 240, 160)',
            data: resultSimulacao,
        },{
            label: 'Aporte Inicial',
            backgroundColor: 'rgb(240, 120, 80)',
            borderColor: 'rgb(240, 120, 80)',
            data: resultAporteInicial,
        },{
            label: 'Aporte Mensal',
            backgroundColor: 'rgb(155, 129, 132)',
            borderColor: 'rgb(155, 129, 132)',
            data: resultAporteMensal,   
        },{
            label: 'Rendimentos',
            backgroundColor: 'rgb(155, 199, 132)',
            borderColor: 'rgb(155, 199, 132)',
            data: resultRendimento,  
        },{
            label: 'Imposto Renda Fixa',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: resultImpostoRF,
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            animation: {
              onComplete: function() {
                console.log(myChart.toBase64Image());
                teste=(myChart.toBase64Image());
              }
            }
        }
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );  

    const chartbase64 =  await myChart.toBase64Image('image/jpeg', 1);

    console.log(chartbase64);

    chartExist = Chart.getChart("myChart");

    modal.style.display = "block";
}

function pegaValorFuturoERendimentoTotal(aporteInicial, aportesMensais, taxaAoAno, prazoMes) {
    const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAoAno);
    const vFAM = valorFuturoDosAportesMensais(aportesMensais, taxaConvertidaAoMes, prazoMes);
    const vFAI = valorFuturoDoAporteInicial(aporteInicial, taxaConvertidaAoMes, prazoMes);
    const totalValorFuturo = vFAI + vFAM;
    const rendimentoTotal = (vFAI - aporteInicial) + (vFAM - aportesMensais * prazoMes);
    return { valorFuturoDosAportesMensais: vFAM, valorFuturoDoAporteInicial: vFAI, totalValorFuturo, rendimentoTotal };
}

function valorFuturoDosAportesMensais(aportesMensais, taxaAoMes, prazoAoMes) {
    return aportesMensais * (1 + taxaAoMes / 100) * (((1 + taxaAoMes / 100) ** prazoAoMes - 1) / (taxaAoMes / 100));
}

function valorFuturoDoAporteInicial(aporteInicial, taxaAoMes, prazoAoMes) {
    return aporteInicial * (1 + taxaAoMes / 100) ** prazoAoMes;
}

function converteTaxaAnualParaMensal(taxaAnual) {
    return (((1 + (taxaAnual / 100)) ** (1 / 12)) - 1) * 100
}

function calculaIRRendaFixa(rendimento, prazo) {
    const prazoConvertidoAoDia = prazo * 360;

    if (prazoConvertidoAoDia <= 180)
        return rendimento * 0.225;
    if (prazoConvertidoAoDia > 180 && prazoConvertidoAoDia <= 360)
        return rendimento * 0.20;
    if (prazoConvertidoAoDia > 360 && prazoConvertidoAoDia <= 720)
        return rendimento * 0.175;
    if (prazoConvertidoAoDia > 720)
        return rendimento * 0.15;

    console.log(`Um erro aconteceu nas variáveis`);
}

function calculaIRPrevidênciaPrivada(rendimento, prazo) {

    if (prazo < 2)
        return rendimento * 0.35;
    if (prazo >= 2 && prazo < 4)
        return rendimento * 0.3;
    if (prazo >= 4 && prazo < 6)
        return rendimento * 0.25;
    if (prazo >= 6 && prazo < 8)
        return rendimento * 0.2;
    if (prazo >= 8 && prazo < 10)
        return rendimento * 0.15;
    if (prazo >= 10)
        return rendimento * 0.1;

    console.log(`Um erro aconteceu nas variáveis`);
};

window.onclick = function(event) {
	const modal = document.querySelector('.modal');
    if (event.target == modal ) {
    	modal.style.display = 'none';
        if (chartExist != undefined) {
            chartExist.destroy();
        }
  }
;}
