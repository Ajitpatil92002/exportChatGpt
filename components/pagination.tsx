"use client"

import { usePathname, useRouter } from "next/navigation"
import qs from "qs"

export const Pagination = ({
  page,
  pageCount,
}: {
  page: number
  pageCount: number
}) => {
  const redirectUrl = usePathname()
  const router = useRouter()

  const handlePaginate = async (direction:number) => {
    if (direction === 1 && isNextDisabled()) {
      return
    }

    if (direction === -1 && isPrevDisabled()) {
      return
    }

    const queryString = qs.stringify({
      page: page + direction,
    })

    router.push(`${redirectUrl}?${queryString}`)
  }

  const isPrevDisabled = () => {
    return page <= 1
  }

  const isNextDisabled = () => {
    return page >= pageCount
  }

  return (
    <>
      <div className="mb-20 items-center space-y-2 text-xs sm:flex sm:space-x-3 sm:space-y-0">
        <span className="block">
          Page {page} of {pageCount}
        </span>
        <div className="flex-center space-x-2">
          <button
            title="previous"
            type="button"
            onClick={() => handlePaginate(-1)}
            className={`inline-flex h-8 w-20 items-center justify-center rounded-md border shadow ${
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
            className={`inline-flex h-8 w-20 items-center justify-center rounded-md border shadow ${
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
  )
}
