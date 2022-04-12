<?php

function send_message($number, $text) {
  $ch = curl_init();
  curl_setopt_array($ch, [
      CURLOPT_URL => "https://lcab.smsint.ru/json/v1.0/sms/send/text",
      CURLOPT_POST => true,
      CURLOPT_HTTPHEADER => [
          "X-Token: fxsmhre15485jg7q549mgy4qyx2khdj2zy9qemuy64wc6accenmn6yexclaeamgd",
          "Content-Type: application/json"
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
      CURLOPT_RETURNTRANSFER => true
  ]);

  $result = curl_exec($ch);
  // var_dump(json_decode($result, true));
  return $result;
}