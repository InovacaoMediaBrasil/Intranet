<!DOCTYPE html>
<html>

<head>
<?php 
    require_once("includes/header.php");
?>
    <script type="text/javascript">
		var banner = "producao";
    </script>
</head>

<body>
    <section class="operation">
        <ul class="dials">
            <li>
                <a href="https://www.canaldoartesanato.com.br">
                    <div class="monitor" data-monitor="Canal do Artesanato"></div>
                    Canal do Artesanato
                    <br />
                    <img src="Images/Dials/CanalDoArtesanato.png" alt="Canal do Artesanato" />
                </a>
            </li>
            <li>
                <a href="https://www.vitrinedoartesanatonatv.com.br">
                    <div class="monitor" data-monitor="Vitrine do Artesanato na TV"></div>
                    Vitrine do Artesanato na TV
                    <br />
                    <img src="Images/Dials/VitrineDoArtesanatoNaTV.png" alt="Vitrine do Artesanato na TV" />
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
                    <img src="Images/Dials/Webmail.png" alt="HESK" />
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
                <a href="https://ti.editorainovacao.com.br/Tools/CriadorDeEmailMarketing">
					Criador de e-mail marketing
                    <br />
                    <img src="Images/Dials/CriadorDeEmailMarketing.png" alt="Criador de e-mail marketing" />
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
                <a href="https://www.facebook.com">
					Facebook
					<br />
					<img src="Images/Dials/Facebook.png" alt="Facebook" />
				</a>
            </li>
            <li>
                <a href="https://www.youtube.com.br/">
					YouTube
					<br />
					<img src="Images/Dials/YouTube.png" alt="YouTube" />
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
		<?php require_once("includes/totalIp.php"); ?>
        <?php require_once("includes/recordScheduleToday.php"); ?>	
        <?php require_once("includes/recordSchedulePeriod.php"); ?>	
	</section>
    <?php require_once("includes/footer.php"); ?>   
</body>
</html>