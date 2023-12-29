const {
  addServiceController,
  updateServiceStatusController,
  getAllServicesController,
  getServiceByIdController,
  getServiceByClientController,
  getServiceByModelController,
  filterServicesByStatusController,
} = require("../../controllers/serviceControllers/serviceController");

const addServiceHandler = async (req, res) => {
  const {
    product_model,
    product_income_date,
    product_image,
    user_diagnosis,
    technicianId,
    ClientId,
  } = req.body;
  try {
    const newService = await addServiceController(
      product_model,
      product_income_date,
      product_image,
      user_diagnosis,
      ClientId,
      technicianId
    );
    if (newService.error) {
      return res.status(404).json(newService.response);
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
      return res.status(404).json(updatedService.response);
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
        return res.status(404).json(servicios.response);
      }
      return res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const servicios = await getServiceByModelController(model);
      if (servicios.error) {
        return res.status(404).json(servicios.response);
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
      return res.status(404).json(response.response);
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getServiceByClientid = async (req, res) => {
  const { id } = req.params;

  try {
    const Services = await getServiceByClientController(id);
    if (Services.error) {
      return res.status(404).json(Services.response);
    }
    return res.status(200).json(Services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const filterServiceByStatus = async (req, res) => {
  const { status, value } = req.body;
  try {
    const services = await filterServicesByStatusController(status, value);
    if (services.error) {
      return res.status(404).json(services.response);
    }
    res.status(200).json(services);
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
  filterServiceByStatus,
};
