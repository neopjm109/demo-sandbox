import JwtUtils from "@/utils/utils.jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * JWT 토큰 갱신
 * @param request 
 */

const SECRET_KEY = "secretKey";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return NextResponse.json(JwtUtils.verify(searchParams.get("token") ?? ""));
}

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return NextResponse.json(JwtUtils.verify(searchParams.get("token") ?? ""));
}
