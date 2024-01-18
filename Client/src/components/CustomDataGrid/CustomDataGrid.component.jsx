import { Box, Typography, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { styled } from "@mui/material/styles";

export const CustomToolbar = ({
  setFilterButtonEl,
  handleDelete,
  handleCarousel,
  dataName,
  selectedRows,
  showCarouselIcon,
}) => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#fd611a",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button color="inherit" onClick={() => handleDelete(selectedRows)}>
          <DeleteIcon sx={{ color: "black" }} />
        </Button>
        {showCarouselIcon && (
          <Button color="inherit" onClick={() => handleCarousel(selectedRows)}>
            <ViewCarouselIcon sx={{ color: "black" }} />
          </Button>
        )}
        <Typography variant="h5" sx={{ flexGrow: "1" }}>
          {dataName}
        </Typography>
        <GridToolbarQuickFilter sx={{ color: "black" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <GridToolbarColumnsButton
          sx={{
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        />
        <GridToolbarFilterButton
          ref={setFilterButtonEl}
          sx={{ color: "black", display: "flex", flexDirection: "column" }}
        />
        <GridToolbarDensitySelector
          sx={{ color: "black", display: "flex", flexDirection: "column" }}
        />
        <GridToolbarExport
          sx={{ color: "black", display: "flex", flexDirection: "column" }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  textAlign: "center",
  "& .MuiDataGrid-cell": {
    justifyContent: "center",
    "&:active": {
      border: "5px solid #fd611a",
    },
    "&:focus-within": {
      outline: "2px solid #fd611a",
    },
  },
  "& .MuiDataGrid-row": {
    "&:focus-within": {
      backgroundColor: "#f8b597",
    },
    "&.Mui-selected": {
      "& .MuiDataGrid-cell:focus-within": {
        outline: "0px",
      },
      backgroundColor: "#f8b597",
      "&:hover": {
        backgroundColor: "#f8b597",
      },
    },
  },
  "& .row--deleted": {
    backgroundColor: "#f7a2a2",
    "&:hover": {
      backgroundColor: "#f7a2a2",
    },
    "&:active": {
      backgroundColor: "#f7a2a2",
    },
    "&:focus-within": {
      backgroundColor: "#f7a2a2",
    },
    "&.Mui-selected": {
      backgroundColor: "#f7a2a2",
      "&:hover": {
        backgroundColor: "#f7a2a2",
      },
    },
  },
  "& .row--carousel": {
    backgroundColor: "#8dbaf6",
    "&:hover": {
      backgroundColor: "#8dbaf6",
    },
    "&:active": {
      backgroundColor: "#8dbaf6",
    },
    "&:focus-within": {
      backgroundColor: "#8dbaf6",
    },
    "&.Mui-selected": {
      backgroundColor: "#8dbaf6",
      "&:hover": {
        backgroundColor: "#8dbaf6",
      },
    },
  },
  "& .row--finalized": {
    backgroundColor: "#a2f7a9",
    "&:hover": {
      backgroundColor: "#a2f7a9",
    },
    "&:active": {
      backgroundColor: "#a2f7a9",
    },
    "&:focus-within": {
      backgroundColor: "#a2f7a9",
    },
    "&.Mui-selected": {
      backgroundColor: "#a2f7a9",
      "&:hover": {
        backgroundColor: "#a2f7a9"
      },
    },
  },
  "& .row--canceled": {
    backgroundColor: "#c1acf8",
    "&:hover": {
      backgroundColor: "#c1acf8",
    },
    "&:active": {
      backgroundColor: "#c1acf8",
    },
    "&:focus-within": {
      backgroundColor: "#c1acf8",
    },
    "&.Mui-selected": {
      backgroundColor: "#c1acf8",
      "&:hover": {
        backgroundColor: "#c1acf8",
      },
    },
  },
  "& .MuiCheckbox-root svg": {
    width: ".5em",
    height: ".5em",
    border: "1px solid black",
    borderRadius: "2px",
  },
  "& .MuiCheckbox-root svg path": {
    display: "none",
  },
  "& .MuiCheckbox-root": {
    borderRadius: "0px",
    width: "100%",
    height: "100%",
  },
  "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
    backgroundColor: "black",
    borderColor: "black",
  },
}));
