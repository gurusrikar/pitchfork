/**
 * Created by gurusrikar on 31/3/16.
 */

var express = require('express');
var router = express.Router();
var movieController = require('../controllers/MovieController');

/* GET users listing. */
router.post('/create-movie', function(req, res, next) {
    console.log("Creating a new movie");
    movieController.createMovie(req, res, next);
});

router.post('/:permalink/update-movie', function(req, res, next) {
    console.log("Updating movie "+req.params.permalink);
    movieController.updateGeneralMovieDetails(req, res, next);
});

router.post('/:permalink/update-people', function(req, res, next) {
    movieController.addPersonToMovie(req, res, next);
});

router.post('/:permalink/add-person', function(req, res, next) {
    console.log("Adding a new person to crew");
    console.log(req.params.permalink);
    req.query.permalink = req.params.permalink;
    movieController.addPersonToMovie(req, res, next);
});

router.get('/all', function (req, res, next) {
    movieController.getAllMovies(req, res, next);
});

router.get('/:permalink', function (req, res, next) {
    movieController.getMovie(req, res, next);
});

router.get('/', function (req, res, next) {
    var moviePermalink =  req.host;
    res.json({hello: moviePermalink});
});


module.exports = router;
