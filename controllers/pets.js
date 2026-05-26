const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async(req,res) => {
    //swagger.tags=['pets']
    const result = await mongodb.getDatabase().db().collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type' , 'application/json');
        res.status(200).json(pets);
    });
};



const getSingle = async(req,res) => {
    //swagger.tags=['pets']
    const petId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('pets').find({_id: petId});
    result.toArray().then((pets) => {
        res.setHeader('Content-Type' , 'application/json');
        res.status(200).json(pets[0]);
    });
};


const createPet = async(req, res) =>{
    //swagger.tags=['pets']
    const pet ={
        petName: req.body.petName,
        petSpecie: req.body.petSpecie,
        petAge: req.body.petAge,
        petOwnerName: req.body.petOwnerName,
        petOwnerPhone: req.body.petOwnerPhone,
        weight: req.body.weight
    };
    const response = await mongodb.getDatabase().db().collection('pets').insertOne(pet);
    if (response.acknowledged >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating pet');
    }
};

const updatePet = async(req, res) =>{
    //swagger.tags=['pet']
    const petId = new ObjectId(req.params.id);
    const pet ={
        petName: req.body.petName,
        petSpecie: req.body.petSpecie,
        petAge: req.body.petAge,
        petOwnerName: req.body.petOwnerName,
        petOwnerPhone: req.body.petOwnerPhone,
        weight: req.body.weight
    };
    const response = await mongodb.getDatabase().db().collection('pets').replaceOne({ _id: petId}, pet);
    if (response.modifiedCount >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};


const deletePet = async(req, res) => {
    //swagger.tags=['pet']
    const petId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pets').deleteOne({ _id: petId});
    if (response.deletedCount >0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
}


module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};