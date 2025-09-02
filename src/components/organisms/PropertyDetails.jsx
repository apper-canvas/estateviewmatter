import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import ImageGallery from "@/components/molecules/ImageGallery";
import { formatPrice, formatNumber, formatDate } from "@/utils/formatters";
import { useSavedProperties } from "@/hooks/useSavedProperties";
import { toast } from "react-toastify";

const PropertyDetails = ({ property }) => {
  const { isSaved, saveProperty, unsaveProperty } = useSavedProperties();
  const saved = isSaved(property.Id);

  const handleSaveToggle = () => {
if (saved) {
      unsaveProperty(property.Id);
      toast.success("Property removed from saved");
    } else {
      saveProperty(property.Id);
      toast.success("Property saved successfully");
    }
  };

  const handleContact = () => {
    toast.info("Contact feature would be implemented here");
  };

  const handleScheduleTour = () => {
    toast.info("Tour scheduling feature would be implemented here");
  };

  const details = [
{ icon: "Bed", label: "Bedrooms", value: property.bedrooms },
    { icon: "Bath", label: "Bathrooms", value: property.bathrooms },
    { icon: "Square", label: "Square Feet", value: formatNumber(property.sqft) },
    { icon: "Calendar", label: "Year Built", value: property.yearBuilt },
    { icon: "Car", label: "Parking", value: property.parking },
    { icon: "MapPin", label: "ZIP Code", value: property.zipCode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Image Gallery */}
<ImageGallery images={property.images} alt={property.title} />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
<Badge 
              variant={property.status === "for-sale" ? "success" : "primary"}
              className="text-sm px-3 py-1"
            >
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>
            <span className="text-sm text-neutral-500">
              Listed {formatDate(property.listedDate)}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
{property.title}
          </h1>
          
          <div className="flex items-center gap-2 text-neutral-600 mb-4">
            <ApperIcon name="MapPin" className="h-5 w-5" />
            <span className="text-lg">{property.address}, {property.city}, {property.state}</span>
          </div>
          
          <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Button onClick={handleSaveToggle} variant={saved ? "secondary" : "outline"} size="lg" className="gap-2">
            <ApperIcon 
              name="Heart" 
              className={`h-5 w-5 ${saved ? "fill-error text-error" : ""}`} 
            />
            {saved ? "Saved" : "Save Property"}
          </Button>
          <Button onClick={handleScheduleTour} variant="accent" size="lg" className="gap-2">
            <ApperIcon name="Calendar" className="h-5 w-5" />
            Schedule Tour
          </Button>
          <Button onClick={handleContact} size="lg" className="gap-2">
            <ApperIcon name="Phone" className="h-5 w-5" />
            Contact Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Details Grid */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-neutral-900 mb-6">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
{details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                    <ApperIcon name={detail.icon} className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">{detail.label}</div>
                    <div className="font-semibold text-neutral-900">{detail.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4">Description</h2>
<p className="text-neutral-700 leading-relaxed">{property.description}</p>
          </Card>

          {/* Amenities */}
{property.amenities && property.amenities.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-display font-semibold text-neutral-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ApperIcon name="Check" className="h-5 w-5 text-success" />
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map placeholder */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Location</h3>
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <ApperIcon name="MapPin" className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">Interactive Map</p>
                <p className="text-xs text-neutral-500">Would show property location</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600">
{property.address}<br />
              {property.city}, {property.state} {property.zipCode}
            </p>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Agent</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <ApperIcon name="User" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Sarah Johnson</div>
                  <div className="text-sm text-neutral-600">Real Estate Agent</div>
                </div>
              </div>
              <Button onClick={handleContact} className="w-full gap-2">
                <ApperIcon name="Phone" className="h-4 w-4" />
                Call Now
              </Button>
              <Button onClick={handleContact} variant="secondary" className="w-full gap-2">
                <ApperIcon name="Mail" className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;