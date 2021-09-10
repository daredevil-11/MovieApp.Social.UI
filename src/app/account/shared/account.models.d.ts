import type { ExtensibleFullAuditedEntityDto } from '@abp/ng.core';
export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto<string> {
    tenantId?: string;
    userName?: string;
    name?: string;
    surname?: string;
    email?: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    lockoutEnabled: boolean;
    lockoutEnd?: string;
    concurrencyStamp?: string;
}

export interface RegisterDto extends ExtensibleObject {
    userName: string;
    emailAddress: string;
    password: string;
    appName: string;
}

export interface LoginDto {
    userNameOrEmailAddress: string;
    password: string;
    rememberMe: bollean;
}

export interface LoginResponseDto {
    result: number;
    description: string;
}