const { Service, Service_status } = require("../db");
const {
  addServiceController,
  UpdateTechDiagnosisController,
  UpdateFinalDiagnosisController,
  updateConfirmRepairController,
  updateRepairFinishController,
  getAllServicesController,
} = require("../controllers/serviceController");

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
      return res.status(404).json({ error:error.message });
    }
    res.status(200).json(newService);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const UpdateTechDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { technical_diagnosis } = req.body;
  try {
    const UpdateTechDiagnosis = await UpdateTechDiagnosisController(
      id,
      technical_diagnosis
    );
    if (!UpdateTechDiagnosis) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(200).json(UpdateTechDiagnosis);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const UpdateFinalDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { final_diagnosis } = req.body;
  try {
    const UpdatefinDiagnosis = await UpdateFinalDiagnosisController(
      id,
      final_diagnosis
    );
    if (!UpdatefinDiagnosis) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(200).json(UpdatefinDiagnosis);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateConfirmRepair = async (req, res) => {
  const { id } = req.params;
  const { confirm_repair } = req.body;
  try {
    const UpdateConfirm = await updateConfirmRepairController(
      id,
      confirm_repair
    );
    if (!UpdateConfirm) {
      return res.status(404).json({ error: "no se confirmo reparacion" });
    }
    return res.status(200).json({ UpdateConfirm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRepairFinish = async (req, res) => {
  const { id } = req.params;
  const { reparir_finish } = req.body;
  try {
    const reparirFinish = await updateRepairFinishController(
      id,
      reparir_finish
    );
    if (!reparirFinish) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json({ reparirFinish });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllServices = async (req, res) => {
  try {
    const servicios = await getAllServicesController();
    
    return res.status(200).json(servicios);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addServiceHandler,
  updateRepairFinish,
  updateConfirmRepair,
  UpdateFinalDiagnosis,
  UpdateTechDiagnosis,
  getAllServices
};
