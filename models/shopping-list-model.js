const { connection } = require("../services/db");

class ShoppingList {
  getAllItems(callback) {
    connection.query("SELECT * FROM shopping_list", (err, data) => {
      if (err) return callback(err, null);
      const transformedShoppingList = data.map((shoppingList) => {
        return {
          ...shoppingList,
          bought: shoppingList.bought === 1,
        };
      });
      return callback(null, transformedShoppingList);
    });
  }

  createItem(itemData, callback) {
    const { name, quantity, bought } = itemData;
    const values = [name, quantity, bought];
    connection.query(
      "INSERT INTO shopping_list (name, quantity, bought) VALUES(?)",
      [values],
      (err) => {
        if (err) return callback(err, null);
        return callback(null);
      }
    );
  }

  updateItem(itemId, bought, callback) {
    connection.query(
      "UPDATE shopping_list SET bought = ? WHERE id = ?",
      [bought, itemId],
      (err) => {
        if (err) return callback(err, null);
        return callback(null);
      }
    );
  }

  deleteItem(itemId, callback) {
    connection.query(
      "DELETE FROM shopping_list WHERE id = ?",
      [itemId],
      (err) => {
        if (err) return callback(err, null);
        return callback(null);
      }
    );
  }
}

module.exports = new ShoppingList();
