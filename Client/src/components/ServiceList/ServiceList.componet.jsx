import {useEffect,useState} from 'react'
import { Box } from '@mui/material'
import {
  GridCellEditStopReasons,
  GridLogicOperator,
  esES,
} from "@mui/x-data-grid";

const columns=[
  {
    field:"id",headerName:"ID", minWidth: 300, headerAlign: "center"
  },
  {
    field:"product_model",headerName:"Modelo", minWidth: 300, headerAlign: "center"
  },
  {
    field:"product_income_date",headerName:"fecha de ingreso", minWidth: 300, headerAlign: "center"
  },
    {
    field:"userId",headerName:"Usuario", minWidth: 300, headerAlign: "center"
  },
    {
    field:"technicianId",headerName:"Tecnico asignado", minWidth: 300, headerAlign: "center"
  },
    {
    field:"final_diagnosis",headerName:"ID", minWidth: 300, headerAlign: "center"
  },

]


const ServiceList = () => {
  return (
   <Box>lista en proceso<br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
    UN BESO
   </Box>
  )
}

export default ServiceList