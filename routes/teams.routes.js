import express from "express";
import { TeamModel } from "../model/team.model.js";

export const teamRouter = express.Router();

//CREATE TEAM
teamRouter.post("/team", async (req, res) => {
  try {
    const createdTeam = await TeamModel.create(req.body);

    return res.status(201).json(createdTeam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ ONE TEAM
teamRouter.get("/team/:id", async (req, res) => {
  try {
    const team = await TeamModel.findOne({ _id: req.params.id });

    return res.status(200).json(team);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL TEAMS
teamRouter.get("/teams", async (req, res) => {
  try {
    const allTeams = await TeamModel.find();

    return res.status(200).json(allTeams);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//UPDATE TEAM
teamRouter.put("/team/:id", async (req, res) => {
  try {
    const team = await TeamModel.findOne({ _id: req.params.id });

    if (team._is_locked === false) {
      const editTeam = await TeamModel.findOneAndUpdate(
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
    const team = await TeamModel.findOne({ _id: req.params.id });

    if (team._is_locked === false) {
      const deleteTeam = await TeamModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deleteTeam);
    } else {
      return res.status(401).json({ msg: "This team can't be deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
