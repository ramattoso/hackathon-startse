import Simulacao from './Simulacao.js';
import Usuarios from './Usuario.js';


Simulacao.belongsTo(Usuarios, {
    foreignKey: 'idUsuario',
});


export default  Simulacao;
