//slideshow images
var myImages = [
  "images/art1.jpeg",
  "images/art2.jpeg",
  "images/art3.jpeg",
  "images/WillBrown1.jpg",
  "images/WillBrown2.jpg",
  "images/WillBrown3.jpg",
  "images/adelandersonchickens.jpg",
  "images/Murals.jpeg"
];
//slideshow captions
var captionImages = [
  "WaterColor by Pepper Allphin",
  "Mural by Pepper Allphin",
  "Pet Rocks for Adoption by Pepper Allphin",
  "Original Abstract by Will Brown",
  "Original Abstract by Will Brown",
  "Solo tree landscape by Will Brown",
  "Chickens by Adel Anderson",
  "Murals by Sara Hughes"
];

// Artist objects array
var artistIndex = [];

// Current index for slideshow
var currentIndex = 0;

//let pArtist = 
function pArtist (pID, pName, pWebsite, pCity, pArt) {
  this.ID = pID;
  this.name = pName;
  this.website = pWebsite;
  this.city = pCity;
  this.art = pArt;
}; 

let selectedArt = "not selected";

document.addEventListener("DOMContentLoaded", function () {

  // create table 
  createList();

  // Trigger the automatic slideshow initially
  autoSlide();

  // Add New Artist subButton
  document.getElementById("subButton").addEventListener("click", function () {
     let id = Math.random().toString(16).slice(5);
     let newArtist = new pArtist
     (id,
    document.getElementById("fName").value + " " + document.getElementById("lName").value,
    document.getElementById("website").value,
    // selectedArt,
    document.getElementById("city").value,
    document.getElementById("artType").value);
    // // console.log(newArtist)

    // let newArtist = new pArtist("ID_new", "L D", "google.com", "Tacoma", "Art Type");
    // push new movie to server
    $.ajax({
      url : "/addOne",
      type: "POST",
      data: JSON.stringify(newArtist),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
      console.log(result);
      document.location.href = "index.html#list";
        
      },

      error: function(xhr, testStatus, errorThrown){
        alert("server could not add movie:" + newArtist.Name);
        alert(testStatus +" " + errorThrown);
      }
      });
      
    });

    //filter listener
document.addEventListener("change", function(event) {
  if (event.target.id === "filterType") {
      createList();
  }
});

//page before show code 
$(document).on("pagebeforeshow", "#list", function (event) {   // have to use jQuery 
  createList();
});

});

//create list
function createList() {
  $.get("/getAllArtist", function(data, status){  // AJAX get​
    artistIndex = data;

  const theTable = document.getElementById("tableID");
  theTable.innerHTML = "";
  //column headings
  theTable.innerHTML =
    "<thead><th>ID</th><th>Name</th><th>Website</th><th>City</th><th>Art Type</th></thead>";
  //rows
  let filterType = document.getElementById("filterType").value;
  artistIndex.forEach((Artist)=> {
    if (filterType === "All" || Artist.art === filterType) {
    
    const newRow = document.createElement("tr");
    const tdID = document.createElement("td");
    const tdName = document.createElement("td");
    const tdWebsite = document.createElement("td");
    const tdCity = document.createElement("td");
    const tdArt = document.createElement("td");
    tdID.textContent = Artist.ID;
    tdName.textContent = Artist.name;
    tdWebsite.textContent = Artist.website;
    tdCity.textContent = Artist.city;
    tdArt.textContent = Artist.art;
    newRow.appendChild(tdID);
    newRow.appendChild(tdName);
    newRow.appendChild(tdWebsite);
    newRow.appendChild(tdCity);
    newRow.appendChild(tdArt);
    theTable.appendChild(newRow);
  }
  });

  //click event handlers
  console.log(artistIndex);

  var table = document.getElementById("tableID");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = 
      function (row) 
      {
        return function () {
            var cell = row.getElementsByTagName("td")[0];
            var whichID = cell.innerHTML;
            openWebsite(whichID);
      };
    };

    currentRow.onclick = createClickHandler(currentRow);
  }
  });
  
}

function openWebsite(which) {
  for (let i = 0; i < artistIndex.length; i++) {
    if (which == artistIndex[i].ID) {
      let artist = artistIndex[i];
      if (artist.website.startsWith("http") || artist.website.startsWith("https")) {
        window.open(artistIndex[i].website);
      } else {
        window.open("https://"+artistIndex[i].website);
      }
    }
  }
}

//Auto Slideshow function
  function autoSlide() {
    setInterval(function () {
      next();
    }, 2000); // Change the interval (in milliseconds) as needed
  }

function updateImage() {
  const slideShowImage = document.getElementById("slideshow");
  slideShowImage.src = myImages[currentIndex];
  slideShowImage.alt = captionImages[currentIndex]; // If an image cannot be displayed (e.g., due to network errors, issues with the images file, or if it has not yet finished downloading), the alt attribute provides alternative information.
  document.getElementById("caption").textContent = captionImages[currentIndex];
}

function next() {
  currentIndex = (currentIndex + 1) % myImages.length;
  updateImage();
}


