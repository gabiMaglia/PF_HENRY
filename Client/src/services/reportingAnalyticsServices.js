import axios from "axios";
const PROPERTY_ID = import.meta.env.VITE_REPORTING_ANALYTICS_PROYECT_ID;
const frontUrl = import.meta.env.VITE_FRONT_URL;

export const fetchAnalyticsData = async (accessToken, startDate, endDate) => {
  try {
    const dimensions = [{ name: "itemBrand" }];
    const metrics = [{ name: "itemsAddedToCart" }];

    const requestBody = {
      dateRanges: [{ startDate, endDate }],
      metrics,
      dimensions,
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
