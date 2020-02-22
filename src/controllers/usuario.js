const knex = require("../../connector");

module.exports = {
  async addUsuario(req, res, next) {
    knex("usuario")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  },
  async buscaUsuario(req, res, next) {
    const { login, senha } = req.body;
    knex
      .select("*")
      .from("usuario")
      .first()
      .where("login", login)
      .andWhere("senha", senha)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send(dados);
      }, next);
  }
};
