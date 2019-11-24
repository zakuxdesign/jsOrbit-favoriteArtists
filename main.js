const addButton = document.getElementById("button-add");

const clearInput = () => {
  document.getElementById("input-search").value = null;
};

// Clear Failed Message Function -----------------------------------------------------------------------
const clearNoSuchArtist = () => {
  document.getElementById("failMessage").remove();
};

// remove all cards function -----------------------------------------------------------------------
// // using 'card' class remove all cards
const removeAllCards = () => {
  let currentCardsInUI = document.querySelectorAll(".artist-card");
  for (var x = 0; x < currentCardsInUI.length; x++) {
    currentCardsInUI[x].remove(currentCardsInUI[x]);
  }
};

let listOfArtists = [];

class Card {
  constructor(name, img, deleteButton) {
    this.name = name;
    this.img = img;
    this.deleteButton = deleteButton;
  }

  deleteThisArtist() {
    return artistDeleteButton;
  }
}

// Card Class -----------------------------------------------------------------------
// Create a card based on the artists in list of artists
createAllCards = () => {
  for (let x = 0; x < listOfArtists.length; x++) {
    new Card(listOfArtists[x].artistName, listOfArtists[x].image);

    // add the card
    let artistCard = document.createElement("div");
    artistCard.setAttribute("class", "artist-card");
    artistCard.setAttribute("id", listOfArtists[x].artistName);
    artistCard.setAttribute("data-number", x);
    document.getElementById("band-list").appendChild(artistCard);
    // add name
    let nameOfArtist = document.createElement("h2");
    nameOfArtist.setAttribute("class", "artist-name");
    nameOfArtist.setAttribute("id", listOfArtists[x].artistName);
    document
      .getElementById(listOfArtists[x].artistName)
      .appendChild(nameOfArtist);
    nameOfArtist.innerText = listOfArtists[x].artistName;
    // add the image
    let artistPic = document.createElement("img");
    artistPic.setAttribute("class", "artist-pic");
    artistPic.setAttribute("id", listOfArtists[x].artistPic);
    document.getElementById(listOfArtists[x].artistName).appendChild(artistPic);
    artistPic.src = listOfArtists[x].image;
    // add the delete button
    let deleteCard = document.createElement("button");
    deleteCard.setAttribute("class", "delete-button");
    deleteCard.setAttribute("id", "delete-" + listOfArtists[x].artistName);
    document
      .getElementById(listOfArtists[x].artistName)
      .appendChild(deleteCard);
    deleteCard.innerText = "Delete";
    //
    // Delete button function call
    var element = document.getElementById(
      "delete-" + listOfArtists[x].artistName
    );
    element.onclick = function() {
      let tempID = this.parentNode.getAttribute("data-number");
      listOfArtists.splice(tempID, 1);
      removeAllCards();
      createAllCards();
    };
  }
};

// Artist Class -----------------------------------------------------------------------
// Creating a new artist and pushing to list of artists
class Artist {
  constructor(name, img) {
    this.artistName = name;
    this.image = img;
  }
}

// Add Button -----------------------------------------------------------------------
// Call the api and move to
addButton.addEventListener("click", () => {
  let request = document.getElementById("input-search").value;
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + request,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "e32876b052msh41033dfe02e7062p13f694jsnc931c854f8ed"
    }
  };

  // loop through the array if it exists
  // // if does exist
  // // // add object
  $.ajax(settings).done(function(response) {
    if (
      response.data[0].artist.name.toUpperCase() ==
      document.getElementById("input-search").value.toUpperCase()
    ) {
      let newArist = new Artist(
        response.data[0].artist.name,
        response.data[0].artist.picture_medium
      );
      if (document.getElementById("failMessage") !== null) {
        clearNoSuchArtist();
      }
      removeAllCards();
      listOfArtists.push(newArist);
      createAllCards();
      clearInput();
    } else {
      noSuchArtist();
      clearInput();
    }
  });
});

// Failed Function -----------------------------------------------------------------------
// gives user error message if issue call gives nothing
const noSuchArtist = () => {
  const failMessageElement = document.createElement("div");
  failMessageElement.setAttribute("id", "failMessage");
  failMessageElement.innerHTML =
    "Hmm... Sorry, we can't find '" +
    document.getElementById("input-search").value +
    ".' Try another.";
  document.getElementById("band-list").appendChild(failMessageElement);
};
