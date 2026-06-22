<?php
$conn = new PDO('mysql:host=localhost;dbname=admission_odisha', 'root', '');
$conn->exec('ALTER TABLE otp_verification ADD COLUMN failed_attempts INT DEFAULT 0 AFTER is_used');
echo "Done";
