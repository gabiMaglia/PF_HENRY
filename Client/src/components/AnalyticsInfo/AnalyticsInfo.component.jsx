import { Box, Button, Typography } from "@mui/material";
import {
  getUserCode,
  getTokenAccess,
  getAnalyticsData,
} from "../../services/reportingAnalyticsServices";
import { useEffect, useState } from "react";
import {
  setAuthDataCookie,
  getAuthDataCookie,
} from "../../utils/cookiesFunctions";

const AnalyticsInfo = () => {
  const tokens = getAuthDataCookie("analytics");

  const [authCode, setAuthCode] = useState("");

  const getAllAnalyticsData = async () => {
    if (tokens) {
      const response = await getAnalyticsData(tokens.tokenAccess);
    }
  };

  const getTokens = async () => {
    if (authCode && !tokens) {
      const tokens = await getTokenAccess(authCode);
      if (!tokens.error) {
        setAuthDataCookie("analytics", tokens);
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("code");
    if (param) {
      setAuthCode(param);
    }
    getTokens();
    getAllAnalyticsData();
  }, []);

  return (
    <Box>
      <Typography variant="h5">ESTADISTICAS</Typography>
      <Button sx={{ backgroundColor: "red" }} onClick={getUserCode}>
        ANALYTICS
      </Button>
    </Box>
  );
};

export default AnalyticsInfo;
