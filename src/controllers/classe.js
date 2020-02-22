const knex = require("../../connector");

module.exports = {
  async addClasse(req, res, next) {
    knex("classe")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  },
  async listaClasse(req, res, next) {
    const { codCongregacao } = req.params;
    knex("classe")
      .where("codCongregacao", codCongregacao)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send(dados);
      }, next);
  },
  async deletaClasse(req, res, next) {
    const { id } = req.params;
    knex("classe")
      .where("id", id)
      .delete()
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send("dados excluidos");
      }, next);
  },
  async buscaClasseId(req, res, next) {
    const { id } = req.params;
    knex
      .select("*")
      .from("classe")
      .where("id", id)
      .first()
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send(dados);
      }, next);
  },
  async alteraClasse(req, res, next) {
    const { id } = req.params;
    knex("classe")
      .where("id", id)
      .update(req.body)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send("dados atualizados");
      }, next);
  }
};
