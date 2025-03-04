import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Search, Plus, X, Copy, Link, Check, Users, Mail, Eye } from 'lucide-react';
import ascotBull from './Assets/Images/Ascot-Bull.jpg';
import milwillahBull2 from './Assets/Images/Milwillah-Bull-2.jpg';
import milwillahBull from './Assets/Images/Milwillah-Bull.jpg';

const SpringBullSale2025Page = () => {
  const navigate = useNavigate();
  // Sale details (static info)
  const saleDetails = {
    id: 1,
    name: "Spring Bull Sale 2025",
    date: "2025-04-15",
    status: "Upcoming",
    totalAnimals: 6,
  };
  
  // Sample list of animals for the sale
  const initialAnimals = [
    { id: '11', mNumber: 'NMMU118', name: 'Uptown', dob: '25/04/23', sire: 'Sovereign', dam: 'Crystal 444', price: '' },
    { id: '12', mNumber: 'NMMU127', name: 'Universe', dob: '13/02/23', sire: 'Ranger', dam: 'Jewel 777', price: '' },
    { id: '13', mNumber: 'NMMU135', name: 'Uppercut', dob: '30/03/23', sire: 'Rebel', dam: 'Starlight 901', price: '' },
    { id: '14', mNumber: 'NMMU142', name: 'Urban', dob: '17/01/23', sire: 'Titan', dam: 'Moonbeam 234', price: '' },
    { id: '15', mNumber: 'NMMT157', name: 'Tempest', dob: '22/02/22', sire: 'Sailor', dam: 'Lady 401', price: '' },
    { id: '16', mNumber: 'NMMT163', name: 'Target', dob: '09/05/22', sire: 'Ranger', dam: 'Duchess 212', price: '' },
  ];

  // Sample farm animal database (animals not yet in the sale)
  const farmAnimals = [
    { id: '1', mNumber: 'NMMT001', name: 'Thunder', dob: '12/04/22', sire: 'Summit', dam: 'Lady 401', price: '', type: 'Bull' },
    { id: '2', mNumber: 'NMMT014', name: 'Titan', dob: '23/05/22', sire: 'Ranger', dam: 'Duchess 212', price: '', type: 'Bull' },
    { id: '3', mNumber: 'NMMT023', name: 'Triumph', dob: '05/03/22', sire: 'Quest', dam: 'Queen 308', price: '', type: 'Bull' },
    { id: '4', mNumber: 'NMMT045', name: 'Trooper', dob: '18/02/22', sire: 'Sovereign', dam: 'Emerald 871', price: '', type: 'Bull' },
    { id: '5', mNumber: 'NMMT058', name: 'Trident', dob: '30/07/22', sire: 'Ruler', dam: 'Ruby 555', price: '', type: 'Bull' },
    { id: '6', mNumber: 'NMMV062', name: 'Valor', dob: '14/04/24', sire: 'Titan', dam: 'Princess 561', price: '', type: 'Bull' },
    { id: '7', mNumber: 'NMMV078', name: 'Viking', dob: '28/06/24', sire: 'Ulysses', dam: 'Beauty 789', price: '', type: 'Bull' },
    { id: '8', mNumber: 'NMMU091', name: 'Ultimate', dob: '03/05/23', sire: 'Thunder', dam: 'Diamond 347', price: '', type: 'Bull' },
    { id: '9', mNumber: 'NMMU104', name: 'Union', dob: '19/03/23', sire: 'Titan', dam: 'Pearl 660', price: '', type: 'Bull' },
    { id: '10', mNumber: 'NMMU112', name: 'Unity', dob: '07/01/23', sire: 'Summit', dam: 'Sapphire 329', price: '', type: 'Bull' },
  ];
  
  // Sample client list for the share modal
  const clients = [
    { id: 1, name: 'John Smith', company: 'Smith Farms', email: 'john@smithfarms.com', phone: '(555) 123-4567', purchases: 8, purchasesValue: '$164,500' },
    { id: 2, name: 'Mary Johnson', company: 'Johnson Livestock', email: 'mary@johnsonlivestock.com', phone: '(555) 234-5678', purchases: 5, purchasesValue: '$98,700' },
    { id: 3, name: 'Robert Brown', company: 'Brown & Sons', email: 'robert@brownandsons.com', phone: '(555) 345-6789', purchases: 12, purchasesValue: '$286,400' },
    { id: 4, name: 'William Davis', company: 'Davis Cattle Co.', email: 'william@daviscattle.com', phone: '(555) 456-7890', purchases: 6, purchasesValue: '$142,300' },
    { id: 5, name: 'James Wilson', company: 'Wilson Stock', email: 'james@wilsonstock.com', phone: '(555) 567-8901', purchases: 9, purchasesValue: '$210,800' },
    { id: 6, name: 'Thomas Thompson', company: 'Thompson Farms', email: 'thomas@thompsonfarms.com', phone: '(555) 678-9012', purchases: 4, purchasesValue: '$89,600' },
    { id: 7, name: 'Richard Anderson', company: 'Anderson Ranch', email: 'richard@andersonranch.com', phone: '(555) 789-0123', purchases: 7, purchasesValue: '$176,200' },
    { id: 8, name: 'Charles Miller', company: 'Miller Livestock', email: 'charles@millerlivestock.com', phone: '(555) 890-1234', purchases: 10, purchasesValue: '$245,900' },
    { id: 9, name: 'Laura Adams', company: 'Adams Agriculture', email: 'laura@adamsagriculture.com', phone: '(555) 901-2345', purchases: 11, purchasesValue: '$305,000' },
    { id: 10, name: 'Kevin White', company: 'White Organic', email: 'kevin@whiteorganic.com', phone: '(555) 012-3456', purchases: 3, purchasesValue: '$72,000' },
  ];

  // Manage animals state
  const [animals, setAnimals] = useState(initialAnimals);
  
  // Overall expected value (sum of locked animal values)
  const [overallExpectedValue, setOverallExpectedValue] = useState(0);
  
  // Client search and modals state
  const [clientSearch, setClientSearch] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  // Toggle extra sale details
  const [showAdditional, setShowAdditional] = useState(false);

  // Animal search states
  const [animalSearch, setAnimalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const clientSearchRef = useRef(null);
  
  // Generate a sales page URL for sharing
  const salesPageUrl = `${window.location.origin}/sales/spring-bull-sale-2025`;
  
  // Force re-render after mount (helps with React 18 compatibility)
  const [, forceUpdate] = useState();

  // Array of images to cycle through for thumbnails and featured animals
  const imageArray = [ascotBull, milwillahBull2, milwillahBull];

  // Force a re-render after component mount to ensure DnD works properly
  useEffect(() => {
    const timeout = setTimeout(() => {
      forceUpdate({});
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Filter clients as user types in search
  useEffect(() => {
    if (clientSearch.trim()) {
      const filtered = clients.filter(client => 
        client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        client.company.toLowerCase().includes(clientSearch.toLowerCase()) ||
        client.email.toLowerCase().includes(clientSearch.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [clientSearch]);

  // Handle animal search
  useEffect(() => {
    if (animalSearch.trim().length > 0) {
      const filteredAnimals = farmAnimals.filter(animal => 
        // Check if animal is not already in the sale
        !animals.some(saleAnimal => saleAnimal.id === animal.id) &&
        (
          animal.mNumber.toLowerCase().includes(animalSearch.toLowerCase()) ||
          animal.name.toLowerCase().includes(animalSearch.toLowerCase())
        )
      );
      setSearchResults(filteredAnimals);
      if (filteredAnimals.length > 0) {
        setShowSearchResults(true);
      }
    } else {
      setShowSearchResults(false);
    }
  }, [animalSearch, animals]);

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

  // Toggle client selection
  const toggleClientSelection = (clientId) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(salesPageUrl)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  // Send sale info to selected clients
  const sendToSelectedClients = () => {
    const selectedClientNames = clients
      .filter(client => selectedClients.includes(client.id))
      .map(client => client.name)
      .join(", ");
    
    alert(`Sale details shared with: ${selectedClientNames}`);
    setShowClientModal(false);
    setSelectedClients([]);
    setClientSearch('');
  };

  // Add animal to sale
  const addAnimalToSale = (animal) => {
    setAnimals(prev => [...prev, {...animal, price: ''}]);
    setAnimalSearch('');
    setShowSearchResults(false);
    // Update sale details
    saleDetails.totalAnimals = animals.length + 1;
  };

  // Update an animal's expected value as the producer types
  const handleExpectedValueChange = (id, newValue) => {
    setAnimals(prev =>
      prev.map(animal =>
        animal.id === id ? { ...animal, price: newValue } : animal
      )
    );
  };

  // When the user presses Enter, lock that animal's expected value
  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      setAnimals(prev =>
        prev.map(animal =>
          animal.id === id ? { ...animal, locked: true } : animal
        )
      );
      event.target.blur();
    }
  };

  // Allow double-click on locked value to unlock it for editing
  const unlockAnimal = (id) => {
    setAnimals(prev =>
      prev.map(animal =>
        animal.id === id ? { ...animal, locked: false } : animal
      )
    );
  };

  // Recalculate overall expected value whenever animals state changes
  useEffect(() => {
    const newSum = animals.reduce((sum, animal) => {
      if (!animal.locked) return sum;
      const value = parseFloat(animal.price) || 0;
      return sum + value;
    }, 0);
    setOverallExpectedValue(newSum);
  }, [animals]);

  // Countdown timer logic
  function calculateTimeLeft() {
    const difference = new Date(saleDetails.date) - new Date();
    let timeLeft = {};
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return timeLeft;
  }

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  // Handler for creating shareable link
  const handleCreateSharableLink = () => {
    setShowLinkModal(true);
  };

  const handleViewPreview = () => {
    navigate('/SpringBullSale2025Preview');
  };

  // Handler for sharing to contact
  const handleShareToContact = () => {
    setShowClientModal(true);
  };

  // Handler for drag end - this updates the order of animals
  const onDragEnd = (result) => {
    console.log("Drag end triggered:", result);
    
    // Drop outside the list
    if (!result.destination) {
      return;
    }
    
    // If the item was dropped in the same position
    if (result.destination.index === result.source.index) {
      return;
    }
    
    // Create a copy of the current animals array
    const reorderedAnimals = Array.from(animals);
    
    // Remove the dragged item from its position
    const [removed] = reorderedAnimals.splice(result.source.index, 1);
    
    // Insert the dragged item at its new position
    reorderedAnimals.splice(result.destination.index, 0, removed);
    
    // Update state with the new order
    setAnimals(reorderedAnimals);
    console.log("Animals reordered:", reorderedAnimals);
  };

  // Remove animal from sale
  const removeAnimalFromSale = (id) => {
    setAnimals(prev => prev.filter(animal => animal.id !== id));
    // Update sale details
    saleDetails.totalAnimals = animals.length - 1;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Banner with background image and countdown */}
      <div
        className="relative h-64 bg-cover bg-center rounded-lg shadow"
        style={{ backgroundImage: `url(${ascotBull})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl font-bold">{saleDetails.name}</h1>
          <p className="mt-2 text-lg">
            Date: {saleDetails.date} | Status: {saleDetails.status}
          </p>
          <p className="mt-1 text-lg">
            Total Animals: {animals.length} | Expected Value:{" "}
            {overallExpectedValue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </p>
          <div className="mt-4 flex space-x-4 text-xl">
            {Object.keys(timeLeft).length > 0 ? (
              <>
                <div>{timeLeft.days}d</div>
                <div>{timeLeft.hours}h</div>
                <div>{timeLeft.minutes}m</div>
                <div>{timeLeft.seconds}s</div>
              </>
            ) : (
              <span>Sale Started!</span>
            )}
          </div>
        </div>
      </div>

      {/* Sharable Link & Share Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleCreateSharableLink}
            className="px-4 py-2 text-white rounded-md flex items-center transition-colors duration-200"
            style={{ backgroundColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            <Link size={18} className="mr-2" />
            Create Sharable Link
          </button>
          <button 
            onClick={handleViewPreview}
            className="px-4 py-2 text-white rounded-md flex items-center transition-colors duration-200"
            style={{ backgroundColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            <Eye size={18} className="mr-2" />
            View Sharable Sale Page
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={clientSearch}
              onChange={e => setClientSearch(e.target.value)}
              placeholder="Search Clients..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={handleShareToContact}
            className="px-4 py-2 text-white rounded-md flex items-center transition-colors duration-200"
            style={{ backgroundColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            <Mail size={18} className="mr-2" />
            Share to Contact
          </button>
        </div>
      </section>

      {/* Sharable Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowLinkModal(false)}></div>
            
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto relative z-10">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Link size={20} className="mr-2 text-green-600" />
                  Sharable Link
                </h3>
              </div>
              
              <div className="p-6">
                <p className="mb-4 text-gray-600">
                  Share this link with clients and interested parties to view the {saleDetails.name}.
                </p>
                
                <div className="flex items-center mt-2 border rounded-md overflow-hidden">
                  <div className="bg-gray-50 border-r py-2 px-4 flex items-center">
                    <Link size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={salesPageUrl}
                    readOnly
                    className="flex-grow py-2 px-4 focus:outline-none"
                  />
                  <button
                    onClick={copyLinkToClipboard}
                    className="bg-gray-50 border-l py-2 px-4 hover:bg-gray-100 transition-colors flex items-center"
                    title="Copy to clipboard"
                  >
                    {linkCopied ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
                
                {linkCopied && (
                  <p className="mt-2 text-sm text-green-600">
                    Link copied to clipboard!
                  </p>
                )}
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    This link will be valid until the sale ends.
                  </div>
                  <button
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share to Clients Modal */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowClientModal(false)}></div>
            
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto relative z-10">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  Share Sale Details with Clients
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-4 relative">
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={e => setClientSearch(e.target.value)}
                    placeholder="Search clients by name, company or email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{filteredClients.length} clients found</span>
                    <span>{selectedClients.length} selected</span>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden max-h-80 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Select
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClients.map(client => (
                          <tr key={client.id} 
                              onClick={() => toggleClientSelection(client.id)}
                              className="cursor-pointer hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedClients.includes(client.id)}
                                onChange={() => {}} // Handled by the row click
                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{client.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{client.company}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{client.email}</div>
                            </td>
                          </tr>
                        ))}
                        {filteredClients.length === 0 && (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                              No clients found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendToSelectedClients}
                    className="px-4 py-2 text-white rounded-md flex items-center transition-colors duration-200"
                    style={{ 
                      backgroundColor: selectedClients.length > 0 ? '#1E4841' : '#9CA3AF',
                      cursor: selectedClients.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                    onMouseOver={(e) => {
                      if (selectedClients.length > 0) {
                        e.currentTarget.style.backgroundColor = '#2c5f57';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedClients.length > 0) {
                        e.currentTarget.style.backgroundColor = '#1E4841';
                      }
                    }}
                    disabled={selectedClients.length === 0}
                  >
                    <Mail size={16} className="mr-2" />
                    Share with Selected ({selectedClients.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draggable Animals for Sale (DIV-based layout instead of TABLE) */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Animals for Sale</h2>
            <p className="text-sm text-gray-600 font-medium">Drag animals to change their lot order. The lot number will automatically update.</p>
          </div>
          
          {/* Animal Search and Add */}
          <div className="relative" ref={searchRef}>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={animalSearch}
                  onChange={e => setAnimalSearch(e.target.value)}
                  placeholder="Search animals by ID or name..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 flex items-center"
                style={{ backgroundColor: '#1E4841' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
              >
                <Plus size={16} className="mr-1" />
                ADD ANIMAL TO SALE
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                <ul className="py-1">
                  {searchResults.map(animal => (
                    <li 
                      key={animal.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => addAnimalToSale(animal)}
                    >
                      <div>
                        <div className="font-medium">{animal.mNumber} - {animal.name}</div>
                        <div className="text-sm text-gray-500">
                          DOB: {animal.dob} | Sire: {animal.sire}
                        </div>
                      </div>
                      <button className="text-green-600 hover:text-green-800">
                        <Plus size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          {/* Table Header (using divs) */}
          <div className="bg-gray-100 grid grid-cols-10 gap-1 px-4 py-2 border-b">
            <div className="text-left text-sm font-medium text-gray-600">Lot #</div>
            <div className="text-left text-sm font-medium text-gray-600">Thumbnail</div>
            <div className="text-left text-sm font-medium text-gray-600">M Number</div>
            <div className="text-left text-sm font-medium text-gray-600">Name</div>
            <div className="text-left text-sm font-medium text-gray-600">DOB</div>
            <div className="text-left text-sm font-medium text-gray-600">Sire</div>
            <div className="text-left text-sm font-medium text-gray-600">Dam</div>
            <div className="text-left text-sm font-medium text-gray-600">Expected Value</div>
            <div className="text-left text-sm font-medium text-gray-600">Actions</div>
            <div className="text-left text-sm font-medium text-gray-600">Remove</div>
          </div>

          {/* Draggable Table Body */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="animals">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white"
                >
                  {animals.map((animal, index) => (
                    <Draggable
                      key={animal.id}
                      draggableId={animal.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`grid grid-cols-10 gap-1 px-4 py-2 border-b ${
                            snapshot.isDragging ? "bg-blue-100 shadow-md" : "hover:bg-gray-50"
                          } cursor-move touch-none`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="text-left flex items-center">
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                              {index + 1}
                            </span>
                          </div>
                          <div className="text-left">
                            <img
                              src={imageArray[index % imageArray.length]}
                              alt={animal.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          </div>
                          <div className="text-left text-sm flex items-center">{animal.mNumber}</div>
                          <div className="text-left text-sm font-medium flex items-center">{animal.name}</div>
                          <div className="text-left text-sm flex items-center">{animal.dob}</div>
                          <div className="text-left text-sm flex items-center">{animal.sire}</div>
                          <div className="text-left text-sm flex items-center">{animal.dam}</div>
                          <div className="text-left text-sm flex items-center">
                            {animal.locked ? (
                              <span
                                onDoubleClick={() => unlockAnimal(animal.id)}
                                className="cursor-pointer font-medium"
                                title="Double-click to edit"
                              >
                                {parseFloat(animal.price).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                })}
                              </span>
                            ) : (
                              <input
                                type="text"
                                value={animal.price || ''}
                                onChange={e => handleExpectedValueChange(animal.id, e.target.value)}
                                onKeyDown={e => handleKeyDown(e, animal.id)}
                                placeholder="$0.00"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                              />
                            )}
                          </div>
                          <div className="text-left text-sm flex items-center">
                            <button className="text-blue-600 hover:underline">View Details</button>
                          </div>
                          <div className="text-left text-sm flex items-center">
                            <button 
                              onClick={() => removeAnimalFromSale(animal.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove from sale"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>

      {/* Featured Animals */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Animals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {animals.slice(0, 3).map((animal, index) => (
            <div
              key={animal.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                className="w-full h-80 object-cover"
                src={imageArray[index % imageArray.length]}
                alt={animal.name}
              />
              <div className="p-4 text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{animal.name}</h3>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                    Lot #{index + 1}
                  </span>
                </div>
                <p className="text-gray-600">M Number: {animal.mNumber}</p>
                <button className="mt-2 text-blue-600 hover:underline">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sale Information Accordion */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="w-full text-left text-lg font-medium text-green-700 hover:underline"
          >
            {showAdditional ? "Hide Details" : "Show More Details"}
          </button>
          {showAdditional && (
            <div className="mt-4 text-gray-700 space-y-2">
              <p>• Top performing bulls will be showcased with detailed performance records.</p>
              <p>• Interactive viewing appointments and guided tours available.</p>
              <p>• Exclusive offers for early bidders and returning clients.</p>
              <p>• Post-sale livestock tracking and performance insights available.</p>
              <p>• Live updates and interactive features during the sale event.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpringBullSale2025Page;