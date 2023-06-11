const shoppingListModel = require("../models/shopping-list-model");
const AppError = require("../utils/app-error");

const getAllItems = (req, res, next) => {
  shoppingListModel.getAllItems((err, transformedShoppingList) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: transformedShoppingList.length,
      data: transformedShoppingList,
    });
  });
};

const createItem = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const itemData = {
    name: req.body.name,
    quantity: req.body.quantity,
    bought: req.body.bought,
  };
  shoppingListModel.createItem(itemData, (err) => {
    if (err) return next(new AppError(err, 500));
    res.status(201).json({
      status: "success",
      message: "Shopping list item created successfully!",
    });
  });
};

const updateItem = (req, res, next) => {
  if (!req.params.id) return next(new AppError("No item id found", 404));
  if (!req.body) return next(new AppError("Request body is empty", 500));
  const itemId = req.params.id;
  const bought = req.body.bought;
  shoppingListModel.updateItem(itemId, bought, (err) => {
    if (err) return next(new AppError(err, 500));
    res.status(200).json({
      status: "success",
      message: "Item updated successfully!",
    });
  });
};

const deleteItem = (req, res, next) => {
  if (!req.params.id) return next(new AppError("No item id found", 404));
  const itemId = req.params.id;
  shoppingListModel.deleteItem(itemId, (err) => {
    if (err) return next(new AppError(err, 500));
    res.status(201).json({
      status: "success",
      message: `Item ${itemId} deleted successfully`,
    });
  });
};

module.exports = { getAllItems, createItem, updateItem, deleteItem };
