import axios from "axios";
const PROPERTY_ID = import.meta.env.VITE_REPORTING_ANALYTICS_PROJECT_ID;
import { metrics, dimensions } from "../components/AnalyticsInfo/dataTypes";

const getObjects = (objs, type) => {
  const completeData = type === "metrics" ? [...metrics] : [...dimensions];
  const completeObject = objs.map((obj) => {
    return completeData.find((object) => {
      if (object.label === obj) {
        return object;
      }
    });
  });
  return completeObject;
};

export const fetchAnalyticsData = async (
  accessToken,
  startDate,
  endDate,
  metrics,
  dimensions
) => {
  try {
    const metricsComplete = getObjects(metrics, "metrics");
    const dimensionsComplete = getObjects(dimensions, "dimensions");
    let totalDimensionsFilter = [];
    let orderBys = [];

    const reqDimensions = dimensionsComplete.map((dimension) => {
      if (dimension?.dimensionFilter) {
        totalDimensionsFilter.push(dimension?.dimensionFilter);
      }
      if (dimension?.orderBys && dimension?.orderBys?.length > 0) {
        dimension.orderBys.map((order) => {
          orderBys.push(order);
        });
      }
      return {
        name: dimension?.name,
      };
    });

    let totalMetricsFilter = [];
    const reqMetrics = metricsComplete.map((metric) => {
      if (metric?.dimensionFilter) {
        totalMetricsFilter.push(metric?.dimensionFilter);
      }
      if (metric?.orderBys && metric?.orderBys?.length > 0) {
        metric.orderBys.map((order) => {
          orderBys.push(order);
        });
      }
      return {
        name: metric?.name,
      };
    });

    let responseData;

    if (totalDimensionsFilter.length !== 0 || totalMetricsFilter.length !== 0) {
      const totalDimensionsData = await Promise.all(
        totalDimensionsFilter.map(async (filter, index) => {
          const requestBody = {
            dateRanges: [{ startDate, endDate }],
            metrics: reqMetrics ? reqMetrics : "",
            dimensions: reqDimensions[index],
          };
          requestBody.dimensionFilter = filter;
          orderBys?.length > 0 && (requestBody.orderBys = orderBys);

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          };

          return axios.post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
            requestBody,
            { headers }
          );
        })
      );

      const totalMetricsData = await Promise.all(
        totalMetricsFilter.map(async (filter, index) => {
          const requestBody = {
            dateRanges: [{ startDate, endDate }],
            metrics: reqMetrics[index],
            dimensions: reqDimensions ? reqDimensions : "",
          };
          requestBody.dimensionFilter = filter;
          orderBys?.length > 0 && (requestBody.orderBys = orderBys);
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          };
          return axios.post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
            requestBody,
            { headers }
          );
        })
      );
      let totalData = [...totalDimensionsData, ...totalMetricsData];

      let error = { error: false, response: "" };

      totalData = totalData.map((data) => {
        if (data?.status === 401 || data?.status === 403) {
          error = {
            error: true,
            response:
              "Error de autenticación, verifique que la cuenta este habilitada",
          };
        } else if (data.status !== 200 || data.status !== 201) {
          error = {
            error: true,
            response: "Error al obtener los datos, intentelo denuevo mas tarde",
          };
        }
        return data?.data;
      });

      totalData = totalData.filter((data) => {
        if (data !== undefined) return data;
      });

      responseData = totalData;
    } else {
      const requestBody = {
        dateRanges: [{ startDate, endDate }],
        metrics: reqMetrics ? reqMetrics : "",
        dimensions: reqDimensions ? reqDimensions : "",
      };
      orderBys?.length > 0 && (requestBody.orderBys = orderBys);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(
        `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
        requestBody,
        { headers }
      );

      if (response.status === 401 || response.status === 403) {
        return {
          error: true,
          response:
            "Error de autenticación, verifique que la cuenta este habilitada",
        };
      }

      responseData = [response?.data];
    }
    const rows = [];
    responseData.forEach((data) => {
      data?.rows?.map((row) => {
        rows.push(row);
      });
    });
    return rows;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      return {
        error: true,
        response:
          "Error de autenticación, verifique que la cuenta este habilitada",
      };
    }
    return {
      error: true,
      response:
        "Error de al obtener los datos, pruebe con otra combinación de metricas y dimensiones",
    };
  }
};
