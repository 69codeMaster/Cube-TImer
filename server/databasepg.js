"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastHistoryRecord =
  exports.getAllHistory =
  exports.getAvergaeOf =
  exports.getBestSolve =
  exports.getSolves =
  exports.addSolveToDB =
    void 0;
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
    const query =
      'INSERT INTO main_schema.solves(scramble, "time", date) VALUES ($1, $2,CURRENT_DATE) RETURNING *';
    const values = [scramble, time];
    return yield pool.query(query, values);
  });
}
exports.addSolveToDB = addSolveToDB;
function getSolves(numberOfSolves = 15) {
  return __awaiter(this, void 0, void 0, function* () {
    const query = ` SELECT time
                  FROM main_schema.solves
                  ORDER BY solve_id DESC  
                  LIMIT $1`;
    const values = [numberOfSolves];
    const result = yield pool.query(query, values);
    return result.rows;
  });
}
exports.getSolves = getSolves;
function getBestSolve() {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    const query = `SELECT *
                 FROM main_schema.solves
                 ORDER BY time ASC
                 LIMIT 1;`;
    const result = yield pool.query(query);
    return (_a =
      result === null || result === void 0 ? void 0 : result.rows[0]) !==
      null && _a !== void 0
      ? _a
      : null;
  });
}
exports.getBestSolve = getBestSolve;
function getAvergaeOf(numberOfSolves) {
  return __awaiter(this, void 0, void 0, function* () {
    const query = `SELECT count(*) AS num_of_rows, (SUM(time) - MIN(time) - MAX(time)) AS average
                  FROM (SELECT time, solve_id
                        FROM main_schema.solves
                        order by solve_id desc
                        LIMIT $1
                        ) as avg_table;`;
    const values = [numberOfSolves];
    const result = yield pool.query(query, values);
    if (+result.rows[0].num_of_rows < numberOfSolves) return "Nan";
    return +result.rows[0].average / (numberOfSolves - 2);
  });
}
exports.getAvergaeOf = getAvergaeOf;
function getAllHistory() {
  return __awaiter(this, void 0, void 0, function* () {
    const query = `SELECT solve_id, time, ao5, ao12
                  FROM history_schema.history
                  ORDER BY solve_id DESC;`;
    const result = yield pool.query(query);
    return result.rows;
  });
}
exports.getAllHistory = getAllHistory;
function getLastHistoryRecord() {
  return __awaiter(this, void 0, void 0, function* () {
    const query = `SELECT solve_id, time, ao5, ao12
                  FROM history_schema.history
                  ORDER BY solve_id DESC
                  LIMIT 1;`;
    const result = yield pool.query(query);
    return result.rows[0];
  });
}
exports.getLastHistoryRecord = getLastHistoryRecord;
