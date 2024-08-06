import './globals.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootLayout } from '@/components';

export const metadata: Metadata = {
  title: 'Blog Fast',
  description:
    "Hi I'm Mohamed, and welcome to my blog. Here, I share my experiences as a frontend engineer, offering a glimpse into what I'm currently learning, exploring, and creating.",
  icons: {
    icon: '/logo.png',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col overflow-x-hidden font-mono">
        <RootLayout>{children}</RootLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
