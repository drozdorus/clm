// Configuration file for easy customization
const CONFIG = {
    // Affiliate Links - замініть на ваші реальні посилання
    affiliateLinks: {
        progressive: 'https://www.progressive.com/?affiliate_id=YOUR_PROGRESSIVE_ID',
        geico: 'https://www.geico.com/?affiliate_id=YOUR_GEICO_ID',
        statefarm: 'https://www.statefarm.com/?affiliate_id=YOUR_STATEFARM_ID',
        allstate: 'https://www.allstate.com/?affiliate_id=YOUR_ALLSTATE_ID'
    },

    // Analytics IDs
    analytics: {
        googleAnalyticsId: 'GA_MEASUREMENT_ID', // например: G-XXXXXXXXXX
        facebookPixelId: 'YOUR_PIXEL_ID',
        enableGoogleAnalytics: false,
        enableFacebookPixel: false
    },

    // Quiz Settings
    quiz: {
        cookieExpirationDays: 30,
        autoAdvanceDelay: 1000, // milliseconds
        bundleDiscountPercent: 50
    },

    // Company Information
    companies: {
        progressive: {
            name: 'Progressive',
            logo: 'https://logos-world.net/wp-content/uploads/2021/02/Progressive-Logo.png',
            rating: '4.8/5',
            basePrice: 89,
            features: [
                '24/7 customer support',
                'Mobile app discounts', 
                'Accident forgiveness'
            ]
        },
        geico: {
            name: 'Geico',
            logo: 'https://logos-world.net/wp-content/uploads/2020/05/Geico-Logo.png',
            rating: '4.9/5',
            basePrice: 76,
            features: [
                '15% savings for gov employees',
                'Easy online claims',
                'Emergency roadside service'
            ],
            featured: true
        },
        statefarm: {
            name: 'State Farm',
            logo: 'https://logos-world.net/wp-content/uploads/2020/04/State-Farm-Logo.png',
            rating: '4.7/5',
            basePrice: 94,
            features: [
                'Local agent support',
                'Good student discounts',
                'Multi-policy savings'
            ]
        },
        allstate: {
            name: 'Allstate',
            logo: 'https://logos-world.net/wp-content/uploads/2020/04/Allstate-Logo.png',
            rating: '4.6/5',
            basePrice: 102,
            features: [
                'Drivewise rewards program',
                'New car replacement',
                'Safe driving bonuses'
            ]
        }
    },

    // Customization
    branding: {
        mainTitle: 'Find Your Perfect Auto Insurance',
        subtitle: 'Compare quotes from top providers and save up to 50%',
        primaryColor: '#667eea',
        secondaryColor: '#764ba2'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}