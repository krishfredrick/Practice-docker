"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const db = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const data = yield db.tODO.findMany();
        res.status(200).json({
            message: "Success",
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed!",
            error: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : " You screwd up man",
        });
    }
    finally {
        next();
    }
}));
app.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const message = (_c = req.body) === null || _c === void 0 ? void 0 : _c.message;
    try {
        const data = yield db.tODO.create({
            data: {
                message,
            },
        });
        res.status(200).json({
            message: "The todo has created",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed",
            error: (_d = error === null || error === void 0 ? void 0 : error.message) !== null && _d !== void 0 ? _d : "You screwed up please try again",
        });
    }
    finally {
        next();
    }
}));
app.use(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.$disconnect();
        return res;
    });
});
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4020;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db.$connect().then(() => console.log("DB is connected"));
        app.listen(port, () => {
            console.log(`app is listening on the port ${port}`);
        });
    }
    catch (error) { }
}))();
