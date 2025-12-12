// ConcernForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ConcernFormData, IssueCategory } from '../types/concern';

interface ConcernFormProps {
  userEmail?: string;
  userName?: string;
  onSubmit: (data: ConcernFormData) => void;
  isLoading?: boolean;
}

const issueCategories: IssueCategory[] = [
  'Payment issue',
  'Order not received',
  'Damaged or wrong item',
  'Technical bug',
  'Login/Account issue',
  'Other concern'
];

const ConcernForm: React.FC<ConcernFormProps> = ({
  userEmail = '',
  userName = '',
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ConcernFormData>({
    fullName: userName,
    email: userEmail,
    orderId: '',
    category: 'Other concern',
    description: '',
    screenshots: []
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
      setFormData(prev => ({ ...prev, screenshots: files }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.screenshots.length < 2) {
      alert('Please upload at least 2 screenshots');
      return;
    }

    const generatedTicketId = `TKT-${Date.now().toString().slice(-8)}`;
    setTicketId(generatedTicketId);
    
    onSubmit(formData);
    setSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: userName,
      email: userEmail,
      orderId: '',
      category: 'Other concern',
      description: '',
      screenshots: []
    });
    setUploadedFiles([]);
    setSuccess(false);
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    setFormData(prev => ({ ...prev, screenshots: newFiles }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Issue Reported Successfully!
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We've received your concern and our support team will review it shortly. 
              You'll receive updates via email.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Your Ticket ID</h3>
              </div>
              <div className="bg-white border border-blue-200 rounded-lg p-4 mb-3">
                <code className="text-2xl font-bold text-blue-600 tracking-wider font-mono">
                  {ticketId}
                </code>
              </div>
              <p className="text-sm text-gray-500">
                Save this ID for future reference
              </p>
            </div>
            
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Report Another Issue
            </button>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Expected response time: <span className="font-medium text-gray-700">Within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Report an Issue
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tell us about the problem you're experiencing. We'll help you resolve it quickly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="ORD-123456"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include if your issue is related to an order
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {issueCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Issue Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your issue *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  placeholder="Please provide a detailed description of the problem you're facing..."
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    The more details you provide, the better we can help
                  </p>
                  <span className={`text-sm ${formData.description.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>
            </div>

            {/* Screenshots Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Attachments
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Screenshots (At least 2 required) *
                </label>
                
                {uploadedFiles.length === 0 ? (
                  <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      required
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label htmlFor="screenshot-upload" className="cursor-pointer block">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-gray-700 font-medium mb-1">
                        Click to upload screenshots
                      </p>
                      <p className="text-sm text-gray-500">
                        Upload at least 2 images (PNG, JPG up to 5MB each)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative border border-gray-200 rounded-lg p-3 bg-white group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {uploadedFiles.length >= 2 ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Minimum requirement met
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Upload {2 - uploadedFiles.length} more image(s)
                          </span>
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          multiple
                          className="hidden"
                        />
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Add more files
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>We'll email you updates about your ticket</span>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || formData.screenshots.length < 2}
                  className={`px-8 py-3 font-medium rounded-lg transition-all duration-200 shadow-md ${
                    isLoading || formData.screenshots.length < 2
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Issue Report
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Average response time: 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernForm;