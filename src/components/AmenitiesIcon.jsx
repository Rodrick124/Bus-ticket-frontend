import React from 'react';
import { FiWifi, FiMonitor, FiPower } from 'react-icons/fi';
import { TbAirConditioning } from 'react-icons/tb';

export default function AmenitiesIcon({ amenity, size = 'md' }) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  const iconProps = {
    className: `${sizeClass} text-gray-600 dark:text-gray-400`
  };

  switch (amenity?.toLowerCase()) {
    case 'ac':
      return (
        <div title="Air Conditioning" className="flex items-center justify-center">
          <TbAirConditioning {...iconProps} />
        </div>
      );
    case 'wifi':
      return (
        <div title="WiFi" className="flex items-center justify-center">
          <FiWifi {...iconProps} />
        </div>
      );
    case 'usb':
      return (
        <div title="USB Charging" className="flex items-center justify-center">
          <FiPower {...iconProps} />
        </div>
      );
    case 'media':
      return (
        <div title="Media/Entertainment" className="flex items-center justify-center">
          <FiMonitor {...iconProps} />
        </div>
      );
    default:
      return null;
  }
}

export function AmenitiesList({ amenities, size = 'md' }) {
  return (
    <div className="flex gap-2">
      {amenities?.map(amenity => (
        <AmenitiesIcon key={amenity} amenity={amenity} size={size} />
      ))}
    </div>
  );
}
