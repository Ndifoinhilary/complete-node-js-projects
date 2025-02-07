import express from "express";
import Customer from "../models/customers_db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  // get all customers from the db
  try {
    const customers = await Customer.find({});
    res.json(customers).status(200);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
    console.log(err);
  }
});

router.post("/create/", async (req, res) => {
  // creating a new customer
  try {
    let customer = new Customer(req.body);
    customer = await customer.save();
    res.json(customer).status(200);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
    console.log(error);
  }
});

router.get("/:id/detail", async (req, res) => {
  // get a customer with id
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send({ msg: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
    console.log(error);
  }
});

router.put("/:id/update", async (req, res) => {
  // updating a customer
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).send({ msg: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
    console.log(error);
  }
});

router.delete("/:id/delete", async (req, res) => {
  // deleting a customer

  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).send({ msg: "Customer not found" });
    }
    res.send({ msg: "Customer deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
    console.log(error);
  }
});

export default router;
