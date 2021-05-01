// this funtion runs onclick of TryUsOut button
function showFood() {
    var inputCategory = document.querySelector('#pickc').value;
    console.log(inputCategory);
    fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + inputCategory 
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

        //gets a random number between 0 - length of the array of all meal items per category (ex: beef has 37 items, vegan has 3 items)
        function randomNumber(min, max){
            const randomArrayNumber = Math.random()*(max-min) + min;
            return Math.floor(randomArrayNumber)
        }
        var randomMealArrayNumber =randomNumber(0,response.meals.length);
        
        // inputs random array number into array to grab idMeal for next API fetch call
        var randomMealId = response.meals[randomMealArrayNumber].idMeal;
    
        // use randomMealId to fetch random food menu item from array to display a single meal
        return fetch ('https:www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomMealId )
    })
    .then(function(foodResult) {
        return foodResult.json();
    })
//DISPLAY FOOD ON PAGE
    .then(function(foodResult) {
        console.log(foodResult);

    // Display selected food title on page
    var foodTitle = foodResult.meals[0].strMeal;
    $("#food-title-container").text(foodTitle);

    //Display selected food website link on page
    var foodSite = foodResult.meals[0].strSource;
    var foodYouTube = foodResult.meals[0].strYoutube;
    console.log(foodSite);
    if (foodSite !== null ) {
        $("#food-link").attr("href", foodSite).text("Click here for recipe!")
    } else if (foodSite === null, foodYouTube !== null ) {
        $("#food-link").attr("href", foodYouTube).text("Click here for recipe!")
    }
    else if (foodSite === null, foodYouTube === null ){
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
    })
}