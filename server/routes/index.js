const express = require('express');
 const mailRoutes=require('../routes/api/index')
const router = express.Router();
router.use("/api", mailRoutes);


module.exports = router;
