import React, { useState } from 'react';
import { 
  Sidebar, ChevronLeft, ChevronRight, Home, Users, Calendar, BarChart2, 
  Mail, Search, Settings, LogOut, Menu, X, Database, ChevronDown, ChevronUp, ShoppingCart 
} from 'lucide-react';
import AnimalProfilePage from './AnimalProfilePage';
import SpringBullSale2025Page from './SpringBullSale2025Page'; // Import your sale page
import JohnSmithProfilePage from './JohnSmithProfilePage'; // Import John Smith's profile page
import FarmDetailsModal from './FarmDetailsModal'; // Import the FarmDetailsModal component
import AddClientModal from './AddClientModal'; // Import the AddClientModal component
import AddAnimalModal from './AddAnimalModal'; // Import the AddAnimalModal component
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area 
} from 'recharts';

const FrisbeeApp = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [animalsDropdownOpen, setAnimalsDropdownOpen] = useState(false);
  // Sample data for demonstration
  const animals = [
    // Active animals
    { id: 1, mNumber: 'NMMT001', name: 'Thunder', status: 'Active', dob: '12/04/22', sire: 'Summit', dam: 'Lady 401', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 2, mNumber: 'NMMT014', name: 'Titan', status: 'Active', dob: '23/05/22', sire: 'Ranger', dam: 'Duchess 212', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 3, mNumber: 'NMMT023', name: 'Triumph', status: 'Active', dob: '05/03/22', sire: 'Quest', dam: 'Queen 308', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 4, mNumber: 'NMMT045', name: 'Trooper', status: 'Active', dob: '18/02/22', sire: 'Sovereign', dam: 'Emerald 871', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 5, mNumber: 'NMMT058', name: 'Trident', status: 'Active', dob: '30/07/22', sire: 'Ruler', dam: 'Ruby 555', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 6, mNumber: 'NMMV062', name: 'Valor', status: 'Active', dob: '14/04/24', sire: 'Titan', dam: 'Princess 561', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 7, mNumber: 'NMMV078', name: 'Viking', status: 'Active', dob: '28/06/24', sire: 'Ulysses', dam: 'Beauty 789', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 8, mNumber: 'NMMU091', name: 'Ultimate', status: 'Active', dob: '03/05/23', sire: 'Thunder', dam: 'Diamond 347', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 9, mNumber: 'NMMU104', name: 'Union', status: 'Active', dob: '19/03/23', sire: 'Titan', dam: 'Pearl 660', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 10, mNumber: 'NMMU112', name: 'Unity', status: 'Active', dob: '07/01/23', sire: 'Summit', dam: 'Sapphire 329', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    
    // Animals in upcoming sales
    { id: 11, mNumber: 'NMMU118', name: 'Uptown', status: 'Added to Spring Bull Sale 2025', dob: '25/04/23', sire: 'Sovereign', dam: 'Crystal 444', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 12, mNumber: 'NMMU127', name: 'Universe', status: 'Added to Spring Bull Sale 2025', dob: '13/02/23', sire: 'Ranger', dam: 'Jewel 777', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 13, mNumber: 'NMMU135', name: 'Uppercut', status: 'Added to Spring Bull Sale 2025', dob: '30/03/23', sire: 'Rebel', dam: 'Starlight 901', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 14, mNumber: 'NMMU142', name: 'Urban', status: 'Added to Spring Bull Sale 2025', dob: '17/01/23', sire: 'Titan', dam: 'Moonbeam 234', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 15, mNumber: 'NMMT157', name: 'Tempest', status: 'Added to Spring Bull Sale 2025', dob: '22/02/22', sire: 'Sailor', dam: 'Lady 401', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 16, mNumber: 'NMMT163', name: 'Target', status: 'Added to Spring Bull Sale 2025', dob: '09/05/22', sire: 'Ranger', dam: 'Duchess 212', price: '', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 17, mNumber: 'NMMQ175', name: 'Queen', status: 'Added to Autumn Female Sale 2025', dob: '11/06/19', sire: 'Prophet', dam: 'Queen 308', price: '', actions: 'View Animal / Edit Animal', type: 'Female' },
    { id: 18, mNumber: 'NMMQ188', name: 'Quality', status: 'Added to Autumn Female Sale 2025', dob: '28/04/19', sire: 'Neptune', dam: 'Princess 561', price: '', actions: 'View Animal / Edit Animal', type: 'Female' },
    { id: 19, mNumber: 'NMMR196', name: 'Ruby', status: 'Added to Autumn Female Sale 2025', dob: '03/07/20', sire: 'Olympus', dam: 'Beauty 789', price: '', actions: 'View Animal / Edit Animal', type: 'Female' },
    { id: 20, mNumber: 'NMMR204', name: 'Rosebud', status: 'Added to Autumn Female Sale 2025', dob: '14/05/20', sire: 'Pinnacle', dam: 'Rosebud 123', price: '', actions: 'View Animal / Edit Animal', type: 'Female' },
    
    // Sold animals with purchaser information
    { id: 21, mNumber: 'NMMS213', name: 'Summit', status: 'Sold', dob: '26/03/21', sire: 'Quest', dam: 'Diamond 347', price: '$38,500', purchaser: 'John Smith Farms', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 22, mNumber: 'NMMS225', name: 'Sovereign', status: 'Sold', dob: '08/04/21', sire: 'Rebel', dam: 'Ruby 555', price: '$42,000', purchaser: 'Johnson Livestock', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 23, mNumber: 'NMMS231', name: 'Sailor', status: 'Sold', dob: '15/02/21', sire: 'Quantum', dam: 'Pearl 660', price: '$56,000', purchaser: 'Brown & Sons', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 24, mNumber: 'NMMS247', name: 'Stronghold', status: 'Sold', dob: '29/01/21', sire: 'Ranger', dam: 'Emerald 871', price: '$48,200', purchaser: 'Williams Ranch', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 25, mNumber: 'NMMR258', name: 'Ranger', status: 'Sold', dob: '11/03/20', sire: 'Pinnacle', dam: 'Sapphire 329', price: '$72,500', purchaser: 'Davis Cattle Co.', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 26, mNumber: 'NMMR267', name: 'Rebel', status: 'Sold', dob: '22/05/20', sire: 'Quantum', dam: 'Crystal 444', price: '$68,000', purchaser: 'Wilson Stock', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 27, mNumber: 'NMMR279', name: 'Ruler', status: 'Sold', dob: '06/02/20', sire: 'Pinnacle', dam: 'Jewel 777', price: '$64,500', purchaser: 'Thompson Farms', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 28, mNumber: 'NMMR288', name: 'Racer', status: 'Sold', dob: '19/04/20', sire: 'Olympus', dam: 'Starlight 901', price: '$52,800', purchaser: 'Anderson Ranch', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 29, mNumber: 'NMMQ295', name: 'Quest', status: 'Sold', dob: '28/01/19', sire: 'Neptune', dam: 'Moonbeam 234', price: '$78,200', purchaser: 'Miller Livestock', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 30, mNumber: 'NMMQ302', name: 'Quantum', status: 'Sold', dob: '14/03/19', sire: 'Neptune', dam: 'Queen 308', price: '$82,400', purchaser: 'Taylor Bulls', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 31, mNumber: 'NMMQ318', name: 'Quasar', status: 'Sold', dob: '02/05/19', sire: 'Olympus', dam: 'Duchess 212', price: '$65,800', purchaser: 'Harrison Farming', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 32, mNumber: 'NMMQ327', name: 'Quicksilver', status: 'Sold', dob: '17/06/19', sire: 'Neptune', dam: 'Princess 561', price: '$58,500', purchaser: 'Campbell Cattle', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 33, mNumber: 'NMMP335', name: 'Pinnacle', status: 'Sold', dob: '24/02/18', sire: 'Legacy', dam: 'Diamond 347', price: '$77,500', purchaser: 'Roberts Ranch', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 34, mNumber: 'NMMP342', name: 'Prophet', status: 'Sold', dob: '09/04/18', sire: 'Galaxy', dam: 'Pearl 660', price: '$80,000', purchaser: 'Lewis Farms', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 35, mNumber: 'NMMP356', name: 'Prestige', status: 'Sold', dob: '18/03/18', sire: 'Legacy', dam: 'Rosebud 123', price: '$76,200', purchaser: 'Morgan Cattle Co.', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 36, mNumber: 'NMMP368', name: 'Patriot', status: 'Sold', dob: '30/05/18', sire: 'Galaxy', dam: 'Sapphire 329', price: '$69,800', purchaser: 'Clark Livestock', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 37, mNumber: 'NMMP375', name: 'Paragon', status: 'Sold', dob: '12/07/18', sire: 'Legacy', dam: 'Beauty 789', price: '$72,000', purchaser: 'Allen Farms', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 38, mNumber: 'NMMS384', name: 'Statesman', status: 'Sold', dob: '25/09/21', sire: 'Ranger', dam: 'Diamond 347', price: '$46,500', purchaser: 'Foster Ranch', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 39, mNumber: 'NMMS391', name: 'Superstar', status: 'Sold', dob: '07/08/21', sire: 'Rebel', dam: 'Ruby 555', price: '$49,800', purchaser: 'Mitchell Cattle', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 40, mNumber: 'NMMS403', name: 'Spectator', status: 'Sold', dob: '14/11/21', sire: 'Quantum', dam: 'Crystal 444', price: '$41,200', purchaser: 'Cooper Stock', actions: 'View Animal / Edit Animal', type: 'Bull' },
    { id: 41, mNumber: 'NJW23U998', name: 'UMAGA', status: 'Sold', dob: '10/07/2023', sire: 'Taimate Roy R38', dam: 'Barunah K26', price: '$41,200', purchaser: 'Cooper Stock', actions: 'View Animal / Edit Animal', type: 'Bull' },
  ];

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
    { id: 11, name: 'Susan Clark', company: 'Clark Harvest', email: 'susan@clarkharvest.com', phone: '(555) 123-0987', purchases: 14, purchasesValue: '$350,400' },
    { id: 12, name: 'Michael Lee', company: 'Lee Produce', email: 'michael@leeproduce.com', phone: '(555) 234-1098', purchases: 5, purchasesValue: '$110,250' },
    { id: 13, name: 'Emma Garcia', company: 'Garcia Greens', email: 'emma@garciagreens.com', phone: '(555) 345-2109', purchases: 8, purchasesValue: '$198,500' },
    { id: 14, name: 'Oliver Martinez', company: 'Martinez Farms', email: 'oliver@martinezfarms.com', phone: '(555) 456-3210', purchases: 7, purchasesValue: '$175,300' },
    { id: 15, name: 'Sophia Turner', company: 'Turner Orchards', email: 'sophia@turnerorchards.com', phone: '(555) 567-4321', purchases: 10, purchasesValue: '$240,750' },
    { id: 16, name: 'Ethan Robinson', company: 'Robinson Produce', email: 'ethan@robinsonproduce.com', phone: '(555) 678-5432', purchases: 6, purchasesValue: '$132,400' },
    { id: 17, name: 'Benjamin Edwards', company: 'Edwards Farms', email: 'benjamin@edwardsfarms.com', phone: '(555) 200-0017', purchases: 5, purchasesValue: '$135,000' },
    { id: 18, name: 'Charlotte Nelson', company: 'Nelson Produce', email: 'charlotte@nelsonproduce.com', phone: '(555) 200-0018', purchases: 7, purchasesValue: '$165,400' },
    { id: 19, name: 'Daniel King', company: 'King Harvest', email: 'daniel@kingharvest.com', phone: '(555) 200-0019', purchases: 6, purchasesValue: '$142,500' },
    { id: 20, name: 'Amelia Scott', company: 'Scott Orchards', email: 'amelia@scottorchards.com', phone: '(555) 200-0020', purchases: 8, purchasesValue: '$190,300' },
    { id: 21, name: 'Lucas Moore', company: 'Moore Agri', email: 'lucas@mooreagri.com', phone: '(555) 200-0021', purchases: 4, purchasesValue: '$120,000' },
    { id: 22, name: 'Mia Walker', company: 'Walker Produce', email: 'mia@walkerproduce.com', phone: '(555) 200-0022', purchases: 9, purchasesValue: '$210,000' },
    { id: 23, name: 'Henry Young', company: 'Young Farms', email: 'henry@youngfarms.com', phone: '(555) 200-0023', purchases: 10, purchasesValue: '$250,000' },
    { id: 24, name: 'Isabella Allen', company: 'Allen Orchards', email: 'isabella@allenorchards.com', phone: '(555) 200-0024', purchases: 7, purchasesValue: '$175,600' },
    { id: 25, name: 'Jackson Hernandez', company: 'Hernandez Produce', email: 'jackson@hernandezproduce.com', phone: '(555) 200-0025', purchases: 11, purchasesValue: '$310,500' },
    { id: 26, name: 'Avery Mitchell', company: 'Mitchell Agri', email: 'avery@mitchellagri.com', phone: '(555) 200-0026', purchases: 5, purchasesValue: '$130,200' },
    { id: 27, name: 'Logan Carter', company: 'Carter Farms', email: 'logan@carterfarms.com', phone: '(555) 200-0027', purchases: 6, purchasesValue: '$145,300' },
    { id: 28, name: 'Abigail Reed', company: 'Reed Livestock', email: 'abigail@reedlivestock.com', phone: '(555) 200-0028', purchases: 8, purchasesValue: '$180,450' },
    { id: 29, name: 'Alexander Brooks', company: 'Brooks Ranch', email: 'alexander@brooksranch.com', phone: '(555) 200-0029', purchases: 12, purchasesValue: '$290,000' },
    { id: 30, name: 'Emily Bailey', company: 'Bailey Farms', email: 'emily@baileyfarms.com', phone: '(555) 200-0030', purchases: 4, purchasesValue: '$100,000' },
    { id: 31, name: 'Matthew Cooper', company: 'Cooper Crops', email: 'matthew@coopercrops.com', phone: '(555) 200-0031', purchases: 9, purchasesValue: '$220,000' },
    { id: 32, name: 'Ella Richardson', company: 'Richardson Agri', email: 'ella@richardsonagri.com', phone: '(555) 200-0032', purchases: 7, purchasesValue: '$175,000' },
    { id: 33, name: 'Jacob Peterson', company: 'Peterson Produce', email: 'jacob@petersonproduce.com', phone: '(555) 200-0033', purchases: 10, purchasesValue: '$240,000' },
    { id: 34, name: 'Chloe Jenkins', company: 'Jenkins Farms', email: 'chloe@jenkinsfarms.com', phone: '(555) 200-0034', purchases: 5, purchasesValue: '$130,000' },
    { id: 35, name: 'Michael Hughes', company: 'Hughes Harvest', email: 'michael@hughesharvest.com', phone: '(555) 200-0035', purchases: 8, purchasesValue: '$195,000' },
    { id: 36, name: 'Grace Foster', company: 'Foster Livestock', email: 'grace@fosterlivestock.com', phone: '(555) 200-0036', purchases: 6, purchasesValue: '$150,000' },
    { id: 37, name: 'Elijah Graham', company: 'Graham Organic', email: 'elijah@grahamorganic.com', phone: '(555) 200-0037', purchases: 11, purchasesValue: '$275,000' },
    { id: 38, name: 'Victoria Hayes', company: 'Hayes Farms', email: 'victoria@hayesfarms.com', phone: '(555) 200-0038', purchases: 7, purchasesValue: '$160,000' },
    { id: 39, name: 'Sebastian Long', company: 'Long Ranch', email: 'sebastian@longranch.com', phone: '(555) 200-0039', purchases: 10, purchasesValue: '$240,000' },
    { id: 40, name: 'Lily Bryant', company: 'Bryant Agri', email: 'lily@bryantagri.com', phone: '(555) 200-0040', purchases: 4, purchasesValue: '$115,000' },
    { id: 41, name: 'Owen Russell', company: 'Russell Crops', email: 'owen@russellcrops.com', phone: '(555) 200-0041', purchases: 9, purchasesValue: '$225,000' },
    { id: 42, name: 'Hannah Simmons', company: 'Simmons Produce', email: 'hannah@simmonsproduce.com', phone: '(555) 200-0042', purchases: 5, purchasesValue: '$140,000' },
    { id: 43, name: 'Caleb Ward', company: 'Ward Orchards', email: 'caleb@wardorchards.com', phone: '(555) 200-0043', purchases: 8, purchasesValue: '$200,000' },
    { id: 44, name: 'Zoe Perry', company: 'Perry Farms', email: 'zoe@perryfarm.com', phone: '(555) 200-0044', purchases: 6, purchasesValue: '$155,000' },
    { id: 45, name: 'Nathan Cox', company: 'Cox Livestock', email: 'nathan@coxlivestock.com', phone: '(555) 200-0045', purchases: 7, purchasesValue: '$175,000' },
    { id: 46, name: 'Aria Ramirez', company: 'Ramirez Ranch', email: 'aria@ramirezranch.com', phone: '(555) 200-0046', purchases: 10, purchasesValue: '$245,000' }
  ];

    const sales = [
        // Upcoming Sales for 2025
        { id: 1, name: 'Spring Bull Sale 2025', date: '2025-04-15', status: 'Upcoming', animals: 115, expectedValue: '$3,250,000' },
        { id: 2, name: 'Autumn Female Sale 2025', date: '2025-10-12', status: 'Upcoming', animals: 108, expectedValue: '$2,875,000' },
        
        // Past Bull Sales (one per year)
        { id: 3, name: 'Annual Bull Sale 2024', date: '2024-04-18', status: 'Completed', animals: 112, expectedValue: '$3,120,000' },
        { id: 4, name: 'Annual Bull Sale 2023', date: '2023-04-20', status: 'Completed', animals: 105, expectedValue: '$2,940,000' },
        { id: 5, name: 'Annual Bull Sale 2022', date: '2022-04-15', status: 'Completed', animals: 118, expectedValue: '$3,480,000' },
        { id: 6, name: 'Annual Bull Sale 2021', date: '2021-04-17', status: 'Completed', animals: 104, expectedValue: '$2,780,000' },
        { id: 7, name: 'Annual Bull Sale 2020', date: '2020-04-15', status: 'Completed', animals: 110, expectedValue: '$2,950,000' },
        { id: 8, name: 'Annual Bull Sale 2019', date: '2019-04-18', status: 'Completed', animals: 102, expectedValue: '$2,630,000' },
        
        // Female Sales (every 3 years)
        { id: 9, name: 'Premium Female Sale 2023', date: '2023-10-05', status: 'Completed', animals: 120, expectedValue: '$3,850,000' },
        { id: 10, name: 'Premium Female Sale 2020', date: '2020-10-08', status: 'Completed', animals: 116, expectedValue: '$3,600,000' },
      ];

      const renderScreen = () => {
        switch(activeScreen) {
          case 'dashboard':
            return <DashboardScreen />;
          case 'clients':
            return <ClientsScreen clients={clients} animals={animals} setActiveScreen={setActiveScreen} />;
          case 'animals':
            return <AnimalsScreen animals={animals} setActiveScreen={setActiveScreen} />;
          case 'bulls':
            return <AnimalsScreen animals={animals.filter(animal => animal.type === 'Bull')} setActiveScreen={setActiveScreen} title="Bulls" />;
          case 'females':
            return <AnimalsScreen animals={animals.filter(animal => animal.type === 'Female')} setActiveScreen={setActiveScreen} title="Females" />;
          case 'animalProfile':
            return <AnimalProfilePage />;
          case 'sales':
            return <SalesScreen sales={sales} setActiveScreen={setActiveScreen} />;
          case 'springBullSale2025':
            return <SpringBullSale2025Page />;
          case 'analytics':
            return <AnalyticsScreen />;
          case 'marketing':
            return <MarketingScreen />;
          case 'marketplace':
            return <MarketplaceScreen />; // Add this line
          case 'johnSmithProfile':
            return <JohnSmithProfilePage />;
          default:
            return <DashboardScreen />;
        }
      };
    
      return (
        <div className="flex h-screen bg-gray-100">
          {/* Mobile menu button */}
          <div className="fixed top-4 left-4 z-40 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white rounded-md shadow"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
      
          {/* Sidebar / Navigation - UPDATED with #1E4841 background color */}
          <div 
            className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 transform shadow md:relative md:translate-x-0 
              ${sidebarCollapsed ? 'w-20' : 'w-64'} 
              ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            style={{ backgroundColor: '#1E4841' }} // Added custom background color
          >
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#2c5f57]">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
              {!sidebarCollapsed ? (
                // When sidebar is expanded, show full logo with text
                <div className="flex items-center">
                  <img 
                    src="/Logo/Frisbee_White.png" 
                    alt="Frisbee Logo" 
                    className="h-8 mr-2" 
                  />
                </div>
              ) : (
                // When sidebar is collapsed, show just the favicon
                <img 
                  src="/Logo/logo_white.png" 
                  alt="Frisbee Icon" 
                  className="h-8 w-8" 
                />
              )}
            </div>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded hover:bg-[#2c5f57] text-white hidden md:block"
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
                
            <nav className="px-2 py-4">
              <ul className="space-y-2">
                <NavItem 
                  icon={<Home className="text-white" />} 
                  title="Dashboard" 
                  active={activeScreen === 'dashboard'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('dashboard');
                    setMobileMenuOpen(false);
                  }} 
                />
                <NavItem 
                  icon={<Users className="text-white" />} 
                  title="Clients" 
                  active={activeScreen === 'clients'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('clients');
                    setMobileMenuOpen(false);
                  }} 
                />
                {/* Animals NavItem with drop-down */}
                <NavItem 
                  icon={<Database className="text-white" />} 
                  title="Animals" 
                  active={activeScreen === 'animals' || activeScreen === 'bulls' || activeScreen === 'females'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setAnimalsDropdownOpen(!animalsDropdownOpen);
                    // Only set the active screen to animals if already on a child screen
                    if (activeScreen !== 'bulls' && activeScreen !== 'females') {
                      setActiveScreen('animals');
                    }
                    setMobileMenuOpen(false);
                  }} 
                >
                  {!sidebarCollapsed && (
                    <span className="ml-auto text-white">
                      {animalsDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  )}
                </NavItem>
                {/* Render nested dropdown if Animals is expanded */}
                {animalsDropdownOpen && !sidebarCollapsed && (
                  <ul className="ml-6 mt-1 space-y-1">
                    <NavItem 
                      icon={<span className="w-4 h-4 block bg-white rounded-full"></span>}
                      title="All Animals"
                      active={activeScreen === 'animals'}
                      collapsed={false}
                      onClick={() => {
                        setActiveScreen('animals');
                        setMobileMenuOpen(false);
                      }}
                    />
                    <NavItem 
                      icon={<span className="w-4 h-4 block bg-white rounded-full"></span>}
                      title="Bulls"
                      active={activeScreen === 'bulls'}
                      collapsed={false}
                      onClick={() => {
                        setActiveScreen('bulls');
                        setMobileMenuOpen(false);
                      }}
                    />
                    <NavItem 
                      icon={<span className="w-4 h-4 block bg-white rounded-full"></span>}
                      title="Females"
                      active={activeScreen === 'females'}
                      collapsed={false}
                      onClick={() => {
                        setActiveScreen('females');
                        setMobileMenuOpen(false);
                      }}
                    />
                  </ul>
                )}
                {/* Sales NavItem with drop-down */}
                <NavItem 
                  icon={<Calendar className="text-white" />} 
                  title="Sales" 
                  active={activeScreen === 'sales' || activeScreen === 'springBullSale2025'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('sales');
                    setSalesDropdownOpen(!salesDropdownOpen);
                    setMobileMenuOpen(false);
                  }} 
                >
                  {!sidebarCollapsed && (
                    <span className="ml-auto text-white">
                      {salesDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  )}
                </NavItem>
                {/* Render nested dropdown if Sales is expanded */}
                {salesDropdownOpen && !sidebarCollapsed && (
                  <ul className="ml-6 mt-1 space-y-1">
                    <NavItem 
                      icon={<span className="w-4 h-4 block bg-green-600 rounded-full"></span>}
                      title="Spring Sale 2025"
                      active={activeScreen === 'springBullSale2025'}
                      collapsed={false}
                      onClick={() => {
                        setActiveScreen('springBullSale2025');
                        setMobileMenuOpen(false);
                      }}
                    />
                  </ul>
                )}
                <NavItem 
                  icon={<BarChart2 className="text-white" />} 
                  title="Analytics" 
                  active={activeScreen === 'analytics'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('analytics');
                    setMobileMenuOpen(false);
                  }} 
                />
                <NavItem 
                  icon={<Mail className="text-white" />} 
                  title="Marketing" 
                  active={activeScreen === 'marketing'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('marketing');
                    setMobileMenuOpen(false);
                  }} 
                />
                <NavItem 
                  icon={<ShoppingCart className="text-white" />} 
                  title="Marketplace" 
                  active={activeScreen === 'marketplace'} 
                  collapsed={sidebarCollapsed}
                  onClick={() => {
                    setActiveScreen('marketplace');
                    setMobileMenuOpen(false);
                  }} 
                />
              </ul>
    
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <ul className="space-y-2">
                  <NavItem 
                    icon={<Settings className="text-white" />} 
                    title="Settings" 
                    collapsed={sidebarCollapsed}
                    onClick={() => {}} 
                  />
                  <NavItem 
                    icon={<LogOut className="text-white" />} 
                    title="Logout" 
                    collapsed={sidebarCollapsed}
                    onClick={() => {}} 
                  />
                </ul>
              </div>
            </nav>
          </div>
      
   {/* Main Content */}
   <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <h1 className="text-xl font-semibold">
            {activeScreen === 'bulls' ? 'Bulls' : 
             activeScreen === 'females' ? 'Females' : 
             activeScreen.charAt(0).toUpperCase() + activeScreen.slice(1)}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Replace this div with the FarmDetailsModal component */}
            {/* <div className="relative">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white">
                JS
              </span>
            </div> */}
            
            {/* Farm Details Modal Component */}
            <FarmDetailsModal />
          </div>
        </header>

        <main className="p-6">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

      
    // Navigation Item Component - UPDATED for dark sidebar
    const NavItem = ({ icon, title, active, collapsed, onClick, children }) => {
      return (
        <li>
          <div 
            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors
              ${active ? 'bg-[#2c5f57] text-white' : 'text-gray-200 hover:bg-[#2c5f57]'}`}
            onClick={onClick}
          >
            <div className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
              {icon}
            </div>
            {!collapsed && <span>{title}</span>}
            {!collapsed && children}
          </div>
        </li>
      );
    };
      
    // Reusable Components
const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};


    // Screen Components
   const DashboardScreen = () => {
  const [chartView, setChartView] = useState('revenue'); // 'revenue' or 'profit'
  
  // Static data for demonstration - in a real app, this would come from your API or props
  const salesData = [
    { month: 'Jan', revenue: 185000, cost: 75000, profit: 110000 },
    { month: 'Feb', revenue: 172000, cost: 72000, profit: 100000 },
    { month: 'Mar', revenue: 193000, cost: 77000, profit: 116000 },
    { month: 'Apr', revenue: 224000, cost: 82000, profit: 142000 },
    { month: 'May', revenue: 185000, cost: 76000, profit: 109000 },
    { month: 'Jun', revenue: 210000, cost: 79000, profit: 131000 },
    { month: 'Jul', revenue: 235000, cost: 85000, profit: 150000 },
    { month: 'Aug', revenue: 252000, cost: 88000, profit: 164000 },
  ];

  const ebvData = [
    { trait: 'Birth Weight', value: 2.4, valueImportance: 65 },
    { trait: 'Weaning Weight', value: 48.2, valueImportance: 82 },
    { trait: 'Yearling Weight', value: 85.6, valueImportance: 74 },
    { trait: 'Milk', value: 8.1, valueImportance: 68 },
    { trait: 'Marbling', value: 78.82, valueImportance: 90 },
    { trait: 'Rib Eye Area', value: 0.45, valueImportance: 72 },
    { trait: 'Docility', value: 12.5, valueImportance: 88 },
    { trait: 'Calving Ease', value: 8.7, valueImportance: 95 },
  ];

  const breedDistribution = [
    { name: 'Angus', value: 42 },
    { name: 'Hereford', value: 28 },
    { name: 'Charolais', value: 15 },
    { name: 'Simmental', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Calculate totals and changes for stats cards
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  
  // Calculate current month's performance vs previous month
  const currentMonth = salesData[salesData.length - 1];
  const previousMonth = salesData[salesData.length - 2];
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const profitChange = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit * 100).toFixed(1);
  
  // Custom tooltip components for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const EBVTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-900">{data.trait}</p>
          <p className="text-blue-600">EBV Value: {data.value}</p>
          <p className="text-green-600">$ Impact: ${(data.value * data.valueImportance / 10).toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Farm Overview</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Export Data
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm">
            Filter
          </button>
        </div>
      </div>
      
      {/* Key Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total Animals" 
          value="1024" 
          change="+12% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Total Active Animals" 
          value="484" 
          positive={true} 
        />
        <StatCard 
          title="Active Clients" 
          value="248" 
          change="+5% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Revenue YTD" 
          value={`$${(totalRevenue/1000).toFixed(1)}k`} 
          change={`${revenueChange}% vs last month`} 
          positive={parseFloat(revenueChange) > 0} 
        />
      </div>
      
      {/* EBV to Value Analysis */}
      <div className="grid grid-cols-1 gap-6">
        <Card title="EBVs to $ Value Analysis">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ebvData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trait" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip content={<EBVTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="EBV Value" />
                <Bar 
                  yAxisId="right" 
                  dataKey={(data) => (data.value * data.valueImportance / 10)} 
                  fill="#82ca9d" 
                  name="$ Impact" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      
      {/* Recent Activity and Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <div className="space-y-3">
            {[
              { type: 'sale', description: 'Spring Auction 2025 completed', time: '2 days ago', value: '$235,000' },
              { type: 'client', description: 'New client registered: David Wilson', time: '3 days ago' },
              { type: 'animal', description: 'Bull "Thunder" marked as sold', time: '5 days ago', value: '$18,400' },
              { type: 'sale', description: 'Winter Clearance finalized', time: '1 week ago', value: '$124,000' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start p-2 hover:bg-gray-50 rounded">
                <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                  activity.type === 'sale' ? 'bg-green-500' : 
                  activity.type === 'client' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div className="flex-grow">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                {activity.value && (
                  <div className="font-semibold">{activity.value}</div>
                )}
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Top Clients">
          <div className="space-y-3">
            {[
              { name: 'Robert Brown', company: 'Brown & Sons', purchases: 12, value: '$145,600' },
              { name: 'John Smith', company: 'Smith Farms', purchases: 8, value: '$98,200' },
              { name: 'Mary Johnson', company: 'Johnson Livestock', purchases: 5, value: '$62,500' },
              { name: 'David Wilson', company: 'Wilson Ranch', purchases: 3, value: '$24,800' }
            ].map((client, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{client.value}</p>
                  <p className="text-sm text-gray-500">{client.purchases} purchases</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
      
const ClientsScreen = ({ clients, setActiveScreen, animals }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleViewClient = (client) => {
    if (client.name === 'John Smith') {
      // Navigate to John Smith's profile
      setActiveScreen('johnSmithProfile');
    } else {
      alert(`No profile page set up yet for ${client.name}.`);
    }
  };
  
  const handleAddClient = (newClient) => {
    // In a real application, you would add the client to your database
    // and then update the state with the new client
    alert(`Client ${newClient.name} added successfully with ${newClient.assignedAnimals.length} assigned animals!`);
    
    // Here you would typically make an API call and then update your state
    // For example: 
    // const newClientWithId = { ...newClient, id: clients.length + 1, purchases: 0, purchasesValue: '$0' };
    // setClients([...clients, newClientWithId]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Client Management</h2>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
            onClick={() => setModalOpen(true)}
          >
            Add New Client
          </button>
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            Import Clients
          </button>
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            Export Clients
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchases Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.purchases}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{client.purchasesValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                    <button 
                      className="text-green-600 hover:text-green-900 mr-2"
                      onClick={() => handleViewClient(client)}
                    >
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add New Client Modal */}
      <AddClientModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddClient}
        animals={animals}
      />
    </div>
  );
};
      
const AnimalsScreen = ({ animals, setActiveScreen, title = 'Animal Management' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [yearFilter, setYearFilter] = useState('');
  
  const handleViewAnimal = (animal) => {
    setActiveScreen('animalProfile');
  };
  
  const handleAddAnimal = (newAnimal) => {
    // In a real application, you would add the animal to your database
    // and then update the state with the new animal
    alert(`Animal ${newAnimal.name} added successfully!`);
    
    // Here you would typically make an API call and then update your state
    // For example: 
    // const newAnimalWithId = { ...newAnimal, id: animals.length + 1, actions: 'View Animal / Edit Animal' };
    // setAnimals([...animals, newAnimalWithId]);
  };
  
  // Filter animals based on status and year if filters are active
  const filteredAnimals = animals.filter(animal => {
    // Apply status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'active' && animal.status !== 'Active') return false;
      if (filterStatus === 'inSale' && !animal.status.includes('Added to')) return false;
      if (filterStatus === 'sold' && animal.status !== 'Sold') return false;
    }
    
    // Apply year filter
    if (yearFilter && yearFilter !== '') {
      const animalYear = animal.dob.split('/')[2];
      // Check if it's a two-digit year format
      const filterYearShort = yearFilter.slice(-2);
      if (animalYear !== yearFilter && animalYear !== filterYearShort) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
            onClick={() => setModalOpen(true)}
          >
            Add New Animal
          </button>
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            Import Animals
          </button>
          <button 
            className="px-4 py-2 text-white rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#1E4841', borderColor: '#1E4841' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5f57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4841'}
          >
            Export Animals
          </button>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-3 py-1 ${filterStatus === 'all' ? 'bg-green-100 text-green-800' : 'bg-white border'} rounded-md hover:bg-gray-50`}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1 ${filterStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-white border'} rounded-md hover:bg-gray-50`}
          onClick={() => setFilterStatus('active')}
        >
          Active
        </button>
        <button 
          className={`px-3 py-1 ${filterStatus === 'inSale' ? 'bg-green-100 text-green-800' : 'bg-white border'} rounded-md hover:bg-gray-50`}
          onClick={() => setFilterStatus('inSale')}
        >
          In Sale
        </button>
        <button 
          className={`px-3 py-1 ${filterStatus === 'sold' ? 'bg-green-100 text-green-800' : 'bg-white border'} rounded-md hover:bg-gray-50`}
          onClick={() => setFilterStatus('sold')}
        >
          Sold
        </button>
        <select 
          className="px-3 py-1 bg-white border rounded-md hover:bg-gray-50"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">DOB Year</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">M Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchaser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAnimals.map(animal => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.mNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.dob}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.sire}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.dam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${animal.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      animal.status.includes('Spring Bull Sale') || animal.status.includes('Autumn Female Sale') ? 'bg-yellow-100 text-yellow-800' : 
                      animal.status === 'Sold' ? 'bg-gray-100 text-gray-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                      {animal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{animal.purchaser || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                    <button 
                      className="text-green-600 hover:text-green-900 mr-2"
                      onClick={() => handleViewAnimal(animal)}
                    >
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                  </td>
                </tr>
              ))}
              {filteredAnimals.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No animals found matching the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add New Animal Modal */}
      <AddAnimalModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddAnimal}
        animals={animals}
      />
    </div>
  );
};
      
    const SalesScreen = ({ sales, setActiveScreen }) => {
      const upcomingSales = sales.filter(sale => 
        sale.status === 'Upcoming' || sale.status === 'Active'
      );
      const pastSales = sales.filter(sale => sale.status === 'Completed');
      
      return (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Sales Management</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Create New Sale
            </button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Upcoming Sales</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingSales.map(sale => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${sale.status === 'Upcoming' ? 'bg-purple-100 text-purple-800' : 
                            sale.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                            {sale.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.animals}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.expectedValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                          <button
                            className="text-green-600 hover:text-green-900 mr-2"
                            onClick={() => {
                              if (sale.name === "Spring Bull Sale 2025") {
                                setActiveScreen('springBullSale2025');
                              } else {
                                setActiveScreen('sales');
                              }
                            }}
                          >
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                          <button className="text-green-600 hover:text-green-900">Share</button>
                        </td>
                      </tr>
                    ))}
                    {upcomingSales.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No upcoming sales
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Past Sales</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pastSales.map(sale => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {sale.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.animals}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">{sale.expectedValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                          <button className="text-green-600 hover:text-green-900 mr-2">View</button>
                          <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                          <button className="text-green-600 hover:text-green-900">Report</button>
                        </td>
                      </tr>
                    ))}
                    {pastSales.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No past sales</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const MarketplaceScreen = () => {
      const [activeTab, setActiveTab] = useState('available');
      const [categoryFilter, setCategoryFilter] = useState('all');
      
      // Sample marketplace listings
      const listings = [
        { 
          id: 1, 
          title: 'Premium Angus Bull', 
          animalId: 'ANG2024-01', 
          seller: 'Thompson Farms', 
          price: '$8,500', 
          age: '2 years', 
          category: 'bulls',
          breed: 'Angus',
          location: 'Melbourne, VIC',
          description: 'Exceptional Angus bull with superior genetics. Great temperament and conformation.',
          featured: true,
          date: '2025-01-15',
          image: '/placeholder.jpg'
        },
        { 
          id: 2, 
          title: 'Hereford Heifers (Set of 5)', 
          animalId: 'HER2024-05', 
          seller: 'Wilson Ranch', 
          price: '$12,200', 
          age: '18 months', 
          category: 'heifers',
          breed: 'Hereford',
          location: 'Brisbane, QLD',
          description: 'Set of 5 quality Hereford heifers ready for breeding. All health checks complete.',
          featured: true,
          date: '2025-01-18',
          image: '/placeholder.jpg'
        },
        { 
          id: 3, 
          title: 'Young Charolais Bull', 
          animalId: 'CHA2024-03', 
          seller: 'Davis Cattle Co.', 
          price: '$7,200', 
          age: '15 months', 
          category: 'bulls',
          breed: 'Charolais',
          location: 'Adelaide, SA',
          description: 'Young Charolais bull with excellent growth potential. Great bloodlines.',
          featured: false,
          date: '2025-01-20',
          image: '/placeholder.jpg'
        },
        { 
          id: 4, 
          title: 'Simmental Cow with Calf', 
          animalId: 'SIM2024-02', 
          seller: 'Brown & Sons', 
          price: '$6,800', 
          age: '4 years / 2 months', 
          category: 'pairs',
          breed: 'Simmental',
          location: 'Sydney, NSW',
          description: 'Productive Simmental cow with healthy bull calf at side. Great mothering ability.',
          featured: false,
          date: '2025-01-22',
          image: '/placeholder.jpg'
        },
        { 
          id: 5, 
          title: 'Holstein Dairy Cow', 
          animalId: 'HOL2024-06', 
          seller: 'Miller Livestock', 
          price: '$3,800', 
          age: '3 years', 
          category: 'dairy',
          breed: 'Holstein',
          location: 'Perth, WA',
          description: 'High-producing Holstein dairy cow. Currently giving 28 liters daily.',
          featured: true,
          date: '2025-01-24',
          image: '/placeholder.jpg'
        },
        { 
          id: 6, 
          title: 'Brahman Steers (Lot of 10)', 
          animalId: 'BRA2024-10', 
          seller: 'Anderson Ranch', 
          price: '$15,500', 
          age: '12 months', 
          category: 'steers',
          breed: 'Brahman',
          location: 'Darwin, NT',
          description: 'Group of 10 well-fed Brahman steers. Excellent for finishing program.',
          featured: false,
          date: '2025-01-26',
          image: '/placeholder.jpg'
        },
        { 
          id: 7, 
          title: 'Belted Galloway Cows (Set of 3)', 
          animalId: 'BEL2024-03', 
          seller: 'Johnson Livestock', 
          price: '$9,200', 
          age: '3-5 years', 
          category: 'cows',
          breed: 'Belted Galloway',
          location: 'Hobart, TAS',
          description: 'Set of 3 hardy Belted Galloway cows. Excellent for grass-based production.',
          featured: false,
          date: '2025-01-28',
          image: '/placeholder.jpg'
        },
        { 
          id: 8, 
          title: 'Santa Gertrudis Young Bull', 
          animalId: 'SAN2024-04', 
          seller: 'Smith Farms', 
          price: '$6,900', 
          age: '14 months', 
          category: 'bulls',
          breed: 'Santa Gertrudis',
          location: 'Melbourne, VIC',
          description: 'Well-developed Santa Gertrudis bull. Suitable for crossbreeding programs.',
          featured: true,
          date: '2025-01-30',
          image: '/placeholder.jpg'
        }
      ];
      
      // Filter listings based on active tab and category
      const filteredListings = listings.filter(listing => {
        if (activeTab === 'featured' && !listing.featured) return false;
        if (categoryFilter !== 'all' && listing.category !== categoryFilter) return false;
        return true;
      });
      
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Livestock Marketplace</h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Post New Listing
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                My Listings
              </button>
            </div>
          </div>
          
          {/* Tabs and Filters */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <button
                className={`px-3 py-1 rounded-md ${
                  activeTab === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('available')}
              >
                All Listings
              </button>
              <button
                className={`px-3 py-1 rounded-md ${
                  activeTab === 'featured'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
            </div>
            
            <div className="flex space-x-4">
              <select
                className="px-3 py-1 bg-white border rounded-md"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="bulls">Bulls</option>
                <option value="cows">Cows</option>
                <option value="heifers">Heifers</option>
                <option value="steers">Steers</option>
                <option value="pairs">Cow/Calf Pairs</option>
                <option value="dairy">Dairy</option>
              </select>
              
              <select className="px-3 py-1 bg-white border rounded-md">
                <option value="recent">Most Recent</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
                <option value="breed">Breed</option>
              </select>
            </div>
          </div>
          
          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Animal Image
                  </div>
                  {listing.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                    <div className="font-bold text-green-700">{listing.price}</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div>ID: {listing.animalId}</div>
                    <div>Age: {listing.age}</div>
                    <div>Breed: {listing.breed}</div>
                    <div>Location: {listing.location}</div>
                  </div>
                  <p className="text-sm mb-4 text-gray-700 line-clamp-2">{listing.description}</p>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                      View Details
                    </button>
                    <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      Contact Seller
                    </button>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 flex justify-between">
                  <span>Listed: {listing.date}</span>
                  <span>Seller: {listing.seller}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <button className="px-3 py-1 border rounded hover:bg-gray-50">&laquo;</button>
              <button className="px-3 py-1 border rounded bg-green-100 text-green-800">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">&raquo;</button>
            </div>
          </div>
        </div>
      );
    };
    
      

      
    const AnalyticsScreen = () => {
      const [dateRange, setDateRange] = useState('year');
      const [animalMetric, setAnimalMetric] = useState('price');
      
      // Sample data for charts
      const priceHistoryData = [
        { year: 2018, avgPrice: 68500, topPrice: 82400, avgEBV: 9.2 },
        { year: 2019, avgPrice: 71200, topPrice: 86800, avgEBV: 9.8 },
        { year: 2020, avgPrice: 64300, topPrice: 78000, avgEBV: 9.5 },
        { year: 2021, avgPrice: 69800, topPrice: 84200, avgEBV: 10.1 },
        { year: 2022, avgPrice: 76500, topPrice: 92000, avgEBV: 10.8 },
        { year: 2023, avgPrice: 82300, topPrice: 104000, avgEBV: 11.2 },
        { year: 2024, avgPrice: 85400, topPrice: 112000, avgEBV: 11.6 },
      ];
      
      const clientSegmentData = [
        { name: 'Commercial', value: 35 },
        { name: 'Stud', value: 25 },
        { name: 'Repeat', value: 30 },
        { name: 'New', value: 10 },
      ];
      
      const ebvCorrelationData = [
        { trait: 'Birth Weight', priceCorrelation: 0.35, salesVolume: 42 },
        { trait: 'Weaning Weight', priceCorrelation: 0.68, salesVolume: 85 },
        { trait: 'Yearling Weight', priceCorrelation: 0.72, salesVolume: 92 },
        { trait: 'Milk', priceCorrelation: 0.45, salesVolume: 56 },
        { trait: 'Marbling', priceCorrelation: 0.84, salesVolume: 98 },
        { trait: 'Rib Eye Area', priceCorrelation: 0.62, salesVolume: 78 },
        { trait: 'Docility', priceCorrelation: 0.58, salesVolume: 72 },
        { trait: 'Calving Ease', priceCorrelation: 0.75, salesVolume: 94 },
      ];
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
      
      // Custom tooltip component
      const PriceTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
              <p className="font-medium text-gray-900">{label}</p>
              {payload.map((entry, index) => (
                <p key={index} style={{ color: entry.color }}>
                  {entry.name}: ${entry.value.toLocaleString()}
                </p>
              ))}
            </div>
          );
        }
        return null;
      };
      
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <div className="flex space-x-4">
              <select 
                className="px-3 py-1 border rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="year">Yearly</option>
                <option value="quarter">Quarterly</option>
                <option value="month">Monthly</option>
              </select>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
          
          {/* Price Trends Over Time */}
          <Card title="Price Trends Over Time">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[8, 12]} />
                  <Tooltip content={<PriceTooltip />} />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="avgPrice" 
                    stroke="#8884d8" 
                    name="Average Price" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="topPrice" 
                    stroke="#82ca9d" 
                    name="Top Price" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="avgEBV" 
                    stroke="#ff7300" 
                    name="Avg EBV Score" 
                    strokeDasharray="3 3" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Client Segmentation and EBV Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Segmentation */}
            <Card title="Client Segmentation">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {clientSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            {/* EBV to Sale Price Correlation */}
            <Card title="EBV to Price Correlation">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ebvCorrelationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trait" />
                    <YAxis yAxisId="left" orientation="left" domain={[0, 1]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="priceCorrelation" 
                      fill="#8884d8" 
                      name="Price Correlation" 
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="salesVolume" 
                      fill="#82ca9d" 
                      name="Sales Volume" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          {/* Key Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InsightCard 
              title="Top Performing Trait" 
              value="Marbling" 
              description="Highest price correlation at 84%" 
              change="+12%" 
              positive={true} 
            />
            <InsightCard 
              title="Fastest Growing Segment" 
              value="Repeat Buyers" 
              description="30% of all sales" 
              change="+8%" 
              positive={true} 
            />
            <InsightCard 
              title="Price Growth YoY" 
              value="3.8%" 
              description="Average price increase since 2023" 
              change="+1.2%" 
              positive={true} 
            />
            <InsightCard 
              title="Top Performing Breed" 
              value="Angus" 
              description="Highest overall performance score" 
              change="Stable" 
              positive={null} 
            />
          </div>
        </div>
      );
    };
    
    // Custom Insight Card for Analytics
    const InsightCard = ({ title, value, description, change, positive }) => {
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
          <div className="text-xl font-bold mb-1">{value}</div>
          <p className="text-gray-500 text-xs mb-2">{description}</p>
          {change && (
            <div className={`text-xs font-medium ${
              positive === true ? 'text-green-600' : 
              positive === false ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {change}
            </div>
          )}
        </div>
      );
    };
    
    const MarketingScreen = () => {
      const [activeTab, setActiveTab] = useState('emailCampaigns');
      const [emailStatus, setEmailStatus] = useState('draft');
      
      // Sample data
      const emailCampaigns = [
        { id: 1, name: 'Spring Bull Sale 2025 Announcement', status: 'Sent', date: '2024-12-15', opens: 356, clicks: 178, responses: 42 },
        { id: 2, name: 'EBV Report - Q1 2025', status: 'Scheduled', date: '2025-01-10', opens: 0, clicks: 0, responses: 0 },
        { id: 3, name: 'New Arrivals - January 2025', status: 'Draft', date: '-', opens: 0, clicks: 0, responses: 0 },
        { id: 4, name: 'Client Appreciation Event', status: 'Draft', date: '-', opens: 0, clicks: 0, responses: 0 },
      ];
      
      const clientEngagement = [
        { month: 'Jul', emails: 42, catalogViews: 132, animalPageViews: 356 },
        { month: 'Aug', emails: 38, catalogViews: 145, animalPageViews: 412 },
        { month: 'Sep', emails: 55, catalogViews: 178, animalPageViews: 485 },
        { month: 'Oct', emails: 72, catalogViews: 203, animalPageViews: 521 },
        { month: 'Nov', emails: 68, catalogViews: 248, animalPageViews: 603 },
        { month: 'Dec', emails: 85, catalogViews: 312, animalPageViews: 687 },
      ];
      
      const marketingContacts = [
        { id: 1, name: 'Commercial Buyers', count: 156, engagementRate: '32%', lastContact: '2024-12-05' },
        { id: 2, name: 'Stud Producers', count: 78, engagementRate: '68%', lastContact: '2024-12-12' },
        { id: 3, name: 'Past Clients (2023-2024)', count: 124, engagementRate: '45%', lastContact: '2024-11-28' },
        { id: 4, name: 'Industry Partners', count: 35, engagementRate: '56%', lastContact: '2024-12-08' },
      ];
      
      const animalPromotions = [
        { id: 1, animal: 'Thunder (NMMT001)', views: 245, inquiries: 12, featured: true },
        { id: 2, animal: 'Titan (NMMT014)', views: 198, inquiries: 8, featured: true },
        { id: 3, animal: 'Uptown (NMMU118)', views: 312, inquiries: 18, featured: true },
        { id: 4, animal: 'Universe (NMMU127)', views: 187, inquiries: 7, featured: false },
        { id: 5, animal: 'Uppercut (NMMU135)', views: 156, inquiries: 5, featured: false },
      ];
      
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Marketing & Buyer Engagement</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              New Campaign
            </button>
          </div>
          
          {/* Marketing Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'emailCampaigns'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('emailCampaigns')}
              >
                Email Campaigns
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'animalPromotions'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('animalPromotions')}
              >
                Animal Promotions
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contactLists'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('contactLists')}
              >
                Contact Lists
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                Engagement Analytics
              </button>
            </nav>
          </div>


          
          
          {/* Tab Content */}
          {activeTab === 'emailCampaigns' && (
            <div className="space-y-6">
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-3 py-1 rounded-md ${
                    emailStatus === 'all'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                  onClick={() => setEmailStatus('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    emailStatus === 'draft'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                  onClick={() => setEmailStatus('draft')}
                >
                  Drafts
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    emailStatus === 'scheduled'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                  onClick={() => setEmailStatus('scheduled')}
                >
                  Scheduled
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    emailStatus === 'sent'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                  onClick={() => setEmailStatus('sent')}
                >
                  Sent
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opens</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emailCampaigns
                        .filter(campaign => emailStatus === 'all' || campaign.status.toLowerCase() === emailStatus)
                        .map(campaign => (
                          <tr key={campaign.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{campaign.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium
                                ${campaign.status === 'Sent' ? 'bg-green-100 text-green-800' : 
                                campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                                {campaign.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{campaign.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{campaign.opens}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{campaign.clicks}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{campaign.responses}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">
                              <button className="text-green-600 hover:text-green-900 mr-2">View</button>
                              <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                              <button className="text-green-600 hover:text-green-900">Duplicate</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'animalPromotions' && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <div className="space-x-4">
                  <button className="px-3 py-1 bg-white border rounded-md hover:bg-gray-50">All Animals</button>
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md">Featured</button>
                  <button className="px-3 py-1 bg-white border rounded-md hover:bg-gray-50">Most Viewed</button>
                </div>
                <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Feature New Animal
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animalPromotions.map(animal => (
                  <div key={animal.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Animal Image</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">{animal.animal}</h3>
                        {animal.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>{animal.views} views</span>
                        <span>{animal.inquiries} inquiries</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                          Share
                        </button>
                        <button className="flex-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'contactLists' && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Search contact lists..."
                  className="px-4 py-2 border rounded-md w-64"
                />
                <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Create List
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">List Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {marketingContacts.map(contact => (
                        <tr key={contact.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{contact.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{contact.count}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{contact.engagementRate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{contact.lastContact}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">
                            <button className="text-green-600 hover:text-green-900 mr-2">View</button>
                            <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                            <button className="text-green-600 hover:text-green-900">Send Email</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card title="Client Engagement Over Time">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clientEngagement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="emails" 
                        stackId="1" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Email Responses" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="catalogViews" 
                        stackId="1" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Catalog Views" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="animalPageViews" 
                        stackId="1" 
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        name="Animal Page Views" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Email Open Rate" 
                  value="42%" 
                  change="+8%" 
                  positive={true} 
                />
                <StatCard 
                  title="Avg. Catalog Views" 
                  value="203" 
                  change="+15%" 
                  positive={true} 
                />
                <StatCard 
                  title="Avg. Response Time" 
                  value="1.2 days" 
                  change="-0.3 days" 
                  positive={true} 
                />
                <StatCard 
                  title="Conversion Rate" 
                  value="18%" 
                  change="+2.5%" 
                  positive={true} 
                />
              </div>
            </div>
          )}
        </div>
      );
    };
      
    const StatCard = ({ title, value, change, positive }) => {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{value}</div>
            {change && (
              <div className={`text-sm ${
                positive === true ? 'text-green-600' : 
                positive === false ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {change}
              </div>
            )}
          </div>
        </div>
      );
    };
      
    export default FrisbeeApp;