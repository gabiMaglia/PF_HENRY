import { Box, Button, Typography } from "@mui/material";
import {
  getUserCode,
  getTokenAccess,
} from "../../services/reportingAnalyticsServices";
import { useEffect, useState } from "react";

const AnalyticsInfo = () => {
  const [analyticsToken, setAnalyticsToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("code");
    if (param) {
      setAnalyticsToken(param);
      console.log(param);
    }
  }, []);

  useEffect(async () => {
    if (analyticsToken) {
      const tokens = await getTokenAccess(analyticsToken);
    }
  }, [analyticsToken]);

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
