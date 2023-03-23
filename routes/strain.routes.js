import express from "express";
import { StrainModel } from "../model/strain.model.js";

export const strainRouter = express.Router();

//CREATE TEAM
strainRouter.post("/strain", async (req, res) => {
  try {
    const createdStrain = await StrainModel.create(req.body);

    return res.status(201).json(createdStrain);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ ONE TEAM
strainRouter.get("/strain/:id", async (req, res) => {
  try {
    const strain = await StrainModel.findOne({ _id: req.params.id });

    return res.status(200).json(strain);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL TEAMS
strainRouter.get("/allStrains", async (req, res) => {
  try {
    const allStrains = await StrainModel.find();

    return res.status(200).json(allStrains);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//UPDATE TEAM
strainRouter.put("/strain/:id", async (req, res) => {
  try {
    const strain = await StrainModel.findOne({ _id: req.params.id });

    if (strain.isLocked === false) {
      const editStrain = await StrainModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true, runValidators: true }
      );

      return res.status(200).json(editStrain);
    } else {
      return res.status(401).json({ msg: "This strain can't be edited" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//DELETE TEAM
strainRouter.delete("/strain/:id", async (req, res) => {
  try {
    const strain = await StrainModel.findOne({ _id: req.params.id });

    if (strain.isLocked === false) {
      const deleteStrain = await StrainModel.deleteOne({ _id: req.params.id });

      return res.status(200).json(deleteStrain);
    } else {
      return res.status(401).json({ msg: "This strain can't be deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
