var express = require('express');
var router = express.Router();
var serverArray = [];
// Define the pArtist constructor function
function pArtist(pID, pName, pWebsite, pCity, pArt) {
    this.ID = pID;
    this.name = pName;
    this.website = pWebsite;
    this.city = pCity;
    this.art = pArt;
}

// Create an array to store artists
serverArray = [
  new pArtist(
    Math.random().toString(16).slice(5),
    "Sarah Hughes",
    "https://www.apinchdifferent.com/",
    "North Bend",
    "Painting"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Tara Sreekuman",
    "https://www.plentyopixels.com/",
    "Snoqualmie",
    "Photography"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Jess Joy",
    "https://www.jessjoyart.com/",
    "North Bend",
    "Painting"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Noelle Rivas",
    "https://www.instagram.com/ceramics_bynoelle/",
    "Seattle",
    "Sculpting"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Pepper Allphin",
    "https://www.instagram.com/pepper.allphin/",
    "North Bend",
    "Painting"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Adel Anderson",
    "https://www.instagram.com/toymakery/",
    "Seattle",
    "Other"
  ),
  new pArtist(
    Math.random().toString(16).slice(5),
    "Will Brown",
    "https://www.patreon.com/willbrownart",
    "Seattle",
    "Painting"
  ),
  
];
console.log(serverArray)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Local PNW Artists Page!', serverArray: serverArray });
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
  
  res.render('index', { title: 'list', serverArray: serverArray, });

});

module.exports = router;
