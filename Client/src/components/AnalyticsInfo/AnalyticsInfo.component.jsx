import { Box, Button, Typography } from "@mui/material";
import {
  getUserCode,
  getTokenAccess,
  getAnalyticsData,
} from "../../services/reportingAnalyticsServices";
import { useEffect, useState } from "react";

const AnalyticsInfo = () => {
  const [authCode, setAuthCode] = useState("");

  const getTokens = async () => {
    if (authCode) {
      const tokens = await getTokenAccess(authCode);
      if (!tokens.error) {
        console.log(tokens);
        const response = await getAnalyticsData(tokens.tokenAccess);
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("code");
    if (param) {
      setAuthCode(param);
    }
  }, []);

  useEffect(() => {
    getTokens();
  }, [authCode]);

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
