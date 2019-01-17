var express = require('express');
var router = express.Router();
const request = require('request');
// our node module in .gitignore
// ../config is now a node module, a really tiny one, but still a module
const apiKey = require('../config');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;



/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl,(error, response, body)=>{
    // this is a huge String, so we need to parse the opbject back into a JSON file we can use
    // console.log(typeof (body));
    const parsedData = JSON.parse(body);
    // console.log(parsedData)
    // we now have the data from movieApi,
    // let's send it over to the view/ejs
    // res.json(parsedData);
    res.render("now_playing", {
      parsedData: parsedData.results,
      title: "Now Playing",
      imageBaseUrl,
    })
  });
  // res.render('index', { title: "express"});
});

module.exports = router;
