<!DOCTYPE html>
<html>
<head>
<?php
    require_once("includes/header.php");
?>
</head>

<body>
    <h1 style="text-align:center;">Selecione seu departamento</h1>
    <section id="home">
        <ul class="dials">
            <li>
                <a href="<?php echo BASE; ?>comercial">
                    Comercial
                       <br />
                    <img src="Images/Dials/Comercial.png" alt="Comercial" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>ecommerce">
                    e-Commerce
                    <br />
                    <img src="Images/Dials/eCommerce.png" alt="e-Commerce" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>financeiro">
                    Financeiro
                    <br />
                    <img src="Images/Dials/Financeiro.png" alt="Financeiro" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>logistica">
                    Logistica
                    <br />
                    <img src="Images/Dials/Logistica.png" alt="Logística" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>sac">
                    SAC
                    <br />
                    <img src="Images/Dials/SAC.png" alt="SAC" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>home">
                    Home Office
                    <br />
                    <img src="Images/Dials/Home.png" alt="Home Office" />
                </a>
            </li>

            <li>
                <a href="<?php echo BASE; ?>operacao">
                    Operação
                    <br />
                    <img src="Images/Dials/Operacao.png" alt="Operação" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>supervisao">
                    Supervisão
                    <br />
                    <img src="Images/Dials/Supervisao.png" alt="SAC" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>producao">
                    Produção
                    <br />
                    <img src="Images/Dials/Producao.png" alt="Produção" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>ti">
                    TI
                    <br />
                    <img src="Images/Dials/TI.png" alt="TI" />
                </a>
            </li>
            <li>
                <a href="<?php echo BASE; ?>marketing">
                    Marketing / Edição
                    <br />
                    <img src="Images/Dials/Marketing.png" alt="Marketing" />
                </a>
            </li>
        </ul>
    </section>
    <?php require_once("includes/footer.php"); ?>   
</body>
</html>