var express = require('express');
var router = express.Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware')
const SessionControllers = require('../controllers/sessions')

router.get('/', asyncMiddleware(SessionControllers.getAll));
router.post('/', asyncMiddleware(SessionControllers.save));
router.get('/filter', asyncMiddleware(SessionControllers.filter));
router.get('/:id', asyncMiddleware(SessionControllers.getById));
router.put('/:id', asyncMiddleware(SessionControllers.update));
router.delete('/:id', asyncMiddleware(SessionControllers.delete));

module.exports = router;
