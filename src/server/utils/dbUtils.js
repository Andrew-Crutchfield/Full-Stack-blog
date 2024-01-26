"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const db_1 = __importDefault(require("../config/db")); // Ensure this path is correct
async function executeQuery(sql) {
    try {
        const [results] = await db_1.default.execute(sql);
        return results;
    }
    catch (error) {
        console.error('Error executing query:', error);
        throw error; // Re-throw to be handled in the route
    }
}
exports.executeQuery = executeQuery;
//# sourceMappingURL=dbUtils.js.map