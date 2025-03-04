import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Globe, MapPin, Search, Plus, Download, User, DollarSign, Clock, Calendar } from 'lucide-react';
import ascotBull from './Assets/Images/Ascot-Bull.jpg';
import milwillahBull2 from './Assets/Images/Milwillah-Bull-2.jpg';
import milwillahBull from './Assets/Images/Milwillah-Bull.jpg';

const ClientProfilePage = () => {
  // Example data for John Smith
  const [clientInfo, setClientInfo] = useState({
    name: 'John Smith',
    farmName: 'Smith Farms',
    address: '123 Country Lane, Springfield, USA',
    phone: '(555) 123-4567',
    email: 'john@smithfarms.com',
    website: 'www.smithfarms.com',
    totalValue: '$164,500',
    totalPurchases: 8,
    firstPurchaseYear: 2019,
    lastPurchase: '3 months ago',
    clientSince: 'April 2019',
    purchasedAnimals: [
      { id: 'NMMS213', name: 'Summit', price: '$38,500', year: '2021', type: 'Bull', breed: 'Angus' },
      { id: 'NMMR258', name: 'Ranger', price: '$72,500', year: '2020', type: 'Bull', breed: 'Angus' },
      { id: 'NMMR279', name: 'Ruler', price: '$64,500', year: '2020', type: 'Bull', breed: 'Angus' },
      { id: 'NMMS225', name: 'Sovereign', price: '$42,000', year: '2021', type: 'Bull', breed: 'Angus' },
      { id: 'NMMQ302', name: 'Quantum', price: '$82,400', year: '2019', type: 'Bull', breed: 'Angus' },
      { id: 'NMMR288', name: 'Racer', price: '$52,800', year: '2020', type: 'Bull', breed: 'Angus' },
      { id: 'NMMQ318', name: 'Quasar', price: '$65,800', year: '2019', type: 'Bull', breed: 'Angus' },
      { id: 'NMMQ295', name: 'Quest', price: '$78,200', year: '2019', type: 'Bull', breed: 'Angus' },
    ],
  });

  // Available cattle to assign to this client
  const availableCattle = [
    { id: 'NMMT001', name: 'Thunder', price: '$38,000', year: '2022', type: 'Bull', breed: 'Angus' },
    { id: 'NMMT014', name: 'Titan', price: '$45,000', year: '2022', type: 'Bull', breed: 'Angus' },
    { id: 'NMMT023', name: 'Triumph', price: '$42,000', year: '2022', type: 'Bull', breed: 'Angus' },
    { id: 'NMMT045', name: 'Trooper', price: '$36,000', year: '2022', type: 'Bull', breed: 'Angus' },
    { id: 'NMMT058', name: 'Trident', price: '$50,000', year: '2022', type: 'Bull', breed: 'Angus' },
    { id: 'NMMV062', name: 'Valor', price: '$38,500', year: '2024', type: 'Bull', breed: 'Angus' },
    { id: 'NMMV078', name: 'Viking', price: '$44,000', year: '2024', type: 'Bull', breed: 'Angus' },
    { id: 'NMMU091', name: 'Ultimate', price: '$48,000', year: '2023', type: 'Bull', breed: 'Angus' },
    { id: 'NMMU104', name: 'Union', price: '$52,000', year: '2023', type: 'Bull', breed: 'Angus' },
    { id: 'NMMU112', name: 'Unity', price: '$46,500', year: '2023', type: 'Bull', breed: 'Angus' },
  ];

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalPrice, setAnimalPrice] = useState('');
  const searchRef = useRef(null);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('animals');

  // Filter animals based on search term
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = availableCattle.filter(animal => 
        animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(filtered.length > 0);
    } else {
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  // Handle click outside search results to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Select animal from search results
  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setSearchTerm(animal.id + ' - ' + animal.name);
    setAnimalPrice(animal.price.replace('$', ''));
    setShowSearchResults(false);
  };

  // Assign animal to client
  const handleAssignAnimal = () => {
    if (!selectedAnimal) return;
    
    // Format price with $ sign
    const formattedPrice = animalPrice.startsWith('$') ? animalPrice : '$' + animalPrice;
    
    // Add animal to client's purchased animals
    const newAnimal = {
      ...selectedAnimal,
      price: formattedPrice,
      year: new Date().getFullYear().toString()
    };
    
    setClientInfo(prev => ({
      ...prev,
      purchasedAnimals: [newAnimal, ...prev.purchasedAnimals],
      totalPurchases: prev.totalPurchases + 1,
      lastPurchase: 'Just now',
      // Recalculate total value (rough estimation for demo)
      totalValue: '$' + (parseInt(prev.totalValue.replace(/[$,]/g, '')) + parseInt(animalPrice.replace(/[$,]/g, '') || '0')).toLocaleString()
    }));
    
    // Reset the form
    setSelectedAnimal(null);
    setSearchTerm('');
    setAnimalPrice('');
    
    // Show success message (in a real app, you'd use a proper notification system)
    alert(`${newAnimal.name} has been assigned to ${clientInfo.name}`);
  };

  // Cycle through images for thumbnails
  const imageArray = [ascotBull, milwillahBull2, milwillahBull];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header background */}
      <div className="relative overflow-hidden">
        <img 
          src={ascotBull}
          alt="Header background"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Client header with logo */}
        <div className="absolute top-0 left-0 right-0 p-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-xl font-bold text-white">
              SF
            </div>
            <div className="ml-4 text-white">
              <h1 className="text-3xl font-bold">Smith Farms</h1>
              <div className="flex items-center mt-1">
                <User size={16} className="mr-2" />
                <span>John Smith</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards Row */}
      <div className="px-8 -mt-8 relative z-10 mb-8">
        <div className="flex justify-between gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-3">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">TOTAL INVESTMENT</p>
              <p className="text-xl font-bold text-gray-800">$164,500</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-3">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">TOTAL PURCHASES</p>
              <p className="text-xl font-bold text-gray-800">8</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-3">
              <Clock size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">CLIENT SINCE</p>
              <p className="text-xl font-bold text-gray-800">April 2019</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex-1 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-3">
              <Calendar size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">LAST PURCHASE</p>
              <p className="text-xl font-bold text-gray-800">3 months ago</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="px-8 pb-12">
        <div className="flex gap-8">
          {/* Main Content (Left) */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow mb-6">
              {/* Tabs */}
              <div className="border-b">
                <div className="flex">
                  <button 
                    className={`px-6 py-3 ${activeTab === 'animals' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('animals')}
                    style={activeTab === 'animals' ? { borderColor: '#1E4841', color: '#1E4841' } : {}}
                  >
                    Purchased Animals
                  </button>
                  <button 
                    className={`px-6 py-3 ${activeTab === 'history' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('history')}
                    style={activeTab === 'history' ? { borderColor: '#1E4841', color: '#1E4841' } : {}}
                  >
                    History & Notes
                  </button>
                  <button 
                    className={`px-6 py-3 ${activeTab === 'marketing' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('marketing')}
                    style={activeTab === 'marketing' ? { borderColor: '#1E4841', color: '#1E4841' } : {}}
                  >
                    Marketing
                  </button>
                </div>
              </div>
              
              {/* Assign Animal Section */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Plus size={16} className="mr-2 text-green-600" />
                  Assign Animal to Client
                </h3>
                
                <div className="flex gap-4">
                  {/* Search Field */}
                  <div className="relative flex-grow" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search animals by ID or name..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    
                    {/* Search Results Dropdown */}
                    {showSearchResults && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                        <ul className="py-1">
                          {searchResults.map(animal => (
                            <li 
                              key={animal.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectAnimal(animal)}
                            >
                              <div className="font-medium">{animal.id} - {animal.name}</div>
                              <div className="text-sm text-gray-500">
                                {animal.type} | {animal.breed} | Est. Value: {animal.price}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Price Field */}
                  <div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={animalPrice}
                        onChange={(e) => setAnimalPrice(e.target.value)}
                        placeholder="Purchase price..."
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        disabled={!selectedAnimal}
                      />
                    </div>
                  </div>
                  
                  {/* Assign Button */}
                  <button
                    onClick={handleAssignAnimal}
                    disabled={!selectedAnimal}
                    className={`px-4 py-2 rounded-md text-white ${selectedAnimal ? 'bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    style={{ backgroundColor: selectedAnimal ? '#1E4841' : null }}
                  >
                    <Plus size={16} className="inline mr-1" />
                    Assign Animal
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'animals' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium">Purchased Animals</h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md flex items-center">
                          <Download size={14} className="mr-1" />
                          Export
                        </button>
                        <select className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md">
                          <option>All Years</option>
                          <option>2024</option>
                          <option>2023</option>
                          <option>2022</option>
                          <option>2021</option>
                          <option>2020</option>
                          <option>2019</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">IMAGE</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">NAME</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">TYPE</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">YEAR</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">PRICE</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientInfo.purchasedAnimals.map((animal, index) => (
                            <tr key={animal.id + index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img 
                                  src={imageArray[index % imageArray.length]} 
                                  alt={animal.name} 
                                  className="w-10 h-10 object-cover rounded" 
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {animal.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {animal.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {animal.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {animal.year}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                {animal.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                <button className="hover:underline">View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar (Right) */}
          <div className="w-96 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-xl font-medium mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Address</p>
                      <p className="text-sm text-gray-600">{clientInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{clientInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Email</p>
                      <p className="text-sm text-gray-600">{clientInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Website</p>
                      <p className="text-sm text-gray-600">{clientInfo.website}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex border-t">
                <button className="flex-1 py-3 text-white font-medium bg-green-700 hover:bg-green-800 transition-colors flex items-center justify-center"
                        style={{ backgroundColor: '#1E4841' }}>
                  <Phone size={16} className="mr-2" />
                  Call
                </button>
                <button className="flex-1 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Mail size={16} className="mr-2" />
                  Email
                </button>
              </div>
            </div>
            
            {/* Purchase Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-medium mb-4">Purchase Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total purchases</span>
                  <span className="font-medium">8</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime value</span>
                  <span className="font-medium text-green-600">{clientInfo.totalValue}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Average purchase</span>
                  <span className="font-medium">
                    ${Math.round(parseInt(clientInfo.totalValue.replace(/[$,]/g, '')) / clientInfo.totalPurchases).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">First purchase</span>
                  <span className="font-medium">{clientInfo.firstPurchaseYear}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Last purchase</span>
                  <span className="font-medium">{clientInfo.lastPurchase}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;