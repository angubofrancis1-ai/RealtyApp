import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function calculateVisibilityScore(post: any, author: any) {
  const hoursOld = (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
  let score = (post.likes * 8) + (post.comments * 15) - (hoursOld * 3);
  score += author.premiumTier * 80;        // Premium visibility boost
  return Math.max(score, 10);               // Lenient floor for ALL users
}

export async function GET() {
  const rawPosts = await prisma.post.findMany({
    include: { author: true },
    take: 30,
  });

  const sortedPosts = rawPosts.sort((a, b) => {
    return calculateVisibilityScore(b, b.author) - calculateVisibilityScore(a, a.author);
  });

  return NextResponse.json(sortedPosts);
}
