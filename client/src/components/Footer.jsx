import React, { useState, useEffect } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const logo = "https://drive.google.com/thumbnail?id=1A691YGS_6otA7tg2NLOxKG0aslIIW8Wg&sz=w1000";

const Footer = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); // Adjust the width as needed
    };

    handleResize(); // Call on initial render

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const footerStyle = {
    backgroundColor: '#D2A860',
    color: '#4E342E',
    padding: isSmallScreen ? '40px 15px' : '40px 100px 20px 100px', // Adjusted padding for smaller screens
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '250px', // Set a minimum height for the footer
    marginBottom: 0, // Remove margin at the bottom
  };

  const socialIconStyle = {
    color: '#4E342E',
    fontSize: 24,
    marginRight: 10,
  };

  const sectionStyle = {
    textAlign: isSmallScreen ? 'center' : 'left',
    fontWeight: 500, // Font weight added here
  };

  const contactUsStyle = {
    textAlign: isSmallScreen ? 'center' : 'left',
    fontWeight: 500, // Font weight added here
  };

  const mediaQueryStyle = {
    width: '100%',
    paddingRight: '15px',
  };

  const followUsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const rightsReservedContainerStyle = {
    backgroundColor: '#4E342E',
    padding: '20px 0',
    width: '100%',
    color: '#FFFAF0',
    textAlign: 'center',
  };

  return (
    <>
      <footer style={footerStyle}>
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {/* About Us Section */}
          <Grid item xs={12} sm={4}>
            <div style={{ ...sectionStyle, ...mediaQueryStyle }}>
            <div style={{ ...sectionStyle, ...mediaQueryStyle }}>
            <img src={logo} alt="About Us" style={{ marginBottom: '1rem' }} className='w-[68px]'/>
            </div>

              <Typography variant="body1">
                We offer a carefully curated selection of premium products to keep your furry, feathery, or scaly friends happy and healthy. Join our community of pet lovers and let's make tails wag, purrs rumble, and feathers flutter together!
              </Typography>
            </div>
          </Grid>

          {/* Follow Us Section */}
          <Grid item xs={12} sm={4}>
            <div style={{ ...followUsContainerStyle, ...mediaQueryStyle }}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://facebook.com" target="_blank" rel="noopener" style={socialIconStyle}>
                  <FaFacebook />
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener" style={socialIconStyle}>
                  <FaTwitter />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener" style={socialIconStyle}>
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={4}>
            <div style={{ ...contactUsStyle, ...mediaQueryStyle }}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>

              <Typography variant="body2">
                Blk.275 lot 7 Governors Drive, Old Bulihan, Silang, Cavite, 3022
                <br />
                <br />
                <strong>Email:</strong> PIONG_PIANG@petstore.com <br />
                <br />
                <strong>Phone:</strong> 0928 776 1321
              </Typography>
            </div>
          </Grid>
        </Grid>
      </footer>

      <div style={rightsReservedContainerStyle}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} All rights reserved
        </Typography>
      </div>
    </>
  );
};

export default Footer;


