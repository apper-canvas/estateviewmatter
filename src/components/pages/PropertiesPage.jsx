import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000000 },
    propertyTypes: [],
    bedroomsMin: 0,
    bathroomsMin: 0,
    search: searchParams.get("search") || "",
  });

const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    loadProperties();
  }, []);

useEffect(() => {
    let filtered = [...properties];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower) ||
        property.state.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower)
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price >= filters.priceRange.min && 
      property.price <= filters.priceRange.max
    );

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyTypes.includes(property.type)
      );
    }

    // Bedroom filter
    if (filters.bedroomsMin > 0) {
      filtered = filtered.filter(property =>
        property.bedrooms >= filters.bedroomsMin
      );
    }

    // Bathroom filter
    if (filters.bathroomsMin > 0) {
      filtered = filtered.filter(property =>
        property.bathrooms >= filters.bathroomsMin
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate));
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, filters, sortBy]);

const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 2000000 },
      propertyTypes: [],
      bedroomsMin: 0,
      bathroomsMin: 0,
      search: "",
    });
    setSearchParams({});
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

const activeFiltersCount = (
    (filters.propertyTypes.length > 0 ? 1 : 0) +
    (filters.bedroomsMin > 0 ? 1 : 0) +
    (filters.bathroomsMin > 0 ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 2000000 ? 1 : 0) +
    (filters.search ? 1 : 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-80">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Properties for You
              </h1>
<p className="text-neutral-600">
                {loading ? "Loading..." : `${filteredProperties.length} properties found`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Button
                variant="secondary"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden relative gap-2"
              >
                <ApperIcon name="Filter" className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600 hidden sm:block">Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[160px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-neutral-600">Active filters:</span>
{filters.search && (
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    Search: "{filters.search}"
                  </span>
                )}
                {filters.propertyTypes.length > 0 && (
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    Types: {filters.propertyTypes.length}
                  </span>
                )}
                {filters.bedroomsMin > 0 && (
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {filters.bedroomsMin}+ bedrooms
                  </span>
                )}
                {filters.bathroomsMin > 0 && (
                  <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {filters.bathroomsMin}+ bathrooms
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-primary-600 hover:text-primary-700 p-1"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                  Clear all
                </Button>
              </div>
            </motion.div>
          )}

          {/* Property Grid */}
<PropertyGrid
            properties={filteredProperties}
            loading={loading}
            error={error}
            onRetry={loadProperties}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;