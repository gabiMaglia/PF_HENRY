const { ProductStock } = require("../../db");

const getAllStock = async () => {
  const allStock = await ProductStock.findAll();
  if (allStock) {
    return allStock;
  }
};

const getStockById = async (id) => {
  const stock = await ProductStock.findByPk(id);
  if (!stock) {
    throw new Error("Stock no disponible");
  } else {
    return stock;
  }
};

const updateStock = async (id, updateData) => {
  try {
    const stockToUpdate = await ProductStock.findByPk(id);

    if (!stockToUpdate) {
      throw new Error(`Stock con ID:${id} no ha sido encontrado.`);
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
      response: `${id} ha sido eliminado`,
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
