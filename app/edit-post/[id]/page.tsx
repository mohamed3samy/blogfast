'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { postSchema } from '@/lib/validations';
import {
  Container,
  Button,
  FadeIn,
  TextArea,
  TextField,
  Loader,
  PulsatingDots,
} from '@/components';

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        const data = await response.json();

        if (!response.ok) toast.error('Failed to fetch post');

        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.log('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

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
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) toast.error('Failed to update post');

      router.push(`/posts/${params.id}`);
      await new Promise((resolve) => setTimeout(resolve, 200));
      router.refresh();
    } catch (error) {
      console.log('Error updating post:', error);
    } finally {
      setIsUpdating(true);
    }
  };

  if (isLoading) return <Loader />;

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
              disabled={isUpdating}
              className="h-10 w-full rounded-lg py-0 tracking-wide md:text-base"
            >
              {isUpdating ? <PulsatingDots /> : 'Update Post'}
            </Button>
          </form>
        </FadeIn>
      </Container>
    </section>
  );
}
