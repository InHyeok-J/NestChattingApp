"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const userRepository_1 = require("../repository/userRepository");
const chatRepository_1 = require("./../repository/chatRepository");
const prisma_module_1 = require("./../prisma/prisma.module");
const chats_gateway_1 = require("./chats.gateway");
const common_1 = require("@nestjs/common");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    common_1.Module({
        imports: [prisma_module_1.PrismaModule],
        providers: [chats_gateway_1.ChatsGateway, chatRepository_1.ChatRepository, userRepository_1.UserRepository],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map