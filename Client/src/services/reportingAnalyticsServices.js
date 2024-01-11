import axios from "axios";

const credentials = {
  web: {
    client_id: import.meta.env.VITE_REPORTING_ANALYTICS_CLIENT_ID,
    project_id: import.meta.env.VITE_REPORTING_ANALYTICS_PROJECT_ID,
    auth_uri: import.meta.env.VITE_REPORTING_ANALYTICS_AUTH_URI,
    token_uri: import.meta.env.VITE_REPORTING_ANALYTICS_TOKEN_URI,
    auth_provider_x509_cert_url: import.meta.env
      .VITE_REPORTING_ANALYTICS_AUTH_PROVIDER_x509_CERT_URL,
    client_secret: import.meta.env.VITE_REPORTING_ANALYTICS_CLIENT_SECRET,
    javascript_origins: [
      import.meta.env.VITE_REPORTING_ANALYTICS_JAVASCRIPT_ORIGIN_1,
      import.meta.env.VITE_REPORTING_ANALYTICS_JAVASCRIPT_ORIGIN_2,
    ],
  },
};

export const getToken = async () => {
  const respuestaToken = await axios.post(
    "https://analyticsreporting.googleapis.com/v4/reports:batchGet",
    {
      ...credentials,
    }
  );

  console.log(respuestaToken);
};
