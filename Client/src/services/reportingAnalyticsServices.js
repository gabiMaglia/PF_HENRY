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

    const reqDimensions = dimensionsComplete.map((dimension) => {
      return {
        name: dimension?.name,
      };
    });
    const reqMetrics = metricsComplete.map((metric) => {
      return {
        name: metric?.name,
      };
    });
    let filters = dimensionsComplete.map((dimension) => {
      if (dimension?.dimensionFilter) {
        return dimension?.dimensionFilter;
      }
    })[0];
    if (!filters) {
      filters = metricsComplete.map((metric) => {
        if (metric?.dimensionFilter) {
          return metric?.dimensionFilter;
        }
      })[0];
    }

    const requestBody = {
      dateRanges: [{ startDate, endDate }],
      metrics: reqMetrics ? reqMetrics : "",
      dimensions: reqDimensions,
    };
    filters && (requestBody.dimensionFilter = filters);
    console.log(requestBody);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const apiResponse = await axios.post(
      `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
      requestBody,
      { headers }
    );
    const responseData = apiResponse.data;
    console.log("responseData", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
// const dimensions = [{ name: "eventName" }, { name: "date" }];
// const metrics = [{ name: "eventCount" }];
// const dimensionFilter = {
//   filter: {
//     fieldName: "eventName",
//     stringFilter: {
//       value: "create_service", // Filtra por el nombre del evento
//       matchType: "EXACT",
//     },
//   },
// };);

// const dimensions = [{ name: "eventName" }, { name: "date" }];
// const metrics = [{ name: "eventCount" }];
// const dimensionFilter = {
//   filter: {
//     fieldName: "eventName",
//     stringFilter: {
//       value: "create_service", // Filtra por el nombre del evento
//       matchType: "EXACT",
//     },
//   },
// };
