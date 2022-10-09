//we need the restaurant model here
const Restaurant = require('../models/restaurant.model')

//read restaurant data from the req body
exports.addRestaurant = async (req,res)=>{

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

exports.getPlaceById = async (req,res)=>{
    const idObj = req.params.id;
}
