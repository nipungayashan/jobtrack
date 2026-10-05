const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5000;
let applications = [];
let nextId = 1;

app.get("/", (req, res) => {
    res.send("JobTrack API is running!");
});

app.post("/api/applications", (req, res) => {
    const newApplication = {
        id: nextId++,
        company: req.body.company,
        position: req.body.position,
        status: req.body.status
    };

    applications.push(newApplication);

    res.status(201).json({
        message: "Application created successfully",
        application: newApplication
    });
});

app.get("/api/applications", (req, res) => {
    res.status(200).json(applications);
});


app.put("/api/applications/:id", (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(app => app.id === id);

    if (!application) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    application.company = req.body.company;
    application.position = req.body.position;
    application.status = req.body.status;

    res.status(200).json({
        message: "Application updated successfully",
        application: application
    });
});

app.delete("/api/applications/:id", (req, res) => {
    const id = Number(req.params.id);

    const applicationIndex = applications.findIndex(app => app.id === id);

    if (applicationIndex === -1) {
        return res.status(404).json({
            message: "Application not found"
        });
    }

    const deletedApplication = applications.splice(applicationIndex, 1);

    res.status(200).json({
        message: "Application deleted successfully",
        application: deletedApplication[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});