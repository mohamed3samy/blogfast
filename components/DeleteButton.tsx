'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Container from './Container';
import FadeIn from './FadeIn';

interface DeleteButtonProps {
  postId: string;
}

const DeleteButton = ({ postId }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        closeModal();
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }

      router.refresh();
      closeModal();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Delete
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-full max-h-screen items-center justify-center bg-black bg-opacity-50">
          <Container className="px-3">
            <FadeIn>
              <div
                ref={modalRef}
                className="rounded-lg bg-white p-4 shadow-xl sm:p-6"
              >
                <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
                <p className="mb-6">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={closeModal}
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={deletePost}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
