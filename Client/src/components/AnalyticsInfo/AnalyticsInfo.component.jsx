import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchAnalyticsData } from "../../services/reportingAnalyticsServices";
import { useEffect } from "react";
import LinearGraphic from "./Graphics/LinearGraphic.component";
import BarGraphic from "./Graphics/BarGraphic.component";
import Config from "./Config/Config.component";
const CLIENT_ID = import.meta.env.VITE_REPORTING_ANALYTICS_CLIENT_ID;

const AnalyticsInfo = () => {
  const [data, setData] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [config, setConfig] = useState({
    startDate: "",
    endDate: "",
    metrics: "",
    dimensions: "",
  });

  const handleOpenConfig = () => {
    setOpenConfig(!openConfig);
  };

  const googleLogin = useGoogleLogin({
    clientId: CLIENT_ID,
    responseType: "token",
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      if (accessToken) {
        const newData = await fetchAnalyticsData(
          accessToken,
          config.startDate,
          config.endDate,
          config.metrics,
          config.dimensions
        );
        setOpenConfig(false);
        setData(newData);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const getData = async () => {
    if (googleLogin.tokenResponse?.access_token) {
      const newData = await fetchAnalyticsData(
        googleLogin.tokenResponse.access_token
      );
      setData(newData);
    }
  };

  useEffect(() => {
    getData();
  }, [googleLogin.tokenResponse]);

  useEffect(() => {
    if (data && data?.rows?.length > 0) {
      const filterData = data?.rows.filter((row) => {
        if (row?.dimensionValues[0].value !== "(not set)") {
          return row;
        }
      });
      const labels = filterData?.map((row) => {
        return row?.dimensionValues[0].value;
      });

      const datasets = filterData?.map((row) => {
        return row?.metricValues[0].value;
      });
      setData({ labels, datasets });
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2em",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">ESTADISTICAS</Typography>
        {config?.startDate?.length > 0 && (
          <Box>
            <Typography variant="caption">Fecha inicio</Typography>
            <Typography variant="body1">{config.startDate}</Typography>
          </Box>
        )}
        {config?.endDate?.length > 0 && (
          <Box>
            <Typography variant="caption">Fecha fin</Typography>
            <Typography variant="body1">{config.endDate}</Typography>
          </Box>
        )}
      </Box>
      {/* {data && <LinearGraphic data={data} />} */}
      {data && <BarGraphic labels={data?.labels} datasets={data?.datasets} />}
      <Config
        open={openConfig}
        setOpen={handleOpenConfig}
        getData={googleLogin}
        config={config}
        setConfig={setConfig}
      />
      <Box sx={{ backgroundColor: "#fd611a" }}>
        <Button fullWidth onClick={handleOpenConfig}>
          <Typography variant="body1" color="white">
            Configuración
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AnalyticsInfo;
