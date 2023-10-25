import { Controller, HttpCode, HttpStatus, Post, Body, Get, Put, Param, ParseUUIDPipe, Delete } from "@nestjs/common";
import { LanguageService } from "./language.service";
import { Language } from "@prisma/client";
import type { LanguageCreateRequest } from "./interfaces";
import { LanguageUpdateDto } from "./dtos";

@Controller({
    path: 'language-service'
})
export class LanguageController {
    readonly #_service: LanguageService 

    constructor(service: LanguageService) {
        this.#_service = service
    }

    @HttpCode(HttpStatus.OK)
    @Get('list')
    async getAllLanguages(): Promise<Omit<Language, 'id' | 'title'>[]> {
        return await this.#_service.getAllLanguages()
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async createLanguage(@Body() body: LanguageCreateRequest): Promise<void> {
        await this.#_service.createLanguage(body)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('update/:id')
    async updateLanguage(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: LanguageUpdateDto): Promise<void> {
        await this.#_service.updateLanguage({
            id,
            ...body
        })
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('delete/:id')
    async deleteLanguage(
        @Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.#_service.deleteLanguage({ id })
    }
}