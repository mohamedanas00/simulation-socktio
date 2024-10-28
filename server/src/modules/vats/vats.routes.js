import { Router } from "express";
import * as vatsController from "./controller/vats.js";

const vatsRouter = Router();

vatsRouter.delete("/:id", vatsController.deleteVats);
vatsRouter.put("/:id", vatsController.updateVats);
vatsRouter.route("/").post(vatsController.addVats);

export default vatsRouter;
