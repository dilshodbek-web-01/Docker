import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { Language } from "@prisma/client";
import type { LanguageCreateRequest, LanguageDeleteRequest, LanguageUpdateRequest } from "./interfaces";

@Injectable()
export class LanguageService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async getAllLanguages(): Promise<Omit<Language, 'id' | 'title'>[]> {
        return await this.#_prisma.language.findMany({
           select: {
            id: true,
            title: true
           }
        })
    }

    async createLanguage(payload: LanguageCreateRequest): Promise<null> {
        await this.#_prisma.language.create({
            data: {
                title: payload.title
            }
        })
        return null
    }

    async updateLanguage(payload: LanguageUpdateRequest): Promise<void> {
        await this.#_checkLanguage(payload.id)

        await this.#_prisma.language.update({
            where: {
                id: payload.id
            },
            data: {
                title: payload.title
            }
        })
    }

    async deleteLanguage(payload: LanguageDeleteRequest): Promise<void> {
        await this.#_checkLanguage(payload.id)

        await this.#_prisma.language.delete({
            where: {
                id: payload.id
            }
        })
    }

    async #_checkLanguage(id: string): Promise<void> {
        const language = await this.#_prisma.language.findFirst({
            where: {
                id
            }
        })

        if (!language) {
            throw new NotFoundException('Language not found')
        }
    }
}