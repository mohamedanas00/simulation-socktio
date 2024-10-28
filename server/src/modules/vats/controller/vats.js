import vatsModel from "../../../../db/model/vats.js";
import { onMessage } from "../../../utils/socketHandlers.js";


export const addVats = async (req, res) => {
  const { name, amount, tenant_id } = req.body;
  const vats = await vatsModel.create({ name, amount ,tenant_id});
  onMessage("vats", vats, "POST", tenant_id, null);
  res.status(200).json({ message: "Vats added successfully" });
};

export const deleteVats = async (req, res) => {
  const { id } = req.params;
  const vat = await vatsModel.findByIdAndDelete(id);
  onMessage("vats", vat, "DELETE", vat.tenant_id, null);
  res.status(200).json({ message: "Vats deleted successfully" });
};

export const updateVats = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;
  const vat = await vatsModel.findByIdAndUpdate(
    id,
    { name, amount },
    { new: true }
  );
  onMessage("vats", vat, "PUT", vat.tenant_id, null);
  res.status(200).json({ message: "Vats updated successfully" });
};
