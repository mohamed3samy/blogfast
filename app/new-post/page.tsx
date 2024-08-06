'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { postSchema } from '@/lib/validations';
import {
  Container,
  Button,
  FadeIn,
  TextArea,
  TextField,
  PulsatingDots,
} from '@/components';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = postSchema.safeParse({ title, content });

    if (!result.success) {
      const newError: { [key: string]: string } = {};

      result.error.issues.forEach((issue) => {
        if (issue.path) newError[issue.path[0]] = issue.message;
      });

      setError(newError);
      return;
    }

    setError({});
    setIsLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to create post');
      }

      router.push('/');
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.refresh();
    } catch (error) {
      console.log('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-full max-h-screen w-full items-center justify-center overflow-hidden">
      <Container className="w-full">
        <FadeIn className="flex w-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg sm:p-10 md:rounded-[2.5rem] md:p-20"
            noValidate
          >
            {error.submit && (
              <p className="mb-4 text-sm text-red-400 md:text-base">
                {error.submit}
              </p>
            )}

            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              {error.title && (
                <p className="mt-1 text-sm text-red-400 md:text-base">
                  {error.title}
                </p>
              )}
            </TextField>

            <TextArea
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="my-6 md:my-8"
            >
              {error.content && (
                <p className="mt-1 text-sm text-red-400 md:text-base">
                  {error.content}
                </p>
              )}
            </TextArea>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full rounded-lg py-0 tracking-wide md:text-base"
            >
              {isLoading ? <PulsatingDots /> : 'Create Post'}
            </Button>
          </form>
        </FadeIn>
      </Container>
    </section>
  );
}
