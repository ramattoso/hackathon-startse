import express from 'express';
import simulacaoController from '../controllers/simulacao.js';
import usuariosController from '../controllers/usuario.js';
import healthCheck from '../controllers/healthCheck.js';
import requestLog from '../middlewares/requestLog.js';

const routes = express.Router();

routes.get('/', healthCheck.health);

routes.get('/simulacao', requestLog, simulacaoController.listarSimulacao);
routes.get('/simulacao/:id', simulacaoController.buscaSimulacaoID);
routes.post('/simulacao', simulacaoController.cadastrarSimulacao);
routes.delete('/simulacao/:id', simulacaoController.deletarSimulacao);
routes.put('/simulacao/:id', simulacaoController.atualizaSimulacao);

routes.get('/usuario', requestLog, usuariosController.listarUsuarios);
routes.get('/usuario/:id', usuariosController.buscaUsuariosID);
routes.post('/usuario', usuariosController.cadastrarUsuarios);
routes.delete('/usuario/:id', usuariosController.deletarUsuarios);
routes.put('/usuario/:id', usuariosController.atualizaUsuarios);

export default routes;