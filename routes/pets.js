const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/pets');


// =====================================================
// GET ALL PETS
// =====================================================

router.get(
    '/',
    /*
        #swagger.tags = ['pets']

        #swagger.responses[200] = {
            description: 'Pets retrieved successfully'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    contactsController.getAll
);


// =====================================================
// GET SINGLE PET
// =====================================================

router.get(
    '/:id',
    /*
        #swagger.tags = ['pets']

        #swagger.responses[200] = {
            description: 'Pet retrieved successfully'
        }

        #swagger.responses[404] = {
            description: 'Pet not found'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    contactsController.getSingle
);


// =====================================================
// CREATE PET
// =====================================================

router.post(
    '/',
    /*
        #swagger.tags = ['pets']

        #swagger.responses[201] = {
            description: 'Pet created successfully'
        }

        #swagger.responses[400] = {
            description: 'Please provide all required fields'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    contactsController.createPet
);


// =====================================================
// UPDATE PET
// =====================================================

router.put(
    '/:id',
    /*
        #swagger.tags = ['pets']

        #swagger.responses[204] = {
            description: 'Pet updated successfully'
        }

        #swagger.responses[400] = {
            description: 'Please provide all required fields'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    contactsController.updatePet
);


// =====================================================
// DELETE PET
// =====================================================

router.delete(
    '/:id',
    /*
        #swagger.tags = ['pets']

        #swagger.responses[204] = {
            description: 'Pet deleted successfully'
        }

        #swagger.responses[500] = {
            description: 'Internal server error'
        }
    */
    contactsController.deletePet
);


module.exports = router;