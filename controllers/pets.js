const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async(req,res) => {
    //swagger.tags=['pets']
    
    try{
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('pets')
        .find();



        const pets = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    


    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};


//_____________________________________________________________







const getSingle = async(req,res) => {
    //swagger.tags=['pets']

    try{

    
    const petId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('pets')
        .find({_id: petId});


        const pets = await result.toArray();

        if (!pets[0]) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0]);



    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};


//------------------------------


const createPet = async (req, res) => {
    //swagger.tags=['pets']

    try {

        const pet = {
            petName: req.body.petName,
            petSpecie: req.body.petSpecie,
            petAge: req.body.petAge,
            petOwnerName: req.body.petOwnerName,
            petOwnerPhone: req.body.petOwnerPhone,
            weight: req.body.weight
        };

        // VALIDATION
        if (
            !pet.petName ||
            !pet.petSpecie ||
            !pet.petAge ||
            !pet.petOwnerName ||
            !pet.petOwnerPhone ||
            !pet.weight
        ) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .insertOne(pet);

        if (response.acknowledged) {

            res.status(201).json({
                message: 'Pet created successfully'
            });

        } else {

            res.status(500).json({
                message: 'Some error occurred while creating pet'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


//---------------------------------------------


const updatePet = async (req, res) => {
    //swagger.tags=['pets']

    try {

        const petId = new ObjectId(req.params.id);

        const pet = {
            petName: req.body.petName,
            petSpecie: req.body.petSpecie,
            petAge: req.body.petAge,
            petOwnerName: req.body.petOwnerName,
            petOwnerPhone: req.body.petOwnerPhone,
            weight: req.body.weight
        };

        // VALIDATION
        if (
            !pet.petName ||
            !pet.petSpecie ||
            !pet.petAge ||
            !pet.petOwnerName ||
            !pet.petOwnerPhone ||
            !pet.weight
        ) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .replaceOne({ _id: petId }, pet);

        if (response.modifiedCount > 0) {

            res.status(204).send();

        } else {

            res.status(500).json({
                message: 'Some error occurred while updating pet'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


//-----------------------------------------

const deletePet = async (req, res) => {
    //swagger.tags=['pets']

    try {

        const petId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .deleteOne({ _id: petId });

        if (response.deletedCount > 0) {

            res.status(204).send();

        } else {

            res.status(500).json({
                message: 'Some error occurred while deleting pet'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//----------------------------------------------------------------------------


module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};