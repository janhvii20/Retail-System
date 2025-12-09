export const FilterBar = ({ filters, filterOptions, onFilterChange, sort, onSortChange, onRefresh }) => {
  const handleChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  const selectClass = "px-3 py-2 border border-gray-300 rounded text-xs bg-white cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition whitespace-nowrap";

  return (
    <div className="bg-white px-8 py-3 border-b border-gray-200 flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center overflow-x-auto flex-wrap flex-1">
        <button
          onClick={onRefresh}
          className={selectClass}
          title="Refresh data"
        >
          🔄 
        </button>

        <select
          className={selectClass}
          value={filters.customerRegion?.[0] || ''}
          onChange={(e) => handleChange('customerRegion', e.target.value ? [e.target.value] : [])}
        >
          <option value="">Customer Region</option>
          {filterOptions.regions?.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.gender?.[0] || ''}
          onChange={(e) => handleChange('gender', e.target.value ? [e.target.value] : [])}
        >
          <option value="">Gender</option>
          {filterOptions.genders?.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.ageMin || ''}
          onChange={(e) => handleChange('ageMin', e.target.value ? parseInt(e.target.value) : undefined)}
        >
          <option value="">Age Range</option>
          <option value="18">18-25</option>
          <option value="26">26-35</option>
          <option value="36">36-45</option>
          <option value="46">46+</option>
        </select>

        <select
          className={selectClass}
          value={filters.productCategory?.[0] || ''}
          onChange={(e) => handleChange('productCategory', e.target.value ? [e.target.value] : [])}
        >
          <option value="">Product Category</option>
          {filterOptions.categories?.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.tags?.[0] || ''}
          onChange={(e) => handleChange('tags', e.target.value ? [e.target.value] : [])}
        >
          <option value="">Tags</option>
          {filterOptions.tags?.slice(0, 10).map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.paymentMethod?.[0] || ''}
          onChange={(e) => handleChange('paymentMethod', e.target.value ? [e.target.value] : [])}
        >
          <option value="">Payment Method</option>
          {filterOptions.paymentMethods?.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.dateFrom || ''}
          onChange={(e) => handleChange('dateFrom', e.target.value)}
        >
          <option value="">Date</option>
          <option value="">All Dates</option>
        </select>
      </div>

      <select
        className={selectClass}
        value={sort || ''}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort by: Default</option>
        <option value="date_desc">Sort by: Date (Newest First)</option>
        <option value="date_asc">Sort by: Date (Oldest First)</option>
        <option value="quantity_desc">Sort by: Quantity (High to Low)</option>
        <option value="quantity_asc">Sort by: Quantity (Low to High)</option>
        <option value="customerName_asc">Sort by: Customer Name (A–Z)</option>
        <option value="customerName_desc">Sort by: Customer Name (Z–A)</option>
      </select>
    </div>
  );
};
