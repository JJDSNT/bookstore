/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'lalalaou',
  // disable: process.env.NODE_ENV === 'development',
  register: true,
  // scope: '/app',
   sw: 'service-worker.js',
  //...
})
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  generateInDevMode: false,
  dontAutoRegisterSw: true,
  generateSw: false,
  workboxOpts: {
    swDest: './service-worker.js',
    swSrc: path.join(__dirname, 'sw.js'),
  }
}


module.exports = withPWA(nextConfig)