import Simulacao from './Simulacao.js';
import Usuarios from './Usuario.js';


Usuarios.belongsTo(Simulacao, {
    foreignKey: 'idUsuario',
});

export default Usuarios;
