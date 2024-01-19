import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import {
  fetchAnalyticsData,
  fetchAnalyticsRealtimeData,
} from "../../services/reportingAnalyticsServices";
import { useEffect } from "react";
import LinearGraphic from "./Graphics/LinearGraphic.component";
import ShowRealtimeData from "./Graphics/ShowRealTimeData";
import BarGraphic from "./Graphics/BarGraphic.component";
import DoughnutGraphics from "./Graphics/DoughnutGraphics.component";
import Config from "./Config/Config.component";
import Swal from "sweetalert2";
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
  const [showRealtime, setShowRealtime] = useState(true);
  const [realtimeData, setRealtimeData] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [dataOrder, setDataOrder] = useState("Descendente");
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

  const getRealtimeData = async (accessToken) => {
    Swal.fire({
      icon: "info",
      allowOutsideClick: false,
      title: "Por favor espere mientras procesamos la información",
      showConfirmButton: false,
      customClass: {
        container: "container",
      },
    });
    Swal.showLoading();
    const newData = await fetchAnalyticsRealtimeData(
      token ? token : accessToken
    );
    if (newData?.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al obtener los datos",
        text: `${newData.response}`,
        customClass: {
          container: "container",
        },
      });
    } else {
      setFirstCharge(false);
      Swal.hideLoading();
      Swal.close();
      setRealtimeData(newData);
    }
  };

  const googleLogin = useGoogleLogin({
    clientId: CLIENT_ID,
    responseType: "token",
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      if (accessToken) {
        setToken(accessToken);
        getRealtimeData(accessToken);
      }
    },
    onError: (error) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al autenticar",
        text: `Verifique que la cuente este verificada`,
        customClass: {
          container: "container",
        },
      });
    },
  });

  const getData = async () => {
    const newData = await fetchAnalyticsData(
      token,
      config.startDate,
      config.endDate,
      metricStatus,
      dimensionStatus
    );
    if (newData.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al obtener los datos",
        text: `${newData.response}`,
        customClass: {
          container: "container",
        },
      });
    } else {
      Swal.hideLoading();
      Swal.close();
      setData(newData);
      setOpenConfig(false);
    }
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      const filterData = data?.filter((row) => {
        if (row?.dimensionValues[0]?.value !== "(not set)") {
          return row;
        }
      });

      let labels = filterData?.map((row) => {
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

      let datasets = [];

      for (let i = 0; i < maxMetricsElements; i++) {
        let data = metricsValues.map((dataset) => {
          return dataset[i];
        });

        if (dataOrder !== "Descendente") {
          data = data.reverse();
        }
        datasets.push({
          id: i,
          backgroundColor: colors,
          label: metricStatus[i],
          data: data,
        });
      }
      if (dataOrder !== "Descendente") {
        labels = labels.reverse();
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
        {config?.startDate?.length > 0 && !showRealtime && (
          <Box>
            <Typography variant="caption">Fecha inicio</Typography>
            <Typography variant="body1">{config.startDate}</Typography>
          </Box>
        )}
        {config?.endDate?.length > 0 && !showRealtime && (
          <Box>
            <Typography variant="caption">Fecha fin</Typography>
            <Typography variant="body1">{config.endDate}</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ maxWidth: "100%", maxHeight: "100vh" }}>
        {data && data.labels && data.datasets && !showRealtime ? (
          graphicType === "Linea" ? (
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
          )
        ) : (
          realtimeData &&
          showRealtime && (
            <ShowRealtimeData data={realtimeData} getData={getRealtimeData} />
          )
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
        dataOrder={dataOrder}
        setDataOrder={setDataOrder}
        showRealtime={showRealtime}
        setShowRealtime={setShowRealtime}
      />
      {!firstCharge ? (
        <Box sx={{ backgroundColor: "#fd611a" }}>
          <Button fullWidth onClick={handleOpenConfig}>
            <Typography variant="body1" color="white">
              Configuración
            </Typography>
          </Button>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "#fd611a" }}>
          <Button fullWidth onClick={googleLogin}>
            <Typography variant="body1" color="white">
              Obtener datos
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AnalyticsInfo;
