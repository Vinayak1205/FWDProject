import React from 'react';

const CircularStorageDisplay = ({ storageInfo }) => {
  // Calculate the percentage for the conic-gradient
  const usedPercentage = storageInfo.usedPercentage || 0; // Make sure to handle edge cases
  const gradient = `conic-gradient(white ${usedPercentage}%, #e5e7eb ${usedPercentage}% 100%)`;

  return (
    <div className="flex items-center justify-center w-[482px] h-[220px] bg-red-400 rounded-3xl shadow-md p-4">
      <div className="relative w-28 h-28">
        {/* Circular Progress using conic-gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: gradient,
          }}
        />
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-[#FA7275]">
            {usedPercentage}%
          </p>
          <p className="text-[#FA7275] text-sm">Space used</p>
        </div>
      </div>
      <div className="ml-6 text-white">
        <p className="text-lg font-bold">Available Storage</p>
        <p className="text-sm">
          {storageInfo.usedStorage} / {storageInfo.totalStorage}
        </p>
      </div>
    </div>
  );
};

export default CircularStorageDisplay;
