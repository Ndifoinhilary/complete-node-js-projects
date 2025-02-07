import { model, Schema } from "mongoose";

const CustomerSchema = Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 20,
    unique: true,
  },
});

const Customer = model("Customer", CustomerSchema);

export default Customer;
