const express = require('express'),
  router = express.Router(),
  asyncMiddleware = require('express-async-handler'),
  nodeCtrl = require('../controllers/NodeController');

//-------------------------------Node Routes-----------------------------------
router.get('/node/getNodes', nodeCtrl.getNodes);
router.get('/node/findParents/:name', nodeCtrl.findParents);
router.get('/node/findChildren/:name', nodeCtrl.findChildren);
router.get('/node/getNodeParent/:parentName', nodeCtrl.getNodeParent);
router.patch('/node/updateNode/:name', nodeCtrl.updateNode);
router.post('/node/createNode', nodeCtrl.createNode);


module.exports = router;
