import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Container, FadeIn, Button } from '@/components';

export default async function Post({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post)
    return (
      <div className="flex h-full max-h-screen items-center justify-center">
        <span className="text-xl font-semibold text-neutral-900 sm:text-2xl">
          Post not found
        </span>
      </div>
    );

  return (
    <article className="mt-32 flex md:mt-48">
      <Container className="flex max-w-4xl flex-col items-center justify-center">
        <FadeIn className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-neutral-700">
            {formatDate(post.createdAt)}
          </p>
          <h2 className="text-center text-xl font-bold leading-relaxed tracking-wide text-[#0a0a0a] sm:text-2xl md:text-3xl lg:text-4xl">
            {post.title}
          </h2>
        </FadeIn>
        <FadeIn>
          <p className="mt-24 text-balance text-start text-[17px] font-normal leading-loose text-[#0a0a0a] md:mt-28 md:text-xl lg:text-2xl">
            {post.content}
          </p>
        </FadeIn>

        <Button
          href="/"
          className="my-8 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white transition-colors hover:bg-[#2a2a2a]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
          Back to All Posts
        </Button>
      </Container>
    </article>
  );
}
