const knex = require("../../connector");

module.exports = {
  async addPresenca(req, res, next) {
    knex("presenca")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  },
  async deletaPresenca(req, res, next) {
    const { trimestre, codAluno, ano, licao } = req.params;
    knex("presenca")
      .where("trimestre", trimestre)
      .andWhere("codAluno", codAluno)
      .andWhere("ano", ano)
      .andWhere("licao", licao)
      .delete()
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send("dados excluidos");
      }, next);
  }
};
