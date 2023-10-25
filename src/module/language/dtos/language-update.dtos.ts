import { IsString, IsNotEmpty } from "class-validator";
import { LanguageUpdateRequest } from "../interfaces";

export class LanguageUpdateDto implements Omit<LanguageUpdateRequest, 'id'>  {
    @IsString()
    @IsNotEmpty()
    title: string;
}