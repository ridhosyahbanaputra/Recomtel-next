// src/app/[nama-rute]/loading.jsx

import React from "react";
import { ImSpinner2 } from "react-icons/im"; 

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-gray-50">
      <ImSpinner2 className="animate-spin text-4xl text-amber-500 mb-4" />

      <p className="text-lg font-medium text-gray-700">
        Memuat konten, mohon tunggu...
      </p>


      <div className="mt-8 space-y-3 w-1/2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
