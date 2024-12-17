import JwtUtils from "@/utils/utils.jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * JWT 토큰 갱신
 * @param request 
 */

export async function GET(request: NextRequest) {
    let tokens = JwtUtils.generate();
    let cookieStore = cookies();
    let now = Date.now();
    let nowTime = Math.floor(now / 1000);

    cookieStore.set("x-access-token", tokens.accessToken, {
        // httpOnly: true,
        // secure: true,
        // sameSite: 'none',
    });
    cookieStore.set("x-refresh-token", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: tokens.refreshExpires - nowTime,
    });
    return NextResponse.json(JwtUtils.generate());
}

export async function POST(request: NextRequest) {
    return NextResponse.json(JwtUtils.generate());
}