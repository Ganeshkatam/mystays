import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
export function GET() {
  return NextResponse.json({
    data: { status: 'ok' },
    error: null,
    meta: { requestId: randomUUID() },
  });
}
