import axios from "axios";
const PROPERTY_ID = import.meta.env.VITE_REPORTING_ANALYTICS_PROJECT_ID;
import { metrics, dimensions } from "../components/AnalyticsInfo/dataTypes";

const getObjects = (obj, type) => {
  const completeData = type === "metrics" ? [...metrics] : [...dimensions];
  const completeObject = completeData.find((object) => {
    if (object.label === obj) {
      return object;
    }
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

    const reqDimensions = {
      name: dimensionsComplete?.name,
    };
    const reqMetrics = {
      name: metricsComplete?.name,
    };

    const requestBody = {
      dateRanges: [{ startDate, endDate }],
      metrics: [reqMetrics],
      dimensions: [reqDimensions],
    };
    dimensionsComplete?.dimensionFilter &&
      (requestBody.dimensionFilter = dimensionsComplete?.dimensionFilter);

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
