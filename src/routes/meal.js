var express = require('express');
var router = express.Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware')
const MealControllers = require('../controllers/meals')

router.get('/', asyncMiddleware(MealControllers.getAll));
router.post('/', asyncMiddleware(MealControllers.save));
router.get('/:id', asyncMiddleware(MealControllers.getById));
router.put('/:id', asyncMiddleware(MealControllers.update));
router.delete('/:id', asyncMiddleware(MealControllers.delete));

module.exports = router;
