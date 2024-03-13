var express = require('express');
var router = express.Router();
let serverArray = [];


// Define the pArtist constructor function
let pArtist = function(pName, pWebsite, pCity, pArt) {
    this.ID = Math.random().toString(16).slice(5);
    this.name = pName;
    this.website = pWebsite;
    this.city = pCity;
    this.art = pArt;
}

// Create an array to store artists
serverArray.push(new pArtist("Sarah Hughes","https://www.apinchdifferent.com/","North Bend","Painting"));
serverArray.push(new pArtist("Tara Sreekuman","https://www.plentyopixels.com/","Snoqualmie", "Photography"));
serverArray.push(new pArtist("Jess Joy","https://www.jessjoyart.com/","North Bend","Painting"));
serverArray.push(new pArtist("Noelle Rivas","https://www.instagram.com/ceramics_bynoelle/","Seattle", "Sculpting"));
serverArray.push(new pArtist("Pepper Allphin","https://www.instagram.com/pepper.allphin/","North Bend","Painting"));
serverArray.push(new pArtist("Adel Anderson","https://www.instagram.com/toymakery/","Seattle", "Other"));
serverArray.push(new pArtist("Will Brown","https://www.patreon.com/willbrownart","Seattle","Painting"));

console.log(serverArray)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:"Welcome to Local PNW Artists Page!", serverArray: serverArray });
});


router.post('/addOne', function (req, res) {
  // Generate a unique ID for the new artist
  const newID = Math.random().toString(16).slice(5);
  
  const newArtist = new pArtist(
    newID,
    req.body.fName + " " + req.body.lName,
    req.body.website,
    req.body.city,
    req.body.artType);
  
    console.log(pArtist);
  // Add the new artist to the serverArray array
  serverArray.push(newArtist);
  
  res.redirect('/');

});
//Get all Artist data
router.get("/getAllArtist", function(req,res){
  res.status(200).json(serverArray)
})
module.exports = router;