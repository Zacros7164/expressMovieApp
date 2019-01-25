var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db);
connection.connect()

const request = require('request');
// our node module in .gitignore
// ../config is now a node module, a really tiny one, but still a module
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${config.apiKey}`;



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

router.get('/search', (req,res)=>{
  res.render('search',{
    title: "Search",
  })
})

router.post('/search/movie',(req,res)=>{
  // submitted data from forms comes in the req Object
  // queryString data is in req.query
  // posted data is in req.body
  const movieTitle = req.body.movieTitle;
  const searchUrl = `${apiBaseUrl}/search/movie?query=${movieTitle}&api_key=${config.apiKey}`
  request.get(searchUrl, (error,response,body)=>{
    const parsedData = JSON.parse(body);
    res.render('now_playing', {
      parsedData: parsedData.results,
      title: "Search Results",
      imageBaseUrl,
    })
  })
  
})


router.get('/login', (req,res)=>{
  res.render('login')
})

router.post('/loginProcess',(req,res)=>{

  const insertQuery = `INSERT into users ( email, password)
    VALUES
    (?,?);`;
  
  res.json(req.body)
})

module.exports = router;
