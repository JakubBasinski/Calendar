const express = require('express');
const kierasControllers = require('../controllers/kieras');
const { check, body } = require('express-validator');
const isKieras = require('../middleware/isKieras')
const isKierasLubHandlowiec = require('../middleware/isKierasLubHandlowiec')


const router = express.Router();

router.get('/', kierasControllers.getMain)

router.get('/kieras',isKieras, kierasControllers.getStrona);

router.post('/kieras',isKieras, kierasControllers.postAddWorker);

router.post('/kieras/usun',isKieras, kierasControllers.postDeleteWorker);

router.get(['/calendar/'],isKierasLubHandlowiec, kierasControllers.getCalendar);

router.get('/loginkieras', kierasControllers.getLoginKieras);

router.post('/logout', kierasControllers.postLogout)

router.post(
  '/loginkieras',
  check('imieKieras').notEmpty().withMessage('name cant be empty !'),
  kierasControllers.postLoginKieras
);

module.exports = router;
