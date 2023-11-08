import { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

export default function Home() {

  const [stack, setStack] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStack(event.target.value as string)
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Paper
        elevation={1}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
          Suscríbase a nuestro Newsletter! 📰
        </Typography>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic-1"
            label="Nombre de usuario"
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic-2"
            label="Email"
            variant="outlined"
            sx={{ width: 1 }}
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
            <MenuItem value={"FE"}>Front-end 💻</MenuItem>
            <MenuItem value={"BE"}>Back-end 👩‍💻</MenuItem>
            <MenuItem value={"FS"}>Full-stack 📚</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Género</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
            <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
            <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center" }}>
        <Typography sx={{ fontSize: 16 }}>¿Recibir notificaciones? 🔔</Typography>
          <Checkbox />
        </Box>

        <Button variant="contained" sx={{ width: 1 }} onClick={() => alert("Se ha suscripto con éxito, Bienvenid@! 🙌")}>
          Suscribirse 📝
        </Button>
      </Paper>
    </Box>
  )
}
