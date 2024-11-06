import { Router } from "express";
import {
  testMPController,
  preferencesMp,
  /* feedbackMp, */
} from "../controllers/mpController.js";
const router = Router();

router.get("/code", testMPController);
router.post("/create_preference", preferencesMp);

// El id tiene que ser el email con el que empezo a crear el user

/* router.post("/feedback/", feedbackMp);
 */
export default router;
