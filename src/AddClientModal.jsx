import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddClientModal = ({ isOpen, onClose, onSave, animals }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
    assignedAnimals: []
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  
  // Reset form when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        notes: '',
        assignedAnimals: []
      });
      setSearchTerm('');
    }
  }, [isOpen]);
  
  // Filter animals based on search term
  useEffect(() => {
    if (!animals) return;
    
    if (searchTerm === '') {
      setFilteredAnimals(animals.filter(animal => animal.status === 'Active'));
    } else {
      setFilteredAnimals(
        animals.filter(animal => 
          (animal.status === 'Active') && 
          (animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           animal.mNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [searchTerm, animals]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  
  const toggleAnimalSelection = (animal) => {
    const isSelected = formData.assignedAnimals.some(a => a.id === animal.id);
    
    if (isSelected) {
      setFormData({
        ...formData,
        assignedAnimals: formData.assignedAnimals.filter(a => a.id !== animal.id)
      });
    } else {
      setFormData({
        ...formData,
        assignedAnimals: [...formData.assignedAnimals, animal]
      });
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-medium text-gray-900" id="modal-headline">
              Add New Client
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Client Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Client Information</h4>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>
              </div>
              
              {/* Right Column - Animal Assignment */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Assign Animals (Optional)</h4>
                
                <div>
                  <label htmlFor="animalSearch" className="block text-sm font-medium text-gray-700">
                    Search Animals
                  </label>
                  <input
                    type="text"
                    id="animalSearch"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Select
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAnimals.length > 0 ? (
                          filteredAnimals.map(animal => (
                            <tr 
                              key={animal.id}
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleAnimalSelection(animal)}
                            >
                              <td className="px-3 py-2 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={formData.assignedAnimals.some(a => a.id === animal.id)}
                                  onChange={() => {}} // Handled by row click
                                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {animal.mNumber}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                {animal.name}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {animal.type}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-3 py-4 text-center text-sm text-gray-500">
                              {searchTerm ? 'No animals match your search' : 'No active animals available'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Animals ({formData.assignedAnimals.length})</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.assignedAnimals.map(animal => (
                      <div 
                        key={animal.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {animal.name}
                        <button
                          type="button"
                          className="ml-1.5 inline-flex text-green-400 hover:text-green-600 focus:outline-none"
                          onClick={() => toggleAnimalSelection(animal)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.assignedAnimals.length === 0 && (
                      <span className="text-sm text-gray-500">No animals selected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t text-right">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                style={{ backgroundColor: '#1E4841' }}
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;