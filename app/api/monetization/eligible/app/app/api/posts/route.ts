import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { content, images, location, price, authorId } = await request.json();

  const post = await prisma.post.create({
    data: {
      content,
      images: images || [],
      location,
      price,
      authorId: authorId || "demo-user",
    },
    include: { author: true }
  });

  return NextResponse.json(post);
}
