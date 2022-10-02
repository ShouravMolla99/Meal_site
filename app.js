///https://www.themealdb.com/api/json/v1/1/categories.php
//https://www.themealdb.com/api/json/v1/1/list.php?i=list

// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data.name[0])
//     })

// const displayFood = categories => {
//     const mealItem = document.getElementById('meal-item')
//     for (let i = 0; i < categories.length; i++) {
//         const meals = categories[i];
//         const mealDiv = document.createElement("div");

//         const h3 = document.createElement("h3");
//         h3.innerText = meals.strCategory;
//         mealDiv.appendChild(h3);

//         const p = document.createElement("p");
//         p3.innerText = meals.strCategoryThumb;
//         h3.appendChild(p);

//         mealItem.appendChild(mealDiv);



//     }

//     //const mealList = document.createElement('li');

// // }
// document.getElementById("searchBtn").addEventListener("click", function () {
//     console.log('shourav')
// })


// function getMealList() {
//     const foodInput = document.getElementById("food-input");
//     const foodList = foodInput.value;
//     console.log(foodList);


// }

const searchBtn = document.getElementById("searchBtn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");


searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener('click', function () {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
    let searchInputText = document.getElementById("searchBox").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                      <div class = "meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                      </div>
                      
                    `;

                });
                mealList.classList.remove("sorry");
            } else {
                html = "We Cannot find the food! try with different item";
                mealList.classList.add("sorry");
            }

            mealList.innerHTML = html;
        })
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class=" recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div >
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}


