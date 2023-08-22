import db from "./SQLiteDatabse";

db.transaction((bc) => {

  bc.executeSql(
    "CREATE TABLE IF NOT EXISTS carros (id INTEGER PRIMARY KEY AUTOINCREMENT, marca TEXT, model TEXT, hp INT);"
  );
});


const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "INSERT INTO carros (marca, model, hp) values (?, ?, ?);",
        [obj.marca, obj.model, obj.hp],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Erro ao inserir o obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "UPDATE carros SET marca=?, model=?, hp=? WHERE id=?;",
        [obj.marca, obj.model, obj.hp, id],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Erro no updating do obj: id=" + id); // nenhum registro alterado
        },
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "SELECT * FROM carros WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj não encontrado: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

const findBymarca = (marca) => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "SELECT * FROM carros WHERE marca LIKE ?;",
        [marca],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj não encontrado: marca=" + marca); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "SELECT * FROM carros;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((bc) => {
      bc.executeSql(
        "DELETE FROM carros WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em bc.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findBymarca,
  all,
  remove,
};
