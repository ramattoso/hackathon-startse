var chartExist;

function getSimulator() {
    var aporteInicial = document.getElementById('para-comecar').value;
    var aporteMensal = document.getElementById('por-mes').value;
    var taxaAA = document.getElementById('porcen').value;
    var prazoMeses = document.getElementById('tempo').value;
    var email = document.getElementById('email').value;

    const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAA); //,prazoMeses);
    const resultAporteInicial = [];
    const resultAporteMensal = [];
    const resultSimulacao = [];
    const resultRendimento = [];
    const resultImpostoRF = [];


    for (let i = 0;i<=prazoMeses;i++) {
        
        let resultInicio = valorFuturoDoAporteInicial(aporteInicial,taxaConvertidaAoMes,i);
        let resultMes = valorFuturoDosAportesMensais(aporteMensal,taxaConvertidaAoMes,i);
        let totalValorFuturo = pegaValorFuturoERendimentoTotal(aporteInicial,aporteMensal,taxaAA,i);
        let impostoRendaFixa = calculaIRRendaFixa(totalValorFuturo.rendimentoTotal,prazoMeses);
        
        resultAporteInicial.push(resultInicio);
        resultAporteMensal.push(resultMes);
        resultSimulacao.push(totalValorFuturo.totalValorFuturo);
        resultRendimento.push(totalValorFuturo.rendimentoTotal);
        resultImpostoRF.push(impostoRendaFixa);
        
    }
    
    console.log(resultAporteInicial,resultAporteMensal, resultSimulacao, resultRendimento, resultImpostoRF);
    const modal = document.getElementById('modal');
    
    function labelPrazo(prazoMeses) {
        prazo = [];
        for (i = 0; i <= prazoMeses; i++) {
            prazo.push(i);
        }
        return prazo;
    }

    const labels = labelPrazo(prazoMeses);


    /*
    const labels = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ];
    */
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
        options: {}
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    chartExist = Chart.getChart("myChart");

    modal.style.display = "block";
    
    //exibeChart();
    
}


function pegaValorFuturoERendimentoTotal(aporteInicial, aportesMensais, taxaAoAno, prazoMes) {
    const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAoAno, prazoMes);
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

function converteTaxaAnualParaMensal(taxaAnual) { //, prazoMensal) {
    return ((1 + (taxaAnual / 100)) ** (1 / 12) - 1) * 100
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
}
window.onclick = function(event) {
	const modal = document.querySelector('.modal');
    if (event.target == modal ) {
    	modal.style.display = 'none';
        if (chartExist != undefined) {
            chartExist.destroy();
        }
  }
}
