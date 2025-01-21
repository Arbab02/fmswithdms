'use client'

import React from 'react';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';

export function ExportButtons({ onExportExcel, onExportPDF }) {
  return (
    <div className="flex justify-center md:justify-end gap-4 mb-6 text-[7px] md:text-base">
      <button
        onClick={onExportExcel}
        className="bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-lg shadow"
      >
        <FaFileExcel className="text-xs md:text-xl inline-block" /> Export to Excel
      </button>
      <button
        onClick={onExportPDF}
        className="bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-lg shadow"
      >
        <FaFilePdf className="text-xs md:text-xl inline-block" /> Export to PDF
      </button>
    </div>
  );
}