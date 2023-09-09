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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databasepg_js_1 = require("./databasepg.js");
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
app.post("/insertSolve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.addSolveToDB)(req.body);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
// no longer in use
app.get("/averageOf:num", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.getAvergaeOf)(req.params.num);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.get("/bestSolve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.getBestSolve)();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.get("/solves:num", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.getSolves)(req.params.num);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.get("/allHistory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.getAllHistory)();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.get("/lastHistory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.getLastHistoryRecord)();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.delete("/deleteSolve:solve_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, databasepg_js_1.deleteSolve)(req.params.solve_id);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
}));
app.listen(5000, () => console.log("server strated at port 5000"));
