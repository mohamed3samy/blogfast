import Link from 'next/link';

import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import {
  DeleteButton,
  Pagination,
  Button,
  Border,
  Container,
  FadeIn,
} from '@/components';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface HomeProps {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 5;

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

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Container className="mt-24 sm:mt-32 lg:mt-56">
        <FadeIn className="flex flex-col items-start gap-y-6">
          <h1 className="block max-w-5xl text-balance text-3xl font-medium tracking-wide text-neutral-950 sm:text-4xl md:text-5xl">
            The latest articles and news
          </h1>

          <p className="max-w-3xl text-balance text-xl text-neutral-600">
            Hi 👋🏻 I&apos;m Mohamed, and welcome to my blog. Here, I share my
            experiences as a Frontend Engineer 🧑‍💻, offering a glimpse into what
            I&apos;m currently learning, exploring, and creating.
          </p>

          <Button href="/new-post" className="pluse-btn animate-pluse py-2.5">
            Create New Post
          </Button>
        </FadeIn>
      </Container>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {posts.map((post: Post) => (
            <FadeIn key={post.id}>
              <article>
                <Border className="pt-12 last-of-type:pb-8">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={formatDate(post.createdAt)}>
                            {formatDate(post.createdAt)}
                          </time>
                        </dd>
                      </dl>
                      <p className="my-6 max-w-2xl text-base text-neutral-600">
                        {post.content.length > 100
                          ? post.content.substring(0, 150) + '...'
                          : post.content}
                      </p>

                      <div className="flex items-center gap-4">
                        <Button
                          href={`/posts/${post.id}`}
                          aria-label={`Read more: ${post.title}`}
                        >
                          Read more
                        </Button>
                        <Button
                          href={`/edit-post/${post.id}`}
                          aria-label={`Read more: ${post.title}`}
                        >
                          Edit
                        </Button>

                        <DeleteButton postId={post.id} />
                      </div>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} />
      </Container>
    </>
  );
}
