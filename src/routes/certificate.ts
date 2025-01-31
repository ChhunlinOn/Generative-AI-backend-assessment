import { Router } from 'express';
import protectRoute from '../middleware/auth';
import { RoleEnum, RoleType } from '../common';
import { createcertificate,getcertificatebyid,deletecertificatebyid } from '../controllers/certificate.controller';
const router = Router();


router.post("/create", protectRoute([RoleEnum[2]]),createcertificate);
// router.get("/:userId", protectRoute(), getcertificatebyuserid);
router.get("/:id",protectRoute,getcertificatebyid,getcertificatebyid);
router.delete("/:id",protectRoute,deletecertificatebyid);

//api/certificate/:userId

export default router;