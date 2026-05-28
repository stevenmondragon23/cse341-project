const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// =====================================================
// GET ALL OWNERS
// =====================================================

const getAll = async(req,res) => {
    //swagger.tags=['owners']
    
    try {

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('owners')
            .find();

        const owners = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// =====================================================
// GET SINGLE OWNER
// =====================================================

const getSingle = async(req,res) => {
    //swagger.tags=['owners']

    try {

        const ownerId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('owners')
            .find({ _id: ownerId });

        const owners = await result.toArray();

        if (!owners[0]) {

            return res.status(404).json({
                message: 'Owner not found'
            });

        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(owners[0]);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// =====================================================
// CREATE OWNER
// =====================================================

const createOwner = async (req, res) => {
    //swagger.tags=['owners']

    try {

        const owner = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            petsQuantity: req.body.petsQuantity
        };

        // VALIDATION
        if (
            !owner.firstName ||
            !owner.lastName ||
            !owner.phone ||
            !owner.email ||
            !owner.city ||
            !owner.petsQuantity
        ) {

            return res.status(400).json({
                message: 'Please provide all required fields'
            });

        }

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('owners')
            .insertOne(owner);

        if (response.acknowledged) {

            res.status(201).json({
                message: 'Owner created successfully'
            });

        } else {

            res.status(500).json({
                message: 'Some error occurred while creating owner'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// =====================================================
// UPDATE OWNER
// =====================================================

const updateOwner = async (req, res) => {
    //swagger.tags=['owners']

    try {

        const ownerId = new ObjectId(req.params.id);

        const owner = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            petsQuantity: req.body.petsQuantity
        };

        // VALIDATION
        if (
            !owner.firstName ||
            !owner.lastName ||
            !owner.phone ||
            !owner.email ||
            !owner.city ||
            !owner.petsQuantity
        ) {

            return res.status(400).json({
                message: 'Please provide all required fields'
            });

        }

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('owners')
            .replaceOne({ _id: ownerId }, owner);

        if (response.modifiedCount > 0) {

            res.status(204).send();

        } else {

            res.status(500).json({
                message: 'Some error occurred while updating owner'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// =====================================================
// DELETE OWNER
// =====================================================

const deleteOwner = async (req, res) => {
    //swagger.tags=['owners']

    try {

        const ownerId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('owners')
            .deleteOne({ _id: ownerId });

        if (response.deletedCount > 0) {

            res.status(204).send();

        } else {

            res.status(500).json({
                message: 'Some error occurred while deleting owner'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// =====================================================

module.exports = {
    getAll,
    getSingle,
    createOwner,
    updateOwner,
    deleteOwner
};