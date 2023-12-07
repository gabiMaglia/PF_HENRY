const { ProductStock } = require("../db");

const getAllStock = async () => {
  const allStock = await ProductStock.findAll();
  if (allStock) {
    return allStock;
  } else {
    return "No Stock";
  }
};

const getStockById = async (id) => {
  const stock = await ProductStock.findByPk(id);
  if (!stock) {
    throw new Error("Stock not found");
  } else {
    return stock;
  }
};

const updateStock = async (id, updateData) => {
  try {
    const stockToUpdate = await ProductStock.findByPk(id);

    if (!stockToUpdate) {
      throw new Error(`Stock with ID:${id} was not found`);
    }

    await stockToUpdate.update(updateData);

    const updatedStock = await ProductStock.findByPk(id);

    return updatedStock;
  } catch (error) {
    throw error;
  }
};

const deleteStock = async (id) => {
  const stock = await getStockById(id);
  if (stock.amount) {
    await stock.destroy();
    return {
      response: `${stock.id} deleted successfully`,
    };
  } else {
    return stock;
  }
};

module.exports = {
  deleteStock,
  getAllStock,
  getStockById,
  updateStock,
};
