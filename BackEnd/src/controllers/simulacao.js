
import Simulacao from '../models/index.js';
import Usuarios from '../models/Usuario.js';
import simulacaoValorFuturo from './aportes.js';

const simulacaoController = {
    listarSimulacao: async (req,res) => {
        const listaDeSimulacao = await Simulacao.findAll({
            include: Usuarios
        }
        );
        res.json(listaDeSimulacao);
    },
    
    async cadastrarSimulacao (req,res) {
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
        }
        
        console.log(resultAporteInicial,resultAporteMensal, resultSimulacao);

        const novaSimulacao = await Simulacao.create({
            aporteInicial,
            aporteMensal,
            taxaAA,
            anos,
            idUsuario,
        });

        res.status(201).json({resultSimulacao,resultAporteInicial,resultAporteMensal,novaSimulacao});
        //res.status(201).json( {novaSimulacao,resultadoArrays});
    },

    async deletarSimulacao (req,res) {
        try {
            
            const { id } = req.params;
    
            await Simulacao.destroy({
                where: {
                    id,
                },
            });
            res.status(204);
        } catch (error) {
            res.status(500).json('Ocorreu algum problema com a deleção');
        }
    },

    async atualizaSimulacao (req,res) {
        const {id} = req.params;
        const { aporteInicial, aporteMensal, taxaAA, anos, idUsuario } = req.body;

        if (!id) return res.status(400).json('id não enviado.');

        const simulacaoAtualizado = await Simulacao.update({
            aporteInicial,
            aporteMensal,
            taxaAA,
            anos,
            idUsuario,
        });

        res.json(simulacaoAtualizado);

    },

    async buscaSimulacaoID (req,res) {
        const {id} = req.params;
        const retornaSimulacaoId  = await Simulacao.findByPk(id);

        res.json(retornaSimulacaoId);
    },


};


export default simulacaoController;

