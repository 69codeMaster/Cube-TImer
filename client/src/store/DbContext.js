"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDB = void 0;
const react_1 = __importStar(require("react"));
const apiUtils_1 = require("../utils/apiUtils");
const DbContext = (0, react_1.createContext)({
    solves: [],
    setSolves: () => { },
    averages: {},
    history: [],
    setAverages: () => { },
});
function useDB() {
    return (0, react_1.useContext)(DbContext);
}
exports.useDB = useDB;
function DbProvider({ children }) {
    const [solves, setSolves] = (0, react_1.useState)([]);
    const [history, setHistory] = (0, react_1.useState)([]);
    const [averages, setAverages] = (0, react_1.useState)({});
    // const [best, setBest] = useState();
    (0, react_1.useEffect)(() => {
        console.log("fetching from db");
        (0, apiUtils_1.fetchSolves)(15).then((res) => setSolves(res));
        (0, apiUtils_1.fetchAllHistoryRecords)().then((res) => {
            setHistory(res);
            setAverages(() => {
                return {
                    ao12: res[0].ao12,
                    ao5: res[0].ao5,
                };
            });
        });
        // fetchBest().then((res) => setBest(res));
    }, []);
    (0, react_1.useEffect)(() => {
        console.log("solves rerndered");
        console.log("");
        if (history.length && history[0].solve_id !== solves[0].solve_id)
            (0, apiUtils_1.fetchLastHistoryRecord)().then((lastHistoryRecord) => {
                setHistory((preHistory) => [lastHistoryRecord, ...preHistory]);
                setAverages(() => {
                    return {
                        ao12: lastHistoryRecord.ao5,
                        ao5: lastHistoryRecord.ao12,
                    };
                });
            });
    }, [solves]);
    const initlaValue = {
        solves: solves,
        setSolves: setSolves,
        averages: averages,
        setAverages: setAverages,
        history: history,
    };
    return (react_1.default.createElement(DbContext.Provider, { value: initlaValue },
        " ",
        children,
        " "));
}
exports.default = DbProvider;
