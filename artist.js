const router = require("express").Router();

const { SchemaTypeOptions } = require("mongoose");
//our artis model
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
    const newArtist = artist(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        }
    );

    try {
        const saveArtist = await newArtist.save();
        return res.status(200).send({ success: true, artist: saveArtist });
    }
    catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});


router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await artist.findOne(filter);

    if (data) {
        return res.status(200).send({ success: true, artist: data });
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});

router.get("/getAll", async (req, res) => {

    try {
        const data = await artist.find({}).sort({ createdAt: 1 });
        return res.status(200).send({ success: true, artist: data });
    }
    catch (error) {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});


router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await artist.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
            },
            options
        );

        return res.status(200).send({ success: true, data: result });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }

});


router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await artist.deleteOne(filter);

    if (result) {
        return res.status(200).send({ success: true, msg: "Data Deleted successfully" });
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});


module.exports = router;