require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/neuro-espacio-project-backend";

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB:", MONGO_URI);

    // Datos del admin
    const adminData = {
      email: "admin@test.com",
      password: "Admin123",
      name: "Admin Test",
      role: "ADMIN"
    };

    // Verificar si ya existe
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️  El admin ya existe:", adminData.email);
      console.log("   Role actual:", existingAdmin.role);
      
      // Actualizar a ADMIN si no lo es
      if (existingAdmin.role !== "ADMIN") {
        existingAdmin.role = "ADMIN";
        await existingAdmin.save();
        console.log("✅ Usuario actualizado a ADMIN");
      }
    } else {
      // Crear nuevo admin
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(adminData.password, salt);

      const newAdmin = await User.create({
        email: adminData.email,
        password: hashedPassword,
        name: adminData.name,
        role: "ADMIN"
      });

      console.log("✅ Admin creado exitosamente!");
      console.log("   Email:", adminData.email);
      console.log("   Password:", adminData.password);
      console.log("   Role:", newAdmin.role);
    }

    await mongoose.disconnect();
    console.log("✅ Desconectado de MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createAdmin();
