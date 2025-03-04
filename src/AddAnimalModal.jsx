import React, { useState, useEffect, useRef } from 'react';
import { X, Upload } from 'lucide-react';

const AddAnimalModal = ({ isOpen, onClose, onSave, animals }) => {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    mNumber: '',
    name: '',
    type: 'Bull',
    status: 'Active',
    dob: '',
    sire: '',
    dam: '',
    price: '',
    purchaser: '',
    notes: '',
    breed: '',
    weight: '',
    color: '',
    polled: 'no',
    registered: 'no',
    ebvs: {
      'Calving Ease Dir': '',
      'Calving Ease Dtrs': '',
      'Gestation Length': '',
      'Birth Weight': '',
      '200 Day Growth': '',
      '400 Day Weight': '',
      '600 Day Weight': '',
      'Mat. Cow Weight': '',
      'Mat. Body Condition': '',
      'Mat. Cow Height': '',
      'Milk': '',
      'Days to Calving': '',
      'Scrotal Size': '',
      'Docility': '',
      'Carcase Weight': '',
      'Eye Muscle Area': '',
      'Rib Fat': '',
      'Rump Fat': '',
      'Retail Beef Yield': '',
      'IMF': '',
      'NFI-F': '',
      'Claw Set': '',
      'Foot Angle': '',
      'Leg Angle': '',
      'Angus Breeding Index': '',
      'Angus Breeding Low Feed Cost Index': ''
    }
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  
  // List of available sires and dams from existing animals
  const sires = animals
    ? animals
        .filter(animal => animal.type === 'Bull')
        .map(animal => ({ id: animal.id, name: animal.name }))
    : [];
    
  const dams = animals
    ? animals
        .filter(animal => animal.type === 'Female')
        .map(animal => ({ id: animal.id, name: animal.name }))
    : [];
    
  // Reset form when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setFormData({
        mNumber: '',
        name: '',
        type: 'Bull',
        status: 'Active',
        dob: '',
        sire: '',
        dam: '',
        price: '',
        purchaser: '',
        notes: '',
        breed: '',
        weight: '',
        color: '',
        polled: 'no',
        registered: 'no',
        ebvs: {
          'Calving Ease Dir': '',
          'Calving Ease Dtrs': '',
          'Gestation Length': '',
          'Birth Weight': '',
          '200 Day Growth': '',
          '400 Day Weight': '',
          '600 Day Weight': '',
          'Mat. Cow Weight': '',
          'Mat. Body Condition': '',
          'Mat. Cow Height': '',
          'Milk': '',
          'Days to Calving': '',
          'Scrotal Size': '',
          'Docility': '',
          'Carcase Weight': '',
          'Eye Muscle Area': '',
          'Rib Fat': '',
          'Rump Fat': '',
          'Retail Beef Yield': '',
          'IMF': '',
          'NFI-F': '',
          'Claw Set': '',
          'Foot Angle': '',
          'Leg Angle': '',
          'Angus Breeding Index': '',
          'Angus Breeding Low Feed Cost Index': ''
        }
      });
      setImage(null);
      setImagePreview(null);
      setActiveTab('basic');
    }
  }, [isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('ebvs.')) {
      const ebvName = name.split('.')[1];
      setFormData({
        ...formData,
        ebvs: {
          ...formData.ebvs,
          [ebvName]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new animal object with the form data
    const newAnimal = {
      ...formData,
      image: imagePreview // In a real app, you would upload the image to a server
    };
    
    onSave(newAnimal);
    onClose();
  };
  
  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };
  
  if (!isOpen) return null;

  // Group EBVs by category for better organization
  const ebvGroups = {
    'Calving': ['Calving Ease Dir', 'Calving Ease Dtrs', 'Gestation Length', 'Birth Weight'],
    'Growth': ['200 Day Growth', '400 Day Weight', '600 Day Weight'],
    'Maternal': ['Mat. Cow Weight', 'Mat. Body Condition', 'Mat. Cow Height', 'Milk', 'Days to Calving'],
    'Fertility': ['Scrotal Size'],
    'Temperament': ['Docility'],
    'Carcase': ['Carcase Weight', 'Eye Muscle Area', 'Rib Fat', 'Rump Fat', 'Retail Beef Yield', 'IMF'],
    'Feed Efficiency': ['NFI-F'],
    'Structure': ['Claw Set', 'Foot Angle', 'Leg Angle'],
    'Indexes': ['Angus Breeding Index', 'Angus Breeding Low Feed Cost Index']
  };
  
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
              Add New Animal
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Tabs for form sections */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  type="button"
                  className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                    activeTab === 'basic'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Information
                </button>
                <button
                  type="button"
                  className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                    activeTab === 'advanced'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('advanced')}
                >
                  Additional Details
                </button>
                <button
                  type="button"
                  className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                    activeTab === 'ebv'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('ebv')}
                >
                  EBVs & Performance
                </button>
              </nav>
            </div>
            
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Basic Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mNumber" className="block text-sm font-medium text-gray-700">
                      M Number (ID) *
                    </label>
                    <input
                      type="text"
                      id="mNumber"
                      name="mNumber"
                      required
                      value={formData.mNumber}
                      onChange={handleChange}
                      placeholder="e.g., NMMT001"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name *
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
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Bull">Bull</option>
                      <option value="Female">Female</option>
                      <option value="Steer">Steer</option>
                      <option value="Heifer">Heifer</option>
                      <option value="Cow">Cow</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                      Breed *
                    </label>
                    <select
                      id="breed"
                      name="breed"
                      required
                      value={formData.breed}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Breed</option>
                      <option value="Angus">Angus</option>
                      <option value="Hereford">Hereford</option>
                      <option value="Charolais">Charolais</option>
                      <option value="Simmental">Simmental</option>
                      <option value="Limousin">Limousin</option>
                      <option value="Brahman">Brahman</option>
                      <option value="Santa Gertrudis">Santa Gertrudis</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Added to Spring Bull Sale 2025">Added to Spring Bull Sale 2025</option>
                      <option value="Added to Autumn Female Sale 2025">Added to Autumn Female Sale 2025</option>
                      <option value="Sold">Sold</option>
                      <option value="Deceased">Deceased</option>
                    </select>
                  </div>
                </div>
                
                {/* Right Column - Image and Parentage */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Animal Image
                    </label>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative"
                        onClick={triggerImageUpload}
                      >
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-1 text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => { setImage(null); setImagePreview(null); }}
                          className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sire" className="block text-sm font-medium text-gray-700">
                      Sire
                    </label>
                    <select
                      id="sire"
                      name="sire"
                      value={formData.sire}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Sire</option>
                      {sires.map(sire => (
                        <option key={sire.id} value={sire.name}>
                          {sire.name}
                        </option>
                      ))}
                      <option value="other">Other (Not in Database)</option>
                    </select>
                    {formData.sire === 'other' && (
                      <input
                        type="text"
                        name="customSire"
                        placeholder="Enter sire name"
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        onChange={(e) => setFormData({...formData, sire: e.target.value})}
                      />
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="dam" className="block text-sm font-medium text-gray-700">
                      Dam
                    </label>
                    <select
                      id="dam"
                      name="dam"
                      value={formData.dam}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Dam</option>
                      {dams.map(dam => (
                        <option key={dam.id} value={dam.name}>
                          {dam.name}
                        </option>
                      ))}
                      <option value="other">Other (Not in Database)</option>
                    </select>
                    {formData.dam === 'other' && (
                      <input
                        type="text"
                        name="customDam"
                        placeholder="Enter dam name"
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        onChange={(e) => setFormData({...formData, dam: e.target.value})}
                      />
                    )}
                  </div>
                  
                  {formData.status === 'Sold' && (
                    <>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Sale Price
                        </label>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="e.g., $45,000"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="purchaser" className="block text-sm font-medium text-gray-700">
                          Purchaser
                        </label>
                        <input
                          type="text"
                          id="purchaser"
                          name="purchaser"
                          value={formData.purchaser}
                          onChange={handleChange}
                          placeholder="e.g., Smith Farms"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            
            {/* Additional Details Tab */}
            {activeTab === 'advanced' && (
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                      Color/Markings
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Polled
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="polled"
                          value="yes"
                          checked={formData.polled === 'yes'}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="polled"
                          value="no"
                          checked={formData.polled === 'no'}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registered
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="registered"
                          value="yes"
                          checked={formData.registered === 'yes'}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="registered"
                          value="no"
                          checked={formData.registered === 'no'}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Additional fields can be added here as needed */}
                  <div className="p-4 bg-gray-50 rounded-lg text-sm">
                    <h4 className="font-medium text-gray-700 mb-2">Additional Information</h4>
                    <p className="text-gray-600 mb-2">
                      This section can be customized to include fields specific to your operation, such as:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Health records</li>
                      <li>Vaccination history</li>
                      <li>Calving history (for females)</li>
                      <li>Pedigree information</li>
                      <li>Custom identifiers</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* EBVs & Performance Tab */}
            {activeTab === 'ebv' && (
              <div className="px-6 py-4">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Estimated Breeding Values (EBVs)</h4>
                  <p className="text-sm text-gray-500">
                    Enter the animal's EBV values for each trait.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {/* Render EBVs by category */}
                  {Object.entries(ebvGroups).map(([category, traits]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-4">{category} Traits</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {traits.map(trait => (
                          <div key={trait}>
                            <label htmlFor={`ebvs.${trait}`} className="block text-sm font-medium text-gray-700">
                              {trait}
                            </label>
                            <input
                              type="text"
                              id={`ebvs.${trait}`}
                              name={`ebvs.${trait}`}
                              value={formData.ebvs[trait]}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
                Add Animal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnimalModal;