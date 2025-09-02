import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import PropertyDetails from "@/components/organisms/PropertyDetails";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";
const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      setError("Property not found or failed to load.");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading type="detail" />
      </div>
    );
  }

if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4" />
          Back to Properties
        </Button>
      </motion.div>

<PropertyDetails property={property} />
    </div>
  );
};

export default PropertyDetailPage;