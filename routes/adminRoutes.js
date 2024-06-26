const express = require('express');
const router = express.Router();
const { createAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../apis/adminApi');

router.get('/fetch', getAdmins);
router.post('/insert', createAdmin);
router.put('/update', updateAdmin);
router.delete('/delete', deleteAdmin);

module.exports = router;
