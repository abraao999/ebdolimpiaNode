const knex = require("../../connector");

module.exports = {
  async listaAlunos(req, res, next) {
    knex("aluno").then(dados => {
      res.send(dados);

      res.json(dados);
    }, next);
  },
  async alunosCongregacao(req, res, next) {
    const { congregacao } = req.params;
    const { classe } = req.params;
    knex("aluno")
      .where("congregacao", congregacao)
      .andWhere("classe", classe)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.json(dados);
      }, next);
  },
  async cadastraAluno(req, res, next) {
    knex("aluno")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  }
};
