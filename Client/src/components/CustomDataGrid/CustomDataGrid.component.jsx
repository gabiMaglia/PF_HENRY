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
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#f19494",
    },
    "&:active": {
      backgroundColor: "#f19494",
    },
    "&:focus-within": {
      backgroundColor: "#f19494",
    },
    "&.Mui-selected": {
      backgroundColor: "#f19494",
      "&:hover": {
        backgroundColor: "#f19494",
      },
    },
  },
  "& .row--carousel": {
    backgroundColor: "#567fbe",
    "&:hover": {
      backgroundColor: "#567fbe",
    },
    "&:active": {
      backgroundColor: "#567fbe",
    },
    "&:focus-within": {
      backgroundColor: "#567fbe",
    },
    "&.Mui-selected": {
      backgroundColor: "#567fbe",
      "&:hover": {
        backgroundColor: "#567fbe",
      },
    },
  },
  "& .row--accepted": {
    backgroundColor: "#cccccc",
    "&:hover": {
      backgroundColor: "#cccccc",
    },
    "&:active": {
      backgroundColor: "#ccccc",
    },
    "&:focus-within": {
      backgroundColor: "#cccccc",
    },
    "&.Mui-selected": {
      backgroundColor: "#cccccc",
      "&:hover": {
        backgroundColor: "#cccccc",
      },
    },
  },
  "& .row--finalized": {
    backgroundColor: "#7fc09f",
    "&:hover": {
      backgroundColor: "#7fc09f",
    },
    "&:active": {
      backgroundColor: "#7fc09f",
    },
    "&:focus-within": {
      backgroundColor: "#7fc09f",
    },
    "&.Mui-selected": {
      backgroundColor: "#7fc09f",
      "&:hover": {
        backgroundColor: "#7fc09f"
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
