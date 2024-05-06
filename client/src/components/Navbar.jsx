
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const logo = "https://drive.google.com/thumbnail?id=1A691YGS_6otA7tg2NLOxKG0aslIIW8Wg&sz=w1000";

const pages = [
    { name: 'Home', link: '/' },
    {
      name: 'Products',
      nestedItems: [
        { name: 'All Products', link: '/products' },
        { name: 'Dog', link: '/products/dog' },
        { name: 'Cat', link: '/products/cat' },
        { name: 'Fish', link: '/products/fish' },
        { name: 'Bird', link: '/products/bird' },
      ],
    },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'FAQs', link: '/faqs' },
    { name: 'Cart', link: '/cart' },
    { name: 'Signup', link: '/signup' },
    { name: 'Login', link: '/login' },
  ];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleOpenNavMenu = (event, pageName) => {
    setAnchorElNav(event.currentTarget);
    setOpenSubmenu(pageName);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpenSubmenu(null);
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);


  const renderMenuItems = (pagesArray, isNested = false) => {
    return (
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: ['column', 'row'], // Vertical for mobile, horizontal for larger screens
          alignItems: 'flex-start',
        }}
      >
        {pagesArray.map((page, index) => {
          if (page.nestedItems && isMobile && !isNested) {
            return (
              <Box key={page.name}>
                <Button
                  aria-controls={`submenu-${page.name}`}
                  aria-haspopup="true"
                  onClick={(event) => handleOpenNavMenu(event, page.name)}
                  sx={{
                    mx: 1,
                    color: '#',
                    textTransform: 'uppercase',
                    fontWeight: 550,
                    backgroundColor:
                      location.pathname === page.link ? '#FFFFFF' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',

                    },
                    '&:active': {
                      backgroundColor: '#FFFFFF',
                    },
                  }}
                >
                  {page.name}
                </Button>
                <Menu
                  id={`submenu-${page.name}`}
                  anchorEl={anchorElNav}
                  open={openSubmenu === page.name}
                  onClose={handleCloseNavMenu}
                >
                  {page.nestedItems.map((nestedItem) => (
                    <MenuItem
                      key={nestedItem.name}
                      component={Link}
                      to={nestedItem.link}
                      onClick={handleCloseNavMenu}
                      sx={{
                        color: '#4E342E',
                        fontWeight: 550,
                        '&:hover': {
                            backgroundColor: '#FFFFFF',
                        },
                        '&:active': {
                            backgroundColor: '#FFFFFF',
                        },
                      }}
                    >
                      {nestedItem.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            );
          } else if (page.nestedItems) {
            return (
              <Box key={page.name} sx={{ position: 'relative' }}>
                <Button
                  aria-controls={`submenu-${page.name}`}
                  aria-haspopup="true"
                  onClick={(event) => handleOpenNavMenu(event, page.name)}
                  sx={{
                    mx: 1,
                    color: '#4E342E',
                    textTransform: 'uppercase',
                    fontWeight: 550,
                    backgroundColor:
                      location.pathname === page.link ? '#FFFFFF' : 'transparent',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                    },
                    '&:active': {
                        backgroundColor: '#FFFFFF',
                    },
                  }}
                >
                  {page.name}
                </Button>
                <Menu
                  id={`submenu-${page.name}`}
                  anchorEl={anchorElNav}
                  open={openSubmenu === page.name}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: 'block', // Always display submenu vertically
                    marginTop: '0.5rem', // Adjust spacing between primary link and submenu
                  }}
                >
                  {renderMenuItems(page.nestedItems, true)}
                </Menu>
              </Box>
            );
          } else {
            const isLastItem = index === pagesArray.length - 1;

            return (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1,
                  color: '#4E342E',
                  textTransform: 'uppercase',
                  fontWeight: 550,
                  backgroundColor:
                    location.pathname === page.link ? '#FFFFFF' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                  },
                  '&:active': {
                    backgroundColor: '#FFFFFF',
                  },
                  marginBottom: isLastItem ? '0' : '0.5rem', // Add margin bottom except for last item
                }}
              >
                {page.name}
              </Button>
            );
          }
        })}
      </Box>
    );
  };



  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#B3D334' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
            {/* Menu Icon for smaller screens */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event) => handleOpenNavMenu(event, 'menu')}
                  color="inherit"
                  sx={{ mr: 2, color: '#4E342E' }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Logo */}
              <img
                src={logo}
                alt="Logo"
                style={{ height: 60, margin: 10 }}
              />
            </Box>

            {/* Menu Items */}
            <Box sx={{ display: isMobile ? 'none' : 'flex', justifyContent: 'center', flexGrow: 1 }}>
              {renderMenuItems(pages)}
            </Box>

            {/* Menu for smaller screens */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderMenuItems(pages)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

