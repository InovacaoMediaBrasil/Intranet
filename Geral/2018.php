<?php 
$schema = "http";
if(isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on")
    $schema .= "s";
define("BASE", $schema . "://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]); 
define("LAST_UPDATE", "2018-09-11T193300");
?>
<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="robots" content="noindex,nofollow">
		<title>Intranet - Inovação Media Brasil</title>
		<?php require_once("Includes/favicon.php"); ?>
		<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous" />
		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
		<link type="text/css" rel="stylesheet" href="Static/xzoom.css" />
		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css" />
		<link type="text/css" rel="stylesheet" href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css">
		<link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
		<script type="text/javascript" src="https://assets.listadecompras.editorainovacao.com.br/js/listaDeCompras.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/i18n/defaults-pt_BR.min.js"></script>
		<script type="text/javascript" src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
		<script type="text/javascript" src="Static/xzoom.min.js"></script>
		<script type="text/javascript" src="Static/utils.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/dials.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/scripts.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/banners.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/media.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/record.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>		
		<script type="text/javascript" src="Static/wmwVendas.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/totalIp.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/monitors.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/ranking.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<script type="text/javascript" src="Static/inline.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
		<style type="text/css">
			.monitor { 
			float: right;
			}  
			.card-title {
			font-size: 12px;
			}  
		</style>
	</head>
	<body>
		<div class="container-fluid">
			<?php 
				require_once("includes/navbar.php")
			?>
			<div class="row">
				<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9">
					<ul class="nav nav-tabs" id="mainTab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" id="tabLinks" data-toggle="tab" href="#links" role="tab" aria-controls="links" aria-selected="true">Links</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="tabOrders" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="true">Pedidos</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="tabProducts" data-toggle="tab" href="#products" role="tab" aria-controls="products" aria-selected="true">Produtos</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="tabRanking" data-toggle="tab" href="#ranking" role="tab" aria-controls="ranking" aria-selected="true">Vendas</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="tabMonitors" data-toggle="tab" href="#monitors" role="tab" aria-control="monitors" aria-selected="true">Monitores</a>
						</li>
					</ul>
					<div class="tab-content" id="mainTabContent">
						<div class="tab-pane fade show active" id="links" role="tabpanel" aria-labelledby="tabLinks">
							<div class="row">
								<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
									<div class="card">
										<div class="card-body">
											<div class="monitor" data-monitor="Help Desk - HESK"></div>
											<h4 class="card-title" style="font-size: 12px;">Help Desk</h4>
										</div>
										<img class="card-img-top" src="Images/HESK.png" alt="HESK - Help Desk" />            
									</div>
								</div>				
							</div>
						</div>
						<div class="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="tabOrders">
							<iframe src="https://ti.editorainovacao.com.br/Playground/VisualizadorDePedidosV2" style="width: 100%; height: 1200px;"></iframe>
						</div>
						<div class="tab-pane fade" id="products" role="tabpanel" aria-labelledby="tabProducts">
							<div class="alert alert-warning">Em desenvolvimento!</div>
						</div>
						<div class="tab-pane fade" id="ranking" role="tabpanel" aria-labelledby="tabRanking">
							<div class="row">
								<div class="col-xs-12 col-sm-4" data-rankingtop="500" data-nometop="Ativo"></div>
								<div class="col-xs-12 col-sm-4" data-rankingtop="501" data-nometop="Receptivo"></div>
								<div class="col-xs-12 col-sm-4" data-rankingtop="502" data-nometop="e-Commerce"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="monitors" role="tabpanel" aria-labelledby="tabMonitors">
							<ul class="list-group" id="monitorsList"></ul>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-md-3">
					<?php require_once("includes/sidebar.php");	?>
				</div>
			</div>
			<?php require_once("includes/footer.php"); ?>  
		</div>
	</body>
</html>