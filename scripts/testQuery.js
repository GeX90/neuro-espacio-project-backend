require('dotenv').config();
const mongoose = require('mongoose');
const Disponibilidad = require('../models/Disponibilidad.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neuro-espacio';

async function testQuery() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Contar todos los documentos
    const total = await Disponibilidad.countDocuments({});
    console.log(`\n📊 Total documentos: ${total}`);

    // Obtener unos pocos para ver sus fechas
    const algunos = await Disponibilidad.find({}).limit(5);
    console.log('\n📅 Primeros 5 documentos:');
    algunos.forEach(d => {
      console.log(`  - Fecha: ${d.fecha.toISOString()} | Hora: ${d.hora} | Disponible: ${d.disponible}`);
    });

    // Probar el filtro que usa el backend
    const inicio = new Date('2026-02-01T00:00:00.000Z');
    inicio.setDate(inicio.getDate() - 1);
    
    const fin = new Date('2026-02-28T23:59:59.999Z');
    fin.setDate(fin.getDate() + 1);
    
    console.log('\n🔍 Probando filtro del backend:');
    console.log(`  inicio: ${inicio.toISOString()}`);
    console.log(`  fin: ${fin.toISOString()}`);
    
    const filtro = { 
      disponible: true,
      fecha: { $gte: inicio, $lte: fin }
    };
    
    const resultados = await Disponibilidad.find(filtro);
    console.log(`\n✅ Resultados con filtro: ${resultados.length} documentos`);
    
    if (resultados.length > 0) {
      console.log('\n📋 Primeros 3 resultados:');
      resultados.slice(0, 3).forEach(d => {
        console.log(`  - ${d.fecha.toISOString()} ${d.hora}`);
      });
    }

    await mongoose.connection.close();
    console.log('\n✓ Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testQuery();
