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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSolve = exports.fetchLastHistoryRecord = exports.fetchAllHistoryRecords = exports.fetchSolves = exports.fetchBest = exports.fetchAverage = exports.insertSolve = void 0;
const messagesUtil_1 = require("./messagesUtil");
const insertSolve = (scramble, time) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.stringify({
        scramble: scramble,
        time: time,
    });
    // ! this should be remove in production only here for convinient testing
    if (time < 500)
        (0, messagesUtil_1.NotInsertedToDb)("solve wasn't inserted to DB");
    else {
        try {
            yield fetch("/insertSolve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }
});
exports.insertSolve = insertSolve;
const fetchAverage = (averageOf) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`./averageOf${averageOf}`);
    const average = yield data.json();
    console.log("fecthed average");
    return average;
});
exports.fetchAverage = fetchAverage;
const fetchBest = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`./bestSolve`);
    const pb = yield data.json();
    return pb;
});
exports.fetchBest = fetchBest;
const fetchSolves = (numberOfSolves) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`./solves${numberOfSolves}`);
    const solves = yield data.json();
    return solves;
});
exports.fetchSolves = fetchSolves;
const fetchAllHistoryRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`./allHistory`);
    const history = yield data.json();
    return history;
});
exports.fetchAllHistoryRecords = fetchAllHistoryRecords;
const fetchLastHistoryRecord = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`./lastHistory`);
    const lastHistory = yield data.json();
    return lastHistory;
});
exports.fetchLastHistoryRecord = fetchLastHistoryRecord;
const deleteSolve = (solveToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fetch(`/deleteSolve${solveToDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deleteSolve = deleteSolve;
