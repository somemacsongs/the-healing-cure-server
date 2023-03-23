import { Schema, model } from "mongoose";

const strainSchema = new Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  thc: { type: Number, required: true },
  cbd: { type: Number, required: true },
  cbg: { type: Number, required: true },
  terpene: { type: String, required: true, trim: true },
  flavor: { type: String, required: true, trim: true },
  helpw: { type: String, required: true, trim: true },
  isLocked: { type: Boolean, default: "false" },
  image: { type: String, required: true, trim: true },
});

export const StrainModel = model("Strain", strainSchema);