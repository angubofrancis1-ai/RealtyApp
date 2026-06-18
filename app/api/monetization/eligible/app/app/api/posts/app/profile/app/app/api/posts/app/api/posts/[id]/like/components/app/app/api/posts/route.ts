import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });

  // Increment impressions for each post viewed
  posts.forEach(async (post) => {
    await prisma.post.update({
      where: { id: post.id },
      data: { impressions: { increment: 1 } }
    });
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const { content, images = [], location, price } = await request.json();

    const post = await prisma.post.create({
      data: {
        content,
        images,
        location,
        price: price ? Number(price) : null,
        authorId: "demo-user-1",
      },
      include: { author: true }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
