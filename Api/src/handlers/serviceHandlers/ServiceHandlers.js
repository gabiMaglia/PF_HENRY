const { Service, Service_status } = require("../../db");
const {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClient,
  getServiceByModel,
} = require("../../controllers/serviceControllers/serviceController");

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
    if (newService.error) {
      return res.status(404).send(newService.response);
    }

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
    if (updatedService.error) {
      return res.status(404).send(updatedService.response);
    }
    if (!updatedService) {
      return res.status(404).json({ error: "no se modifico el status" });
    }
    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllServices = async (req, res) => {
  const { model } = req.query;
  if (!model) {
    try {
      const servicios = await getAllServicesController();
      if (servicios.error) {
        return res.status(404).send(servicios.response);
      }
      return res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }else{
    try {
      const servicios = await getServiceByModel(model);
      if (servicios.error) {
        return res.status(404).send(servicios.response);
      }
      return res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getServiceByIdController(id);
    if (response.error) {
      return res.status(404).send(response.response);
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getServiceByClientid = async (req, res) => {
  const { id } = req.params;

  try {
    const Services = await getServiceByClient(id);
    if (Services.error) {
      return res.status(404).send(Services.response);
    }
    return res.status(200).json(Services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addServiceHandler,
  updateServiceStatus,
  getAllServices,
  getServiceById,
  getServiceByClientid,
};
