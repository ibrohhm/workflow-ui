import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const file = path.join(process.cwd(), 'data', `${name}.json`);
  if (!fs.existsSync(file)) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return NextResponse.json(data);
}
