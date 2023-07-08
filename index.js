var script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
document.head.appendChild(script);

// Get Id from HTML File, & Search query with HTTP Request, then parse it
document.getElementById("search-form").addEventListener('keyup', function(){
  var url = getUrl();
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.open('get', url, true);
  xhrRequest.send();
  xhrRequest.onload = function(){
    var data = JSON.parse(xhrRequest.responseText);
    display(data);  
  }
});

// Get the URL from API
function getUrl(){
  var searchQuery = document.getElementById('search-string').value;
  console.log(searchQuery);
  document.getElementById('querySection').innerHTML = 'You have searched for: ' + searchQuery;

  if (!searchQuery){
    console.log('Name cannot be empty!');
    return "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=839d3201fbd7bc67be467100dae83906&hash=77964d9b5c2bef6213992685d7c2dfd4";
  } else {
    var timestamp = new Date().getTime().toString();
    var privateKey = "be3ff20fd7f635327d5e015e1215ad5f6f166fcf";
    var publicKey = "839d3201fbd7bc67be467100dae83906";
    var hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    
    return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;
  }
}



//  Get Canvas 
let canvas = document.getElementById('canvas');
// Get Search String
let searchHero = document.getElementById('search-string').value;


// This Function will display the Data on the Screen
function display(data){
  var superHeroList = document.getElementById('superhero-list');
  superHeroList.innerHTML = "";
  var results = data.data.results;
//  Printing the results that are get from searched Query
  console.log(results);
  if(!results){
      //  if Search character matches the results then only it will forward to next step
      document.getElementById('search-character').value = "";
      window.alert("No super hero found!");
  }else{
      //  Else the process it going on
      // Creating a For Loop because there will be n number of results for same query
      for(let result of results){
          var templateCanvas = canvas.content.cloneNode(true);
//  Get all the elemets from id and then changes its Inner HTMl
          templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
          templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id ;
          templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
          templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
          templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;
          //  Set Event listenet for Learn  more button 
          templateCanvas.getElementById('learn-more').addEventListener('click', function(){
              localStorage.setItem('id', result.id);
              window.location.assign('./about.html');
          });
          //  Set Event listenet for Fav  more button 
          templateCanvas.getElementById('fav').addEventListener('click', function(){
              var index = localStorage.length;
              var data = JSON.stringify(result);
              localStorage.setItem(result.id,data);
          });
          superHeroList.appendChild(templateCanvas);
      }
  }
};
//  This is a function for displaying a alert box type message on the bottom of the screen, when we add to fav. heros.
function addFunction() {
var x = document.getElementById("snackbar");
x.className = "show";
setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


