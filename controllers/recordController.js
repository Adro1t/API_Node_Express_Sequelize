const db = require("../models");

//create Main model
const Record = db.records;

//create record
const addRecord = async (req, res) => {
  try {
    // Extract user input from the request body
    let info = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
    };

    // Check if a record with the same name or email already exists
    const recordByName = await Record.findOne({ where: { name: info.name } });
    const recordByEmail = await Record.findOne({ where: { email: info.email } });

    if (recordByName) {
      return res.status(400).json({ error: "Username already used" });
    }

    if (recordByEmail) {
      return res.status(400).json({ error: "Email already used" });
    }
    // Create a new record in the database
    const record = await Record.create(info);

    // Send a success response with the newly created record
    res.status(200).send(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//retreive list of all records
const recordList = async (req, res) => {
  try {
    let records = await Record.findAll({});
    res.status(200).send(records);
  } catch (error) {
    res.status(400).json({ error: "failed to fetch records" });
  }
};

//get single record by id
const singleRecord = async (req, res) => {
  try {
    let id = req.params.id;

    let record = await findRecordById(id);

    if (!record) {
      return res.status(400).json({ error: "failed to find record" });
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update Record by id
const updateRecord = async (req, res) => {
  try {
    let id = req.params.id;

    let record = await findRecordById(id);

    if (!record) {
      return res.status(400).json({ error: "failed to find record" });
    }

    await Record.update(req.body, { where: { id: id } });

    //shows the new updated record
    const newRecord = findRecordById(id);
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message + " || failed to update" });
  }
};

//delete Record by id
const deleteRecord = async (req, res) => {
  try {
    let id = req.params.id;

    let record = findRecordById(id);

    if (!record) {
      return res.status(400).json({ error: "no record found" });
    }
    await Record.destroy({ where: { id: id } });
    res.status(200).send({ message: "delete successful" });
  } catch (error) {
    res.status(400).json({ error: "failed to delete record" });
  }
};

//find record by its id
const findRecordById = async (id) => {
  return Record.findOne({ where: { id: id } });
};

module.exports = {
  addRecord,
  recordList,
  singleRecord,
  updateRecord,
  deleteRecord,
  findRecordById,
};
