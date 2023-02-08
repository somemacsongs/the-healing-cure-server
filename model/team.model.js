import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  team: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  team_logo: { type: String, required: true },
  team_img: { type: String, required: true },
  titles: [{ title: { type: String, minLength: 5 } }],
  formation: {
    type: String,
    required: true,
    enum: [
      "4-3-3",
      "4-4-2",
      "3-5-2",
      "3-4-3",
      "4-2-3-1",
      "4-5-1",
      "5-3-2",
      "4-1-4-1",
      "4-1-3-2",
    ],
  },
  coach: { type: String, required: true },
  players: [
    {
      player_name: { type: String, minLength: 3 },
      position: {
        type: String,
        enum: ["Goleiro", "Defensor", "Meio-campista", "Atacante"],
      },
    },
  ],
  about: { type: String, required: true, minLength: 10 },
  is_locked: { type: Boolean, default: "false" },
});

export const TeamModel = model("Team", teamSchema);

// teste