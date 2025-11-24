<?php
error_reporting(E_ALL);
$documentsDir = "Docs";
$toolsDir = "Tools";
$playgroundDir = "Playground";
$ignorePaths = array(".", "..", "aspnet_client");
function read($dir)
{
    global $ignorePaths;
    $handle = opendir($dir);
    while ($file = readdir($handle)) {
        if (is_dir($dir."/".$file) && !in_array($file, $ignorePaths)) {
            echo "<li class='list-group-item'><a href='".$dir."/".$file."'>".preg_replace('/(?<!^)([A-Z])/', ' \\1', $file)."</a></li>\r\n";
        } elseif (is_file($dir."/".$file) && !in_array($file, $ignorePaths)) {
            echo "<li class='list-group-item'><a href='".$dir."/".$file."'>".$file."</a></li>\r\n";
        }
    }
    closedir($handle);
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="robots" content="noindex,nofollow">	
    <title>TI - Inovação Media Brasil</title>
	<link type="text/css" media="all" rel="stylesheet" href="bootstrap.min.css" />
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
	<div class="container-fluid">
		<div class="row text-center">
			<div class="row col-md-12" style="background:#0dd682;">
				<div class="col-xs-12 col-md-3">
					<img src="https://intranet.editorainovacao.com.br/Images/Dials/InovacaoMediaBrasil.png" alt="Inovação Media Brasil" />
				</div>
				<div class="col-xs-12 col-md-6">
					<h1>TI - Inovação Media Brasil</h1>
					<p>Ferramentas e Documentações dos projetos - TI / Inovação Media Brasil</p>
				</div>			
				<div class="col-xs-12 col-md-3">
					<img src="https://intranet.editorainovacao.com.br/Images/Dials/TI.png" alt="TI - Inovação Media Brasil" />
				</div>
			</div>
			<div class="row col-md-12" style="margin-top:50px;">
				<div class="col-md-4">
					<div class="panel panel-success">
						<div class="panel-heading">
							<h3 class="panel-title">Ferramentas</h3>
						</div>
						<ul class="list-group">
							<?php read($toolsDir) ?>
						</ul>
					</div>
				</div>
				<div class="col-md-4">
					<div class="panel panel-info">
						<div class="panel-heading">
							<h3 class="panel-title">Documentações</h3>
						</div>
						<ul class="list-group">
							<?php read($documentsDir) ?>
						</ul>
					</div>
				</div>
				<div class="col-md-4">
					<div class="panel panel-warning">
						<div class="panel-heading">
							<h3 class="panel-title">Playground/Sandbox</h3>
						</div>
						<ul class="list-group">
							<?php read($playgroundDir) ?>
						</ul>
					</div>
				</div>
			</div>
		</div>		
	</div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</html>
