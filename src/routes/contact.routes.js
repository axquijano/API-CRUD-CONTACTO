import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createContacto, deleteContacto, getAllContactos, getAllContactsWithTelephone, getContacto, updateContacto } from '../controllers/contact.controller.js';
const router = Router();


router.get('/contact', authRequired , getAllContactos);
router.get('/contact/phones', authRequired , getAllContactsWithTelephone);
router.get('/contact/:id', authRequired , getContacto);
router.post('/contact', authRequired, createContacto);
router.delete('/contact/:id', authRequired, deleteContacto);
router.put('contact', authRequired, updateContacto);


export default router;