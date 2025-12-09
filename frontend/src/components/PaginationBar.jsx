export const PaginationBar = ({ pagination, onPageChange }) => {
  if (!pagination.totalPages) return null;

  const pages = [];
  const maxVisible = 6;
  let startPage = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
  let endPage = Math.min(pagination.totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 py-4 bg-white border-t border-gray-200">
      {pages.map(page => (
        <button
          key={page}
          className={`w-8 h-8 border rounded text-xs font-medium transition ${
            pagination.page === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
