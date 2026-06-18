import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const post = await prisma.post.update({
    where: { id },
    data: { likes: { increment: 1 } }
  });

  return NextResponse.json({ success: true, likes: post.likes });
}
