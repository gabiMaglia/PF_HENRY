import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchAnalyticsData } from "../../services/reportingAnalyticsServices";
import { useEffect } from "react";
import LinearGraphic from "./Graphics/LinearGraphic.component";
import BarGraphic from "./Graphics/BarGraphic.component";
import DoughnutGraphics from "./Graphics/DoughnutGraphics.component";
import Config from "./Config/Config.component";
const CLIENT_ID = import.meta.env.VITE_REPORTING_ANALYTICS_CLIENT_ID;

const colors = [
  `#FD611A`,
  `#E24802`,
  `#A53501`,
  `#912E01`,
  `#5F1E01`,
  `#4A1801`,
  `#2C0E00`,
  `#040100`,
];

const AnalyticsInfo = () => {
  const [data, setData] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [config, setConfig] = useState({
    startDate: "",
    endDate: "",
  });
  const [metricStatus, setMetricStatus] = useState([null]);
  const [dimensionStatus, setDimensionStatus] = useState([null]);
  const [firstCharge, setFirstCharge] = useState(true);
  const [token, setToken] = useState(null);
  const [graphicType, setGraphicType] = useState("Barras");

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
          metricStatus,
          dimensionStatus
        );
        setOpenConfig(false);
        setToken(accessToken);
        setData(newData);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const getData = async () => {
    if (token && !firstCharge) {
      const newData = await fetchAnalyticsData(
        token,
        config.startDate,
        config.endDate,
        metricStatus,
        dimensionStatus
      );
      setData(newData);
      setOpenConfig(false);
    } else {
      googleLogin();
      setFirstCharge(false);
    }
  };

  useEffect(() => {
    getData();
  }, [googleLogin.tokenResponse]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const filterData = data?.filter((row) => {
        if (row?.dimensionValues[0]?.value !== "(not set)") {
          return row;
        }
      });

      const labels = filterData?.map((row) => {
        return row?.dimensionValues.map((data) => {
          return data.value;
        });
      });

      let metricsValues = filterData?.map((row) => {
        return row?.metricValues.map((data) => {
          return data?.value;
        });
      });

      let maxMetricsElements = 0;
      for (let i = 0; i < metricsValues.length; i++) {
        if (metricsValues[i].length > maxMetricsElements) {
          maxMetricsElements = metricsValues[i].length;
        }
      }

      let maxDimensionsElements = 0;
      for (let i = 0; i < metricsValues.length; i++) {
        if (metricsValues[i].length > maxDimensionsElements) {
          maxDimensionsElements = metricsValues[i].length;
        }
      }

      const datasets = [];

      for (let i = 0; i < maxMetricsElements; i++) {
        datasets.push({
          id: i,
          backgroundColor: colors[i],
          label: metricStatus[i],
          data: metricsValues.map((dataset) => {
            return dataset[i];
          }),
        });
      }
      setData({ labels, datasets });
    }
  }, [data]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2em",
        textAlign: "center",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
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
      <Box sx={{ maxWidth: "100%", maxHeight: "100vh" }}>
        {data && graphicType === "Linea" ? (
          <LinearGraphic
            labels={data?.labels}
            datasets={data?.datasets}
            label={{ metricStatus, dimensionStatus }}
          />
        ) : graphicType === "Circular" ? (
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DoughnutGraphics
              labels={data?.labels}
              datasets={data?.datasets}
              label={{ metricStatus, dimensionStatus }}
            />
          </Box>
        ) : (
          <BarGraphic
            labels={data?.labels}
            datasets={data?.datasets}
            label={{ metricStatus, dimensionStatus }}
          />
        )}
      </Box>
      <Config
        open={openConfig}
        setOpen={handleOpenConfig}
        getData={getData}
        config={config}
        metricStatus={metricStatus}
        dimensionStatus={dimensionStatus}
        setConfig={setConfig}
        setMetricStatus={setMetricStatus}
        setDimensionStatus={setDimensionStatus}
        graphicType={graphicType}
        setGraphicType={setGraphicType}
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
