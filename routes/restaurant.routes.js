// we need the restaurant controller 
const restaurantController = require('../controllers/restaurant.controller')

module.exports = (app)=>{
    app.post('/api/restaurant/add',restaurantController.addRestaurant);

    app.get('/api/restaurant',restaurantController.getRestaurants);

    app.get('/api/restaurant/categories',restaurantController.getCategories);

    app.get('/api/restaurant/categories/:categoryName',restaurantController.getParticularCategory);

    app.get('/api/restaurant/:id',restaurantController.getPlaceById);

    // app.get('/api/restaurant/rating/ratingValue',restaurantController.getPlaceByRating);



}

