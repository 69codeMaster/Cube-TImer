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
exports.getAvergaeOf = exports.getBestSolve = exports.getSolves = exports.addSolveToDB = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "postgres",
    port: 5432,
    password: "yoav1234",
});
function addSolveToDB({ scramble, time }) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO solves(scramble, "time", date) VALUES ($1, $2,CURRENT_DATE) RETURNING *';
        const values = [scramble, time];
        return yield pool.query(query, values);
    });
}
exports.addSolveToDB = addSolveToDB;
function getSolves(numberOfSolves = 15) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = ` SELECT time
                  FROM solves
                  ORDER BY solve_id
                  LIMIT $1`;
        const values = [numberOfSolves];
        const result = yield pool.query(query, values);
        return result;
    });
}
exports.getSolves = getSolves;
function getBestSolve() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT *
                 FROM solves
                 ORDER BY time ASC
                 LIMIT 1;`;
        const result = yield pool.query(query);
        if (!result)
            return "Nan";
        return (_a = result.rows[0]) !== null && _a !== void 0 ? _a : [];
    });
}
exports.getBestSolve = getBestSolve;
function getAvergaeOf(numberOfSolves) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT count(*) AS num_of_rows, (SUM(time) - MIN(time) - MAX(time)) AS average
                  FROM (SELECT time, solve_id
                        FROM solves
                        order by solve_id desc
                        LIMIT $1
                        ) as avg_table;`;
        const values = [numberOfSolves];
        const result = yield pool.query(query, values);
        if (+result.rows[0].num_of_rows < numberOfSolves)
            return "Nan";
        return +result.rows[0].average / (numberOfSolves - 2);
    });
}
exports.getAvergaeOf = getAvergaeOf;
