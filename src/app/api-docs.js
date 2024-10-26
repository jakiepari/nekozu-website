import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <nav 
      className={`navbar mb-2 shadow-lg bg-black text-neutral-content fixed top-0 w-full transition-all duration-300 ease-in-out ${isMobile ? 'mobile-nav' : 'desktop-nav'} ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center px-2 mx-2">
        <Image src="/aku.jpeg" alt="Navbar Image" width={50} height={50} />
        <span className="ml-2">Wong ganteng</span>
      </div>
      <div className="flex-1 px-2 mx-2 flex justify-end items-center">
        <span className="text-lg font-bold">Jaki</span>
        <Link href="/enter" passHref>
          <button className="btn btn-ghost btn-sm rounded-btn ml-4">
            Enter Website
          </button>
        </Link>
      </div>
    </nav>
  );
}