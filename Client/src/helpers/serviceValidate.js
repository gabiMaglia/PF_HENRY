const validations = {
  minCantCharsModel: 3,
  minCantCharDiagnosis: 10,
};

const productModelValidate = (model) => {
  const { minCantCharsModel } = validations;
  let error = "";
  if (model.length === 0) {
    error = "El modelo del producto es requerido";
  } else {
    model.length < minCantCharsModel
      ? (error = `El modelo del producto debe contener al menos ${minCantCharsModel} caracteres`)
      : "";
  }
  return error;
};
const productIncomeDateValidate = (date) => {
  let error = "";
  if (date.length === 0) {
    error = "La fecha de ingreso del producto es requerida";
  }
  return error;
};
const userDiagnosisValidate = (diagnosis) => {
  const { minCantCharDiagnosis } = validations;
  let error = "";
  if (diagnosis.length === 0) {
    error = "El diagnostico del producto es requerido";
  } else {
    diagnosis.length < minCantCharDiagnosis
      ? (error = `El diagnostico del producto debe contener al menos ${minCantCharDiagnosis} caracteres`)
      : "";
  }
  return error;
};
const clientValidate = (client) => {
  let error = "";
  if (client.length === 0) {
    error = "El cliente es requerido";
  }
  return error;
};
const technicianValidate = (technician) => {
  let error = "";
  if (technician.length === 0) {
    error = "El técnico es requerido";
  }
  return error;
};

export const createServiceValidate = (values, setErrors, antErrors) => {
  const {
    product_model,
    product_income_date,
    user_diagnosis,
    client,
    technician,
  } = values;

  const errors = { ...antErrors };

  product_model
    ? (errors.product_model = productModelValidate(product_model))
    : "";
  product_income_date
    ? (errors.product_income_date =
        productIncomeDateValidate(product_income_date))
    : "";
  user_diagnosis
    ? (errors.user_diagnosis = userDiagnosisValidate(user_diagnosis))
    : "";
  client ? (errors.client = clientValidate(client)) : "";
  technician ? (errors.technician = technicianValidate(technician)) : "";

  setErrors(errors);
};
