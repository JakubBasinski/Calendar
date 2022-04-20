const express = require('express');
const workerControllers = require('../controllers/worker');
const isWorker = require('../middleware/isWorker');

const router = express.Router();

router.get('/loginworker', workerControllers.getLoginWorker);

router.post('/loginworker', workerControllers.postLogin);

router.get(
  ['/worker', '/worker/:nazwisko'],
  isWorker,
  workerControllers.getWorkerPage
);

router.post('/worker/usun/', isWorker, workerControllers.postDeleteWorker);

router.post('/worker', isWorker, workerControllers.postWizyta);

module.exports = router;
