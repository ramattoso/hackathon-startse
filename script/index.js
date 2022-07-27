//import resultadosInvestimento from "./calculosInvestimentos";

function valorFuturoDoAporteInicial(aporteInicial, taxaAoMes, prazoAoMes) {
  return aporteInicial * (1 + taxaAoMes / 100) ** prazoAoMes;
};

const prazoAoMes = 12;
const resultados = [];

for (let i =1;i<=prazoAoMes;i++) {
  let result = valorFuturoDoAporteInicial(10000,5,i);
  resultados.push(result);
}

console.log(resultados);

switch (prazoAoMes) {
  case 1: console.log('Janeiro')
    break;
  case 2: 'Fevereiro'
    break;
  case 3: 'Março'
    break;
  case 4: 'Abril'
    break;
  case 5: 'Maio'
    break;
  case 6: 'Junho'
    break;
  case 7: 'Julho'
    break;
  case 8: 'Agosto'
    break;
  case 9: 'Setembro'
    break;
  case 10: 'Outubro'
    break;
  case 11: 'Novembro'
    break;
  case 12: console.log('Dezembro');
    break;

}

console.log(prazoAoMes);


const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Dezembro'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: resultados,
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

$(document).ready(function() {
	$('#subir').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
});