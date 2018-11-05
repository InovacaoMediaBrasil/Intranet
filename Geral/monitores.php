<!DOCTYPE html>
<html>
	<head>
		<?php require_once("includes/header.php"); ?>		
		<style type="text/css">
			body {
				overflow: hidden;
			}
			#toast-container {
				width: 40%;
			}
			.toast {
				font-size: 2em;
				width: 100% !important;
			}
			.adaptative {
				padding-left: 15px;
				width: 101%;
			}
			
			#pendingOrders .panel {
				font-size: 30px;				
			}

			#pendingOrders .panel ul {
				list-style: none;
			}
		</style>
	</head>
	<body>
		<div style="padding:0; margin: 0;">
			<div id="dashboard">
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/dashboard/66890430-94e4-11e8-b16f-0f2557bd65ce?_g=(refreshInterval%3A(display%3A'5%20seconds'%2Cpause%3A!f%2Csection%3A1%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-12h%2Cmode%3Aquick%2Cto%3Anow))&embed=true" frameborder="no"></iframe>
				</div>
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/dashboard/7cbc4420-ccb5-11e8-93ec-1f30497e4470?embed=true&_g=(refreshInterval%3A('%24%24hashKey'%3A'object%3A525'%2Cdisplay%3A'1%20minute'%2Cpause%3A!f%2Csection%3A2%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-5y%2Cmode%3Aquick%2Cto%3Anow))" frameborder="no"></iframe>
				</div>
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/dashboard/28ca2150-ccc1-11e8-93ec-1f30497e4470?embed=true&_g=(refreshInterval%3A('%24%24hashKey'%3A'object%3A525'%2Cdisplay%3A'1%20minute'%2Cpause%3A!f%2Csection%3A2%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-5y%2Cmode%3Aquick%2Cto%3Anow))" frameborder="no"></iframe>
				</div>
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/dashboard/1625eda0-cced-11e8-93ec-1f30497e4470?embed=true&_g=(refreshInterval%3A('%24%24hashKey'%3A'object%3A201'%2Cdisplay%3A'5%20seconds'%2Cpause%3A!f%2Csection%3A1%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-12h%2Cmode%3Aquick%2Cto%3Anow))" frameborder="no"></iframe>
				</div>
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/visualize/edit/ce6e5f30-ccef-11e8-93ec-1f30497e4470?embed=true&_g=(refreshInterval%3A('%24%24hashKey'%3A'object%3A1087'%2Cdisplay%3A'5%20seconds'%2Cpause%3A!f%2Csection%3A1%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-30d%2Cmode%3Aquick%2Cto%3Anow))" frameborder="no"></iframe>
				</div>
				<div>
					<iframe src="https://kibana.editorainovacao.com.br/app/kibana#/dashboard/27e71120-d19f-11e8-89ef-e96e55788c02?embed=true&_g=(refreshInterval%3A('%24%24hashKey'%3A'object%3A1374'%2Cdisplay%3A'5%20seconds'%2Cpause%3A!f%2Csection%3A1%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-7d%2Cmode%3Aquick%2Cto%3Anow))" frameborder="no"></iframe>
				</div>
				<div>
					<div class="row row-no-padding adaptative" id="monitors"></div>
				</div>
				<div>
					<div class="row row-no-padding adaptative" id="pendingOrders"></div>
				</div>
			</div>
			<div class="databaseLocks" class="table-responsive">
				<table class="table table-hover table-striped table-condensed table-bordered adaptative">
					<thead>
						<tr>
							<th width="5%">PIDB</th>
							<th width="5%">PIDL</th>
							<th width="15%">Duração</th>
							<th width="15%">Tipo</th>
							<th width="20%">Comando</th>
							<th width="20%">Cliente</th>
							<th width="20%">Usuário</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>				
		</div>
		<div class="alarm"></div>
		<audio id="alarmWarning" src="alarms/warning.mp3" autostart="false"></audio>
		<audio id="alarmError" src="alarms/error.mp3" autostart="false"></audio>
		<audio id="alarmDanger" src="alarms/danger.mp3" autostart="false"></audio>	
<?php require_once("includes/footer.php"); ?>

		<script type="text/javascript" src="Static/monitores.js?updateDate=<?php echo LAST_UPDATE; ?>"></script>
	</body>
</html>