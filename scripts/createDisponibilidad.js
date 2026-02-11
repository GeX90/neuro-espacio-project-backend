require('dotenv').config();
const mongoose = require('mongoose');
const Disponibilidad = require('../models/Disponibilidad.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neuro-espacio';

async function crearDisponibilidad() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Eliminar disponibilidad existente
    await Disponibilidad.deleteMany({});
    console.log('✓ Disponibilidad anterior eliminada');

    // Crear disponibilidad para febrero 2026
    const disponibilidades = [];
    const horarios = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00'];
    
    // Días disponibles: 12, 13, 14, 17, 18, 19, 20, 21
    const diasDisponibles = [12, 13, 14, 17, 18, 19, 20, 21];

    for (const dia of diasDisponibles) {
      const fecha = new Date(2026, 1, dia); // mes 1 = febrero
      for (const hora of horarios) {
        disponibilidades.push({
          fecha,
          hora,
          disponible: true
        });
      }
    }

    await Disponibilidad.insertMany(disponibilidades);
    console.log(`✓ Creadas ${disponibilidades.length} horas disponibles`);
    console.log(`✓ Días con disponibilidad: ${diasDisponibles.join(', ')} de febrero 2026`);

    await mongoose.connection.close();
    console.log('✓ Desconectado de MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

crearDisponibilidad();
