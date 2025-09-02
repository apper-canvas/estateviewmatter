import { motion } from "framer-motion";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PropertyGrid = ({ properties, loading, error, onRetry, onClearFilters }) => {
  if (loading) {
    return <Loading count={9} />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (properties.length === 0) {
    return (
      <Empty
        title="No properties found"
        message="We couldn't find any properties matching your criteria. Try adjusting your filters or search terms to discover more options."
        action={onClearFilters}
        actionText="Clear All Filters"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
<PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;