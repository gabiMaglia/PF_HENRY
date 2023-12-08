const { Service, Service_status } = require("../db");
const {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
} = require("../controllers/serviceControllers/serviceController");

const addServiceHandler = async (req, res) => {
  const {
    product_model,
    product_income_date,
    user_diagnosis,
    technicianId,
    ClientId,
  } = req.body;
  try {
    const newService = await addServiceController(
      product_model,
      product_income_date,
      user_diagnosis,
      ClientId,
      technicianId
    );
    if (!newService) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json(newService);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateServiceStatus = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  try {
    const updatedService = await updateServiceStatusController(
      id,
      field,
      value
    );
    if (!updatedService) {
      return res.status(404).json({ error: "no se modifico el status" });
    }
    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllServices = async (req, res) => {
  try {
    const servicios = await getAllServicesController();
    if (servicios.error) {
      return res.status(404).send(servicios.response);
    }
    return res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getServiceByIdController(id);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
};
