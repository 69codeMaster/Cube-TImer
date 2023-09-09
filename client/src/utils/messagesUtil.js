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
exports.DelteSolveAlert = exports.NotInsertedToDb = void 0;
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const sweetalert2_react_content_1 = __importDefault(require("sweetalert2-react-content"));
require("./swal.css");
const MySwal = (0, sweetalert2_react_content_1.default)(sweetalert2_1.default);
function NotInsertedToDb(message) {
    return __awaiter(this, void 0, void 0, function* () {
        // swal.fire({
        //   customClass: "swal",
        //   title: "Oops finished early again?",
        //   text: message,
        //   icon: "warning",
        //   confirmButtonText: "😔",
        //   allowEnterKey: false,
        // });
        alert("solve was not inserted to DB");
    });
}
exports.NotInsertedToDb = NotInsertedToDb;
function DelteSolveAlert(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield MySwal.fire({
            icon: "warning",
            iconColor: "#05386b",
            text: "you suck that much hah?",
            title: message,
            confirmButtonText: "yes",
            confirmButtonColor: "#8ee4af",
            denyButtonColor: "#05386b",
            denyButtonText: "no",
            showDenyButton: true,
        });
        return result.isConfirmed;
    });
}
exports.DelteSolveAlert = DelteSolveAlert;
