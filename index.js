const restify = require("restify");
const errs = require("restify-errors");
//const cors = require("cors");
const corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["http://localhost:3000", "http://web.myapp.com"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"]
});
const abraao = "asd";
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ebd"
  }
});

const server = restify.createServer({
  name: "myapp",
  version: "1.0.0"
});

server.pre(cors.preflight);
server.use(cors.actual);

//server.use(cors());

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080 || 3000, function() {
  console.log("%s listening at %s", server.name, server.url);
});

server.get(
  "/",
  restify.plugins.serveStatic({
    directory: "./dist",
    file: "index.html"
  })
);

server.get("/read", function(req, res, next) {
  knex("aluno").then(dados => {
    res.send(dados);

    res.json(dados);
  }, next);
});

server.post("/create", function(req, res, next) {
  knex("rest")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});

server.get("/show/:id", function(req, res, next) {
  const { id } = req.params;
  knex("rest")
    .where("id", id)
    .first()
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send(dados);
    }, next);
});

server.put("/update/:id", function(req, res, next) {
  const { id } = req.params;
  knex("rest")
    .where("id", id)
    .update(req.body)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send("dados atualizados");
    }, next);
});

server.del("/delete/:id", function(req, res, next) {
  const { id } = req.params;
  knex("rest")
    .where("id", id)
    .delete()
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send("dados excluidos");
    }, next);
});

server.get("/lista/:congregacao/:classe", function(req, res, next) {
  const { congregacao } = req.params;
  const { classe } = req.params;
  knex("aluno")
    .where("congregacao", congregacao)
    .andWhere("classe", classe)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.json(dados);
    }, next);
});

server.get("/revista/:trimestre/:ano", function(req, res, next) {
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
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send(dados);
    }, next);
});

server.post("/addRevista", function(req, res, next) {
  knex("revista")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});
server.post("/addAluno", function(req, res, next) {
  knex("aluno")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});
server.post("/addUsuario", function(req, res, next) {
  knex("usuario")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});
server.post("/addOferta", function(req, res, next) {
  knex("oferta")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});
server.put("/revistaPago/:id", function(req, res, next) {
  const { id } = req.params;
  knex("revista")
    .where("id", id)
    .update(req.body)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send("dados atualizados");
    }, next);
});
/*
server.get("/ProdutosPedido/:id", function(req, res, next) {
  const { nMesa } = req.params;
  knex
    .select("Produto.nome")
    .from("itensPedido", "pedido")
    .join("Pedido", function() {
      this.on("itensPedido.nPedido", "=", "pedido.id");
    })
    .join("Produto", function() {
      this.on("itensPedido.codProduto", "=", "Produto.id");
    })
    .where("Pedido.nMesa", nMesa)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send(dados);
    }, next);
});
*/

server.post("/addPresenca", function(req, res, next) {
  knex("presenca")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});
server.post("/addClasse", function(req, res, next) {
  knex("classe")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});

server.del("/deletaPresenca/:trimestre/:codAluno/:ano/:licao", function(
  req,
  res,
  next
) {
  const { trimestre, codAluno, ano, licao } = req.params;
  knex("presenca")
    .where("trimestre", trimestre)
    .andWhere("codAluno", codAluno)
    .andWhere("ano", ano)
    .andWhere("licao", licao)
    .delete()
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send("dados excluidos");
    }, next);
});
server.post("/user", function(req, res, next) {
  const { login, senha } = req.body;
  knex
    .select("*")
    .from("usuario")
    .first()
    .where("login", login)
    .andWhere("senha", senha)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send(dados);
    }, next);
});

server.get("/listaClasse/:codCongregacao", function(req, res, next) {
  const { codCongregacao } = req.params;
  knex("classe")
    .where("codCongregacao", codCongregacao)
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send(dados);
    }, next);
});
server.del("/deletaClasse/:id", function(req, res, next) {
  const { id } = req.params;
  knex("presenca")
    .where("id", id)
    .delete()
    .then(dados => {
      if (!dados) return res.send(new errs.BadRequestError("nada encontrado"));
      res.send("dados excluidos");
    }, next);
});
