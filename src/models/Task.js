import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["Pendiente", "En Progreso", "Completada"],
      default: "Pendiente",
    },
    clienteId: { type: String },        // id local opcional
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ya lo tienes:
taskSchema.index({ user: 1, createdAt: -1 });

// 🔒 ÚNICO por (user, clienteId) solo cuando clienteId exista y no sea vacío
taskSchema.index(
  { user: 1, clienteId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      clienteId: { $exists: true, $ne: null, $ne: "" },
      deleted: { $ne: true }, // opcional: ignora los soft-deleted
    },
    name: "uniq_user_clienteId",
    background: true, // construir en background
  }
);

export default mongoose.model("Task", taskSchema);
