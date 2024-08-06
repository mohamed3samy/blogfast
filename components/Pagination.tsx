import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <>
      {totalPages > 1 && (
        <div className="mb-8 mt-10 flex items-center justify-center space-x-4 lg:space-x-6">
          {isPrevDisabled ? (
            <Button
              disabled
              className="cursor-not-allowed rounded-lg bg-gray-300 text-gray-500 md:text-base"
            >
              Prev
            </Button>
          ) : (
            <Button
              href={`/?page=${currentPage - 1}`}
              className="rounded-lg md:text-base"
            >
              Prev
            </Button>
          )}

          <Button className="rounded-lg">{currentPage}</Button>

          {isNextDisabled ? (
            <Button
              disabled
              className="cursor-not-allowed rounded-lg bg-gray-300 text-gray-500 md:text-base"
            >
              Next
            </Button>
          ) : (
            <Button
              href={`/?page=${currentPage + 1}`}
              className="rounded-lg md:text-base"
            >
              Next
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
