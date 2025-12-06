import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ src, alt, className = '' }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    setIsZoomed(true);
  };

  const handleClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      {/* Regular Image with Hover Effect */}
      <div
        className={`relative cursor-zoom-in ${className}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img src={src} alt={alt} className="w-full h-full object-contain transition-transform duration-300" />
        
        {/* Zoom Icon Overlay */}
        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <ZoomIn className="h-8 w-8 text-green-600" />
            </div>
          </div>
        )}
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Close zoom"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain cursor-zoom-out"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageZoom;
