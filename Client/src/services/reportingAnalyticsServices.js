import axios from "axios";
const PROPERTY_ID = import.meta.env.VITE_REPORTING_ANALYTICS_PROJECT_ID;
const frontUrl = import.meta.env.VITE_FRONT_URL;

export const fetchAnalyticsData = async (accessToken, startDate, endDate) => {
  try {
    const dimensions = [{ name: "eventName" }, { name: "date" }];
    const metrics = [{ name: "eventCount" }];
    const dimensionFilter = {
      filter: {
        fieldName: "eventName",
        stringFilter: {
          value: "create_service", // Filtra por el nombre del evento
          matchType: "EXACT",
        },
      },
    };

    const requestBody = {
      dateRanges: [{ startDate, endDate }],
      metrics,
      dimensions,
      dimensionFilter,
    };

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
