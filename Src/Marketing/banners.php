<?php

header('Content-Type: application/json');
$fileNames = array_map(
    function ($filePath) {
        return basename($filePath);
    },
    glob("Banners/*.{jpg,gif,png}", GLOB_BRACE)
);
$items = array();
foreach ($fileNames as $fileName) {
    $item = array();
    $item["department"] = strtolower(pathinfo($fileName, PATHINFO_FILENAME));
    $item["url"] = "https://marketing.editorainovacao.com.br/Banners/".$fileName;
    $item["changeDate"] = filemtime("Banners/".$fileName);
    $item["changeDateHuman"] = date("F d Y H:i:s.", $item["changeDate"]);
    $item["size"] = filesize("Banners/".$fileName);
    $items[] = $item;
}
echo json_encode($items);
