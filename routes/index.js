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
var fs = require("fs");
const { stringify } = require('querystring');

let fileManager  = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};
  

// Create an array to store artists
if(!fileManager.validData()) {
serverArray.push(new pArtist("Sarah Hughes","https://www.apinchdifferent.com/","North Bend","Painting"));
serverArray.push(new pArtist("Tara Sreekuman","https://www.plentyopixels.com/","Snoqualmie", "Photography"));
serverArray.push(new pArtist("Jess Joy","https://www.jessjoyart.com/","North Bend","Painting"));
serverArray.push(new pArtist("Noelle Rivas","https://www.instagram.com/ceramics_bynoelle/","Seattle", "Sculpting"));
serverArray.push(new pArtist("Pepper Allphin","https://www.instagram.com/pepper.allphin/","North Bend","Painting"));
serverArray.push(new pArtist("Adel Anderson","https://www.instagram.com/toymakery/","Seattle", "Other"));
serverArray.push(new pArtist("Will Brown","https://www.patreon.com/willbrownart","Seattle","Painting"));


fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}
console.log(serverArray)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:"Welcome to Local PNW Artists Page!", serverArray: serverArray });
});


router.post('/addOne', function (req, res) {
  // Generate a unique ID for the new artist
  const newID = Math.random().toString(16).slice(5);
  console.log(req.body);
  let newArtist = new pArtist(
    req.body.name,
    req.body.website,
    req.body.city,
    req.body.art);
    newArtist.ID = newID;
// Add the new artist to the serverArray array
console.log("New artist from server:" + JSON.stringify(newArtist));
  serverArray.push(newArtist);
  // write file to json
  fileManager.write();
  // Send a response back to the client
    res.send("Artist added successfully");

});
  

//Get all Artist data
router.get("/getAllArtist", function(req,res){
  fileManager.read();
  res.status(200).json(serverArray)
})
module.exports = router;