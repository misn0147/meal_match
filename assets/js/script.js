function showFood() {
    var inputCategory = document.querySelector('#pickC').value;
    console.log(inputCategory);
    fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + inputCategory 
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var randomMealId = response.meals[1].idMeal;
        // for (var i = 0; i > reponse.meals.length; i++) {
        //     var randomMealId = Math.floor(Math.random(response.meals[i].idMeal));
        //     console.log(randomMealId);
        // }
        return fetch ('https:www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomMealId )
    })
    .then(function(foodResult) {
        return foodResult.json();
    })
    .then(function(foodResult) {
        console.log(foodResult);
    })
}