import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'

interface Props {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}
/**
 * currentpage : page hien tai
 * pageNumber: là số page được show
 * RANGE = 2 áp dụng cho khoảng cách đầu, khoảng cách cuối và khoản cách 2 bên
 *
 * TH1:  currentpage <= 5 && pageNumber > currentpage + RANGE && pageNumber < totalPage - RANGE thi show dau ...
 */

const RANGE = 2
export default function Pagination({ currentPage, totalPage, setCurrentPage }: Props) {
  let dotAfter = false

  let dotBefore = false

  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span
          key={index}
          className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0'
        >
          ...
        </span>
      )
    }
    return null
  }
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span
          key={index}
          className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0'
        >
          ...
        </span>
      )
    }
    return null
  }
  const renderPagination = () => {
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        // điều kiện để return dấu ...
        const pageNumber = index + 1
        if (currentPage <= 5 && pageNumber > currentPage + RANGE && pageNumber <= totalPage - RANGE) {
          return renderDotAfter(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < totalPage - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            className={classNames(
              ' inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-orange-500 ',
              {
                'bg-orange ': pageNumber == currentPage,
                'bg-transparent': pageNumber !== currentPage
              }
            )}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>1</span> to <span className='font-medium'>10</span> of{' '}
            <span className='font-medium'>97</span> results
          </p>
        </div>
        <div>
          <nav aria-label='Pagination' className='isolate inline-flex -space-x-px rounded-md shadow-xs'>
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon aria-hidden='true' className='size-5' />
            </a>
            {renderPagination()}
            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon aria-hidden='true' className='size-5' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
