// controllers/teamController.js
const ourTeam = require('../models/ourTeamModel');
const Joi = require('joi');
 

 

async function createTeamMember(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "Image is required" });
    }

    const image = `http://localhost:3500/uploads/${req.file.filename}`;
    const teamData = { ...req.body, image };

    const schema = Joi.object({
      image: Joi.string().uri().required(),
      name: Joi.string().trim().min(2).max(100).required(),
      designation: Joi.string().trim().min(2).max(100).required(),
    });

    const { error, value } = schema.validate(teamData);
    if (error) {
      return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const newTeamMember = new ourTeam(value);
    await newTeamMember.save();

    res.status(201).json({
      status: 201,
      message: "New Team Member Created Successfully",
      response: newTeamMember,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating team member",
      error: error.message,
    });
  }
}

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await ourTeam.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 200, message: "Team members fetched successfully", response: teamMembers });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error fetching team members', error });
  }
};

// Get a single team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const singleTeamMember = await ourTeam.findById(req.params.id); 
    if (!singleTeamMember) {
      return res.status(404).json({ status: 404, message: "Team member not found" });
    }
    res.status(200).json({ status: 200, message: "Team member fetched successfully", response: singleTeamMember });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error fetching team member", error: error.message });
  }
};

// Update a team member
async function updateTeamMember(req, res) {
  try {
    const { name, designation, _id } = req.body;
    const updateData = { name, designation };

    // First, search for the team member
    const existingTeamMember = await ourTeam.findById(_id);
    if (!existingTeamMember) {
      return res.status(404).json({ status: 404, message: "Team member not found" });
    }

    // If found, proceed with the update
    const updatedTeamMember = await ourTeam.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 200,
      message: "Team member updated successfully",
      response: updatedTeamMember,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating team member",
      error: error.message,
    });
  }
}

// Delete a team member
const deleteTeamMember = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedTeamMember = await ourTeam.findByIdAndDelete(_id);
    if (!deletedTeamMember) {
      return res.status(404).json({ status: 404, message: 'Team member not found' });
    }
    res.status(200).json({ status: 200, message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error deleting team member', error });
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};