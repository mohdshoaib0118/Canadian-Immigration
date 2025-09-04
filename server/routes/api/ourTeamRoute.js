// routes/teamRoutes.js
const express = require('express');
const { createTeamMember, getAllTeamMembers, getTeamMemberById, updateTeamMember, deleteTeamMember } = require('../../controller/ourTeamController');
const { verifyToken } = require('../../middleware/authMiddleware');
const router = express.Router();
const upload = require('../../middleware/multer');

router.post('/add',verifyToken, upload.single('image'), createTeamMember);
router.get('/getAllTeamMembers', getAllTeamMembers);
router.get('/getTeamMemberById/:id', getTeamMemberById);
router.put('/edit',verifyToken,upload.single('image'), updateTeamMember);
router.delete('/delete',verifyToken, deleteTeamMember);

module.exports = router;