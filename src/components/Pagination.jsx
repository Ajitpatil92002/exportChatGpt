"use client";

import qs from "qs";
import { usePathname, useRouter } from "next/navigation";

export const Pagination = ({ page, pageCount }) => {
  const redirectUrl = usePathname();
  const router = useRouter();

  const handlePaginate = async (direction) => {
    if (direction === 1 && isNextDisabled()) {
      return;
    }

    if (direction === -1 && isPrevDisabled()) {
      return;
    }

    const queryString = qs.stringify({
      page: page + direction,
    });

    router.push(`${redirectUrl}?${queryString}`);
  };

  const isPrevDisabled = () => {
    return page <= 1;
  };

  const isNextDisabled = () => {
    return page >= pageCount;
  };

  return (
    <>
      <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex mb-20">
        <span className="block">
          Page {page} of {pageCount}
        </span>
        <div className="flex-center space-x-2">
          <button
            title="previous"
            type="button"
            onClick={() => handlePaginate(-1)}
            className={`inline-flex items-center justify-center w-20 h-8 border rounded-md shadow ${
              isPrevDisabled() ? "disabled" : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Previous</span>
          </button>
          <button
            title="next"
            type="button"
            onClick={() => handlePaginate(1)}
            className={`inline-flex items-center justify-center w-20 h-8 border rounded-md shadow ${
              isNextDisabled() ? "disabled" : ""
            }`}
          >
            <span>Next</span>
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
