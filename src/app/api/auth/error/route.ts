import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      status: 'error',
      message: 'An authentication error occurred',
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
