import React, { useState } from 'react';

const FarmDetailsModal = () => {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample farm details state (replace with your actual data/API)
  const [farmDetails, setFarmDetails] = useState({
    name: "ABX Farms",
    location: "Albury, NSW",
    type: "Cattle",
    logo: null // Will store the logo file or URL
  });
  
  // Preview URL for the logo (if uploaded)
  const [logoPreview, setLogoPreview] = useState(null);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle logo file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFarmDetails(prev => ({
        ...prev,
        logo: file
      }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send data to your backend API
    console.log("Farm details to save:", farmDetails);
    
    // Close the modal after saving
    setIsModalOpen(false);
    
    // Additional logic - like showing a success message, etc.
  };
  
  return (
    <>
      {/* Farm Details Button (to replace the current avatar) */}
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
          title="Farm Details"
        >
          JS
        </button>
      </div>
      
      {/* Farm Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Modal Backdrop */}
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6">
              <div className="flex justify-between items-start pb-3 border-b mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Farm Details
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Farm Logo Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Logo
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Farm Logo" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No logo</span>
                      )}
                    </div>
                    <div>
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Farm Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={farmDetails.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                {/* Farm Location */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={farmDetails.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Farm Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Type
                  </label>
                  <select
                    name="type"
                    value={farmDetails.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Cattle">Cattle</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Horse">Horse</option>
                    <option value="Mixed">Mixed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FarmDetailsModal;