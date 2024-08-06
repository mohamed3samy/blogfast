import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { postCache } from '@/lib/cache';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = 10;
  const cacheKey = `posts_page_${page}`;

  try {
    const cachedPosts = postCache.get(cacheKey);
    if (cachedPosts) {
      return NextResponse.json(cachedPosts);
    }

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      }),
      prisma.post.count(),
    ]);

    const result = { posts, total, page, totalPages: Math.ceil(total / limit) };
    postCache.set(cacheKey, result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
