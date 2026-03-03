import React, { useState, useEffect } from "react";
import Headers from '../components/Headers'
import { Link } from "react-router-dom";
import '../css/Home.css';

const HomePage = () => {

  // === SLIDESHOW ===
  const slides = [
    { src: '/images/homepage/banner_1.jpg', alt: 'Slide 1' },
    { src: '/images/homepage/banner_2.jpg', alt: 'Slide 2' },
    { src: '/images/homepage/banner_3.jpg', alt: 'Slide 3' },
    { src: '/images/homepage/banner_4.jpg', alt: 'Slide 4' },
    { src: '/images/homepage/banner_5.jpg', alt: 'Slide 5' },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

    // === FEATURE CARDS ===
    const features = [
    {
      title: "Valentine's Day gifts for all",
      items: [
        { src: '/images/homepage/forhim.png', label: 'For him' },
        { src: '/images/homepage/forher.png', label: 'For her' },
        { src: '/images/homepage/forkids.png', label: 'For kids' },
        { src: '/images/homepage/forgalentines.png', label: 'For Galentines' },
      ],
      link: 'UnderConstruction.jsx',
      linkText: "Shop Valentine's Day",
    },
    {
      title: 'Deals on 4+ star rated items',
      items: [
        { src: '/images/homepage/fashion.png', label: 'Fashion' },
        { src: '/images/homepage/beauty.png', label: 'Beauty' },
        { src: '/images/homepage/electronics.png', label: 'Electronics' },
        { src: '/images/homepage/homekitchen.png', label: 'Home & Kitchen' },
      ],
      link: 'UnderConstruction.jsx',
      linkText: 'Shop all deals',
    },
    {
      title: 'Social Media Favourites',
      items: [
        { src: '/images/homepage/deals.png', label: 'Deals' },
        { src: '/images/homepage/fashion.png', label: 'Fashion' },
        { src: '/images/homepage/premiumbeauty.png', label: 'Premium Beauty' },
        { src: '/images/homepage/homekitchen.png', label: 'Home & Kitchen' },
      ],
      link: 'UnderConstruction.jsx',
      linkText: 'Shop the latest picks',
    },
    {
      title: 'Winter essentials',
      items: [
        { src: '/images/homepage/winterhomeessential.png', label: 'Winter home essentials' },
        { src: '/images/homepage/heatingandfireplace.png', label: 'Heating & fireplace' },
        { src: '/images/homepage/outdoorequipment.png', label: 'Outdoor equipment' },
        { src: '/images/homepage/carreadiness.png', label: 'Car readiness' },
      ],
      link: 'UnderConstruction.jsx',
      linkText: 'Top deals on winter essentials',
    },
  ];

  // === SLIDERS ===
  const sliders = [
  {
    title: "Best Sellers Beauty",
    link: "/underconstruction",
    items: [
      { src: "/images/homepage/pallet.png", alt: "pallet" },
      { src: "/images/homepage/gloss.png", alt: "gloss" },
      { src: "/images/homepage/mascara.png", alt: "mascara" },
      { src: "/images/homepage/blush.png", alt: "blush" },
      { src: "/images/homepage/powder.png", alt: "powder" },
      { src: "/images/homepage/nailpolish.png", alt: "nailpolish" },
    ],
  },
  {
    title: "Best Sellers in Home",
    link: "/underconstruction",
    items: [
      { src: "/images/homepage/homekitchen.png", alt: "towels" },
      { src: "/images/homepage/winterhomeessential.png", alt: "snowmachine" },
      { src: "/images/homepage/heatingandfireplace.png", alt: "heating" },
      { src: "/images/homepage/carreadiness.png", alt: "car readiness" },
      { src: "/images/homepage/fashion.png", alt: "shirts" },
      { src: "/images/homepage/forhim.png", alt: "bottle" },
    ],
  },
];

  return (
    <>

      {/* ===== SLIDESHOW ===== */}
      {slides.map((slide, index) => (
        <div
        className="slide fade"
        key={index}
        style={{ display: index === current ? "block" : "none" }}
        >
          <img src={slide.src} alt={slide.alt} />
          </div>
        ))}

      {/* ===== FEATURE CARDS ===== */}
      <div className="feature-section">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <h3>{feature.title}</h3>
            <div className="feature-grid">
              {feature.items.map((item, index) => (
                <Link to="/underconstruction" className="feature-item" key={index}>
                  <img src={item.src} alt={item.label} />
                  <p>{item.label}</p>
                </Link>
              ))}
            </div>
            <Link to="/underconstruction">{feature.linkText}</Link>
          </div>
        ))}
      </div>

{/* ===== SLIDER SECTIONS ===== */}
      {sliders.map((slider, idx) => (
        <section className="slider-section" key={idx}>
          <div className="slider-header">
            <h2>{slider.title}</h2>
            <Link to={slider.link} className="see-all">See all deals</Link>
          </div>

          <div className="slider-wrapper">
            <button className="nav left">&#10094;</button>
            <div className="slider">
              {slider.items.map((item, index) => (
                <div className="card" key={index}>
                  <Link to={slider.link}>
                    <img src={item.src} alt={item.alt} />
                  </Link>
                </div>
              ))}
            </div>
            <button className="nav right">&#10095;</button>
          </div>
        </section>
      ))}
      
    </>
  );
};

export default HomePage;