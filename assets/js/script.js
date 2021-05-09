//Global
var drinkResponse = "";
var drinkItems = 'drink-items';
const key= drinkResponse;


const value= document.getElementById("");

var searchHistory = [];
var saveFoodButtonContainer = document.getElementById('food-save-btn');
var saveDrinkButtonContainer = document.getElementById('drink-save-btn');


//creates save button for food
function saveFoodSearch(foodName,foodLink) {
  var foodSave = document.createElement('button');
  foodSave.setAttribute('class', 'waves-effect waves-light btn save-btn');
  foodSave.textContent = 'Click here to save food!';
  saveFoodButtonContainer.innerHTML = '';


  foodSave.onclick = function(){
    // get from local storage to know what already exists
    var existingSavedFoods = localStorage.getItem('food-Items');
    console.log(existingSavedFoods);
    if (existingSavedFoods === null) {
      //if there are no items saved yet, create new array with name of item and link
      localStorage.setItem('food-Items', JSON.stringify([{foodName,foodLink}]));
      var singleFood = JSON.parse(localStorage.getItem("food-Items"));
      getSavedFoods(singleFood);
    } else {
      //if local storage for food items is already an array, push new items to that array
      var parsedFoods = JSON.parse(localStorage.getItem("food-Items"));
      parsedFoods.push({foodName,foodLink});
      localStorage.setItem('food-Items', JSON.stringify(parsedFoods));
      getSavedFoods(parsedFoods);
    }
  };
  saveFoodButtonContainer.appendChild(foodSave);
};

function getSavedFoods(foodList) {
  var recipeList = document.getElementById("recipe-list");
  for (i=0; i < foodList.length; i++) {
    console.log(foodList[i].foodName,foodList[i].foodLink);
    var listFoodItem = document.createElement('li');
    var listFoodATag = document.createElement('a');
    listFoodATag.textContent = foodList[i].foodName;
    listFoodATag.setAttribute('href', foodList[i].foodLink);
    listFoodATag.setAttribute('target', '_blank');
    listFoodItem.append(listFoodATag);
    recipeList.append(listFoodItem);
}
};

//creates save button for drink
function saveDrinkSearch(drinkName) {
  var drinkSave = document.createElement('button');
  drinkSave.setAttribute('class', 'waves-effect waves-light btn save-btn');
  drinkSave.textContent = 'Click here to save drink!';
  saveDrinkButtonContainer.innerHTML = '';

  drinkSave.onclick = function(){
    // get from local storage to know what already exists
    var parsedDrinks = JSON.parse(localStorage.getItem("drink-Items"));
    console.log(parsedDrinks);
    if (parsedDrinks === null) {
      //if there are no items saved yet, create new array with name of item
      localStorage.setItem('drink-Items', JSON.stringify([{drinkName}]));      
    } else {
      //if local storage for drink items is already an array, push new items to that arra
      parsedDrinks.push({drinkName});
      localStorage.setItem('drink-Items', JSON.stringify(parsedDrinks));
    }
  };
  saveDrinkButtonContainer.appendChild(drinkSave);
};


// this funtion runs onclick of TryUsOut button
function showFood() {
  var inputCategory = document.querySelector('#pickc').value;
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + inputCategory)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {

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

      // Display selected food title on page
      var foodTitle = foodResult.meals[0].strMeal;
      $('#food-title-container').text(foodTitle);

      //Display selected food website link on page
      var foodSite = foodResult.meals[0].strSource;
      var foodYouTube = foodResult.meals[0].strYoutube;
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
      saveFoodSearch(foodTitle,foodSite);
    });
}

function showDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (drinkResponse) {
      return drinkResponse.json();
    })
    .then(function (drinkResponse) {

      var drinkTitle = drinkResponse.drinks[0].strDrink;
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

      saveDrinkSearch(drinkTitle);
    });
  
}

console.log(localStorage);




const sbtn= document.getElementById("sbtn");
const lsOutput = document.getElementById("lsOutput")
console.log(drinkResponse);
