import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ImageGallery = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ensure images is an array and not empty
  const imageArray = Array.isArray(images) ? images : [];
  
  if (imageArray.length === 0) {
    return (
      <div className="relative bg-neutral-100 rounded-xl overflow-hidden">
        <div className="aspect-[16/10] flex items-center justify-center">
          <div className="text-center text-neutral-500">
            <ApperIcon name="Image" className="h-12 w-12 mx-auto mb-2" />
            <p>No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className="relative bg-neutral-100 rounded-xl overflow-hidden">
        {/* Main image */}
        <div className="aspect-[16/10] relative">
          <img 
            src={imageArray[currentIndex]} 
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openFullscreen}
          />
          
          {/* Navigation arrows */}
          {imageArray.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-700 p-3 rounded-full shadow-lg"
                onClick={prevImage}
              >
                <ApperIcon name="ChevronLeft" className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-700 p-3 rounded-full shadow-lg"
                onClick={nextImage}
              >
                <ApperIcon name="ChevronRight" className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {/* Expand button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-neutral-700 p-2 rounded-full shadow-lg"
            onClick={openFullscreen}
          >
            <ApperIcon name="Expand" className="h-5 w-5" />
          </Button>
          
          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {imageArray.length}
          </div>
        </div>
        
        {/* Thumbnail strip */}
        {imageArray.length > 1 && (
          <div className="p-4 bg-white">
            <div className="flex gap-2 overflow-x-auto">
              {imageArray.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentIndex ? "border-primary-500" : "border-transparent"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <div className="relative max-w-7xl max-h-full">
              <img 
                src={imageArray[currentIndex]} 
                alt={`${alt} - Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
                onClick={closeFullscreen}
              >
                <ApperIcon name="X" className="h-6 w-6" />
              </Button>
              
              {/* Navigation in fullscreen */}
              {imageArray.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  >
                    <ApperIcon name="ChevronLeft" className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  >
                    <ApperIcon name="ChevronRight" className="h-6 w-6" />
                  </Button>
                </>
              )}
              
              {/* Image counter in fullscreen */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {imageArray.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;