const express = require("express");
const router = express.Router();

const Cita = require("../models/Cita.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// GET todas las citas del usuario autenticado
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.payload._id;
    const citas = await Cita.find({ usuario: usuarioId }).sort({ fecha: 1 });
    res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las citas", error: error.message });
  }
});

// GET una cita específica por ID
router.get("/:citaId", isAuthenticated, async (req, res) => {
  try {
    const { citaId } = req.params;
    const usuarioId = req.payload._id;

    const cita = await Cita.findById(citaId);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verificar que la cita pertenece al usuario autenticado
    if (cita.usuario.toString() !== usuarioId.toString()) {
      return res.status(403).json({ message: "No tienes permiso para acceder a esta cita" });
    }

    res.status(200).json(cita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la cita", error: error.message });
  }
});

// POST crear una nueva cita
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { fecha, hora, motivo, notas } = req.body;
    const usuarioId = req.payload._id;

    if (!fecha || !hora || !motivo) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const fechaDate = new Date(fecha);
    if (isNaN(fechaDate.getTime())) {
      return res.status(400).json({ message: "Fecha inválida. Usa formato ISO: YYYY-MM-DD" });
    }

    const nuevaCita = await Cita.create({
      fecha: fechaDate,
      hora,
      motivo,
      notas,
      usuario: usuarioId,
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cita", error: error.message });
  }
});

// PUT actualizar una cita
router.put("/:citaId", isAuthenticated, async (req, res) => {
  try {
    const { citaId } = req.params;
    const { fecha, hora, motivo, notas } = req.body;
    const usuarioId = req.payload._id;

    const cita = await Cita.findById(citaId);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verificar que la cita pertenece al usuario autenticado
    if (cita.usuario.toString() !== usuarioId.toString()) {
      return res.status(403).json({ message: "No tienes permiso para actualizar esta cita" });
    }

    // Validar fecha si se proporciona
    if (fecha) {
      const fechaDate = new Date(fecha);
      if (isNaN(fechaDate.getTime())) {
        return res.status(400).json({ message: "Fecha inválida. Usa formato ISO: YYYY-MM-DD" });
      }
      cita.fecha = fechaDate;
    }

    // Actualizar campos si se proporcionan
    if (hora) cita.hora = hora;
    if (motivo) cita.motivo = motivo;
    if (notas !== undefined) cita.notas = notas;

    await cita.save();

    res.status(200).json(cita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la cita", error: error.message });
  }
});

// DELETE eliminar una cita
router.delete("/:citaId", isAuthenticated, async (req, res) => {
  try {
    const { citaId } = req.params;
    const usuarioId = req.payload._id;

    const cita = await Cita.findById(citaId);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verificar que la cita pertenece al usuario autenticado
    if (cita.usuario.toString() !== usuarioId.toString()) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta cita" });
    }

    await Cita.findByIdAndDelete(citaId);

    res.status(200).json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la cita", error: error.message });
  }
});

module.exports = router;

