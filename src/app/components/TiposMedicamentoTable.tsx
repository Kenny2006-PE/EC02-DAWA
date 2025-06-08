"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Alert,
  DialogContentText,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

type TipoMedic = {
  CodTipoMed: number;
  descripcion: string;
};

export default function TiposMedicamentoTable() {
  const [tipos, setTipos] = useState<TipoMedic[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ descripcion: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Cargar datos
  const loadData = async () => {
    try {
      const res = await fetch("/api/tipomedic");
      const data = await res.json();
      setTipos(data);
    } catch (err) {
      setError("Error al cargar los tipos de medicamento");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Manejadores del modal
  const handleOpen = () => {
    setForm({ descripcion: "" });
    setIsEditing(false);
    setEditId(null);
    setError("");
    setOpen(true);
  };

  const handleEdit = (tipo: TipoMedic) => {
    setForm({ descripcion: tipo.descripcion });
    setIsEditing(true);
    setEditId(tipo.CodTipoMed);
    setOpen(true);
  };

  const handleClose = () => {
    setForm({ descripcion: "" });
    setError("");
    setOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Validación y guardado
  const handleSave = async () => {
    if (!form.descripcion.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    const endpoint = isEditing 
      ? `/api/tipomedic/${editId}`
      : "/api/tipomedic";

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      await loadData();
      handleClose();
    } catch (err) {
      setError(`Error al ${isEditing ? 'actualizar' : 'crear'} el tipo de medicamento`);
    }
  };

  // Eliminar
  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este tipo de medicamento?")) return;

    try {
      const res = await fetch(`/api/tipomedic/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      await loadData();
    } catch (err) {
      setError("Error al eliminar el tipo de medicamento");
    }
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="primary" fontWeight="500">
          Tipos de Medicamento
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Nuevo Tipo
        </Button>
      </Box>

      {/* Tabla */}
      <Paper sx={{ overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tipos.map((tipo) => (
              <TableRow key={tipo.CodTipoMed} hover>
                <TableCell>{tipo.CodTipoMed}</TableCell>
                <TableCell>{tipo.descripcion}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton 
                      color="primary" 
                      size="small"
                      onClick={() => handleEdit(tipo)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => handleDelete(tipo.CodTipoMed)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, padding: 1 }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box display="flex" alignItems="center" gap={1}>
            {isEditing ? <EditIcon color="primary" /> : <AddIcon color="primary" />}
            <Typography variant="h6">
              {isEditing ? 'Editar' : 'Nuevo'} Tipo de Medicamento
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <DialogContentText sx={{ mb: 3 }}>
            Ingrese la descripción del tipo de medicamento.
          </DialogContentText>

          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            value={form.descripcion}
            onChange={(e) => setForm({ descripcion: e.target.value })}
            required
            autoFocus
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button 
            onClick={handleClose}
            startIcon={<CloseIcon />}
            color="inherit"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            startIcon={<SaveIcon />}
          >
            {isEditing ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}