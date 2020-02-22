const knex = require("../../connector");

module.exports = {
  async listaRevista(req, res, next) {
    const { trimestre } = req.params;
    const { ano } = req.params;
    knex
      .select("*")
      .from("aluno", "revista")
      .join("revista", function() {
        this.on("aluno.id", "=", "revista.codAluno");
      })
      .where("trimestre", trimestre)
      .andWhere("ano", ano)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send(dados);
      }, next);
  },
  async addRevista(req, res, next) {
    knex("revista")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  }
};
