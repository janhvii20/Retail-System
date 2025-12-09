export const Header = ({ search, onSearchChange }) => {
  return (
    <div className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center gap-8">
      <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Sales Management System</h1>
      <div className="flex-1 max-w-xs">
        <input
          type="text"
          placeholder="Name, Phone no."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>
    </div>
  );
};
