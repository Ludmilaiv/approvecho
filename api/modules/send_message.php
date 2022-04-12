<?php

function send_message($number, $text) {
  //$token = "fxsmhre15485jg7q549mgy4qyx2khdj2zy9qemuy64wc6accenmn6yexclaeamgd";
  $token = "71cg5abd4dx8aovdpsubgoeo8x137utzamv2jcv4zz6rbv9bc939f85ev31xhybo";
  $ch = curl_init();
  curl_setopt_array($ch, [
      CURLOPT_URL => "https://lcab.smsint.ru/json/v1.0/sms/send/text",
      CURLOPT_POST => true,
      CURLOPT_HTTPHEADER => [
          "X-Token: ".$token,
          "Content-Type: application/json",
      ],
      CURLOPT_POSTFIELDS => json_encode([
        "messages" => [
          [
            "recipient" => $number,
            "recipientType" => "recipient",
            "id" => "string",
            "source" => "string",
            "timeout" => 3600,
            "shortenUrl" => true,
            "text" => $text,
          ],
        ],
        "validate" => false,
        "tags" => ["Заказы"],
        "startDateTime" => date("Y-m-d H:i:s"),
        "timeZone" => "Europe/Moscow",
        "duplicateRecipientsAllowed" => false,
        "channel" => 0,
      ]),
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_SSL_VERIFYPEER => false
  ]);

  $response = curl_exec($ch);
  // var_dump(json_decode($result, true));
  return $response;
}