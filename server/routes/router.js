"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var schemaController_1 = __importDefault(require("../controllers/schemaController"));
var router = express_1.default.Router();
// Possibly add route for storing users previous login credentials or URIs?
router.post('/getQueryResults', schemaController_1.default.connectDb, schemaController_1.default.getQueryResults, function (req, res) {
    res.status(200).json(res.locals.queryResults);
});
router.post('/getSchema', schemaController_1.default.connectDb, schemaController_1.default.getSchemaPostgreSQL, function (req, res) {
    res.status(200).json(res.locals.erDiagram);
});
router.delete('/', function (req, res, next) { });
exports.default = router;
