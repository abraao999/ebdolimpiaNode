const express = require("express");

const alunos = require("./src/controllers/alunos");
const revista = require("./src/controllers/revista");
const usuario = require("./src/controllers/usuario");
const oferta = require("./src/controllers/oferta");
const presenca = require("./src/controllers/presenca");
const classe = require("./src/controllers/classe");
const routes = express.Router();

routes.get("/lista/:congregacao/:classe", alunos.alunosCongregacao);
routes.get("/listaAlunos", alunos.listaAlunos);
routes.post("/addAluno", alunos.cadastraAluno);

routes.get("/revista/:trimestre/:ano", revista.listaRevista);
routes.post("/addRevista", revista.addRevista);

routes.post("/addUsuario", usuario.addUsuario);
routes.post("/user", usuario.buscaUsuario);

routes.post("/addOferta", oferta.addOferta);
routes.put("/revistaPago/:id", oferta.revistaPago);

routes.post("/addPresenca", presenca.addPresenca);
routes.delete(
  "/deletaPresenca/:trimestre/:codAluno/:ano/:licao",
  presenca.deletaPresenca
);

routes.post("/addClasse", classe.addClasse);
routes.get("/listaClasse/:codCongregacao", classe.listaClasse);
routes.delete("/deletaClasse/:id", classe.deletaClasse);
routes.get("/classeEdit/:id", classe.buscaClasseId);
routes.put("/editarClasse/:id", classe.alteraClasse);
module.exports = routes;
