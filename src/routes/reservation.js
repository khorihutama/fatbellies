var express = require('express');
var router = express.Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware')
const ReservationControllers = require('../controllers/reservations')

router.get('/', asyncMiddleware(ReservationControllers.getAll));
router.post('/', asyncMiddleware(ReservationControllers.save));
router.get('/:id', asyncMiddleware(ReservationControllers.getById));

module.exports = router;
