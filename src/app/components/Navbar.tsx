"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Farmacia
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Medicamentos
        </Button>
        <Button color="inherit" component={Link} href="/tipos">
          Tipos de Medicamento
        </Button>
      </Toolbar>
    </AppBar>
  );
}