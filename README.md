# Hackathon-StartSe :computer:

## Tecnologias utilizadas

<div style="display: inline_block"><br>
    <img src="https://img.icons8.com/color/48/000000/html-5--v1.png"/>
    <img src="https://img.icons8.com/color/48/000000/css3.png"/>
    <img src="https://img.icons8.com/color/48/000000/javascript--v1.png"/>
    <img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>
    <img src="https://img.icons8.com/color/48/000000/git.png"/>
</div>

## Desafio

<center>

O trabalho informal é um assunto complexo que afeta não só as pessoas, mas também a sociedade como um todo.
O nosso projeto tem como objetivo ajudar pessoas em situação de trabalho informal a se prepararem para algo que consequentemente chegará para todos: o Futuro!
Então, como uma forma de conscientização financeira, preparamos um material para auxiliá-las a se prepararem para o futuro, pensando principalmente no risco que elas correm em situações de inatividade: seja doença, perda de renda ou aposentadoria.

Para isso vamos mostrar:

- Possíveis investimentos, e diferenças entre eles;
- Pessoas que podem auxiliá-las no processo;
- Principais corretoras/bancos do mercado;
- Simulador de investimentos;

O objetivo do projeto não é indicar nenhum tipo de produto ou empresa, mas sim conscientizar pessoas que trabalham de forma informal que elas precisam se preparar para o futuro e que existem diversas maneiras/empresas/pessoas que podem ajuda-las.

</center>

## Solução

- [x] Utilização de fluxo de trabalho: [git flow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)
- [x] Construção do Banco de Dados MySQL rodado no Heroku
- [x] Criação da API que fornece conexão com o Banco de Dados e faz o processamento de simulação Financeira respondendo ao FrontEnd. 

**Repositório da API:** https://github.com/Luanftg/teste-Back-StartSE.git

- [x] Instalação das libs:
  - [x] [express](http://expressjs.com/pt-br/)
  - [x] [nodemon](https://nodemon.io/)
  - [x] [ORM sequelize](https://sequelize.org/)
  - [x] [mysql2](https://www.npmjs.com/package/mysql2)
- [x] Criação dos endpoints:
  - [x] GET`/`
  - [x] GET - `/simulacao`
  - [x] GET - `/simulacao/:id`
  - [x] POST `/simulacao`
  - [x] DELETE `/simulacao/:id`
  - [x] PUT `/simulacao/:id`
  
  - [x] GET - `/usuario`
  - [x] GET - `/usuario/:id`
  - [x] POST `/usuario`
  - [x] DELETE `/usuario/:id`
  - [x] PUT `/usuario/:id`

## Próximos Passos no Desenvolvimento

- [ ] componentizar o front-end
- [ ] login e autenticação do usuário
- [ ] gerar relatório da simulação
- [ ] enviar relatório por email
- [ ] conectar com APIs públicas de Finanças:
  - [ ] [B3](https://developers.b3.com.br/apis-br)
  - [ ] [OpenBank](https://api.openbankproject.com/)

### Referências

[ChartJs](https://www.chartjs.org/docs/latest/getting-started/)

<a target="_blank" href="https://icons8.com/icon/20909/html-5">Html 5 icon by Icons8</a>
<a target="_blank" href="https://icons8.com/icon/21278/css3">CSS3 icon by Icons8</a>
<a target="_blank" href="https://icons8.com/icon/108784/javascript">JavaScript icon by Icons8</a>
<a target="_blank" href="https://icons8.com/icon/20906/git">Git icon by Icons8</a>
<a target="_blank" href="https://icons8.com/icon/hsPbhkOH4FMe/node-js">Node Js icon by Icons8</a>
