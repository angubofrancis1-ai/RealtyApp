import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, images = [], location, price } = body;

    const post = await prisma.post.create({
      data: {
        content,
        images,
        location,
        price: price ? Number(price) : null,
        authorId: "demo-user-1", // We'll improve auth later
      },
      include: { author: true }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
