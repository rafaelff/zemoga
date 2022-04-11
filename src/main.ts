import * as dotenv from "dotenv";
import express from "express";
import 'express-async-errors';
import {PortfolioController} from "./controllers/portfolioController";
import {TwitterController} from "./controllers/twitterController";
const app = express();

dotenv.config();
app.use(express.json());

app.get("/listTables", async (req, res) => {
  const portfolioController = new PortfolioController();
  const result = await portfolioController.listTables();
  res.send(result);
});

app.get("/portfolio/:username", async (req, res) => {
  const portfolioController = new PortfolioController();
  const result = await portfolioController.getItem(req.params.username);
  res.send(result);
});

app.put("/portfolio", async (req, res) => {
  const portfolioController = new PortfolioController();
  await portfolioController.insertItem(req.body);
  res.status(201);
  res.send("Record created");
});

app.post("/portfolio/:username", async (req, res) => {
  const portfolioController = new PortfolioController();
  const userData = {
    ...req.body,
    username: req.params.username
  };
  await portfolioController.updateItem(userData);
  res.send("Record updated");
});

app.delete("/portfolio/:username", async (req, res) => {
  const portfolioController = new PortfolioController();
  await portfolioController.deleteItem(req.params.username);
  res.send("Record removed");
});

app.get("/twitter/:username", async (req, res) => {
  const twitterController = new TwitterController();
  const result = await twitterController.getTweetsFromUser(req.params.username);
  res.send(result);
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message || err);
});

app.listen(3000);
