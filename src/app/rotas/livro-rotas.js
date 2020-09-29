const LivroControlador = require("../contoladores/livro-controlador");
const livroControlador = new LivroControlador();

const BaseControlador = require('../contoladores/base-controlador');

const rotasLivro = LivroControlador.rotas();

const Livro = require("../model/livro");

module.exports = (app) => {

  app.use(rotasLivro.autenticadas, (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.redirect(BaseControlador.rotas().login);
    }

  });
  app.get(rotasLivro.lista, livroControlador.lista());

  app.route(rotasLivro.cadastro)
  app.get(rotasLivro.cadastro, livroControlador.formCad());
  app.post(rotasLivro.cadastro, Livro.validacoes(), livroControlador.cadastra());
  //app.post('/livros/form', Livro.validacoes(), livroControlador.cadastra());
  app.put(rotasLivro.cadastro, livroControlador.edita());

  app.get(rotasLivro.edicao, livroControlador.formEdit());

  app.delete(rotasLivro.delecao, livroControlador.remove());
};
