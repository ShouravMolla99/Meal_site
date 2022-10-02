///https://www.themealdb.com/api/json/v1/1/categories.php
//https://www.themealdb.com/api/json/v1/1/list.php?i=list


const searchBtn = document.getElementById("searchBtn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const ingredientCloseBtn = document.getElementById("ingredient-close-btn");


searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealIngredient);
ingredientCloseBtn.addEventListener('click', function () {
    mealDetailsContent.parentElement.classList.remove("showIngredient");
});

function getMealList() {
    let searchInputText = document.getElementById("searchBox").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(res => res.json())
        .then(data => {
            let mealInfo = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    mealInfo += `
                      <div class = "meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="ingredient-btn">Get Ingredient</a>
                            </div>
                      </div>
                      
                    `;

                });
                mealList.classList.remove("sorry");
            } else {
                mealInfo = "We Cannot find the food! try with different item";
                mealList.classList.add("sorry");
            }

            mealList.innerHTML = mealInfo;
        })
}

function getMealIngredient(e) {
    e.preventDefault();
    if (e.target.classList.contains('ingredient-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealIngredientModel(data.meals));
    }
}

function mealIngredientModel(meal) {
    console.log(meal);
    meal = meal[0];
    let ingredientInfo = `
        <h2 class="ingredient-title">${meal.strMeal}</h2>
        <p class="ingredient-category">${meal.strCategory}</p>
        <div class=" ingredient-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="ingredient-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div >
        <div class="ingredient-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = ingredientInfo;
    mealDetailsContent.parentElement.classList.add("showIngredient");
}


