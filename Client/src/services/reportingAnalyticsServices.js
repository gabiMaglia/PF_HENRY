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

export const fetchAnalyticsRealtimeData = async (accessToken) => {
  const reqParams = [
    { metrics: { name: "activeUsers" } },
    { metrics: { name: "activeUsers" }, dimensions: { name: "platform" } },
    { metrics: { name: "activeUsers" }, dimensions: { name: "country" } },
    { metrics: { name: "activeUsers" }, dimensions: { name: "city" } },
    { metrics: { name: "conversions" } },
    { metrics: { name: "eventCount" }, dimensions: { name: "eventName" } },
    { metrics: { name: "eventCount" }, dimensions: { name: "eventName" } },
  ];
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const responses = await Promise.all(
      reqParams.map((param) => {
        return axios.post(
          `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runRealtimeReport`,
          param,
          { headers }
        );
      })
    );

    //Usuarios activos

    const activeUsers = responses[0]?.data?.rows
      ? responses[0]?.data?.rows[0]?.metricValues[0]?.value
      : 0;

    //Usuarios activos por plataforma

    let activeUsersPerPlataform = { dimensions: [], metrics: [] };
    responses[1]?.data?.rows.forEach((row) => {
      activeUsersPerPlataform.dimensions.push(row?.dimensionValues[0]?.value);
      activeUsersPerPlataform.metrics.push(row?.metricValues[0]?.value);
    });

    //Usuarios activos por pais

    let activeUsersPerCountry = { dimensions: [], metrics: [] };

    responses[2]?.data?.rows.forEach((row) => {
      activeUsersPerCountry.dimensions.push(row?.dimensionValues[0]?.value);
      activeUsersPerCountry.metrics.push(row?.metricValues[0]?.value);
    });

    //Usuarios activos por ciudad

    let activeUsersPerCity = { dimensions: [], metrics: [] };

    responses[3]?.data?.rows.forEach((row) => {
      activeUsersPerCity.dimensions.push(row?.dimensionValues[0]?.value);
      activeUsersPerCity.metrics.push(row?.metricValues[0]?.value);
    });

    //Conversiones

    const conversions = responses[4]?.data?.rows
      ? responses[4]?.data?.rows[0]?.metricValues[0]?.value
      : 0;

    //Eventos

    const eventCount = responses[5]?.data?.rows
      ? responses[5]?.data?.rows[0]?.metricValues[0]?.value
      : 0;

    //Eventos por nombre

    const eventCountPerName = { dimensions: [], metrics: [] };
    responses[6]?.data?.rows.forEach((row) => {
      eventCountPerName.dimensions.push(row?.dimensionValues[0]?.value);
      eventCountPerName.metrics.push(row?.metricValues[0]?.value);
    });

    return {
      activeUsers,
      activeUsersPerCountry,
      activeUsersPerCity,
      activeUsersPerPlataform,
      conversions,
      eventCount,
      eventCountPerName,
    };
  } catch (error) {
    return {
      error: true,
      respose: "Error al obtener los datos en tiempo real",
    };
  }
};
