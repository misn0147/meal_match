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
    
        // fetches food menu item from search to display a single meal
        return fetch ('https:www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomMealId )
    })
    .then(function(foodResult) {
        return foodResult.json();
    })
    .then(function(foodResult) {
        console.log(foodResult);
    })
}