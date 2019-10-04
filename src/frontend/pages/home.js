

function homeRouter(req, router) {
  document.body.innerHTML = `

   
  <div id="welcome-background" class="bg-beige">  
    <header class="container"> 
       
      <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
          <a class="navbar-brand d-block" href="http://localhost:3000/">Logo</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                  <li class="nav-item "><a class="nav-link" href="http://localhost:3000/meals">Find a meal</a></li>
                  <li class="nav-item "><a class="nav-link" href="http://localhost:3000/add-meal">Become a host</a></li>
              </ul>
          </div>
      </nav>
    </header>
    
    <div id="welcome-text" class="text-center">
      <div class="to-the-center">    
        <h1>Find new friends and fabulous meals</h1>
        <h2 class="h3 pb-3">Discover home cooking</h2>
        <a class="btn btn-success" href="http://localhost:3000/meals">Find meals</a>
      </div>
    </div>
     
  </div>
  <img src="../assets/pasta.jpg" id="welcome-img">
    
  <section id="featured-meals">
    <div class="container text-center pb-5">
      <h2 class="py-5">Featured meals</h2>
      <ul id="featured-meals-ul" class="d-flex align-content-center flex-wrap justify-content-around list-unstyled "></ul>
    </div>
  </section>
  
  <section id="stories" class="bg-beige">
    <div class="container text-center pb-5">
      <h2 class="py-5">Stories</h2>
      <ul id="featured-stories-ul" class="d-flex align-content-center flex-wrap justify-content-around list-unstyled "></ul>
    </div>
    
  </section>
  <section id="hungry" class="position-relative">
    <div id="hungry-cover" class="text-center to-the-center">
      <h2 class="pb-3">Hungry?</h2>
      <a class="btn btn-success mx-3" href="http://localhost:3000/meals">Find a meal</a>
      <a class="btn btn-success mx-3" href="">Create a meal</a>
    </div>
  </section>
          `
}

homeRouter();
// const welcomeImg = document.querySelector('#welcome-img');
// console.log(welcomeImg);
// welcomeImg.src = "~assets/pasta.jpg";

function renderMeals () {
  fetch('http://localhost:3000/api/meals/')
  .then(resp => resp.json())
  .then(meal => {
    const featuredMealUl = document.querySelector('#featured-meals-ul');
    const mealsArray = meal;
    const displayMeals = [];
    mealsArray.filter(meal => {
      if (meal.title === 'Pizza' || meal.title === 'Penne' || meal.title === 'Pasta') {
        displayMeals.push(meal);
      }
    });
    displayMeals.forEach((meal) => {
      const featuredLi = document.createElement('li');
      featuredLi.classList.add("px-2");
      // featuredLi.classList.add("row");
      featuredLi.innerHTML = `<div class="card my-3 mx-2">
                                <img src="" alt="meal-img">
                                <div class="card-body">
                                  <h3 class="h4">${meal.title}</h3>
                                  <p>Location: ${meal.location}</p>
                                  <p>Date: ${meal.when}</p>
                                  <p>Price: ${meal.price}</p>
                                  <a href="http://localhost:3000/reviews/${meal.id}" class="btn btn-success">Book meal</a>
                                </div>
                              </div>

      `;
      featuredMealUl.appendChild(featuredLi);
    });
  });
}

function renderReviews () {
  fetch('http://localhost:3000/api/reviews/')
  .then(resp => resp.json())
  .then(review => {
    const featuredStoryUl = document.querySelector('#featured-stories-ul');
    review.length = 3;
    review.forEach((review) => {
      const featuredLi = document.createElement('li');
      featuredLi.classList.add("px-2");
      featuredLi.innerHTML = `<div>
                                  <a href="http://localhost:3000/reviews/${review.meal_id}" >
                                  <h4 class="text-dark">${review.title}</h4>
                                  <h5 class="text-dark">${review.description}</h5>
                                  <p class="text-dark">Stars:  ${review.stars}</p>
                                  </a>
                                </div>
                              `
      featuredStoryUl.appendChild(featuredLi);
    })
  })
}
{/* <a href='http://localhost:3000/review/${review.meal_id}">
</a> */}
renderMeals();
renderReviews();

export default homeRouter;
