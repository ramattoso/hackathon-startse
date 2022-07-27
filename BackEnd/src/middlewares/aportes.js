import simulacaoValorFuturo from "../controllers/aportes.js";

export default (req,res,next) => {
    const { aporteInicial, aporteMensal, taxaAA, anos, idUsuario } = req.body;
    const resultAporteInicial = [];
    const resultAporteMensal = [];
    const resultSimulacao = [];
    const prazoConvertidoAoMes = anos * 12;
    const taxaAM = simulacaoValorFuturo.converteTaxaAnualParaMensal(taxaAA,prazoConvertidoAoMes);

    for (let i = 1;i<=prazoConvertidoAoMes;i++) {
        let resultInicio = simulacaoValorFuturo.valorFuturoDoAporteInicial(aporteInicial,taxaAM,i);
        let resultMes = simulacaoValorFuturo.valorFuturoDosAportesMensais(aporteMensal,taxaAM,i);
        let totalValorFuturo = simulacaoValorFuturo.pegaValorFuturoERendimentoTotal(aporteInicial,aporteMensal,taxaAA,anos);
        resultAporteInicial.push(resultInicio);
        resultAporteMensal.push(resultMes);
        resultSimulacao.push(totalValorFuturo);
    };
    
    const resultadoArrays = [resultAporteInicial,resultAporteMensal, resultSimulacao];
    console.log(resultAporteInicial,resultAporteMensal, resultSimulacao, resultadoArrays);
    //res.status(200).json({resultSimulacao,resultAporteInicial,resultAporteMensal});
    next();
    
};