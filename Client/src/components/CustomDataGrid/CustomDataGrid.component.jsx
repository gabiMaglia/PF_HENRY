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
import { styled } from "@mui/material/styles";

export const CustomToolbar = ({
  setFilterButtonEl,
  handleDelete,
  dataName,
  selectedRows,
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
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton
          ref={setFilterButtonEl}
          sx={{ color: "black" }}
        />
        <GridToolbarDensitySelector sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
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
      backgroundColor: "#fb773a",
    },
    "&.Mui-selected": {
      "& .MuiDataGrid-cell:focus-within": {
        outline: "0px",
      },
      backgroundColor: "#fd611a",
      "&:hover": {
        backgroundColor: "#fb773a",
      },
    },
  },
  "& .row--deleted": {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#ff2b2b",
    },
    "&:active": {
      backgroundColor: "#ff2b2b",
    },
    "&:focus-within": {
      backgroundColor: "#ff2b2b",
    },
    "&.Mui-selected": {
      backgroundColor: "red",
      "&:hover": {
        backgroundColor: "#ff2b2b",
      },
    },
  },
  "& .row--carousel": {
    backgroundColor: "#567fbe",
    "&:hover": {
      backgroundColor: "#567fbee",
    },
    "&:active": {
      backgroundColor: "#567fbee",
    },
    "&:focus-within": {
      backgroundColor: "#567fbee",
    },
    "&.Mui-selected": {
      backgroundColor: "#567fbe",
      "&:hover": {
        backgroundColor: "#567fbee",
      },
    },
  },
  "& .row--confirm_repair": {
    backgroundColor: "#cccccc",
    "&:hover": {
      backgroundColor: "#cccccce",
    },
    "&:active": {
      backgroundColor: "#cccccce",
    },
    "&:focus-within": {
      backgroundColor: "#cccccce",
    },
    "&.Mui-selected": {
      backgroundColor: "#cccccc",
      "&:hover": {
        backgroundColor: "#cccccce",
      },
    },
  },
  "& .row--status": {
    backgroundColor: "#5dbe8c",
    "&:hover": {
      backgroundColor: "#cccccce",
    },
    "&:active": {
      backgroundColor: "#cccccce",
    },
    "&:focus-within": {
      backgroundColor: "#cccccce",
    },
    "&.Mui-selected": {
      backgroundColor: "#cccccc",
      "&:hover": {
        backgroundColor: "#cccccce",
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
