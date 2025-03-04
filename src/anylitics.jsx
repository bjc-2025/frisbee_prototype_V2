import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, 
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Analytics Screen Component
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
  
  const breedPerformanceData = [
    { breed: 'Angus', price: 85400, growthRate: 9.2, fertility: 8.7, marbling: 9.3, docility: 8.6 },
    { breed: 'Hereford', price: 78200, growthRate: 8.8, fertility: 9.1, marbling: 8.4, docility: 9.2 },
    { breed: 'Charolais', price: 72500, growthRate: 9.6, fertility: 8.3, marbling: 7.8, docility: 7.9 },
    { breed: 'Simmental', price: 68400, growthRate: 9.4, fertility: 8.5, marbling: 7.6, docility: 8.1 },
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
      
      {/* Breed Performance Analysis */}
      <Card title="Breed Performance Analysis">
        <div className="flex justify-end mb-4">
          <select 
            className="px-3 py-1 border rounded-md"
            value={animalMetric}
            onChange={(e) => setAnimalMetric(e.target.value)}
          >
            <option value="price">Average Price</option>
            <option value="growthRate">Growth Rate</option>
            <option value="fertility">Fertility</option>
            <option value="marbling">Marbling</option>
            <option value="docility">Docility</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={breedPerformanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="breed" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar 
                name="Growth Rate" 
                dataKey="growthRate" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6} 
              />
              <Radar 
                name="Fertility" 
                dataKey="fertility" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6} 
              />
              <Radar 
                name="Marbling" 
                dataKey="marbling" 
                stroke="#ffc658" 
                fill="#ffc658" 
                fillOpacity={0.6} 
              />
              <Radar 
                name="Docility" 
                dataKey="docility" 
                stroke="#ff8042" 
                fill="#ff8042" 
                fillOpacity={0.6} 
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
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

// Marketing Screen Component
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

// Custom Insight Card for Analytics (continued)
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

// Export both screens
export { AnalyticsScreen, MarketingScreen };