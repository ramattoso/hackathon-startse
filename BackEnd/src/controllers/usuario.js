import  Usuarios  from '../models/index.js';
import Simulacao from '../models/Simulacao.js';
const usuariosController = {
    listarUsuarios: async (req,res) => {
        const listaDeUsuarios = await Usuarios.findAll({
            include: Simulacao
        });
        res.json(listaDeUsuarios);
    },
    
    async cadastrarUsuarios (req,res) {
        const { nome, email } = req.body;
        const novaUsuarios = await Usuarios.create({
            nome,
            email,
        });
        res.status(201).json(novaUsuarios);
    },

    async deletarUsuarios (req,res) {
        try {
            
            const { id } = req.params;
    
            await Usuarios.destroy({
                where: {
                    idUsuario: id,
                },
            });
            res.status(204);
        } catch (error) {
            res.status(500).json('Ocorreu algum problema com a deleção');
        }
    },

    async atualizaUsuarios (req,res) {
        const { id } = req.params;
        const { nome, email } = req.body;

        if (!id) return res.status(400).json('id não enviado.');

        const UsuariosAtualizado = await Usuarios.update({
            nome, 
            email,
        },{where: {idUsuario:id}});

        res.json(UsuariosAtualizado);

    },

    async buscaUsuariosID (req,res) {
        const {id} = req.params;
        const retornaUsuariosId  = await Usuarios.findByPk(id);

        res.json(retornaUsuariosId);
    }
};


export default usuariosController;