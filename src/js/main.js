// Side Bar Buttons
const mealsBtn = document.getElementById("meals-btn")
const productsBtn = document.getElementById("products-btn")
const foodLogBtn = document.getElementById("food-log-btn")

// Heeder
const headerH1 = document.querySelector("#header h1")
const headerP = document.querySelector("#header p")

// Sections
const mealRecipes = document.getElementById("meal-recipes")
const mealDetails = document.getElementById("meal-details")
const productsSection = document.getElementById("products-section")
const foodlogSection = document.getElementById("foodlog-section")

// Display Meals
const mealsGrid = document.getElementById("recipes-grid")
const recipesList = document.getElementById("recipes-List")
const recipesCounter = document.getElementById("recipes-count")

// Grid View
const gridViewBtn = document.getElementById("grid-view-btn")
const listViewBtn = document.getElementById("list-view-btn")

// Meal Types
const categoryCards = document.querySelectorAll("#categories-grid .category-card")
let selectedCategory = "chicken";



// Select Area
const areaBtns = document.querySelectorAll(".area-filter-btn")
// Search Input
const serchInput = document.getElementById("search-input")

// Display Meal Details
const mealsGridDevs = document.querySelectorAll("#recipes-grid div")
const recipesListDevs = document.querySelectorAll("#recipes-List div")
const backToMealsBtn = document.getElementById("back-to-meals-btn")
const mealDetailsContentOne = document.getElementById("meal-details-content1")
const mealDetailsContentTwo = document.getElementById("meal-details-content2")
const mealDetailsContentThree = document.getElementById("meal-details-content3")
const countIngredients = document.getElementById("count-ingredients")
const video = document.querySelector("#video iframe")

// Log Meal
const logMealBtn = document.getElementById("log-meal-btn")
const logMealModel = document.getElementById("log-meal-modal")
const cancelLogMeal = document.getElementById("cancel-log-meal")
const logMealImage = document.querySelector("#log-meal-modal img")
const logMealP = document.querySelector("#log-modle-info p")
const confirmLogMeal = document.getElementById("confirm-log-meal")

const foodLogDate = document.getElementById("food-date")
const LogEmpty = document.getElementById("log-empty")
const logDisplay = document.getElementById("log-display")
const logCounter = document.getElementById("log-item-counter")
const clearAllMealsBtn = document.getElementById("clear-foodlog")

// Product Scanner
const productInput = document.getElementById("product-search-input")
const searchproductBtn = document.getElementById("search-product-btn")
const productsGrid = document.getElementById("products-grid")
const productEmpty = document.getElementById("product-empty")
const productDetailModal = document.getElementById("product-detail-modal")


const addProductToLog = document.getElementById("product-modal-log")
const closeProductModal = document.getElementById("product-modal-close")




// Click Events
// Dsiplay
mealsBtn.addEventListener("click", handlelDisplayOne)
productsBtn.addEventListener("click", handlelDisplayTwo)
foodLogBtn.addEventListener("click", handlelDisplayThree)
// Search Event
serchInput.addEventListener("input", handleSearsh)
// Meal Details Events
mealsGrid.addEventListener("click", handleMealDetails);
recipesList.addEventListener("click", handleMealDetails);
// Log Meal Btn Event
logMealBtn.addEventListener("click", handlelogMeal);
clearAllMealsBtn.addEventListener("click", handleClearAll);


function handlelDisplayOne() {
  headerH1.innerHTML = "Meals & Recipes";
  headerP.innerHTML = "Discover delicious and nutritious recipes tailored for you";
  mealRecipes.classList.remove("hidden")

  if (mealsBtn.classList.contains("hidden")) {

  } else {
    mealsBtn.classList.remove("text-gray-600", "hover:bg-gray-50")
    mealsBtn.classList.add("bg-emerald-50", "text-emerald-700")
    productsBtn.classList.remove("bg-emerald-50", "text-emerald-700")
    foodLogBtn.classList.remove("bg-emerald-50", "text-emerald-700")
  }

  productsBtn.classList.add("text-gray-600", "hover:bg-gray-50")
  foodLogBtn.classList.add("text-gray-600", "hover:bg-gray-50")

  mealDetails.classList.add("hidden")
  productsSection.classList.add("hidden")
  foodlogSection.classList.add("hidden")
}

function handlelDisplayTwo() {
  headerH1.innerHTML = "Product Scanner";
  headerP.innerHTML = "Search packaged foods by name or barcode";
  productsSection.classList.remove("hidden")
  if (productsBtn.classList.contains("hidden")) {

  } else {
    productsBtn.classList.remove("text-gray-600", "hover:bg-gray-50")
    productsBtn.classList.add("bg-emerald-50", "text-emerald-700")
    mealsBtn.classList.remove("bg-emerald-50", "text-emerald-700")
    foodLogBtn.classList.remove("bg-emerald-50", "text-emerald-700")
  }

  mealsBtn.classList.add("text-gray-600", "hover:bg-gray-50")
  foodLogBtn.classList.add("text-gray-600", "hover:bg-gray-50")

  mealDetails.classList.add("hidden")
  mealRecipes.classList.add("hidden")
  foodlogSection.classList.add("hidden")
}

function handlelDisplayThree() {
  headerH1.innerHTML = "Food Log";
  headerP.innerHTML = "Track your daily nutrition and food intake";
  foodlogSection.classList.remove("hidden")

  if (foodLogBtn.classList.contains("hidden")) {

  } else {
    foodLogBtn.classList.remove("text-gray-600", "hover:bg-gray-50")
    foodLogBtn.classList.add("bg-emerald-50", "text-emerald-700")
    mealsBtn.classList.remove("bg-emerald-50", "text-emerald-700")
    productsBtn.classList.remove("bg-emerald-50", "text-emerald-700")
  }

  mealsBtn.classList.add("text-gray-600", "hover:bg-gray-50")
  productsBtn.classList.add("text-gray-600", "hover:bg-gray-50")

  mealRecipes.classList.add("hidden")
  mealDetails.classList.add("hidden")
  productsSection.classList.add("hidden")
}

// =========================================

let meals = [];

async function getMeals() {
  try {
    let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${selectedCategory}&page=1&limit=25`);
    let data = await response.json();

    return data.results;

  } catch (error) {
    console.log(error);
  }

}

// Grid View
gridViewBtn.addEventListener("click", displayMealsGrid)
listViewBtn.addEventListener("click", displayMealsList)

function displayMealsGrid(arr) {

  gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm")
  listViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm")
  mealsGrid.classList.remove("hidden")
  recipesList.classList.add("hidden")
  let temp = "";
  if (arr.length > 0) {
    arr.forEach(meals => {
      temp += /* html */ `     <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meals.id}">
              <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meals.thumbnail}"
                  alt="${meals.name}" />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                    ${meals.category}
                  </span>
                  <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                    ${meals.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${meals.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meals.instructions[0]}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals.area}
                  </span>
                </div>
              </div>
            </div>`;

    });
    mealsGrid.innerHTML = temp;
  }
  recipesCounter.innerHTML = `Showing ${meals.length} recipes`
}

function displayMealsList(arr) {

  listViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm")
  gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm")
  recipesList.classList.remove("hidden")
  mealsGrid.classList.add("hidden")
  let temp = "";
  if (arr.length > 0) {
    arr.forEach(meals => {
      temp += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-row h-40"
              data-meal-id="${meals.id}">
              <div class="relative overflow-hidden w-48 h-full">
                <img class="w-full object-cover group-hover:scale-110 transition-transform duration-500 h-full"
                  src="${meals.thumbnail}" alt="${meals.name}"
                  loading="lazy">
                <div class="absolute bottom-3 left-3 flex gap-2 hidden">

                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-lg">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-tag"
                        data-prefix="fas" data-icon="tag" role="img" viewBox="0 0 512 512" aria-hidden="true"
                        data-fa-i2svg="">
                        <path fill="currentColor"
                          d="M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z">
                        </path>
                      </svg></i>${meals.category}
                  </span>


                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-lg">
                    <i class="mr-1 text-blue-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe"
                        data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true"
                        data-fa-i2svg="">
                        <path fill="currentColor"
                          d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z">
                        </path>
                      </svg></i>${meals.area}
                  </span>

                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  Chicken Handi
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meals.instructions[0].split(' ').slice(0, 18).join(' ')}...
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils"
                        data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true"
                        data-fa-i2svg="">
                        <path fill="currentColor"
                          d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z">
                        </path>
                      </svg></i>
                    ${meals.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="mr-1 text-blue-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe"
                        data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true"
                        data-fa-i2svg="">
                        <path fill="currentColor"
                          d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z">
                        </path>
                      </svg></i>
                    ${meals.area}
                  </span>
                </div>
              </div>
            </div>`;

    });
    recipesList.innerHTML = temp;
  }
  recipesCounter.innerHTML = `Showing ${meals.length} recipes`
}

document.addEventListener('DOMContentLoaded', async function () {
  meals = await getMeals();
  // console.log("loaded:", meals.length, meals);
  displayMealsList(meals)
  displayMealsGrid(meals)
});

categoryCards.forEach(ele => {
  ele.addEventListener("click", async () => {
    selectedCategory = changeType(ele);

    meals = await getMeals();
    displayMealsList(meals);
    displayMealsGrid(meals);
  });
});

function changeType(ele) {

  selectedCategory = ele.dataset.category;
  return selectedCategory;
};

// Aera Handel
areaBtns.forEach((ele) => {
  ele.addEventListener("click", getArea)
});

function getArea(e) {
  const ele = e.target;
  let area = ele.dataset.area

  areaBtns.forEach((btn) => {
    btn.classList.remove("bg-emerald-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700");
  })

  ele.classList.remove("bg-gray-100", "text-gray-700");
  ele.classList.add("bg-emerald-600", "text-white");
  handelFilterRecipes(area)
}

function handelFilterRecipes(area) {
  const filteredRecipes = meals.filter(meal => meal.area === area);
  console.log(filteredRecipes);

  if (area === "All") {
    displayMealsList(meals)
    displayMealsGrid(meals)
  } else {
    displayMealsList(filteredRecipes);
    displayMealsGrid(filteredRecipes);
  }
}

// Search
function handleSearsh() {

  const keyword = serchInput.value.trim().toLowerCase();
  const searched = meals.filter(meal => meal.name.toLowerCase().includes(keyword));
  displayMealsList(searched);
  displayMealsGrid(searched);
}

// =========================================================
// Handle Meal Details

function handleMealDetails(e) {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const id = card.dataset.mealId;

  const meal = meals.find(m => m.id === id);

  handleMlDDisplay(meal)

  mealDetails.classList.remove("hidden")
  mealRecipes.classList.add("hidden")
  headerH1.innerHTML = "Recipe Details"
  headerP.innerHTML = "View full recipe information and nutrition facts"

}

backToMealsBtn.addEventListener("click", () => {
  mealDetails.classList.add("hidden")
  mealRecipes.classList.remove("hidden")
})

function handleMlDDisplay(meal) {

  mealDetailsContentOne.innerHTML = /* html */ `<div class="relative h-80 md:h-96">
            <img src="${meal.thumbnail}"
              alt="${meal.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${meal.name}
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">4 servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">2194 cal/serving</span>
                </span>
              </div>
            </div>
          </div>`;

  let temp = ""
  countIngredients.innerHTML = `${meal.ingredients.length} items`
  meal.ingredients.forEach((ele) => {
    temp += /* html */ `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${ele.measure}</span>
                    ${ele.ingredient}
                  </span>
                </div>`;
  });

  mealDetailsContentTwo.innerHTML = temp;

  let tempTwo = "";

  meal.instructions.forEach((ele, i) => {
    tempTwo += /* html */ `<div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${++i}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${ele}
                  </p>
                </div>`;

  });
  mealDetailsContentThree.innerHTML = tempTwo;
  video.src = getEmbedUrl(meal.youtube);

  logMealBtn.addEventListener('click', () => {
    handlelogMeal(meal);
  });
}

function getEmbedUrl(youtubeUrl) {
  if (!youtubeUrl) return "";
  const videoId = youtubeUrl.split("v=")[1]?.split("&")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

// === Log ===

let showLog = [];
let currentMeal = null;
function handlelogMeal(meal) {
  console.log(meal);
  logMealModel.classList.remove("hidden")

  logMealImage.src = meal.thumbnail
  logMealP.innerHTML = meal.name

  currentMeal = meal;


  confirmLogMeal.onclick = () => {
    if (currentMeal) {
      showLog.push(currentMeal);
      displayLoggedItems()
      logMealModel.classList.add("hidden");

      Swal.fire({
        position: "cennter",
        icon: "success",
        title: "Meal has been logged",
        showConfirmButton: false,
        timer: 1500
      });
    }

  };

  cancelLogMeal.addEventListener("click", () => {
    logMealModel.classList.add("hidden")
  })

}

let options = { weekday: 'long', month: 'short', day: 'numeric' };
let formattedDate = new Date().toLocaleDateString('en-US', options);
foodLogDate.innerHTML = formattedDate;


function displayLoggedItems() {
  if (showLog.length === 0) {
    LogEmpty.classList.remove("hidden")
  } else {
    LogEmpty.classList.add("hidden")
  }


  let temp = "";

  showLog.forEach((ele, i) => {
    temp += /* html */ `<div
                  class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                  <div class="flex items-center gap-4">
                    <img src="${ele.thumbnail ?? ele.image}" alt="${ele.name}"
                      class="w-14 h-14 rounded-xl object-cover">
                    <div>
                      <p class="font-semibold text-gray-900">${ele.name}</p>
                      <p class="text-sm text-gray-500">
                        1 serving
                        <span class="mx-1">•</span>
                        <span class="text-emerald-600">Recipe</span>
                      </p>
                      <p class="text-xs text-gray-400 mt-1">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <p class="text-lg font-bold text-emerald-600">${Math.round(ele.nutrients?.calories ?? 0)}</p>
                      <p class="text-xs text-gray-500">kcal</p>
                    </div>
                    <div class="hidden md:flex gap-2 text-xs text-gray-500">
                      <span class="px-2 py-1 bg-blue-50 rounded">${(ele.nutrients?.protein ?? 0).toFixed(1)}g P</span>
                      <span class="px-2 py-1 bg-amber-50 rounded">${(ele.nutrients?.carbs ?? 0).toFixed(1)}g C</span>
                      <span class="px-2 py-1 bg-purple-50 rounded">${(ele.nutrients?.fat ?? 0).toFixed(1)}g F</span>
                    </div>
                    <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
                      data-index="${i}">
                      <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas"
                          data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
                          <path fill="currentColor"
                            d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z">
                          </path>
                        </svg></i>
                    </button>
                  </div>
                </div>`;
  })

  logDisplay.innerHTML = temp;

  localStorage.setItem("foodList", JSON.stringify(showLog))
  logCounter.innerHTML = `Logged Items (${showLog.length})`;
}

// Food log In Local Storage
if (localStorage.getItem("foodList") == null) {
  showLog = []
} else {
  showLog = JSON.parse(localStorage.getItem("foodList"))
}

displayLoggedItems()
logDisplay.addEventListener("click", handleDelet)
logCounter.innerHTML = `Logged Items (${showLog.length})`;

function handleDelet(e) {
  const btn = e.target.closest(".remove-foodlog-item");
  if (!btn) return;

  const index = Number(btn.dataset.index);
  showLog.splice(index, 1);
  displayLoggedItems()
  localStorage.setItem("foodList", JSON.stringify(showLog))
}

function handleClearAll() {
  Swal.fire({
    title: "Clear Today's Log?",
    text: "This will remove all logged food items for today.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, clear all"
  }).then((result) => {
    if (result.isConfirmed) {
      showLog = [];
      localStorage.removeItem("foodList");
      displayLoggedItems();

      Swal.fire({
        title: "Cleared!",
        text: "Your food has been cleared.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false
      });
    }
  });
}

// ==============================================================
// Product Scanner
// ==============================================================

let products = [];

let productsType = "";

async function getProducts() {

  if (productsType.trim() === "") {
    return [];
  }
  try {
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${productsType}&page=1&limit=24`);
    let data = await response.json();

    return data.results;

  } catch (error) {
    console.log(error);
  }

}


document.addEventListener('DOMContentLoaded', async function () {
  products = await getProducts();
  console.log("loaded:", products.length, products);
});

searchproductBtn.addEventListener("click", searchInProduct)

async function searchInProduct() {
  productsType = productInput.value;
  products = await getProducts();
  console.log(products);
  displayPrudact(products)
}

function displayPrudact(products) {

  // productEmpty

  if (products.length === 0) {
    productEmpty.classList.remove("hidden")
  } else {
    productEmpty.classList.add("hidden")
  }

  let temp = "";

  products.forEach(ele => {
    temp += /* html */  `<div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="${ele.barcode}">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                ${ele.image ? `<img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              src="${ele.image}"
              alt="${ele.name}" loading="lazy" />`
        : `<div class="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
              <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i></div>`}
                
                <!-- Nutri-Score Badge -->
                <div
                  class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${ele.nutritionGrade && ele.nutritionGrade.toLowerCase() !== "unknown" ? ele.nutritionGrade.toUpperCase() : "N/A"}
                  
                </div>

                <!-- NOVA Badge -->
                <div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="NOVA 2">
                  ${ele.novaGroup ?? "0"}
                </div>
              </div>

              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${ele.brand}
                </p>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${ele.name}
                </h3>

                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                  <span><i class="fa-solid fa-fire mr-1"></i>${ele.nutrients.calories.toFixed(1)} kcal/100g</span>
                </div>

                <!-- Mini Nutrition -->
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">${ele.nutrients.protein.toFixed(1)}</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${ele.nutrients.carbs.toFixed(1)}</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${ele.nutrients.fat.toFixed(1)}</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${ele.nutrients.sugar.toFixed(1)}</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>`;
  });

  productsGrid.innerHTML = temp;



}

let currentProduct = null;

productsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  currentProduct = products.find(p => String(p.barcode) === card.dataset.barcode);
  if (!currentProduct) return;

  displayProductModle(currentProduct);
});


const modleImage = document.getElementById("modle-image")
const topCloseModl = document.getElementById("top-close-modl")
const nameModl = document.getElementById("name-modl")
const categoryModl = document.getElementById("category-modl")
const nutritionModl = document.getElementById("nutrition-modl")
const novaModl = document.getElementById("nova-modl")
const caloresModl = document.getElementById("calores-modl")
const protenModl = document.getElementById("proten-modl")
const carbModl = document.getElementById("carb-modl")
const fatModl = document.getElementById("fat-modl")
const sugarModl = document.getElementById("sugar-modl")
const fibrModl = document.getElementById("fibr-modl")
const intModl = document.getElementById("int-modl")
const productModalLog = document.getElementById("product-modal-log")


function displayProductModle(product) {
  productDetailModal.classList.remove("hidden")

  modleImage.src = product.image;
  modleImage.alt = product.name;

  nameModl.innerHTML = product.name;
  categoryModl.innerHTML = product.brand;
  nutritionModl.innerHTML = product.nutritionGrade.toUpperCase();
  novaModl.innerHTML = product.novaGroup ?? "0";
  caloresModl.innerHTML = product.nutrients.calories.toFixed(1);
  protenModl.innerHTML = `${product.nutrients.protein.toFixed(1)}g`;
  carbModl.innerHTML = `${product.nutrients.carbs.toFixed(1)}g`;
  fatModl.innerHTML = `${product.nutrients.fat.toFixed(1)}g`;
  sugarModl.innerHTML = `${product.nutrients.sugar.toFixed(1)}g`;
  fibrModl.innerHTML = `${product.nutrients.fiber.toFixed(1)}g`;
  intModl.innerHTML = product.name;

}

closeProductModal.addEventListener("click", () => {
  productDetailModal.classList.add("hidden")
})

topCloseModl.addEventListener("click", () => {
  closeProductModal.click()
})

productModalLog.addEventListener("click", handleProductLog)

function handleProductLog() {
  if (!currentProduct) return;

  showLog.push(currentProduct);
  displayLoggedItems();
  productDetailModal.classList.add("hidden");
}