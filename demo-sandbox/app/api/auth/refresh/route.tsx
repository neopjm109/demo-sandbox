import JwtUtils from "@/utils/utils.jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * JWT 토큰 갱신
 * @param request 
 */

export async function GET(request: NextRequest) {
    let cookieStore = cookies();
    return NextResponse.json({
        cookieAccessToken: cookieStore.get("x-access-token"),
        cookieRefreshToken: cookieStore.get("x-refresh-token"),
    });
}

export async function POST(request: NextRequest) {
    let cookieStore = cookies();
    let refreshToken = cookieStore.get("x-refresh-token");
    let tokens : any = JwtUtils.refresh(refreshToken?.value ?? "")
    return NextResponse.json({
        code: "200",
        message: "success",
        data: tokens
    });
}