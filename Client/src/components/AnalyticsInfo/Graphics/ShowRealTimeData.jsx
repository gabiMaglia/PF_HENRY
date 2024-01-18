import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BarGraphic from "./BarGraphic.component";
import DoughnutGraphics from "./DoughnutGraphics.component";
import CachedIcon from "@mui/icons-material/Cached";

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

const ShowRealtimeData = ({ data, getData }) => {
  console.log(data);
  const [type, setType] = useState("activeUsers");
  const [filter, setFilter] = useState("country");

  const handleTypeClick = (type) => {
    setType(type);
  };

  return (
    <Box>
      <Button onClick={getData}>
        <Typography variant="body1">ULTIMOS 30 MINUTOS</Typography>
        <CachedIcon sx={{ color: "black", ml: ".5em" }} />
      </Button>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          mt: "1em",
        }}
      >
        <Box
          sx={{
            width: "6em",
            height: "5em",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <Button
            color="inherit"
            onClick={() => handleTypeClick("activeUsers")}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption">Usuarios activos</Typography>
            <Typography variant="body2">{data.activeUsers}</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            width: "6em",
            height: "5em",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography variant="caption">Conversiones</Typography>
          <Typography variant="body2">${data.conversions}</Typography>
        </Box>
        <Box
          sx={{
            width: "6em",
            height: "5em",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <Button
            color="inherit"
            onClick={() => handleTypeClick("events")}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption">Eventos totales</Typography>
            <Typography variant="body2">{data.eventCount}</Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          maxHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          mt: "1em",
        }}
      >
        {type === "activeUsers" && (
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Button
                color="inherit"
                onClick={() => setFilter("country")}
                sx={{ width: "100%" }}
              >
                Pais
              </Button>
              <Button
                color="inherit"
                onClick={() => setFilter("city")}
                sx={{ width: "100%" }}
              >
                Ciudad
              </Button>
              <Button
                color="inherit"
                onClick={() => setFilter("platform")}
                sx={{ width: "100%" }}
              >
                Plataforma
              </Button>
            </Box>
            <Box
              sx={{ flexGrow: "1", display: "flex", justifyContent: "center" }}
            >
              {filter === "country" ? (
                <DoughnutGraphics
                  labels={data?.activeUsersPerCountry?.dimensions}
                  datasets={[
                    {
                      label: "Usuarios activos por pais",
                      data: data.activeUsersPerCountry.metrics,
                      backgroundColor: colors,
                    },
                  ]}
                />
              ) : filter === "city" ? (
                <BarGraphic
                  labels={data?.activeUsersPerCity?.dimensions}
                  datasets={[
                    {
                      label: "Usuarios activos por ciudad",
                      data: data.activeUsersPerCity.metrics,
                      backgroundColor: colors,
                    },
                  ]}
                />
              ) : (
                <DoughnutGraphics
                  labels={data?.activeUsersPerPlataform?.dimensions}
                  datasets={[
                    {
                      label: "Usuarios activos por plataforma",
                      data: data.activeUsersPerPlataform.metrics,
                      backgroundColor: colors,
                    },
                  ]}
                />
              )}
            </Box>
          </Box>
        )}
        {type === "events" && (
          <BarGraphic
            labels={data?.eventCountPerName?.dimensions}
            datasets={[
              {
                label: "Eventos por nombre",
                data: data.eventCountPerName.metrics,
                backgroundColor: colors,
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShowRealtimeData;
