
const regexHistory = new RegExp("^<ul><li><b>(.+?)</b>(.+?)</li>(?:.+?)</ul>", "g");
let lastOrdersWithErrorUpdate = null;

function loadOrdersReport(){
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetOrdersReport",
        dataType: "JSON",
        success: processOrdersReport
    });    
}

function loadOrdersGrowth(){
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetOrdersGrowth",
        dataType: "JSON",
        success: processOrdersGrowth
    });
}

function loadOrdersWithError(){
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetOrdersWithError",
        dataType: "JSON",
        success: processOrdersWithError
    });
}

function processOrdersReport(data){
    var html = "<header>Pedidos do dia " + ToReadableDate(ToJavaScriptDate(data.Date)) + " <span class='label label-default'>atualizado às " + ToReadableTime(ToJavaScriptDate(data.LastUpdateDate)) + "</span></header>";
    html += "<article>";
    html += "<table class='table table-hover table-condensed table-striped'>";
    html += "<thead><tr><th>Operação</th><th>Pagamento</th><th>Pedidos</th><th>Ticket médio</th></tr>";
    html += "<tbody>";
    for(let x = 0; x < data.Reports.length; x++)
    {
        const r = data.Reports[x];
        let operation = "Todas";
        let payment = "Todos";
        switch(r.CodeTypeOperation){
            case 500:
            operation = "Ativo";
            break;
            case 501:
            operation = "Receptivo";
            break;
            case 502:
            operation = "e-Commerce";
            break;
        }
        switch (r.Option){
            case "A prazo":
            payment = "Boleto";
            break;
            case "A vista":
            payment = "Depósito";
            break;
            case "Cartão de Crédito":
            payment = "Crédito";
            break;
        }
        html += "<tr>";
        html += "<td>" + operation + "</td>";
        html += "<td>" + payment + "</td>";
        html += "<td>" + r.Quantity + "</td>"
        html += "<td> R$" + r.AverageTicket.toFixed(2) + "</td>"
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    html += "</article>";
    $(".ordersReports").html(html);
}

function processOrdersGrowth(data){
    var html = "<header>Análise de vendas <span class='label label-default'>atualizado às " + ToReadableTime(ToJavaScriptDate(data.LastUpdateDate)) + "</span></header>";
    html += "<article>";
    html += "<table class='table table-hover table-condensed table-striped'>";
    html += "<thead><tr><th>Data / Operação</th><th>Todas</th><th>Ativo</th><th>Receptivo</th><th>e-Commerce</th></tr>";
    html += "<tbody>";
    var today = findByProperty(data.Reports, "Type", 0);
    html += processOrdersGrowthGroup("Hoje", today, null);
    html += processOrdersGrowthGroup("Ontem", findByProperty(data.Reports, "Type", 1), today);
    html += processOrdersGrowthGroup("Há uma semana", findByProperty(data.Reports, "Type", 2), today);
    html += processOrdersGrowthGroup("Há um mês", findByProperty(data.Reports, "Type", 3), today);
    html += processOrdersGrowthGroup("Há um ano", findByProperty(data.Reports, "Type", 4), today);
    html += "</tbody>";
    html += "</table>";
    html += "</article>";
    $(".ordersGrowth").html(html);
    $("[data-toggle='tooltip']").tooltip();
}

function processOrdersGrowthGroup(group, data, todayData){   
    var all = calculateOrdersGrowth(data, todayData, 0);
    var active = calculateOrdersGrowth(data, todayData, 500);
    var receptive = calculateOrdersGrowth(data, todayData, 501);
    var eCommerce = calculateOrdersGrowth(data, todayData, 502);
    var tr = "<tr>";
    tr += "<td>" + group + "</td>";
    tr += "<td>" + all.Quantity + (group !== "Hoje" ? all.Percent : "") +  "</td>";
    tr += "<td>" + active.Quantity + (group !== "Hoje" ? active.Percent : "") + "</td>";
    tr += "<td>" + receptive.Quantity + (group !== "Hoje" ? receptive.Percent : "") + "</td>";
    tr += "<td>" + eCommerce.Quantity + (group !== "Hoje" ? eCommerce.Percent  : "") + "</td>";
    tr += "</tr>";
    return tr;
}

function calculateOrdersGrowth(groupData, todayData, key){
    const today = getQuantityOrdersGrowth(todayData, key);
    const group = getQuantityOrdersGrowth(groupData, key);
    return { Quantity: group, Percent: processPercent(group, today)};
}

function getQuantityOrdersGrowth(group, key){
    if(group === null)
        return 0;
    if(group.Growths === null)
        return 0;
    var item = findByProperty(group.Growths, "CodeTypeOperation", key);
    if(item === null)
        return 0;
    return item["Quantity"];
}

function processPercent(quantity, quantityBase){
    let text = quantity === 0 && quantityBase === 0
        ? "Sem vendas" 
        : (quantity === quantityBase 
            ? "Sem alterações" 
            : (quantity > quantityBase 
                ? "Queda nas vendas: -" + (quantity - quantityBase)
                : "Aumento nas vendas: +" + (quantityBase - quantity)) + " pedidos");
    let className = quantity === 0 && quantityBase === 0 ? "warning" : (quantity > quantityBase ? "danger" : "success");
    let percent = (quantityBase - quantity ) * 100 / (quantity === 0 ? 1 : quantity);
    if(quantityBase === 0 && quantity !== 0)
        percent *= quantity; 
    return " <br /><span class='label label-" + className + "' title='" + text + "' data-toggle='tooltip'>" + percent.toFixed(0) + "%</span>";
}

function processOrdersWithError(data){
	pendingOrdersVTEX = data.VTEX;
	pendingOrdersWMW = data.WMW;
    lastOrdersWithErrorUpdate = data.LastUpdateDate;
	if($(".ordersPending").length === 1)
		updateOrdersWithError();
}

function updateOrdersWithError(){
	$(".ordersPending").empty();
    if(lastOrdersWithErrorUpdate === null ||
	   pendingOrdersVTEX.length === 0 &&
	   pendingOrdersWMW.length === 0)       
        return;
    processPendingOrders("VTEX", "VTEX", pendingOrdersVTEX);
	processPendingOrders("WMW Vendas", "WMWVendas", pendingOrdersWMW); 
	$(".fixOrder").click(fixOrder);	
}

function processPendingOrders(systemName, id, pendingOrders){
	if(pendingOrders.length === 0)
		return;
	var html = "<header>Erro de importação (" + systemName + ") <span class='label label-danger'>" + pendingOrders.length + "</span> <span class='label label-default'>atualizado às " + ToReadableTime(ToJavaScriptDate(lastOrdersWithErrorUpdate)) + "</span></header>";
    html += "<article><div id='ordersPending" + id + "Slick'>";
    for(let x = 0; x < pendingOrders.length; x++){
        const pending = pendingOrders[x];
        html += "<div class='panel panel-danger'>";
        html += "<div class='panel-heading'>";
        html += "<i class='fa fa-hashtag' aria-hidden='true'></i> " + pending.Code;
        html += " | <i class='fa fa-clock-o' aria-hidden='true'></i> " + ToReadableDateTime(ToJavaScriptDate(pending.OrderDate));
        html += " | <i class='fa fa-edit' aria-hidden='true'></i> " + ToReadableDateTime(ToJavaScriptDate(pending.ChangedDate));
        html += "</div>";
        html += "<div class='panel-body' style='word-break:break-all;'>";
        html += getLastMessageFromHistory(pending.History);
        html += "<br /><br /><div class='btn-group'>";
        html += "<a class='btn btn-xs btn-info' href='https://visualizador.editorainovacao.com.br/?originalOrder=" + pending.Code + "' target='_blank'>Visualizador de Pedidos</a>";
        html += "<button class='btn btn-xs btn-warning fixOrder' data-originalorder='" + pending.Code + "' data-systemid='" + id + "'>Tentar novamente</button>";
		html += "<a class='btn btn-xs btn-success' href='https://help.editorainovacao.com.br/index.php?a=add&category=2&subject=Importação de pedido " + systemName + ": " + pending.Code + "' taget='_blank'>Chamado</a>";
		html += "</div></div></div>";
    }
    html += "</div></article>";    
    $(".ordersPending").append(html);
    $("#ordersPending" + id + "Slick").slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
        autoplaySpeed: 10000,
        infinite: true	
    });    
}

function getLastMessageFromHistory(history){
    if(regexHistory.test(history))
        return history.replace(regexHistory, "<b>$1</b><br /><span style='font-size: 9px;'>$2</span>");
	return history;
}

function fixOrder(){
    var originalOrder = $(this).data("originalorder");
	var systemName = $(this).data("systemid");
    $.ajax({
        url: integracaoEndPointMain + "WebHooks/FlagOrderAsFixed?OriginalOrder=" + originalOrder + "&systemName=" + systemName,
        type: "POST",
        dataType: "JSON",
        success: function (response){
            if(!response.Success){
                $.alert({
                    title: "Ocorreu um erro!",
                    content: response.Data,
                    theme: 'bootstrap',
                    icon: 'fa fa-exclamation-triangle',
                    animation: 'scale',
                    type:'red',
                    columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
                });
                return;
            }
			if(systemName == "VTEX")
				pendingOrdersVTEX = removeByProperty(pendingOrdersVTEX, "Code", originalOrder);
			if(systemName = "WMWVendas")
				pendingOrdersWMW = removeByProperty(pendingOrdersWMW, "Code", originalOrder);
            updateOrdersWithError();
            $.alert({
                title: "Pedido #" + originalOrder + " marcado como corrigido!",
                icon: "fa fa-thumbs-up",
                type: "green",
                theme: 'bootstrap',
                animation: 'scale',
                content: response.Data,
                columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
            });
        },
        error: function (){
            $.alert({
                title: "Ocorreu um erro!",
                content: "Por favor, tente novamente ou contate o departamento de TI!",
                theme: 'bootstrap',
                icon: 'fa fa-exclamation-triangle',
                animation: 'scale',
                type:'red',
                columnClass: 'col-xs-12 col-md-6 col-md-offset-3'
            });
        }
    });    
}