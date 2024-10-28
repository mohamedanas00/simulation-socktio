import { Router } from "express";
import * as promotionController from "./controller/promotions.js";

const promotionRouter = Router();

// promotionRouter.delete("/:id", promotionController.deleteVats);
// promotionRouter.put("/:id", promotionController.updateVats);
promotionRouter
  .route("/").post(promotionController.addPromotions)



export default promotionRouter;
