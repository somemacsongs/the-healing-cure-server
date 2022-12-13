import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  team: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  team_logo: { type: String, required: true },
  team_img: { type: String, required: true },
  titles: [{ title: String }],
  formation: { type: String, required: true },
  coach: { type: String, required: true },
  players: [{ player_name: String, position: String }],
  about: { type: String, required: true },
  is_locked: { type: Boolean, default: "true" },
});

export const teamModel = model("Team", teamSchema);
