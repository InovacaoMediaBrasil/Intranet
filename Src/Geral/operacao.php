<!DOCTYPE html>
<html>
<?php
    require_once("includes/header.php");
?>
	<script type="text/javascript">
        var banner = "operacao";
    </script>
<head>
    
</head>

<body>
    <section class="operation">
        <ul class="dials">
            <li>
                <a href="http://192.168.1.235:8081/">
                    <div class="monitor" data-monitor="WMW Vendas"></div>
                    WMW Vendas
                    <br />
                    <img src="Images/Dials/WMWVendas.png" alt="WMW Vendas" />
                </a>
            </li>			
            <li>
                <a href="http://visualizador.editorainovacao.com.br">
                    <div class="monitor" data-monitor="Visualizador de Pedidos"></div>
                    Visualizador de Pedidos
                    <br />
                    <img src="Images/Dials/VisualizadorDePedidos.png" alt="Visualizador de Pedidos" />
                </a>
            </li>
            <li>
                <a href="http://192.168.1.194">
                    Total IP
                    <br />
                    <img src="Images/Dials/TotalIP.png" alt="Total IP" />
                </a>
            </li>
            <li>
                <a href="https://www.vitrinedoartesanato.com.br/?utm_source=intranet&utm_medium=dial&utm_campaign=acesso+interno">
                    <div class="monitor" data-monitor="Vitrine do Artesanato"></div>
                    Vitrine do Artesanato
                    <br />
                    <img src="Images/Dials/VitrineDoArtesanato.png" alt="Vitrine do Artesanato" />
                </a>
            </li>
            <li>
                <a href="https://www.vitrinedoartesanatodigital.com.br">
                    <div class="monitor" data-monitor="Vitrine do Artesanato Digital"></div>
                    Vitrine do Artesanato Digital
                    <br />
                    <img src="Images/Dials/VitrineDoArtesanatoDigital.png" alt="Vitrine do Artesanato Digital" />
                </a>
            </li>
            <li>
                <a href="http://www.a12.com/tv-aparecida/programas/vida-com-arte">
					Vida com Arte
					<br />
					<img src="Images/Dials/VidaComArte.png" alt="Vida com Arte" />
				</a>
            </li>
			<li>
				<a href="https://www.inovacaomedia.com.br">
					<div class="monitor" data-monitor="Inovação Media Brasil"></div>
					Inovação Media Brasil
					<br />
					<img src="Images/Dials/InovacaoMediaBrasil.png" alt="Inovação Media Brasil" />
				</a>
			</li>
            <li>
                <a href="https://www.editorainovacao.com.br">
                    <div class="monitor" data-monitor="Editora Inovação"></div>
                    Editora Inovação
                    <br />
                    <img src="Images/Dials/EditoraInovacao.png" alt="Editora Inovação" />
                </a>
            </li>
            <li>
                <a href="http://www.correios.com.br/">
					Correios
					<br />
					<img src="Images/Dials/Correios.png" alt="Correios" />
				</a>
            </li>
            <li>
                <a href="http://www.rastreae.com.br/">
					Rastreaê
					<br />
					<img src="Images/Dials/Rastreae.png" alt="Rastreaê" />
				</a>
            </li>
            <li>
                <a href="revendasSunSpecial.php">
					Revendas Sun Special
					<br />
					<img src="Images/Dials/SunSpecial.png" alt="Revendas Sun Special" />
				</a>
            </li>
			<li>
				<a href="https://ti.editorainovacao.com.br">
					Dept. de TI
					<br />
					<img src="Images/Dials/TI.png" alt="FDept. de TI" />
				</a>
			</li>
        </ul>
        <div style="clear:both;"></div>
    </section>
    <section class="aside">
        <?php require_once("includes/mediaScheduleToday.php") ?>
        <?php require_once("includes/mediaSchedulePeriod.php") ?>
    </section>
    <?php require_once("includes/footer.php"); ?>   
</body>
</html>