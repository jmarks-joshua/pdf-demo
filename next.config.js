/** @type {import('next').NextConfig} */
const webpack = require('webpack')

const nextConfig = {
    webpack: (config) => {
		config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' })
		return config
	}
}

module.exports = nextConfig
