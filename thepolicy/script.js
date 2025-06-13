// Quiz data storage
let quizData = {
    zipCode: '',
    insured: '',
    bundle: ''
};

// Affiliate links - замініть на свої реальні афіліатні посилання
const affiliateLinks = {
    progressive: 'https://www.progressive.com/?affiliate_id=YOUR_ID',
    geico: 'https://www.geico.com/?affiliate_id=YOUR_ID',
    statefarm: 'https://www.statefarm.com/?affiliate_id=YOUR_ID',
    allstate: 'https://www.allstate.com/?affiliate_id=YOUR_ID'
};

// Current step tracking
let currentStep = 1;
const totalSteps = 3;

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    loadSavedData();
});

// Progress bar update
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const currentStepSpan = document.getElementById('currentStep');
    
    const progress = (currentStep / totalSteps) * 100;
    progressBar.style.width = progress + '%';
    currentStepSpan.textContent = currentStep;
}

// Load saved data from cookies
function loadSavedData() {
    const savedData = getCookie('quizData');
    if (savedData) {
        try {
            quizData = JSON.parse(savedData);
            populateFields();
        } catch (e) {
            console.log('Error loading saved data');
        }
    }
}

// Save data to cookies
function saveData() {
    setCookie('quizData', JSON.stringify(quizData), 30); // 30 days
}

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Populate fields with saved data
function populateFields() {
    if (quizData.zipCode) {
        document.getElementById('zipCode').value = quizData.zipCode;
    }
}

// Next step function
function nextStep(step) {
    if (step === 1) {
        const zipCode = document.getElementById('zipCode').value;
        
        if (!validateZipCode(zipCode)) {
            showError('Please enter a valid 5-digit zip code');
            return;
        }
        
        quizData.zipCode = zipCode;
        saveData();
    }
    
    // Hide current step
    document.getElementById('step' + currentStep).classList.remove('active');
    
    // Move to next step
    currentStep++;
    
    if (currentStep <= totalSteps) {
        document.getElementById('step' + currentStep).classList.add('active');
        updateProgressBar();
    } else {
        showResults();
    }
}

// Select option function
function selectOption(type, value) {
    quizData[type] = value;
    saveData();
    
    // Visual feedback
    const currentStepDiv = document.getElementById('step' + currentStep);
    const options = currentStepDiv.querySelectorAll('.option-card');
    
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    event.target.closest('.option-card').classList.add('selected');
    
    // Auto advance after 1 second
    setTimeout(() => {
        nextStep(currentStep);
    }, 1000);
}

// Validate zip code
function validateZipCode(zipCode) {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
}

// Show error message
function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ff4757;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        margin-top: 10px;
        text-align: center;
        animation: shake 0.5s ease-in-out;
    `;
    errorDiv.textContent = message;
    
    const inputGroup = document.querySelector('.input-group');
    inputGroup.appendChild(errorDiv);
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Show results
function showResults() {
    document.getElementById('step' + currentStep).classList.remove('active');
    document.getElementById('results').classList.add('active');
    
    // Update progress bar to 100%
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('currentStep').textContent = totalSteps;
    
    // Customize results based on answers
    customizeResults();
    
    // Track completion
    trackEvent('quiz_completed', quizData);
}

// Customize results based on user answers
function customizeResults() {
    const resultsSubtext = document.getElementById('resultsSubtext');
    
    let customText = 'Based on your answers, here are the top-rated providers';
    
    if (quizData.bundle === 'yes') {
        customText += ' with bundle discounts';
    }
    
    if (quizData.insured === 'no') {
        customText += ' perfect for first-time buyers';
    }
    
    customText += ' in your area.';
    
    resultsSubtext.textContent = customText;
    
    // Adjust pricing based on bundle selection
    if (quizData.bundle === 'yes') {
        updatePricingForBundle();
    }
}

// Update pricing for bundle offers
function updatePricingForBundle() {
    const priceElements = document.querySelectorAll('.price-estimate');
    priceElements.forEach(price => {
        const currentPrice = parseInt(price.textContent.replace('$', '').replace('/month*', ''));
        const bundlePrice = Math.round(currentPrice * 0.5); // 50% discount
        price.innerHTML = `<span style="text-decoration: line-through; color: #999; font-size: 1.2rem;">$${currentPrice}</span><br>$${bundlePrice}/month*`;
    });
    
    // Add bundle notice
    const disclaimer = document.querySelector('.disclaimer p');
    disclaimer.textContent = '*Bundled rates shown. Individual car insurance rates may be higher. ' + disclaimer.textContent;
}

// Open affiliate offer
function openOffer(company) {
    const link = affiliateLinks[company];
    
    // Track click
    trackEvent('offer_clicked', {
        company: company,
        ...quizData
    });
    
    // Open in new tab
    window.open(link, '_blank');
}

// Event tracking (replace with your analytics)
function trackEvent(eventName, data) {
    console.log('Event:', eventName, data);
    
    // Google Analytics example (uncomment and replace with your tracking ID)
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            custom_parameter_1: data.zipCode,
            custom_parameter_2: data.insured,
            custom_parameter_3: data.bundle
        });
    }
    */
    
    // Facebook Pixel example (uncomment and replace with your pixel ID)
    /*
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            zip_code: data.zipCode,
            currently_insured: data.insured,
            wants_bundle: data.bundle
        });
    }
    */
}

// Keyboard navigation
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (currentStep === 1) {
            nextStep(1);
        }
    }
});

// Auto-focus zip code input
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('zipCode').focus();
    }, 500);
});

// Input validation for zip code
document.getElementById('zipCode').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 5) {
        value = value.substr(0, 5);
    }
    e.target.value = value;
    
    // Enable/disable button based on input
    const button = document.querySelector('.btn-primary');
    if (value.length === 5) {
        button.disabled = false;
        button.textContent = 'Continue';
    } else {
        button.disabled = true;
        button.textContent = 'Enter 5-digit zip code';
    }
});

// Add smooth scrolling for mobile
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Call scroll to top when changing steps
const originalNextStep = nextStep;
nextStep = function(step) {
    smoothScrollToTop();
    setTimeout(() => {
        originalNextStep(step);
    }, 300);
};