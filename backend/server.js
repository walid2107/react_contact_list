const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());
//partie mongo
const mongoUrl = "mongodb://localhost:27017";
const dataBase = "contactList";

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "database connexion failed");
  const db = client.db(dataBase);
  //Post method
  app.post("/add_contact", (req, res) => {
    let newContact = req.body;
    db.collection("contactList").insertOne(newContact, (err, data) => {
      if (err) res.send("contact can not be added");
      else res.send("New contact has been added");
    });
  });
  // Get method
  app.get("/contacts", (req, res) => {
    db.collection("contactList")
      .find()
      .toArray((err, data) => {
        if (err) res.send("can not get contact list");
        else res.send(data);
      });
  });
  // Get method
  app.get("/contact/:id", (req, res) => {
    let contactID = ObjectID(req.params.id);
    db.collection("contactList").findOne({ _id: contactID }, (err, data) => {
      if (err) res.send("can not get contact");
      else res.send(data);
    });
  });

  // Put method
  app.put("/modify_contact/:id", (req, res) => {
    let contactID = ObjectID(req.params.id);
    db.collection("contactList").findOneAndReplace(
      { _id: contactID },
      { ...req.body },
      (err, data) => {
        if (err) res.send("can not modify contact");
        else res.send("contact has been modified");
      }
    );
  });

  // Delete method
  app.delete("/delete_contact/:id", (req, res) => {
    let contactID = ObjectID(req.params.id);
    db.collection("contactList").deleteOne({ _id: contactID }, (err, data) => {
      if (err) res.send("can not delete contact");
      else res.send("Contact has been removed");
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) console.log("erreur server");
  else console.log(`Server  is running on port ${port}`);
});
