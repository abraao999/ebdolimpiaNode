const knex = require("../../connector");

module.exports = {
  async addOferta(req, res, next) {
    knex("oferta")
      .insert(req.body)
      .then(dados => {
        res.send(dados);
      }, next);
  },
  async revistaPago(req, res, next) {
    const { id } = req.params;
    knex("revista")
      .where("id", id)
      .update(req.body)
      .then(dados => {
        if (!dados)
          return res.send(new errs.BadRequestError("nada encontrado"));
        res.send("dados atualizados");
      }, next);
  }
};
