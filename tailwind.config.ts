
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ["Rajdhani", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				gaming: {
					"dark": "#050508",
					"darker": "#0a0a12",
					"blue": "#00f0ff",
					"purple": "#9d4edd",
					"pink": "#ff2a6d",
					"accent": "#ffb703",
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.3)' 
					},
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'gradient-flow': {
					'0%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' },
					'100%': { 'background-position': '0% 50%' },
				},
				'shimmer': {
					'0%': { 'background-position': '-1000px 0' },
					'100%': { 'background-position': '1000px 0' },
				},
				'text-shimmer': {
					'0%': { 
						'background-position': '0% 50%',
						'background-size': '100%'
					},
					'100%': { 
						'background-position': '100% 50%', 
						'background-size': '100%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 5s ease infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'text-shimmer': 'text-shimmer 4s ease infinite'
			},
			backgroundImage: {
				'hero-pattern': 'radial-gradient(circle at 30% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(157, 78, 221, 0.1) 0%, transparent 35%)',
				'card-gradient': 'linear-gradient(45deg, rgba(10, 10, 18, 0.9) 0%, rgba(17, 17, 34, 0.8) 100%)',
				'blue-glow': 'linear-gradient(180deg, rgba(0, 240, 255, 0) 0%, rgba(0, 240, 255, 0.15) 100%)',
				'purple-glow': 'linear-gradient(180deg, rgba(157, 78, 221, 0) 0%, rgba(157, 78, 221, 0.15) 100%)',
				'glass-card': 'linear-gradient(120deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
				'neon-border': 'linear-gradient(90deg, rgba(0, 240, 255, 0.7) 0%, rgba(157, 78, 221, 0.7) 50%, rgba(255, 42, 109, 0.7) 100%)',
				'btn-gradient': 'linear-gradient(90deg, #00f0ff 0%, #9d4edd 100%)',
				'text-gradient': 'linear-gradient(90deg, #00f0ff, #9d4edd, #ff2a6d)'
			},
			boxShadow: {
				'neon-blue': '0 0 5px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)',
				'neon-purple': '0 0 5px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157, 78, 221, 0.3)',
				'neon-pink': '0 0 5px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.3)',
				'neon-glow': '0 0 10px rgba(0, 240, 255, 0.5), 0 0 30px rgba(157, 78, 221, 0.3)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.3)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
