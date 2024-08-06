import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { postCache } from '@/lib/cache';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const cacheKey = `post_${params.id}`;

  try {
    const cachedPost = postCache.get(cacheKey);
    if (cachedPost) {
      return NextResponse.json(cachedPost);
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    postCache.set(cacheKey, post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { title, content } = body;

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    });

    postCache.delete(`post_${params.id}`);
    postCache.delete(/^posts_page_/.toString());
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    postCache.delete(`post_${params.id}`);
    postCache.delete(/^posts_page_/.toString());
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
