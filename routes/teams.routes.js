import express from "express";
import { teamModel } from "../model/team.model.js";

export const teamRouter = express.Router();

//CREATE TEAM
teamRouter.post("/team", async (req, res) => {
  try {
    const createdTeam = await teamModel.create(req.body);

    return res.status(201).json(createdTeam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ ONE TEAM
teamRouter.get("/team/:id", async (req, res) => {
  try {
    const team = await teamModel.findOne({ _id: req.params.id });

    return res.status(200).json(team);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL TEAMS
teamRouter.get("/teams", async (req, res) => {
  try {
    const allTeams = await teamModel.find();

    return res.status(200).json(allTeams);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//UPDATE TEAM
teamRouter.put("/team/:id", async (req, res) => {
  try {
    const team = await teamModel.findOne({ _id: req.params.id });

    if (team.is_locked === false) {
      const editTeam = await teamModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true, runValidators: true }
      );

      return res.status(200).json(editTeam);
    } else {
      return res.status(401).json({ msg: "This team can't be edited" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//DELETE TEAM
teamRouter.delete("/team/:id", async (req, res) => {
  try {
    const team = await teamModel.findOne({ _id: req.params.id });

    if (team.is_locked === false) {
      const deleteTeam = await teamModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deleteTeam);
    } else {
      return res.status(401).json({ msg: "This team can't be deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
