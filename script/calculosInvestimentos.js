/*Função que calcula o Valor Futuro e Rendimento Total de determinado investimento, seja apenas com um aporte inicial, com aportes mensais, ou os dois juntos*/
function pegaValorFuturoERendimentoTotal(aporteInicial, aportesMensais, taxaAoAno, prazoAno) {
    /*Em sites normalmente taxa e prazo é mostrado Ao Ano, e os aportes de maneira mensal. Por isso temos que deixar todos em um mesmo equivalência, nesse caso ao mês*/
    const prazoConvertidoAoMes = prazoAno * 12;
    const taxaConvertidaAoMes = converteTaxaAnualParaMensal(taxaAoAno, prazoConvertidoAoMes);

    console.log(aportesMensais);

    /*O calculo dos aportes mensais e do aporte inicial é feito de maneira separada*/
    const vFAM = valorFuturoDosAportesMensais(aportesMensais, taxaConvertidaAoMes, prazoConvertidoAoMes);
    const vFAI = valorFuturoDoAporteInicial(aporteInicial, taxaConvertidaAoMes, prazoConvertidoAoMes);

    /*Ao final temos tanto o valor total do investimento, somando o rendimento tanto do aporte mensal quanto inicial, e o total de rendimentos dos dois*/
    const totalValorFuturo = vFAI + vFAM;
    const rendimentoTotal = (vFAI - aporteInicial) + (vFAM - aportesMensais * prazoConvertidoAoMes);

    /*A função retorna um objeto com os quatro valores como resultados do investimento, que podem ser usados de maneira individual*/
    return { valorFuturoDosAportesMensais: vFAM, valorFuturoDoAporteInicial: vFAI, totalValorFuturo, rendimentoTotal };
}

/*Função que calcula o Valor Futuro dos Aportes Mensais em um certo período*/
function valorFuturoDosAportesMensais(aportesMensais, taxaAoMes, prazoAoMes) {
    return aportesMensais * (1 + taxaAoMes / 100) * (((1 + taxaAoMes / 100) ** prazoAoMes - 1) / (taxaAoMes / 100));
}

/*Função que calcula o Valor Futuro dos Aporte Inicial em um certo período*/
function valorFuturoDoAporteInicial(aporteInicial, taxaAoMes, prazoAoMes) {
    return aporteInicial * (1 + taxaAoMes / 100) ** prazoAoMes;
}

/*Função que converte taxa anual para mensal*/
function converteTaxaAnualParaMensal(taxaAnual, prazoMensal) {
    return ((1 + (taxaAnual / 100)) ** (1 / prazoMensal) - 1) * 100
}

/*Função calcula o IR de investimentos de Renda Fixa, passando o rendimento e o prazo que ficou investido*/
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

/*Função calcula o IR Regressivo de investimentos na Previdência Privada, passando o rendimento e o prazo que ficou investido*/
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

    console.log(`Um erro aconteceu nas variáveis!`);
}


const resultadosInvestimento = pegaValorFuturoERendimentoTotal(10000, 1000, 5, 1);
const impostoDevido = calculaIRPrevidênciaPrivada(resultadosInvestimento.rendimentoTotal, 5);

console.log(`O rendimento total do investimento foi ${resultadosInvestimento.rendimentoTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}, e o imposto devido é de ${impostoDevido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}.`);