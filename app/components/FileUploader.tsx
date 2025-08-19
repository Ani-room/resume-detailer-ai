import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div
      {...getRootProps()}
      className={`w-full rounded-3xl border-2 border-dashed cursor-pointer 
        backdrop-blur-lg shadow-xl transition-all duration-300 
        ${
          isDragActive
            ? "border-blue-400 bg-gradient-to-br from-blue-50/80 to-blue-100/40 scale-[1.02]"
            : "border-gray-300 bg-gradient-to-br from-gray-50/60 to-gray-100/40 hover:border-blue-300 hover:shadow-2xl"
        }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center p-10 space-y-5">
        {file ? (
          <div
            className="flex items-center justify-between w-full max-w-xl p-5 rounded-xl bg-white/80 shadow-lg border border-gray-200 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PDF Icon + File Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100">
                <img src="/images/pdf.png" alt="pdf" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect?.(null);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Upload Circle */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-200 to-blue-100 shadow-md">
              <img
                src="/icons/upload.svg"
                alt="upload"
                className="w-10 h-10 text-blue-600"
              />
            </div>

            {/* Instructions */}
            <div className="text-center space-y-1">
              <p className="text-lg font-bold text-gray-700 tracking-wide">
                {isDragActive ? "Drop it now 🚀" : "Upload your PDF"}
              </p>
              <p className="text-sm text-gray-500">Click or drag & drop here</p>
              <p className="text-xs text-gray-400 mt-2">
                Max size: {formatSize(maxFileSize)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
