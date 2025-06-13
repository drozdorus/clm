// Тестування афіліатних посилань
// Відкрийте цей файл в браузері разом з index.html для тестування

console.log('🧪 ТЕСТУВАННЯ КВІЗУ');

// Симуляція проходження квізу
function testQuiz() {
    console.log('1. Тестуємо ZIP код...');
    
    // Симуляція введення ZIP
    const zipInput = document.getElementById('zipCode');
    if (zipInput) {
        zipInput.value = '12345';
        zipInput.dispatchEvent(new Event('input'));
        console.log('✅ ZIP код введено:', zipInput.value);
    }
    
    setTimeout(() => {
        console.log('2. Тестуємо кнопку Continue...');
        const continueBtn = document.querySelector('.btn-primary');
        if (continueBtn && !continueBtn.disabled) {
            console.log('✅ Кнопка Continue активна');
        }
    }, 500);
}

// Перевірка афіліатних посилань
function checkAffiliateLinks() {
    console.log('🔗 ПЕРЕВІРКА АФІЛІАТНИХ ПОСИЛАНЬ:');
    
    const links = {
        progressive: 'https://www.progressive.com/?affiliate_id=YOUR_PROGRESSIVE_ID',
        geico: 'https://www.geico.com/?affiliate_id=YOUR_GEICO_ID',
        statefarm: 'https://www.statefarm.com/?affiliate_id=YOUR_STATEFARM_ID',
        allstate: 'https://www.allstate.com/?affiliate_id=YOUR_ALLSTATE_ID'
    };
    
    Object.entries(links).forEach(([company, link]) => {
        if (link.includes('YOUR_')) {
            console.log('⚠️', company, '- ПОТРІБНО ЗАМІНИТИ affiliate_id');
        } else {
            console.log('✅', company, '- OK');
        }
    });
}

// Автозапуск тестів
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        testQuiz();
        checkAffiliateLinks();
    }, 1000);
});

// Функція для швидкого тестування результатів
function skipToResults() {
    console.log('⏩ Переходимо до результатів...');
    
    // Встановлюємо тестові дані
    window.quizData = {
        zipCode: '12345',
        insured: 'yes', 
        bundle: 'no'
    };
    
    // Переходимо до результатів
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('results').classList.add('active');
    
    // Оновлюємо прогрес
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('currentStep').textContent = '3';
    
    console.log('✅ Результати показані');
}

// Додаємо кнопку для швидкого тесту (для розробки)
setTimeout(() => {
    const testBtn = document.createElement('button');
    testBtn.textContent = '⏩ ТЕСТ: Показати результати';
    testBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: #ff4757;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
    `;
    testBtn.onclick = skipToResults;
    document.body.appendChild(testBtn);
}, 2000);