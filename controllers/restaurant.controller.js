//we need the restaurant model here
const Restaurant = require('../models/restaurant.model')

//read restaurant data from the req body

exports.addRestaurant = async (req,res)=>{
    if(!req.body.name && !req.body.description && !req.body.category && !req.body.imageURL && !req.body.location && !req.body.phone && !req.body.rating ){
        return res.status(400).send({
            message : "Content cannot be empty"
        })
    }

    const newRestaurant = {
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        imageURL : req.body.imageURL,
        location : req.body.location,
        phone : req.body.phone,
        rating : req.body.rating
    };

    try{
        const restaurant = await Restaurant.create(newRestaurant);

        const restResp = {
        name : restaurant.name,
        description : restaurant.description,
        category : restaurant.category,
        imageURL : restaurant.imageURL,
        location : restaurant.location,
        phone : restaurant.phone,
        rating : restaurant.rating,
        createdAt : restaurant.createdAt,
        updatedAt : restaurant.updatedAt,
        __v : restaurant.__v
        }
        return res.status(200).send(restResp);
    }catch(err){
        console.log("Error occurred",err.message);
        return res.status(500).send({
            message : "Some error occurred while creating the Restaurant"
        })
    }
}

// function to get all the restaurants

exports.getRestaurants = async (req,res)=>{
    try{
    const objResult = await Restaurant.find({});
    if(!objResult){
        return res.status(200).send({
            restaurants : [],
            message : "Restaurants fetched successfully."
        })
    }
    return res.status(200).send({
        restaurants : objResult,
        message : "Restaurants fetched successfully."
    });
    } catch (err) {
        console.log("Error while fetching all the Restaurants ", err.message);
        return res.status(500).send({
            message : "Some error occured while fetching the Restaurants."
        })
    }
}

// function to get categories of restaurants 

exports.getCategories = async (req,res)=>{
    try{
    const listOfCategories = await Restaurant.distinct("category");
    return res.status(200).send(listOfCategories);
    }catch(err){
        console.log("Error while fetching Restaurant categories", err.message);
        return res.status(500).send({
            message : "Some error occurred while fetching Categories"
        })
    }
    
}

// function to get restaurant by category name

exports.getParticularCategory = async (req,res)=>{
    try{        
        // get the required category name
        const reqCategory = req.params.categoryName;
        // get the list of available category names
        const listOfCat = await Restaurant.distinct("category");
        // find if there is a matching category from the above list
        var z = "";
        for(let a in listOfCat){
            if(listOfCat[a].toLowerCase()===reqCategory){
                z = listOfCat[a];
            }
        }
        // find all the documents for the req category
        const particularCategory = await Restaurant.find({category:z});
        return res.status(200).send(particularCategory);

    }catch(err){
        console.log("Error while fetching the restaurant", err.message);
        return res.status(500).send({
            message : "Some error occured while fetching the Restaurant."
        })
    }
}

//function to return restaurant based on ID

exports.getPlaceById = async (req,res)=>{
    try{
    const idObj = req.params.id;
    const resObj = await Restaurant.findById(idObj);
    if(!resObj){
        return  res.status(404).send({
            message : "No Restaurant found with the given ID"
        })
    }
    else{
        return res.status(200).send(resObj);
    }}catch(err){
        console.log("Error while fetching the restaurant", err.message);
        return res.status(404).send({
            message : "No Restaurant found with the given ID"
        })
    }
}

//function to return list of restaurants based on rating

exports.getPlaceByRating = async (req,res)=>{
    try{
        const ratingObj = req.params.ratingValue;
        const objWithRating = await Restaurant.find({"rating":{$gte : ratingObj}});
        return res.status(200).send({
            restaurants : objWithRating,
            message : "Restaurants fetched successfully."
        });
        } catch (err) {
            console.log("Error while fetching all the Restaurants ", err.message);
            return res.status(500).send({
                message : "Some error occured while fetching the Restaurant."
            })
        }

}

//function to update a restaurant based on id

exports.updateRestaurant = async (req,res)=>{
    if(!req.body.name && !req.body.description && !req.body.category && !req.body.imageURL && !req.body.location && !req.body.phone && !req.body.rating ){
        return res.status(400).send({
            message : "Restaurant Data is required."
        })
    }
    const updateId = {_id : req.params.id};
    const updateBody = {
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        imageURL : req.body.imageURL,
        location : req.body.location,
        phone : req.body.phone,
        rating : req.body.rating
    }
    const finale = await Restaurant.findOneAndUpdate(updateId,updateBody);
    if(!finale){
        return res.status(200).send({
            message : "No restaurant found for given ID"
        })
    }
    else{
        return res.status(200).send({
            message : "Restaurant updated Successfully."
        })
    }
};

//function to delete restaurant based on ID

exports.deleteById =async (req,res)=>{
    try {
        const toBeDeleted = req.params.id;
        const targetObj = await Restaurant.findByIdAndDelete(toBeDeleted.toString());
            res.status(200).send({
                restaurants : targetObj,
                message : "Restaurant deleted successfully."
            })       
        
        
    } catch (err) {
        console.log("Error while fetching all the Restaurants ", err.message);
        return res.status(500).send({
            message : "Some error occured while deleting the Restaurant."
        })
    }
    
};

//function to delete all the restaurants

exports.deleteAll =async (req,res)=>{
    try{
        const deletedCount = await Restaurant.deleteMany();
        return res.status(200).send({
            restaurants : deletedCount,
            message : "Restaurants deleted successfully"
        })

    }catch (err) {
            console.log("Error while fetching all the Restaurants ", err.message);
            return res.status(500).send({
                message : "Some error occured while deleting the Restaurant."
            })
        }
    
};