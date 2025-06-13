-- Database schema for insurance quiz leads

CREATE DATABASE IF NOT EXISTS insurance_leads;
USE insurance_leads;

-- Leads table
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zip_code VARCHAR(5) NOT NULL,
    is_insured ENUM('yes', 'no') NOT NULL,
    wants_bundle ENUM('yes', 'no') NOT NULL,
    provider VARCHAR(50) NULL,
    lead_score INT DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_zip_code (zip_code),
    INDEX idx_created_at (created_at),
    INDEX idx_lead_score (lead_score),
    INDEX idx_provider (provider)
);

-- Analytics table
CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_data JSON,
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_event_name (event_name),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);

-- Affiliate clicks table
CREATE TABLE affiliate_clicks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT,
    provider VARCHAR(50) NOT NULL,
    zip_code VARCHAR(5),
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_provider (provider),
    INDEX idx_clicked_at (clicked_at)
);

-- A/B Testing variants
CREATE TABLE ab_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE,
    variant ENUM('A', 'B') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_variant (variant)
);

-- Conversion rates view
CREATE VIEW conversion_rates AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN provider IS NOT NULL THEN 1 END) as conversions,
    ROUND((COUNT(CASE WHEN provider IS NOT NULL THEN 1 END) / COUNT(*)) * 100, 2) as conversion_rate,
    AVG(lead_score) as avg_lead_score
FROM leads 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Provider performance view
CREATE VIEW provider_performance AS
SELECT 
    provider,
    COUNT(*) as clicks,
    COUNT(DISTINCT session_id) as unique_users,
    DATE(clicked_at) as date
FROM affiliate_clicks 
WHERE provider IS NOT NULL
GROUP BY provider, DATE(clicked_at)
ORDER BY date DESC, clicks DESC;

-- Lead quality by ZIP view
CREATE VIEW zip_performance AS
SELECT 
    zip_code,
    COUNT(*) as total_leads,
    AVG(lead_score) as avg_score,
    COUNT(CASE WHEN wants_bundle = 'yes' THEN 1 END) as bundle_interest,
    COUNT(CASE WHEN is_insured = 'yes' THEN 1 END) as currently_insured
FROM leads
GROUP BY zip_code
HAVING COUNT(*) >= 5
ORDER BY avg_score DESC;

-- Sample data for testing
INSERT INTO leads (zip_code, is_insured, wants_bundle, provider, lead_score, session_id) VALUES
('90210', 'yes', 'yes', 'geico', 60, 'test_session_1'),
('10001', 'no', 'no', 'progressive', 10, 'test_session_2'),
('60601', 'yes', 'no', 'statefarm', 30, 'test_session_3');

-- Indexes for better performance
CREATE INDEX idx_leads_zip_date ON leads(zip_code, created_at);
CREATE INDEX idx_analytics_event_date ON analytics(event_name, created_at);

-- Useful queries for reporting
-- Daily conversion rates:
-- SELECT * FROM conversion_rates WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Best performing ZIP codes:
-- SELECT * FROM zip_performance LIMIT 10;

-- Provider click performance:
-- SELECT * FROM provider_performance WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);