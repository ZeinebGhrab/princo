export default interface PaginationProps {
    currentPage: number;
    totalPages: number;
    length: number;
    text?: string;
    handlePageChange: (pageNumber: number) => void;
  }