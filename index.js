const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);
var port = 3000
server.listen(port);
