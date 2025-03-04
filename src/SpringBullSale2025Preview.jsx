import React, { useState, useEffect } from 'react';
import ascotBull from './Assets/Images/Ascot-Bull.jpg';
import milwillahBull2 from './Assets/Images/Milwillah-Bull-2.jpg';
import milwillahBull from './Assets/Images/Milwillah-Bull.jpg';

const SpringBullSale2025Preview = () => {
  // Sale details (static info)
  const saleDetails = {
    id: 1,
    name: "Spring Bull Sale 2025",
    date: "2025-04-15",
    status: "Upcoming",
    location: "North Meadow Angus Ranch",
    address: "1234 County Road 45, Greenfield, TX",
    contactEmail: "info@northmeadowangus.com",
    contactPhone: "(555) 123-4567",
    totalAnimals: 6,
  };

  // Sample list of animals for the sale (same as producer page but without price/value fields)
  const animals = [
    { id: '11', mNumber: 'NMMU118', name: 'Uptown', dob: '25/04/23', sire: 'Sovereign', dam: 'Crystal 444', description: 'Exceptional growth performance with superior calving ease.' },
    { id: '12', mNumber: 'NMMU127', name: 'Universe', dob: '13/02/23', sire: 'Ranger', dam: 'Jewel 777', description: 'Balanced traits with outstanding marbling and ribeye area.' },
    { id: '13', mNumber: 'NMMU135', name: 'Uppercut', dob: '30/03/23', sire: 'Rebel', dam: 'Starlight 901', description: 'Top percentile for weaning and yearling weights.' },
    { id: '14', mNumber: 'NMMU142', name: 'Urban', dob: '17/01/23', sire: 'Titan', dam: 'Moonbeam 234', description: 'Excellent temperament with strong maternal traits.' },
    { id: '15', mNumber: 'NMMT157', name: 'Tempest', dob: '22/02/22', sire: 'Sailor', dam: 'Lady 401', description: 'Proven genetics for feed efficiency and docility.' },
    { id: '16', mNumber: 'NMMT163', name: 'Target', dob: '09/05/22', sire: 'Ranger', dam: 'Duchess 212', description: 'Outstanding muscle expression with low birth weight.' },
  ];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Selected animal for modal
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // FAQ accordion state
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Registration form state
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Attending in person'
  });

  // Array of images to cycle through for thumbnails and featured animals
  const imageArray = [ascotBull, milwillahBull2, milwillahBull];

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

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    alert(`Thank you for registering, ${formData.name}! We'll be in touch soon.`);
    setShowRegistration(false);
  };

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "What time does the sale start?",
      answer: "The Spring Bull Sale will begin at 10:00 AM CT on April 15, 2025. We recommend arriving at least 30 minutes early to register and view the animals before bidding starts."
    },
    {
      id: 2,
      question: "Will there be online bidding available?",
      answer: "Yes, we offer online bidding through our secure platform. Register at least 24 hours before the sale to participate remotely. All online bidders will receive access instructions via email."
    },
    {
      id: 3,
      question: "What health and testing protocols have been followed?",
      answer: "All bulls in our sale have undergone comprehensive health testing including BVD-PI, trichomoniasis, and breeding soundness exams. Health certificates will be available for each animal. All animals meet interstate shipping requirements."
    },
    {
      id: 4,
      question: "Is delivery available?",
      answer: "Yes, we offer delivery within 300 miles of our ranch for a reasonable fee. For longer distances, we can help arrange transportation with reputable livestock haulers. Please inquire for specific rates."
    },
    {
      id: 5,
      question: "What payment methods are accepted?",
      answer: "We accept cash, check, wire transfer, and major credit cards. Full payment is expected on sale day unless prior arrangements have been made. First-time buyers may need to provide references."
    }
  ];

  return (
    <div className="font-sans">
      {/* Hero Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${ascotBull})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4">{saleDetails.name}</h1>
          <p className="text-2xl mb-6">{saleDetails.location}</p>
          <p className="text-xl mb-8">April 15, 2025 • 10:00 AM CT</p>

          {/* Countdown Timer */}
          <div className="flex space-x-6 mb-12">
            {Object.keys(timeLeft).length > 0 ? (
              <>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeLeft.days}</div>
                  <div className="text-lg mt-1">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeLeft.hours}</div>
                  <div className="text-lg mt-1">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-lg mt-1">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-lg mt-1">Seconds</div>
                </div>
              </>
            ) : (
              <span className="text-4xl font-bold">Sale In Progress!</span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowRegistration(true)}
              className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300"
            >
              Register for Sale
            </button>
            <a
              href="#catalog"
              className="px-8 py-3 bg-white text-green-700 text-lg font-semibold rounded-md hover:bg-gray-100 transition duration-300"
            >
              View Catalog
            </a>
          </div>
        </div>
      </div>

      {/* Sale Introduction */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Elite Bulls for Progressive Programs</h2>
          <p className="text-xl mb-8 text-gray-600">
            North Meadow Angus is proud to present our 2025 Spring Bull Sale featuring exceptional bulls selected for growth, calving ease, and carcass quality. With decades of selective breeding and genetic advancement, these bulls represent the pinnacle of our program.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">6</h3>
              <p className="text-lg text-gray-600">Premium Bulls</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Top 1%</h3>
              <p className="text-lg text-gray-600">EPD Rankings</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">100%</h3>
              <p className="text-lg text-gray-600">Breeding Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bulls */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Featured Bulls</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {animals.slice(0, 3).map((animal, index) => (
              <div
                key={animal.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    className="w-full h-80 object-cover"
                    src={imageArray[index % imageArray.length]}
                    alt={animal.name}
                  />
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-2 text-lg font-bold rounded-bl-lg">
                    Lot #{index + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{animal.name}</h3>
                  <p className="text-gray-600 mb-2">ID: {animal.mNumber}</p>
                  <p className="text-gray-600 mb-2">DOB: {animal.dob}</p>
                  <p className="text-gray-600 mb-4">Sire: {animal.sire} × Dam: {animal.dam}</p>
                  <p className="text-gray-700 mb-6">{animal.description}</p>
                  <button
                    onClick={() => setSelectedAnimal(animal)}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#catalog"
              className="inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300"
            >
              View All Bulls
            </a>
          </div>
        </div>
      </section>

      {/* Full Catalog */}
      <section id="catalog" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Complete Sale Catalog</h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-6 py-4 text-left">Lot #</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">DOB</th>
                  <th className="px-6 py-4 text-left">Sire</th>
                  <th className="px-6 py-4 text-left">Dam</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {animals.map((animal, index) => (
                  <tr
                    key={animal.id}
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="px-6 py-4 text-gray-700 font-semibold">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800 font-bold">{animal.name}</td>
                    <td className="px-6 py-4 text-gray-600">{animal.mNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{animal.dob}</td>
                    <td className="px-6 py-4 text-gray-600">{animal.sire}</td>
                    <td className="px-6 py-4 text-gray-600">{animal.dam}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedAnimal(animal)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sale Information */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Sale Information</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Location & Schedule</h3>
              <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                <p className="text-lg mb-4"><strong>Date:</strong> April 15, 2025</p>
                <p className="text-lg mb-4"><strong>Starting Time:</strong> 10:00 AM CT</p>
                <p className="text-lg mb-4"><strong>Preview Days:</strong> April 13-14, 2025 (9:00 AM - 5:00 PM)</p>
                <p className="text-lg mb-4"><strong>Location:</strong> {saleDetails.location}</p>
                <p className="text-lg mb-4"><strong>Address:</strong> {saleDetails.address}</p>
                <p className="text-lg mb-4"><strong>Contact:</strong> {saleDetails.contactPhone}</p>
                <p className="text-lg mb-4"><strong>Email:</strong> {saleDetails.contactEmail}</p>

                <div className="mt-8">
                  <button
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left text-lg font-semibold bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                    >
                      {item.question}
                      <svg
                        className={`h-6 w-6 transform ${activeAccordion === item.id ? 'rotate-180' : ''} transition-transform duration-200`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeAccordion === item.id && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Herd?</h2>
          <p className="text-xl mb-8">
            Register now to attend our Spring Bull Sale and secure your opportunity to acquire premium genetics for your program.
          </p>
          <button
            onClick={() => setShowRegistration(true)}
            className="px-8 py-4 bg-white text-green-700 text-lg font-bold rounded-md hover:bg-gray-100 transition duration-300"
          >
            Register for Sale
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">North Meadow Angus</h3>
              <p className="mb-2">{saleDetails.address}</p>
              <p className="mb-2">{saleDetails.contactPhone}</p>
              <p className="mb-4">{saleDetails.contactEmail}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#catalog" className="hover:underline">Bull Catalog</a></li>
                <li><a href="#" className="hover:underline">About Our Program</a></li>
                <li><a href="#" className="hover:underline">Past Sales</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
              <p className="mb-4">Subscribe to receive updates about our breeding program and upcoming sales.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l text-gray-800"
                />
                <button className="bg-green-600 px-4 py-2 rounded-r hover:bg-green-700 transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
            <p>© 2025 North Meadow Angus. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Animal Detail Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img
                className="w-full h-96 object-cover"
                src={imageArray[animals.findIndex(a => a.id === selectedAnimal.id) % imageArray.length]}
                alt={selectedAnimal.name}
              />
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 text-lg font-bold rounded-lg">
                Lot #{animals.findIndex(a => a.id === selectedAnimal.id) + 1}
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedAnimal.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Details</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">ID Number:</td>
                        <td className="py-3 text-gray-800">{selectedAnimal.mNumber}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Date of Birth:</td>
                        <td className="py-3 text-gray-800">{selectedAnimal.dob}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Sire:</td>
                        <td className="py-3 text-gray-800">{selectedAnimal.sire}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Dam:</td>
                        <td className="py-3 text-gray-800">{selectedAnimal.dam}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Color:</td>
                        <td className="py-3 text-gray-800">Black</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Polled/Horned:</td>
                        <td className="py-3 text-gray-800">Polled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Genomic Profile</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-3 text-left">Gene/Condition</th>
                        <th className="py-2 px-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3">Arthrogryposis Multiplex (AM)</td>
                        <td className="py-2 px-3">Free</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Neuropathic Hydrocephalus (NH)</td>
                        <td className="py-2 px-3">Free</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Developmental Duplication (DD)</td>
                        <td className="py-2 px-3">Free</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Myostatin</td>
                        <td className="py-2 px-3">0 (Free)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Coat Color</td>
                        <td className="py-2 px-3">Homozygous Black</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Horned/Polled</td>
                        <td className="py-2 px-3">Homozygous Polled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Performance Data</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Birth Weight:</td>
                        <td className="py-3 text-gray-800">76 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Weaning Weight:</td>
                        <td className="py-3 text-gray-800">675 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Yearling Weight:</td>
                        <td className="py-3 text-gray-800">1,285 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Average Daily Gain:</td>
                        <td className="py-3 text-gray-800">3.8 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Frame Score:</td>
                        <td className="py-3 text-gray-800">6.2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-gray-600 font-medium">Scrotal Circumference:</td>
                        <td className="py-3 text-gray-800">39 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">EPDs</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-3 text-left">Trait</th>
                        <th className="py-2 px-3 text-left">EPD</th>
                        <th className="py-2 px-3 text-left">Percentile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3">Birth Weight</td>
                        <td className="py-2 px-3">+1.2</td>
                        <td className="py-2 px-3">Top 15%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Weaning Weight</td>
                        <td className="py-2 px-3">+72</td>
                        <td className="py-2 px-3">Top 10%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Yearling Weight</td>
                        <td className="py-2 px-3">+118</td>
                        <td className="py-2 px-3">Top 5%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Milk</td>
                        <td className="py-2 px-3">+28</td>
                        <td className="py-2 px-3">Top 20%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Marbling</td>
                        <td className="py-2 px-3">+0.68</td>
                        <td className="py-2 px-3">Top 8%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3">Ribeye Area</td>
                        <td className="py-2 px-3">+0.92</td>
                        <td className="py-2 px-3">Top 12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Description</h3>
                <p className="text-gray-700">
                  {selectedAnimal.description} This bull represents the pinnacle of our breeding program with exceptional growth and conformation. He comes from a line of high-performing dams with outstanding maternal traits and proven calving ease. His progeny have demonstrated consistent performance in feed efficiency and carcass quality.
                </p>
              </div>

              <div className="flex space-x-4 pt-6 border-t">
                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300">
                  Download Full Data Sheet
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {showRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Register for Sale</h2>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="interest">
                    How would you like to participate?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Attending in person">Attending in person</option>
                    <option value="Bidding online">Bidding online</option>
                    <option value="Bidding by phone">Bidding by phone</option>
                    <option value="Just information">Just requesting information</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="notes">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                    placeholder="Let us know if you have any specific interests or questions"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">
                      I agree to receive updates about this sale and future events
                    </span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowRegistration(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300 mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpringBullSale2025Preview;