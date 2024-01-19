<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if (isset($_POST["send"])) {
    $recipient_email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $name = $_POST["name"];

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '@gmail.com'; 
    $mail->Password = ' '; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('gui.castro.soares@gmail.com'); 
    $mail->addAddress($recipient_email);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = 'bom dia ' . $name . '<p> voluntariou-se para ' . $subject . '<p> vamos ter em conta as suas observações <p>"' . $message . '"';
    
    try {
        $mail->send();
        echo '<script>
        alert("Email sent successfully") ;
        document.location.href = "index.html#Voluntaria";
        </script>';
    } catch (Exception $e) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}
?>
