const rotasBase = require("./base-rotas");
const livroRotas = require("./livro-rotas");

module.exports = (app) => {
  rotasBase(app);
  livroRotas(app);
};
