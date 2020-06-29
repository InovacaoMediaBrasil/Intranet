<!DOCTYPE html>
<html>

<head>
<?php 
    require_once("includes/header.php");
?>
    <script type="text/javascript">
        var banner = "operacao";
    </script>
</head>

<body>
    <section class="operation">
        <ul class="dials">
            <li>
                <a href="https://help.editorainovacao.com.br">
                    <div class="monitor" data-monitor="Help Desk - HESK"></div>
                    Help Desk [HESK]
                    <br />
                    <img src="Images/Dials/Hesk.png" alt="Help Desk [HESK]" />
                </a>
            </li>
            <li>
                <a href="https://webmail-seguro.com.br/inovacaomedia.com.br/">
                    <div class="monitor" data-monitor="Help Desk - HESK"></div>
                    Webmail Locaweb
                    <br />
                    <img src="Images/Dials/Locaweb.png" alt="HESK" />
                </a>
            </li>
            <li>
                <a href="http://totalip.editorainovacao.com.br">
                    <div class="monitor" data-monitor="Total IP"></div>
                    Total IP
                    <br />
                    <img src="Images/Dials/TotalIP.png" alt="Total IP" />
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
                <a href="http://192.168.1.235:8081/">
                    <div class="monitor" data-monitor="WMW Vendas"></div>
                    WMW Vendas
                    <br />
                    <img src="Images/Dials/WMWVendas.png" alt="WMW Vendas" />
                </a>
            </li>
            <li>
                <a href="https://vitrinedoartesanato.vtexcommercestable.com.br/?utm_source=intranet&utm_medium=dial&utm_campaign=acesso+interno">
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
                <a href="https://www.taniasilva.com.br">
                    <div class="monitor" data-monitor="Tania Silva"></div>
                    Tania Silva
                    <br />
                    <img src="Images/Dials/TaniaSilva.png" alt="Tânia Silva" />
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
                <a href="http://www.mandae.com.br/">
					Mandaê
					<br />
					<img src="Images/Dials/Mandae.png" alt="Mandaê" />
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
                <a href="http://www.a12.com/tv-aparecida/institucional/detalhes/tv-ao-vivo">
					TV Aparecida
					<br />
					<img src="Images/Dials/TVAparecida.png" alt="TV Aparecida" />
				</a>
            </li>
            <li>
                <a href="revendasSunSpecial.html">
					Revendas Sun Special
					<br />
					<img src="Images/Dials/SunSpecial.png" alt="Revendas Sun Special" />
				</a>
            </li>
            <li>
                <a href="http://www.janome.com.br/assistencia/">
					Revendas Sun Special
					<br />
					<img src="Images/Dials/Janome.png" alt="Janome" />
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
        </div>
    </section>
	<section class="aside">
        <?php require_once("includes/wmwVendasTools.php"); ?>
        <?php require_once("includes/ordersReport.php"); ?>
        <?php require_once("includes/ordersGrowth.php"); ?>
        <?php require_once("includes/mediaScheduleToday.php"); ?>
        <?php require_once("includes/ordersPending.php"); ?>  
        <?php require_once("includes/totalIp.php"); ?>
        <?php require_once("includes/mediaSchedulePeriod.php"); ?>        
	</section>
    <?php require_once("includes/footer.php"); ?>   
</body>
</html>