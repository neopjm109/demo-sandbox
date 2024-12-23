import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware는 Frontend 보다 API에 더 어울리므로, API 사용시에 개발
 * @param request 
 * @returns 
 */

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname);
    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}