const { Service, Service_status } = require("../db");

const addService = async (req, res) => {
  const {
    product_model,
    product_income_date,
    user_diagnosis,
    clientId,
    technicianId,
  } = req.body;
  try {
    if (
      !product_model ||
      !product_income_date ||
      !user_diagnosis ||
      !clientId ||
      !technicianId
    ) {
      const newService = await Service.create({
        product_model,
        product_income_date,
        userId: clientId,
        technicianId: technicianId,
      });

      const newServiceStatus = await Service_status.create({
        user_diagnosis,
        technical_diagnosis: "pending",
        final_diagnosis: "pending",
        confirm_repair: false,
        reparir_finish: false,
        ServiceId: newService.id,
      });

      return res.status(200).json({ newService, newServiceStatus });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const UpdateTechDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { technical_diagnosis } = req.body;
  try {
    const serviceStatus = await Service_status.findOne({
      where: { id },
    });
    if (!serviceStatus) {
      return res.status(404).json({ error: "Service status not found" });
    }
    serviceStatus.technical_diagnosis = technical_diagnosis;
    await serviceStatus.save();

    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const UpdateFinalDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { final_diagnosis } = req.body;
  try {
    const serviceStatus = await Service_status.findOne({
      where: { id },
    });
    if (!serviceStatus) {
      return res.status(404).json({ error: "Service status not found" });
    }
    serviceStatus.final_diagnosis = final_diagnosis;
    await serviceStatus.save();

    const service = await Service.findOne({
      where: { id: serviceStatus.ServiceId },
      include: [Service_status],
    });

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateConfirmReparir = async (req, res) => {
  const { id } = req.params;
  const { confirm_repair } = req.body;
  try {
    const serviceStatus = await Service_status.findOne({ where: { id } });
    if (!serviceStatus) {
      return res.status(404).json({ error: "Service status not found" });
    }
    if (confirm_repair === true) {
      serviceStatus.confirm_repair === confirm_repair;
      await serviceStatus.save();
      const service = await Service.findOne({
        where: { id: serviceStatus.ServiceId },
        include: [Service_status],
      });
      return res.status(200).json(service);
    } else {
      return res.status(304).send("no se modifico el status");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRepairFinish = async (req, res) => {
  const { id } = req.params;
  const { reparir_finish } = req.body;
  try {
    const serviceStatus = await Service_status.findOne({ where: { id } });
    if (!serviceStatus) {
      return res.status(404).json({ error: "Service status not found" });
    }
    if (confirm_repair === true) {
      serviceStatus.reparir_finish === reparir_finish;
      await serviceStatus.save();
      const service = await Service.findOne({
        where: { id: serviceStatus.ServiceId },
        include: [Service_status],
      });
      return res.status(200).json(service);
    } else {
      return res.status(304).send("no se modifico el status");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
