import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname);
    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}