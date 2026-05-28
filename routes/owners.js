const express = require('express');

const router = express.Router();

const ownersController = require('../controllers/owners');


// =====================================================
// GET ALL OWNERS
// =====================================================

router.get(
    '/',
    /*
        #swagger.tags = ['owners']

        #swagger.responses[200] = {
            description: 'Owners retrieved successfully'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    ownersController.getAll
);


// =====================================================
// GET SINGLE OWNER
// =====================================================

router.get(
    '/:id',
    /*
        #swagger.tags = ['owners']

        #swagger.responses[200] = {
            description: 'Owner retrieved successfully'
        }

        #swagger.responses[404] = {
            description: 'Owner not found'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    ownersController.getSingle
);


// =====================================================
// CREATE OWNER
// =====================================================

router.post(
    '/',
    /*
        #swagger.tags = ['owners']

        #swagger.responses[201] = {
            description: 'Owner created successfully'
        }

        #swagger.responses[400] = {
            description: 'Please provide all required fields'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    ownersController.createOwner
);


// =====================================================
// UPDATE OWNER
// =====================================================

router.put(
    '/:id',
    /*
        #swagger.tags = ['owners']

        #swagger.responses[204] = {
            description: 'Owner updated successfully'
        }

        #swagger.responses[400] = {
            description: 'Please provide all required fields'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    ownersController.updateOwner
);


// =====================================================
// DELETE OWNER
// =====================================================

router.delete(
    '/:id',
    /*
        #swagger.tags = ['owners']

        #swagger.responses[204] = {
            description: 'Owner deleted successfully'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    ownersController.deleteOwner
);


module.exports = router;