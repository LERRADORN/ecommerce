import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const pets = "https://drive.google.com/thumbnail?id=1eJeSG7UuzdB-zUkO8lKhfNuvTXOT0zgr&sz=w1000";

export function HeroSection() {
  return (
    <div className="hero min-h-[60vh] flex justify-center items-center">
      <div className="hero-content flex flex-col items-center lg:flex-row ">
        <img src={pets} className="w-[550px] rounded-lg shadow-2xl p-[10px] mb-8 lg:mb-0 lg:mr-16"/>

        <div className="w-full lg:w-[650px] text-center lg:text-left p-[10px] text-white">
          <h1 className="text-5xl font-bold">Welcome to Our Online Petstore!</h1>
          <p className="py-6">Explore a curated collection of top-quality pet essentials - from nutritious foods to trendy accessories. Whether you have a playful pup, curious cat, or loyal companion, find everything to keep them happy and healthy.</p>
          <Button variant="contained" color="primary" size="large">
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>View Products</Link>
        </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
