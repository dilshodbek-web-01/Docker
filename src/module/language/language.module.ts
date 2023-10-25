import { Module } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { LanguageService } from "./language.service";
import { LanguageController } from "./language.controller";

@Module({
    providers: [LanguageService, PrismaService],
    controllers: [LanguageController]
})
export class LanguageModule {}