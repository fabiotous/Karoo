import React from 'react'
import Headers from '../components/Headers'
import '../css/Home.css';;

const HomePage = () => {
  const slides = [
    { src: '/images/logo.png', alt: 'Slide 1' },
    { src: '/images/logo.png', alt: 'Slide 2' },
    { src: '/images/logo.png', alt: 'Slide 3' },
    { src: '/images/logo.png', alt: 'Slide 4' },
    { src: '/images/logo.png', alt: 'Slide 5' },
  ];

    const features = [
    {
      title: "Valentine's Day gifts for all",
      items: [
        { src: '/images/logo.png', label: 'For him' },
        { src: '/images/logo.png', label: 'For her' },
        { src: '/images/logo.png', label: 'For kids' },
        { src: '/images/logo.png', label: 'For Galentines' },
      ],
      link: 'under-construction.html',
      linkText: "Shop Valentine's Day",
    },
    {
      title: 'Deals on 4+ star rated items',
      items: [
        { src: '/homepage/images/fashion.png', label: 'Fashion' },
        { src: '/homepage/images/beauty.png', label: 'Beauty' },
        { src: '/homepage/images/electronics.png', label: 'Electronics' },
        { src: '/homepage/images/homekitchen.png', label: 'Home & Kitchen' },
      ],
      link: 'under-construction.html',
      linkText: 'Shop all deals',
    },
    {
      title: 'Social Media Favourites',
      items: [
        { src: '/homepage/images/deals.png', label: 'Deals' },
        { src: '/homepage/images/fashion.png', label: 'Fashion' },
        { src: '/homepage/images/beauty.png', label: 'Premium Beauty' },
        { src: '/homepage/images/homekitchen.png', label: 'Home & Kitchen' },
      ],
      link: 'under-construction.html',
      linkText: 'Shop the latest picks',
    },
    {
      title: 'Winter essentials',
      items: [
        { src: 'url("/images/about/Karoo.jpg")', label: 'Winter home essentials' },
        { src: '/homepage/images/heatingandfireplace.png', label: 'Heating & fireplace' },
        { src: '/homepage/images/outdoorequipment.png', label: 'Outdoor equipment' },
        { src: '/homepage/images/carreadiness.png', label: 'Car readiness' },
      ],
      link: 'under-construction.html',
      linkText: 'Top deals on winter essentials',
    },
  ];

  return (
    <>

      {/* ===== SLIDESHOW ===== */}
      <div className="content">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div className="slide fade" key={index}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURE CARDS ===== */}
      <div className="feature-section">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <h3>{feature.title}</h3>
            <div className="feature-grid">
              {feature.items.map((item, index) => (
                <a href={feature.link} className="feature-item" key={index}>
                  <img src={item.src} alt={item.label} />
                  <p>{item.label}</p>
                </a>
              ))}
            </div>
            <a href={feature.link}>{feature.linkText}</a>
          </div>
        ))}
      </div>

      
    </>
  );
};

export default HomePage;