function Filters(props: any) {
  const { filters, setFilters } = props;

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters: any) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <>
      <label>Filter by Type</label>
      <input
        type="text"
        name="type"
        placeholder="Filter by Type"
        value={filters.type}
        onChange={handleFilterChange}
      />
      <br />
      <label>Filter by Category</label>
      <input
        type="text"
        name="category"
        placeholder="Filter by Category"
        value={filters.category}
        onChange={handleFilterChange}
      />
      <br />
      <label>Filter by Date(From)</label>
      <input
        type="date"
        name="from"
        placeholder="Filter by Date"
        value={filters.from}
        onChange={handleFilterChange}
      />
      <br />
      <label>Filter by Date(To)</label>
      <input
        type="date"
        name="to"
        placeholder="Filter by Date"
        value={filters.to}
        onChange={handleFilterChange}
      />
    </>
  );
}

export default Filters;
