import { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #131313",
  boxShadow: 24,
  p: 4,
};

interface Rows {
  id: number;
  username: string;
  email: string; 
  gender: string 
}

export default function Home() {

  const [stack, setStack] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Femenino");
  const [rows, setRows] = useState<Rows[]>([]);


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setStack(event.target.value as string)
  }

  const handleSuscribe = () => {
    const newData = {
      id: rows.length + 1,
      username,
      email,
      stack,
      gender
    };
    setRows(prevRows => [...prevRows, newData]);
    setUsername("");
    setEmail("");
    setStack("");
    setGender("Femenino");
    alert(`Se ha suscrito con éxito, Bienvenid@ ${username}! 🙌`)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Nombre de usuario', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'stack', headerName: 'Stack', width: 150 },
    { field: 'gender', headerName: 'Género', width: 150 },
  ];


  return (
    <Box sx={{ maxWidth: 500 }}>
      <Paper
        elevation={1}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 , color: "#1976D2"}}>
          Suscríbase a nuestro Newsletter!📰
        </Typography>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic-1"
            label="Nombre de usuario"
            variant="outlined"
            sx={{ width: 1 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic-2"
            label="Email"
            variant="outlined"
            sx={{ width: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Stack</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stack}
            label="Stack"
            onChange={handleChange}
          >
            <MenuItem value={"Front-end💻"}>Front-end💻</MenuItem>
            <MenuItem value={"Back-end👩‍💻"}>Back-end👩‍💻</MenuItem>
            <MenuItem value={"Full-stack📚"}>Full-stack📚</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Género</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
            <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
            <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center" }}>
        <Typography sx={{ fontSize: 16 }}>Deseo recibir notificaciones🔔</Typography>
          <Checkbox />
        </Box>

        <Button variant="contained" sx={{ width: 1 }} onClick={handleSuscribe}>
          Suscribirse📝
        </Button>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button onClick={handleOpen} sx={{ fontSize: 16 }}>
            Lista de suscriptores📋
          </Button>
        </Box>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ width: "100%", height: 500, bgcolor: "background.paper" }}>
              <Typography sx={{ fontSize: 24, textAlign: "center", mb: 4, fontWeight: 500, paddingTop: "19px", color: "#1976D2"}}>
                Personas que se suscribieron a nuestro Newsletter
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
              <Typography component={"a"} onClick={handleClose} sx={{cursor: "pointer", color: "#1976D2"}}>
                Cerrar
              </Typography>
            </Box>
          </Box>
        </Modal>
        
      </Paper>
    </Box>
  )
}
