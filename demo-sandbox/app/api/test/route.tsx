import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({
        code: 200,
        message: "This is TEST API that use a method GET"
    });
}

export async function POST(request: NextRequest) {
    return NextResponse.json({
        code: 200,
        message: "This is TEST API that use a method POST"
    });
}