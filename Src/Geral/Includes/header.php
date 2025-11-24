<?php
$schema = "http";
if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {
    $schema .= "s";
}
define("BASE", $schema . "://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
define("LAST_UPDATE", "2020-06-29-011900");
?>
<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="robots" content="noindex,nofollow">
    <title>Intranet - Inovação Media Brasil</title>
<?php require_once("favicon.php"); ?>
    <link type="text/css" rel="stylesheet" href="Static/styles.css?updated=<?php echo LAST_UPDATE; ?>" />
    <link type="text/css" rel="stylesheet" href="Static/jquery.tip_cards.css" />
    <link type="text/css" rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/trontastic/jquery-ui.css" />
    <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/xzoom/dist/xzoom.css" />
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css" />
	<link type="text/css" rel="stylesheet" href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css">
	<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"/>
    <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/>