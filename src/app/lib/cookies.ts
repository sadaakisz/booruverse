'use server';

import { cookies } from "next/headers";

// KNOWLEDGE: https://nextjs.org/docs/app/api-reference/functions/cookies

export async function getCookie(name: string) {
    return cookies().get(name);
}

export async function setCookie(name: string, value: string) {
    cookies().delete(name);
    cookies().set({
        name: name,
        value: value,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    });
}

export async function deleteCookie(name: string) {
    cookies().delete(name);
}