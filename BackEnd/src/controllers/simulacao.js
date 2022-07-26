import Simulacao from '../models/index.js';

const simulacaoController = {
    listarSimulacao: async (req,res) => {
        const listaDeSimulacao = await Simulacao.findOne(
        );
        res.json(listaDeSimulacao);
    },
    
    async cadastrarSimulacao (req,res) {
        const { aporteInicial, aporteMensal, taxaAA, meses, idUsuario } = req.body;
        const novaSimulacao = await Simulacao.create({
            aporteInicial,
            aporteMensal,
            taxaAA,
            meses,
            idUsuario,
        });
        res.status(201).json(novaSimulacao);
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
        const { aporteInicial, aporteMensal, taxaAA, meses, idUsuario } = req.body;

        if (!id) return res.status(400).json('id não enviado.');

        const simulacaoAtualizado = await Simulacao.update({
            aporteInicial,
            aporteMensal,
            taxaAA,
            meses,
            idUsuario,
        });

        res.json(simulacaoAtualizado);

    },

    async buscaSimulacaoID (req,res) {
        const {id} = req.params;
        const retornaSimulacaoId  = await Simulacao.findByPk(id);

        res.json(retornaSimulacaoId);
    }
};


export default simulacaoController;

