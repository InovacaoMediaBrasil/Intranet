<!DOCTYPE html>
<html>

<head>
<?php 
    require_once("includes/header.php");
?>
	<script type="text/javascript">
        var banner = "financeiro";
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
                    <img src="Images/Dials/Hesk.png" alt="HESK" />
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
					Total IP
					<br />
					<img src="Images/Dials/TotalIP.png" alt="Total IP" />
					</a>
            </li>
            <li>
                <a href="https://nfe.prefeitura.sp.gov.br/login.aspx">
                    NF-e Paulistana
                    <br />
                    <img src="Images/Dials/NFEPaulistana.png" alt="NF-e Paulistana" />
                    </a>
            </li>
            <li>
                <a href="https://www.bradesco.com.br">
                    Bradesco
                    <br />
                    <img src="Images/Dials/Bradesco.png" alt="Banco Bradesco" />
                    </a>
            </li>
            <li>
                <a href="http://www.caixa.gov.br/">
                    Caixa Econômica Federal
                    <br />
                    <img src="Images/Dials/CEF.png" alt="Caixa Econômica Federal" />
                    </a>
            </li>
            <li>
                <a href="https://itau.com.br">
                    Itaú
                    <br />
                    <img src="Images/Dials/Itau.png" alt="Banco Itaú" />
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
                <a href="https://www.vitrinedoartesanatodigital.com.br">
                    <div class="monitor" data-monitor="Vitrine do Artesanato Digital"></div>
                    Vitrine do Artesanato Digital
                    <br />
                    <img src="Images/Dials/VitrineDoArtesanato.png" alt="Vitrine do Artesanato Digital" />
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
                <a href="https://www.vitrinedoartesanato.com.br/?utm_source=intranet&utm_medium=dial&utm_campaign=acesso+interno">
                    <div class="monitor" data-monitor="Vitrine do Artesanato"></div>
                    Vitrine do Artesanato
                    <br />
                    <img src="Images/Dials/VitrineDoArtesanato.png" alt="Vitrine do Artesanato" />
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
                <a href="https://listadecompras.editorainovacao.com.br/Gerenciamento">
                    <div class="monitor" data-monitor="Lista de Compras"></div>
                    Lista de Compras
                    <br />
                    <img src="Images/Dials/ListaDeCompras.png" alt="Lista de Compras" />
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
					Editora Inovação
					<br />
					<img src="Images/Dials/EditoraInovacao.png" alt="Editora Inovação" />
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
        <?php require_once("includes/mediaScheduleToday.php") ?>
        <?php require_once("includes/recordScheduleToday.php") ?>
	</section>
    <?php require_once("includes/footer.php"); ?>   
</body>
</html>