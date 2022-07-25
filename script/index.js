import resultadosInvestimento from "./calculosInvestimentos";

function valorFuturoDoAporteInicial(aporteInicial, taxaAoMes, prazoAoMes) {
  return aporteInicial * (1 + taxaAoMes / 100) ** prazoAoMes;
};

const prazoAoMes = 12;
const resultados = [];

for (let i =1;i<=prazoAoMes;i++) {
  let result = valorFuturoDoAporteInicial(10000,5,i);
  resultados.push(result);
}



const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
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