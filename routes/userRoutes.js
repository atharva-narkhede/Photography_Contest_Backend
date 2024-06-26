const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, deleteUser } = require('../apis/userApi');

router.get('/fetch', getAllUsers);
router.post('/insert', createUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
