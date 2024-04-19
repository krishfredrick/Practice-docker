import express, { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();
const db = new PrismaClient();

app.use(express.json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await db.tODO.findMany();
    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed!",
      error: error?.message ?? " You screwd up man",
    });
  } finally {
    next();
  }
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const message = req.body?.message;
  try {
    const data = await db.tODO.create({
      data: {
        message,
      },
    });
    res.status(200).json({
      message: "The todo has created",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed",
      error: error?.message ?? "You screwed up please try again",
    });
  } finally {
    next();
  }
});

app.use(async function (req, res) {
  await db.$disconnect();
  return res;
});

const port = process.env.PORT ?? 4020;

(async () => {
  try {
    db.$connect().then(()=> console.log("DB is connected"));
    app.listen(port, () => {
      console.log(`app is listening on the port ${port}`);
    });
  } catch (error) {}
})();
