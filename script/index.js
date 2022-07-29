
    async function getSimulatorBack(aporteInicial,aporteMensal, taxaAA, prazoMeses,email) {
    const data = { 
        aporteInicial,
        aporteMensal,
        taxaAA,
        prazoMeses,
        email
    };
    
    const url = 'https://teste-hackthon-startse.herokuapp.com/simulacao';
   
    const response = await fetch(url, {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify(data)
    })

    const jsonData = await response.json();
    return jsonData;
}

var chartExist;

function valida() {

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
        alert("Valor Inválido - deve ser maior que 0");
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
    
    const responseSimulatorBack = await getSimulatorBack(aporteInicial,aporteMensal, taxaAA, prazoMeses,email);

    let modalHTM;
    let resultInicio = responseSimulatorBack.resultAporteInicial;
    let resultMes = responseSimulatorBack.resultAporteMensal;
    let totalValorFuturo = responseSimulatorBack.resultSimulacao;
    let impostoRendaFixa = responseSimulatorBack.resultIRFixa;
    let resultRendimentos = responseSimulatorBack.resultRendimento;
      
      
    for (var prop in totalValorFuturo) {
        var valorFinal = totalValorFuturo[prop];
    };
    for (var prop in impostoRendaFixa) {
        var impostoFinal = impostoRendaFixa[prop];
    };
    for (var prop in resultRendimentos) {
        var rendimentoFinal = resultRendimentos[prop];
    };
    
    modalHTM = (`
    <br>
    <h3>Total Aculumado</h3>
    <p class = "modal-msg">Periodo de Captação &emsp; ${prazoMeses} mês/meses</p>
    <p class = "modal-msg">Valor Futuro Total do Investimento &emsp; ${Math.floor(valorFinal)} </p>
    <p class = "modal-msg">Aporte Inicial &emsp; ${Math.floor(aporteInicial)}</p>
    <p class = "modal-msg">Aporte Mensal &emsp; ${Math.floor(aporteMensal)}</p>
    <p class = "modal-msg">Rendimentos &emsp;${Math.floor(rendimentoFinal)}</p>
    <p class = "modal-msg">Imposto Renda Fixa &emsp; ${Math.floor(impostoFinal)} </p>
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
            data: totalValorFuturo,
        },{
            label: 'Aporte Inicial',
            backgroundColor: 'rgb(240, 120, 80)',
            borderColor: 'rgb(240, 120, 80)',
            data: resultInicio,
        },{
            label: 'Aporte Mensal',
            backgroundColor: 'rgb(155, 129, 132)',
            borderColor: 'rgb(155, 129, 132)',
            data: resultMes,   
        },{
            label: 'Rendimentos',
            backgroundColor: 'rgb(155, 199, 132)',
            borderColor: 'rgb(155, 199, 132)',
            data: resultRendimentos,  
        },{
            label: 'Imposto Renda Fixa',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: impostoRendaFixa,
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            },
    }
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );  

    chartExist = Chart.getChart("myChart");

    modal.style.display = "block";
    
};


window.onclick = function(event) {
	const modal = document.querySelector('.modal');
    if (event.target == modal ) {
    	modal.style.display = 'none';
        if (chartExist != undefined) {
            chartExist.destroy();
        }
  }
}
