import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, FileDown, Trash2, FileText, X } from 'lucide-react';

export const ImageToPDF: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setImages(prev => [...prev, ev.target!.result as string]);
          }
        };
        reader.readAsDataURL(file as Blob);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generatePDF = () => {
    if (images.length === 0) return;
    setLoading(true);
    
    // Create new PDF instance (portrait, mm, a4)
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    images.forEach((imgData, index) => {
      if (index > 0) doc.addPage();
      
      const img = new Image();
      img.src = imgData;
      
      // We need to wait for image to load to get dims, but here we assume base64 is ready.
      // In a real robust app, we'd wrap this in promises. 
      // Simplified Aspect Ratio Fit logic:
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20; // 10mm margin
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // If height is too big, scale by height instead
      if (pdfHeight > pageHeight - 20) {
         const pdfHeight2 = pageHeight - 20;
         const pdfWidth2 = (imgProps.width * pdfHeight2) / imgProps.height;
         doc.addImage(imgData, 'JPEG', 10, 10, pdfWidth2, pdfHeight2);
      } else {
         doc.addImage(imgData, 'JPEG', 10, 10, pdfWidth, pdfHeight);
      }
    });

    doc.save('images-converted.pdf');
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer relative">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="w-12 h-12 text-slate-400 mb-2" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Click or Drag images here
        </p>
        <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border dark:border-slate-700">
              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-1 left-2 bg-black/50 text-white text-xs px-1 rounded">
                Page {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={generatePDF}
        disabled={images.length === 0 || loading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FileDown size={20} />
        {loading ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
};

export const TextToPDF: React.FC = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(12);

  const generate = () => {
    if (!text.trim()) return;
    const doc = new jsPDF();
    doc.setFontSize(fontSize);
    
    // Split text to fit page width
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - (margin * 2);
    
    const splitText = doc.splitTextToSize(text, maxLineWidth);
    
    let y = 15;
    const lineHeight = fontSize * 0.5; // Approx mm conversion

    splitText.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save('document.pdf');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
        <span className="text-sm font-medium px-2">Font Size: {fontSize}</span>
        <input 
          type="range" 
          min="8" 
          max="36" 
          value={fontSize} 
          onChange={e => setFontSize(Number(e.target.value))} 
          className="w-32"
        />
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="flex-1 p-4 border rounded-xl dark:bg-slate-800 dark:border-slate-700 resize-none focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm leading-relaxed"
        style={{ fontSize: `${Math.max(12, fontSize)}px` }} // Preview limit
      />
      <button
        onClick={generate}
        disabled={!text.trim()}
        className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FileDown size={20} />
        Download PDF
      </button>
    </div>
  );
};