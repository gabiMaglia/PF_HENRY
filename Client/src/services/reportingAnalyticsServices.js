import axios from "axios";

const frontUrl = import.meta.env.VITE_FRONT_URL;

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

export const getUserCode = async () => {
  try {
    const popup = window.open(
      `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${credentials.web.client_id}&redirect_uri=${frontUrl}/admin/userPanel/analyticsToken&scope=https://www.googleapis.com/auth/analytics.readonly&access_type=offline`,
      "targetWindow",
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=620,
      height=700`
    );
    popup.window.opener = window;
  } catch {
    (error) => {
      return error;
    };
  }
};

export const getTokenAccess = async (authCode) => {
  const actualCredentials = {
    ...credentials.web,
    grant_type: "authorization_code",
    code: authCode,
  };
  try {
    const respuestaToken = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams(actualCredentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenAccess = respuestaToken.data.access_token;
    const refreshToken = respuestaToken.data.refresh_token;

    console.log("Token de acceso:", tokenAccess);
    console.log("Refresh token:", refreshToken);
    return { tokenAccess, refreshToken };
  } catch (error) {
    return error;
  }
};
