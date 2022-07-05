<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//who send mail
$mail->setFrom('den3702@yandex.ru', 'Ден Ахметов');
//who get mail
$mail->addAddress('dAhmetov@gmail.com');
//Theme mail template
$mail->Subject = 'Онлайн заказ';


//mail body
$body = '<h1>Поскорее бы заказ получить!</h1>';

if(trim(!empty($_POST['name']))){
    $body .= '<p><strong>Имя:</strong> '.$_POST['name'].'<p>';
}
if(trim(!empty($_POST['email']))){
    $body .= '<p><strong>Email:</strong> '.$_POST['email'].'<p>';
}
if(trim(!empty($_POST['select']))){
    $body .= '<p><strong>Email:</strong> '.$_POST['select'].'<p>';
}

$mail->Body =$body;

// Send email
if(!$mail->send()){
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>