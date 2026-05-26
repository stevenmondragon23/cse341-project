const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/pets');


//GET METHODS
router.get('/' , contactsController.getAll);
router.get('/:id' , contactsController.getSingle);


//CREATE - UPDATE AND DELETE 
router.post('/', contactsController.createPet);
router.put('/:id', contactsController.updatePet);
router.delete('/:id', contactsController.deletePet);

module.exports = router;