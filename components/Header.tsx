import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';

const Header = () => {
  return (
    <header className="absolute left-0 top-0 z-40 flex w-screen items-center justify-center overflow-hidden pt-10 md:pt-12 lg:pt-14">
      <Container className="w-full">
        <nav className="flex items-center justify-start">
          <Link
            href="/"
            title="Home"
            className="flex items-center justify-start"
          >
            <Image
              src={require('/public/logo.png')}
              alt="logo"
              width={100}
              height={100}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />

            <span className="text-lg font-extrabold tracking-wider text-gray-800 lg:text-xl">
              BlogFast
            </span>
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
