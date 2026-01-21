require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/neuro-espacio-project-backend";

async function verifyAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB:", MONGO_URI);

    const admin = await User.findOne({ email: "admin@test.com" });
    
    if (admin) {
      console.log("\n📋 Usuario encontrado:");
      console.log("   Email:", admin.email);
      console.log("   Name:", admin.name);
      console.log("   Role:", admin.role);
      console.log("   Role type:", typeof admin.role);
      console.log("\n🔍 Documento completo:");
      console.log(JSON.stringify(admin.toObject(), null, 2));
    } else {
      console.log("❌ No se encontró el usuario admin@test.com");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

verifyAdmin();
