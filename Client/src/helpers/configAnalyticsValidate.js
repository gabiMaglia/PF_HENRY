const graphValidate = (graph) => {
  let error = "";
  if (typeof graph !== "string" || graph?.length === 0) {
    error = "El tipo de grafico es requerido";
  }
  return error;
};

const orderValidate = (order) => {
  let error = "";
  if (typeof order !== "string" || order?.length === 0) {
    error = "El tipo de orden es requerido";
  }
  return error;
};

const datesValidate = (startDate, endDate) => {
  let error = "";
  if (startDate > endDate) {
    error = "La fecha de inicio no puede ser mayor a la fecha de fin";
  }
  return error;
};

const startDateValidate = (startDate) => {
  let error = "";
  if (typeof startDate !== "string" || startDate?.length === 0) {
    error = "La fecha de inicio es requerida";
  } else {
    const date = new Date(startDate);
    if (isNaN(date.getTime())) {
      error = "La fecha de inicio es inválida";
    } else {
      const actualDate = new Date();
      if (date > actualDate) {
        error = "La fecha de inicio no puede ser mayor a la fecha actual";
      } else if (date < new Date("01/01/2021")) {
        error =
          "La fecha de inicio no puede ser menor a la fecha de recolección de datos (01/01/2024)";
      }
    }
  }
  return error;
};

const endDateValidate = (startDate) => {
  let error = "";
  if (typeof startDate !== "string" || startDate?.length === 0) {
    error = "La fecha final es requerida";
  } else {
    const date = new Date(startDate);
    if (isNaN(date.getTime())) {
      error = "La fecha final es inválida";
    } else {
      const actualDate = new Date();
      if (date > actualDate) {
        error = "La fecha final no puede ser mayor a la fecha actual";
      }
    }
  }
  return error;
};

const metricsValidate = (metrics) => {
  let error = "";
  if (metrics.length === 0) {
    error = "Las métricas son requeridas";
  } else {
    if (metrics.includes(null) || metrics.includes("")) {
      error = "Las métricas no pueden estar vacías";
    }
  }
  return error;
};

const dimensionsValidate = (dimensions) => {
  let error = "";
  if (dimensions.length === 0) {
    error = "Las dimensiones son requeridas";
  } else {
    if (dimensions.includes(null) || dimensions.includes("")) {
      error = "Las dimensiones no pueden estar vacías";
    }
  }
  return error;
};

export const configValidate = (values) => {
  const { graph, order, startDate, endDate, metrics, dimensions } = values;
  const errors = {};
  graph !== undefined && (errors.graph = graphValidate(graph));
  order !== undefined && (errors.order = orderValidate(order));
  startDate !== undefined &&
    endDate !== undefined &&
    (errors.dates = datesValidate(startDate, endDate));
  startDate !== undefined && (errors.startDate = startDateValidate(startDate));
  endDate !== undefined && (errors.endDate = endDateValidate(endDate));
  metrics !== undefined && (errors.metrics = metricsValidate(metrics));
  dimensions !== undefined &&
    (errors.dimensions = dimensionsValidate(dimensions));

  return errors;
};
