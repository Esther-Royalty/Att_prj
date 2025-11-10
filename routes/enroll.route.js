import { Router } from "express";
import { autoMarkabsence, EnrollUser, markAttendance } from "../controller/enroll.controller.js";


const enrollRouter = Router();

enrollRouter.post('/enroll', EnrollUser);
enrollRouter.post('/mark', markAttendance)
// enrollRouter.post('/absent', autoMarkabsence)

export default enrollRouter;