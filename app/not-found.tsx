import Link from 'next/link';
import { Container, FadeIn } from '@/components';

export default function NotFound() {
  return (
    <Container className="flex h-full max-h-screen items-center justify-center overflow-hidden">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="text-4xl font-semibold text-neutral-950 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-neutral-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
        >
          Go to the home page
        </Link>
      </FadeIn>
    </Container>
  );
}
