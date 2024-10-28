import promotionModel from "../../../../db/model/promotion.js";
import { onMessage } from "../../../utils/socketHandlers.js";

export const addPromotions = async (req, res) => {
  const { name, amount, branchId, tenant_id } = req.body;
  const promotions = await promotionModel.create({
    name,
    amount,
    branchId,
    tenant_id,
  });
  onMessage("promotion", promotions, "POST", tenant_id, branchId);
  res.status(200).json({ message: "Promotion added successfully" });
};
