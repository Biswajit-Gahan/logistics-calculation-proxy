const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.json());

const baseUrl = "http://3.109.236.90";
const getAllVehicleEndpoint = "/rhl/get/all/vehicle/details";
const saveCalculationHistoryEndpoint = "/rhl/calculation/history";

router.get("/test", (req, res) => res.send("Working!"));

router.get("/all-vehicles", async (req, res) => {
    try {
        const response = await fetch(baseUrl + getAllVehicleEndpoint);
        const data = await response.json();
        return res.status(data.statusCode).json(data);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
})

router.post("/save-history", async (req, res) => {
    try {
        const body = req.body;
        const response = await fetch(baseUrl + saveCalculationHistoryEndpoint, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        return res.status(data.statusCode).json(data);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
})

app.use("/api/", router);

module.exports.handler = serverless(app);