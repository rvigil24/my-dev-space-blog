import Link from "next/link";

export default function Pagination({ currentPage, numPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = `blog/page/${currentPage - 1}`;
  const nextPage = `blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">

      {/* for mobile */}

      {/* previous button */}
      <div className="flex-1 flex justify-between sm:hidden">
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`}>
            <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
          </Link>
        )}

        {/* next button */}
        {currentPage < numPages && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <a
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </Link>
        )}
      </div>

      {/* large devices */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* previous page button */}
            {currentPage > 1 && (
              <Link href={`/blog/page/${currentPage - 1}`}>
                <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
            )}

            {/* pagination content */}
            {Array.from({ length: numPages }, (_, i) => {
              const currentIndexStyle =
                "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
              const indexStyle =
                "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";
              return (
                <Link key={i} href={`/blog/page/${i + 1}`}>
                  <a
                    aria-current="page"
                    className={`${
                      currentPage === i + 1 ? currentIndexStyle : indexStyle
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {i + 1}
                  </a>
                </Link>
              );
            })}

            {/* next page button */}
            {currentPage < numPages && (
              <Link href={`/blog/page/${currentPage + 1}`}>
                <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
