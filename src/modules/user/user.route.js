import express from 'express';

import { authMiddleware, authorize } from '../../middleware/authMiddleware.js';
import { getAllUsers, getSingleUser, getUserProfile } from './user.controller.js';

const router = express.Router();


router.get("/me", authMiddleware, authorize(...["user", "admin"]), getUserProfile)

router.get('/:id', authMiddleware, authorize("user"), getSingleUser);
router.get('/', authMiddleware, authorize("admin"), getAllUsers);
export default router