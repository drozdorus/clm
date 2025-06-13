<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Simple lead processing endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required_fields = ['zipCode', 'insured', 'bundle'];
    foreach ($required_fields as $field) {
        if (!isset($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            exit;
        }
    }
    
    // Sanitize data
    $lead_data = [
        'zipCode' => preg_replace('/[^0-9]/', '', $input['zipCode']),
        'insured' => $input['insured'] === 'yes' ? 'yes' : 'no',
        'bundle' => $input['bundle'] === 'yes' ? 'yes' : 'no',
        'provider' => isset($input['provider']) ? sanitize_string($input['provider']) : null,
        'timestamp' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'session_id' => isset($input['sessionId']) ? sanitize_string($input['sessionId']) : null
    ];
    
    // Calculate lead score
    $lead_score = 0;
    if ($lead_data['insured'] === 'yes') $lead_score += 20;
    if ($lead_data['bundle'] === 'yes') $lead_score += 30;
    if (strlen($lead_data['zipCode']) === 5) $lead_score += 10;
    $lead_data['lead_score'] = $lead_score;
    
    // Save to database
    try {
        save_lead_to_database($lead_data);
        
        // Send to CRM/Email service
        send_to_crm($lead_data);
        
        // Log for analytics
        log_conversion($lead_data);
        
        echo json_encode([
            'success' => true,
            'lead_id' => generate_lead_id(),
            'message' => 'Lead saved successfully'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to save lead',
            'message' => $e->getMessage()
        ]);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

function sanitize_string($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

function save_lead_to_database($data) {
    // Database configuration
    $host = 'localhost';
    $dbname = 'insurance_leads';
    $username = 'your_db_user';
    $password = 'your_db_password';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO leads (zip_code, is_insured, wants_bundle, provider, lead_score, ip_address, user_agent, session_id, created_at) 
                VALUES (:zip_code, :is_insured, :wants_bundle, :provider, :lead_score, :ip_address, :user_agent, :session_id, :created_at)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':zip_code' => $data['zipCode'],
            ':is_insured' => $data['insured'],
            ':wants_bundle' => $data['bundle'],
            ':provider' => $data['provider'],
            ':lead_score' => $data['lead_score'],
            ':ip_address' => $data['ip_address'],
            ':user_agent' => $data['user_agent'],
            ':session_id' => $data['session_id'],
            ':created_at' => $data['timestamp']
        ]);
        
    } catch (PDOException $e) {
        throw new Exception("Database error: " . $e->getMessage());
    }
}

function send_to_crm($data) {
    // Send lead to CRM system (example with webhook)
    $crm_webhook = 'https://your-crm.com/api/leads';
    
    $payload = json_encode($data);
    
    $ch = curl_init($crm_webhook);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    // Log CRM response
    error_log("CRM Response: " . $response);
}

function send_email_notification($data) {
    // Send email notification to sales team
    $to = 'sales@yourcompany.com';
    $subject = 'New Insurance Lead - Score: ' . $data['lead_score'];
    
    $message = "New lead received:\n\n";
    $message .= "ZIP Code: " . $data['zipCode'] . "\n";
    $message .= "Currently Insured: " . $data['insured'] . "\n";
    $message .= "Wants Bundle: " . $data['bundle'] . "\n";
    $message .= "Provider Clicked: " . $data['provider'] . "\n";
    $message .= "Lead Score: " . $data['lead_score'] . "\n";
    $message .= "Time: " . $data['timestamp'] . "\n";
    
    mail($to, $subject, $message);
}

function log_conversion($data) {
    // Log conversion for analytics
    $log_entry = date('Y-m-d H:i:s') . " - Lead converted: " . json_encode($data) . "\n";
    file_put_contents('leads.log', $log_entry, FILE_APPEND | LOCK_EX);
}

function generate_lead_id() {
    return 'LEAD_' . date('Ymd') . '_' . strtoupper(substr(md5(uniqid()), 0, 8));
}

// Analytics endpoint
if (isset($_GET['action']) && $_GET['action'] === 'analytics') {
    $event = $_POST['event'] ?? '';
    $data = $_POST['data'] ?? [];
    
    // Log analytics event
    $analytics_log = [
        'event' => $event,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR']
    ];
    
    file_put_contents('analytics.log', json_encode($analytics_log) . "\n", FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true]);
}
?>