import { useEffect } from "react";

const frontUrl = import.meta.env.VITE_FRONT_URL;

const GetAnalyticsToken = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("code");
    if (param) {
      window.opener.location.href = `${frontUrl}/admin/userPanel/analytics?code=${param}`;
      window.close();
    }
  }, []);
};

export default GetAnalyticsToken;
