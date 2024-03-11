const serverArray = [];
artistIndex = [];
var currentIndex = 0;
var slides = document.getElementById("slides");
//slideshow
var currentIndex = 0; // Start from 0 to match array index
var slides = document.getElementById("slides");

//images
var myImages = [
  "images/art1.jpeg",
  "images/art2.jpeg",
  "images/art3.jpeg",
  "images/WillBrown1.jpg",
  "images/WillBrown2.jpg",
  "images/WillBrown3.jpg",
];
//captions
var captionImages = [
  "WaterColor by Pepper Allphin",
  "Mural by Pepper Allphin",
  "Pet Rocks for Adoption by Pepper Allphin",
  "Original Abstract by Will Brown",
  "Original Abstract by Will Brown",
  "Solo tree landscape by Will Brown",
];

//let pArtist = 
function pArtist (pID, pName, pWebsite, pCity, pArt) {
  this.ID = pID;
  this.name = pName;
  this.website = pWebsite;
  this.city = pCity;
  this.art = pArt;
  this.ID = Math.random().toString(16).slice(5)
}; 


//dom loaded

document.addEventListener("DOMContentLoaded", function (event) {

  document.getElementById("subButton").addEventListener("click", function () {

  });

/*   createTable(); */
  // Trigger the automatic slideshow initially
  autoSlide();

  // Select the filter element
  var filterSelect = document.getElementById('filterType');

  var artistList = document.getElementById('artist-list');
  
  // Add event listener for filter change
  filterSelect.addEventListener('change', function() {
    // Clear the artist list
    artistList.innerHTML = '';

    // Get the selected filter type (art type)
    var filterType = filterSelect.value;

    // Loop through each artist in the serverArray
    serverArray.forEach(function(pArtist) {
      // Check if the artist's art type matches the selected filter
      if (filterType === "All" || pArtist.art === filterType) {
        // Create a list item for the artist
        var listItem = document.createElement("li");
        listItem.innerHTML = `
          <a href="${pArtist.website}">
            <h2>${pArtist.name}</h2>
            <p><strong>ID:</strong> ${pArtist.ID}</p>
            <p><strong>City:</strong> ${pArtist.city}</p>
            <p><strong>Art Type:</strong> ${pArtist.art}</p>
          </a>
        `;

        // Append the list item to the artist list
        artistList.appendChild(listItem);
      }
    });
  });
});

    function addArtist() {
        let selectedType = document.getElementById("artType").value;
        let newArtist = new pArtist(
          artistIndex.length + 1,
          document.getElementById("fName").value + " " + document.getElementById("lName").value,
          document.getElementById("website").value,
          document.getElementById("city").value,
          selectedType
        );
        artistIndex.push(newArtist);
        document.location.href = "index.ejs#list"; // Redirect to the artist list page
      }

function autoSlide() {
  setInterval(function () {
    next();
  }, 2000); 
}

function updateImage() {
    const slideShowImage = document.getElementById("slideshow");
    slideShowImage.src = myImages[currentIndex];
    slideShowImage.alt = captionImages[currentIndex];
    document.getElementById("caption").textContent = captionImages[currentIndex];

}
function next() {
        currentIndex = (currentIndex + 1) % myImages.length;
        updateImage();
      }

// create table
/* function createTable() {
  var theTable = document.getElementById("tableID");
  theTable.innerHTML = "";
  //column headings
  theTable.innerHTML = "<thead><th>ID</th><th>Name</th><th>Website</th><th>City</th><th>Art Type</th></thead>"; */
  
    /* artistIndex.forEach(function(Artist){
      var myLi = document.createElement('li');
      myLi.classList.add('artistIndex');
      myLi.setAttribute("data-parm", Artist.ID);
      myLi.innerHTML = Artist.ID + ": " + Artist.name + "  " + Artist.art;
      myUL.appendChild(myLi);
      myLi.addEventListener('click', function () {
        openWebsite(Artist.ID);
      })

    })

    var liList = document.getElementById("artistIndex");
    let newArtistIndex = Array.from(liList);
    newArtistIndex = Array.from(liList)
    newArtistIndex.forEach(function(element){
        element.addEventListener('click', function () {
        })   
     }
    ) */
/*     //rows
    artistIndex.forEach((Artist) => {
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

    newRow.addEventListener("click", function () {
      openWebsite(Artist.ID);
      
    });
  });
  
  */ 

/* } */
 
/* var table = document.getElementById("tableID");
//var rows = table.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
  var currentRow = table.rows[i];
  var createClickHandler = function (row) {
    return function () {
      var cell = row.getElementsByTagName("td")[0];
      var whichID = cell.innerHTML;
      openWebsite(whichID);
    };
  };
  currentRow.onclick = createClickHandler(currentRow);
} */

function openWebsite(which) {
    for (let i = 0; i < artistIndex.length; i++) {
      if (which == artistIndex[i].ID) {
        window.open(artistIndex[i].website);
      }
    }
}

