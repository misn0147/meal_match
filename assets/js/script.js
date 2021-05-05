//Global
var drinkResponse = "";
var drinkItems = 'drink-items';
const key= drinkResponse;
btnInsert = document.getElementById("food-save-btn" , "drink-save-btn")
const value= document.getElementById("");

var searchHistory = [];
var saveFoodButtonContainer = document.getElementById('food-save-btn');
var saveDrinkButtonContainer = document.getElementById('drink-save-btn');
var foodSave = document.createElement('button');
var drinkSave = document.createElement('button');

//DOM

//creates save button for food
function saveFoodSearch() {
  foodSave.setAttribute('class', 'waves-effect waves-light btn save-btn');
  foodSave.textContent = 'Click here to save food!';
  saveFoodButtonContainer.innerHTML = '';
  saveFoodButtonContainer.appendChild(foodSave);
}

//creates save button for drink
function saveDrinkSearch() {
  drinkSave.setAttribute('class', 'waves-effect waves-light btn save-btn');
  drinkSave.textContent = 'Click here to save drink!';
  saveDrinkButtonContainer.innerHTML = '';
  saveDrinkButtonContainer.appendChild(drinkSave);
}

// this funtion runs onclick of TryUsOut button
function showFood() {
  var inputCategory = document.querySelector('#pickc').value;
  console.log(inputCategory);
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + inputCategory)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      //gets a random number between 0 - length of the array of all meal items per category (ex: beef has 37 items, vegan has 3 items)
      function randomNumber(min, max) {
        const randomArrayNumber = Math.random() * (max - min) + min;
        return Math.floor(randomArrayNumber);
      }
      var randomMealArrayNumber = randomNumber(0, response.meals.length);

      // inputs random array number into array to grab idMeal for next API fetch call
      var randomMealId = response.meals[randomMealArrayNumber].idMeal;

      // use randomMealId to fetch random food menu item from array to display a single meal
      return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomMealId);
    })
    .then(function (foodResult) {
      return foodResult.json();
    })
    //DISPLAY FOOD ON PAGE
    .then(function (foodResult) {
      console.log(foodResult);

      // Display selected food title on page
      var foodTitle = foodResult.meals[0].strMeal;
      $('#food-title-container').text(foodTitle);

      //Display selected food website link on page
      var foodSite = foodResult.meals[0].strSource;
      var foodYouTube = foodResult.meals[0].strYoutube;
      console.log(foodSite);
      if (foodSite !== null) {
        $('#food-link').attr('href', foodSite).text('Click here for recipe!');
      } else if ((foodSite === null, foodYouTube !== null)) {
        $('#food-link').attr('href', foodYouTube).text('Click here for recipe!');
      } else if ((foodSite === null, foodYouTube === null)) {
        showFood();
      }

      // Create a variable that will select the <div> where the food image will be displayed
      var imgContainerEl = document.querySelector('#food-container');
      // Empty out the <div> before we append a GIF to it
      imgContainerEl.innerHTML = '';
      var foodImg = document.createElement('img');
      foodImg.setAttribute('src', foodResult.meals[0].strMealThumb);
      // Append 'foodImg' to the <div>
      imgContainerEl.appendChild(foodImg);
      saveLocalFood = localStorage;

      localStorage.setItem('food-Items', JSON.stringify([]));
    });
  saveFoodSearch();
}

function showDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (drinkResponse) {
      return drinkResponse.json();
    })
    .then(function (drinkResponse) {
      console.log(drinkResponse);

      var drinkTitle = drinkResponse.drinks[0].strDrink;
      console.log(drinkTitle);
      $('#drink-title-container').text(drinkTitle);

      var drinkImageEl = document.querySelector('#drink-container');
      drinkImageEl.innerHTML = '';
      var drinkImg = document.createElement('img');
      drinkImg.setAttribute('src', drinkResponse.drinks[0].strDrinkThumb);
      drinkImageEl.appendChild(drinkImg);

      var drinkIngredientsEl = document.querySelector('.drink-ingredients');
      var searchLink = 'http://www.google.com/search?q=';
      drinkIngredientsEl.innerHTML = '';
      var drinkRecipe = document.createElement('a');
      drinkRecipe.setAttribute('href', searchLink + drinkTitle + ' Drink Recipe');
      drinkRecipe.setAttribute('target', '_blank');
      drinkRecipe.innerHTML = 'Click here for a recipe!';
      drinkIngredientsEl.appendChild(drinkRecipe);

      localStorage.setItem('drink-items', JSON.stringify([]));
    });
  saveDrinkSearch();
}

console.log(localStorage);
// save foodID/drinkID to local storage on button click

//set const vars

//DOM



const sbtn= document.getElementById("sbtn");
const lsOutput = document.getElementById("lsOutput")
console.log(drinkResponse);
btnInsert.onClick = function () {
  
  const key = drinkResponse.value;
  const value= inpValue.value;
  
  if (key && value){
    localStorage.setItem(key,value);
  }

  for (i = 0; i < localStorage.length; i++){
    const key= localStorage.key(i);
    const value= localStorage.getItem(key);

    lsOutput.innerHTML += `${key}:${value}`;
  }
  drinkItems.push(drinkResponse);
}

