<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if (isset($_POST["send"])) {

    $endereço = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $name = $_POST["name"];

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'emailqvaienviar@gmail.com'; 
    $mail->Password = 'codgio '; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('gui.castro.soares@gmail.com'); 
    $mail->addAddress('gui.castro.soares@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = 'A senhor/a ' . $name . '<p> Queria falar sobre ' . $subject . '<p> Deixamos a seguinte msg <p>"' . $message . '" <p> responda a ' .$endereço;
    
    try {
        $mail->send();
        echo '<script>
        alert("Email sent successfully") ;
        document.location.href = "contacto.html";
        </script>';
    } catch (Exception $e) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}
?>