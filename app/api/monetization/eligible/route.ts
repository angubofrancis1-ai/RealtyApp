import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ eligible: false });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  const eligible = !!user && 
    user.verified && 
    user.followerCount >= 350 && 
    user.impressions90d >= 3500000;

  return NextResponse.json({ eligible, user });
}
