const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customersAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customersAlreadyExist) {
    return res.status(400).json({ error: "Customer already exists" });
  }

  customers.push({
    cpf,
    name,
    id: uuid(),
    statement: [],
  });

  return res.status(201).send();
});

app.listen(3333, () => console.log("Server is running in port 3333"));