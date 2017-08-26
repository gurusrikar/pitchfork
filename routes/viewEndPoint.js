/**
 * Created by gurusrikar on 22/4/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:permalink', function (req, res, next) {
    console.log(req.hostname);
    res.sendFile('index.html', {root: __dirname + './../views/'});
});

router.get('/', function (req, res, next) {
    console.log(req.hostname);
    res.sendFile('index.html', {root: __dirname + './../views/'});
});


module.exports = router;