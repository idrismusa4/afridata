// This is a simple test API route.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Test route works!' });
} 