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
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const userServices_1 = __importDefault(require("./services/userServices"));
//init functio for graphqlserver
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 8080;
        app.use(express_1.default.json());
        app.get("/", (req, res) => {
            res.json({ message: "Server is up and running..." });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)(), {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                var _b;
                const userToken = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization;
                try {
                    const user = userServices_1.default.decodeJwtToken(userToken);
                    return { user };
                }
                catch (error) {
                    return {};
                }
            })
        }));
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
init();
