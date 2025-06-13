// 🎯 ШВИДКА КОНФІГУРАЦІЯ КВІЗУ
// Змініть тут налаштування, а потім скопіюйте в index.html

const QUIZ_CONFIG = {
    // 🔗 АФІЛІАТНІ ПОСИЛАННЯ (ОБОВ'ЯЗКОВО ЗМІНІТЬ!)
    affiliateLinks: {
        progressive: 'https://www.progressive.com/?affiliate_id=ВАШ_PROGRESSIVE_ID',
        geico: 'https://www.geico.com/?affiliate_id=ВАШ_GEICO_ID', 
        statefarm: 'https://www.statefarm.com/?affiliate_id=ВАШ_STATEFARM_ID',
        allstate: 'https://www.allstate.com/?affiliate_id=ВАШ_ALLSTATE_ID'
    },

    // 💰 ЦІНИ СТРАХОВОК ($/місяць)
    pricing: {
        geico: 76,      // Featured (Most Popular)
        progressive: 89,
        statefarm: 94,
        allstate: 102
    },

    // 🏷️ ОСОБЛИВОСТІ КОЖНОЇ КОМПАНІЇ
    features: {
        geico: [
            '15% знижка для держслужбовців',
            'Легкі онлайн заявки', 
            'Екстрена допомога на дорозі'
        ],
        progressive: [
            'Підтримка 24/7',
            'Знижки через мобільний додаток',
            'Прощення аварій'
        ],
        statefarm: [
            'Локальна підтримка агентів',
            'Знижки для студентів',
            'Мульти-поліс заощадження'
        ],
        allstate: [
            'Програма винагород Drivewise',
            'Заміна нового авто',
            'Бонуси за безпечну їзду'
        ]
    },

    // ⭐ РЕЙТИНГИ
    ratings: {
        geico: '4.9/5',
        progressive: '4.8/5', 
        statefarm: '4.7/5',
        allstate: '4.6/5'
    },

    // 📦 BUNDLE ЗНИЖКА (у відсотках)
    bundleDiscount: 50, // 50% знижка

    // 🍪 НАЛАШТУВАННЯ COOKIES
    cookieExpirationDays: 30,

    // ⏱️ ЗАТРИМКИ АНІМАЦІЇ (мілісекунди)
    delays: {
        autoAdvance: 800,        // Автоперехід між кроками
        inputFocus: 300,         // Фокус на поле вводу
        errorDisplay: 3000       // Показ помилки
    },

    // 🎨 КОЛЬОРИ (CSS)
    colors: {
        primary: '#667eea',
        secondary: '#764ba2', 
        success: '#4CAF50',
        error: '#ff4757',
        warning: '#ffc107'
    },

    // 📱 RESPONSIVE BREAKPOINTS
    breakpoints: {
        mobile: '768px',
        small: '480px'
    }
};

// 🚀 ІНСТРУКЦІЯ ШВИДКОГО ОНОВЛЕННЯ:
/*
1. Змініть affiliateLinks на ваші реальні посилання
2. Підкоригуйте pricing при необхідності  
3. Оновіть features для кожної компанії
4. Скопіюйте значення в index.html в розділ:

const affiliateLinks = {
    progressive: 'ваше_посилання',
    // тощо...
};

5. Для зміни цін знайдіть в HTML:
<div class="price-estimate">$76/month*</div>
І замініть на нові значення з pricing
*/

console.log('📋 Конфігурація завантажена:', QUIZ_CONFIG);