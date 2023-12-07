const {
  getAllStock,
  getStockById,
  deleteStock,
  updateStock,
} = require("../controllers/stockController");

const getAllStockHandler = async (req, res) => {
  try {
    const allStock = await getAllStock();
    res.status(200).json(allStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStockByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await getStockById(id);
    if (stock) {
      res.status(200).json(stock);
    } else {
      res.status(400).json({ error: `Stock with ID:${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStockHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedStock = await updateStock(id, updateData);
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStockHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const Stock = await deleteStock(id);
    res.status(200).json(Stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStockHandler,
  getStockByIdHandler,
  updateStockHandler,
  deleteStockHandler,
};
