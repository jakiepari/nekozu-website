'use client';

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button, Card, CardContent, Typography, CircularProgress, Avatar, IconButton } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { Send as TelegramIcon, Menu as MenuIcon, ShoppingCart as ShopIcon, Close as CloseIcon } from '@mui/icons-material'
import dynamic from 'next/dynamic'

const Particles = dynamic(() => import('react-particles'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const bots = [
  {
    id: 1,
    name: 'Nekozu Music',
    description: 'Download your favourite music from many platforms with our bots!',
    image: '/down.svg',
    link: 'https://t.me/NekoMuBot',
    color: '#FF6B6B'
  },
  {
    id: 2,
    name: 'Nekozu Translate',
    description: 'Translate text between multiple languages instantly. With also voice to text and translate from photo!',
    image: '/trans.svg',
    link: 'https://t.me/NekoTransBot',
    color: '#4ECDC4'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [typedText, setTypedText] = useState('')
  const [navbarOpen, setNavbarOpen] = useState(false)
  const fullText = "Best Telegram Bots for Your Needs :3"
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const particlesInit = async (engine) => {
    await (await import('tsparticles')).loadFull(engine)
  }

  const particlesConfig = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#6b7280" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6b7280",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      }
    },
    retina_detect: true
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typedText.length < fullText.length) {
      setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
    }
  }, [typedText])

  const NavMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg z-50"
    >
      <div className="p-4 space-y-4">
        <Link href="https://t.me/nekozuX" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
          <TelegramIcon className="text-blue-600" />
          <span className="text-blue-600">Telegram Channel</span>
        </Link>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 text-gray-800 overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar
                src="/project.svg?height=40&width=40"
                alt="Nekozu Logo"
                className="cursor-pointer"
                sx={{ width: 45, height: 45 }}
              />
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nekozu
              </Link>
            </motion.div>
            
            <IconButton
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-blue-600"
            >
              {navbarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </nav>
        <AnimatePresence>
          {navbarOpen && <NavMenu />}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-screen"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CircularProgress size={60} style={{ color: '#3B82F6' }} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
              <div className="container mx-auto text-center px-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {typedText}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl mb-12 text-gray-600"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Enhance your Telegram experience with our amazing bots! 
                </motion.p>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 md:space-y-0 md:space-x-6"
                >
                  <Button
                    variant="contained"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    size="large"
                    startIcon={<TelegramIcon />}
                    href="https://t.me/nekozuX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Our Channel
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    size="large"
                    startIcon={<ShopIcon />}
                    href="https://ko-fi.com/nekozu/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Our Shop
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Bot List */}
            <motion.section
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="py-20 bg-white/80 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4">
                <motion.h2
                  className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  Our Awesome Bots
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {bots.map((bot) => (
                    <motion.div
                      key={bot.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={bot.link} target="_blank" rel="noopener noreferrer">
                        <Card className="relative overflow-hidden h-full bg-gradient-to-br from-white to-gray-50 border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r"
                            style={{
                              background: `linear-gradient(135deg, ${bot.color}15, transparent)`,
                              opacity: 0.1
                            }}
                          />
                          <div className="relative w-32 h-32 mx-auto mt-8 transform hover:rotate-12 transition-transform duration-300">
                            <Image
                              src={bot.image}
                              alt={bot.name}
                              width={128}
                              height={128}
                              className="object-contain"
                            />
                          </div>
                          <CardContent className="text-center p-6">
                            <Typography
                              variant="h5"
                              component="div"
                              className="font-bold mb-4"
                              style={{ color: bot.color }}
                            >
                              {bot.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              className="mb-4"
                            >
                              {bot.description}
                            </Typography>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: bot.color }}
                              className="mt-4 rounded-full hover:shadow-lg transition-all duration-300"
                              endIcon={<TelegramIcon />}
                            >
                              Try Now
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
              <div className="container mx-auto text-center px-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="h6" className="mb-4">
                    Connect with Nekozu
                  </Typography>
                  <div className="flex justify-center space-x-4 mb-8">
                    <motion.a
                      href="https://t.me/nekozuX"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TelegramIcon className="text-white text-2xl" />
                    </motion.a>
                  </div>
                  <Typography variant="body2" className="opacity-75">
                    &copy; {new Date().getFullYear()} Nekozu Network. All rights reserved.
                  </Typography>
                </motion.div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}


