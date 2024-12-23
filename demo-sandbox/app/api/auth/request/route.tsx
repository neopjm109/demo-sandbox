import JwtUtils from "@/utils/utils.jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * JWT 토큰 생성
 * @param request 
 */

export async function POST() {
    let tokens = JwtUtils.sign();
    let cookieStore = cookies();
    let now = Date.now();
    let nowTime = Math.floor(now / 1000);

    cookieStore.set("x-access-token", tokens.accessToken);
    cookieStore.set("x-refresh-token", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: tokens.refreshExpires - nowTime,
    });
    return NextResponse.json(tokens);
}