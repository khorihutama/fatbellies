var express = require('express');
var router = express.Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware')
const BranchControllers = require('../controllers/branches')

router.get('/', asyncMiddleware(BranchControllers.getAll));
router.post('/', asyncMiddleware(BranchControllers.save));
router.get('/:id', asyncMiddleware(BranchControllers.getById));
router.put('/:id', asyncMiddleware(BranchControllers.update));
router.delete('/:id', asyncMiddleware(BranchControllers.delete));

module.exports = router;
