class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM livros", (erro, resultados) => {
        if (erro) return reject("nao foi possivel");
        return resolve(resultados);
      });
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        INSERT INTO LIVROS (
                titulo,
                preco,
                descricao
            ) values (?, ?, ?)
        `,
        [livro.titulo, livro.preco, livro.descricao],
        function (erro) {
          if (erro) {
            return reject("nao foi possivel");
          }
          resolve();
        }
      );
    });
  }

  buscaId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
            SELECT *
            FROM livros
            WHERE id = ?
        `,
        [id],
        (erro, livro) => {
          if (erro) {
            return reject("erro");
          }
          return resolve(livro);
        }
      );
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        UPDATE livros SET
        titulo = ?,
        preco = ?,
        descricao = ?
        WHERE id = ?
    `,
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        (erro) => {
          if (erro) {
            return reject("erro");
          }
          resolve();
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          DELETE 
          FROM livros
          WHERE id = ?
      `,
        [id],
        (erro) => {
          if (erro) {
            return reject("erro");
          }
          resolve();
        }
      );
    });
  }
}

module.exports = LivroDao;
