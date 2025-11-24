<?php

$url = $_GET["url"];
$referer = $_SERVER["HTTP_REFERER"];
$fingerprint = "";
$ipLocal = "";
if (isset($_COOKIE["fingerprint"])) {
    $fingerprint = $_COOKIE["fingerprint"];
}
if (isset($_COOKIE["intranet_lanip"])) {
    $ipLocal = $_COOKIE["intranet_lanip"];
}
ignore_user_abort(true);
header("Location: " . $url);
header('Connection: close');
header("cache-control: must-revalidate");
header('Vary: Accept-Encoding');
header('Content-Length: ' . ob_get_length());
ob_end_flush();
flush();
file_get_contents("https://integracao.editorainovacao.com.br/API/WebHooks/TrackHit?Url=" . urlencode($url) . "&Referer=" . urlencode($referer) . "&Fingerprint=" . $fingerprint . "&IpAddress=" . $ipLocal);
