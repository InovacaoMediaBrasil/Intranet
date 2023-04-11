const notificationIconsBasePath = "https://intranet.editorainovacao.com.br/Images/Notifications/";
const integracaoEndPointMain = "https://integracao.editorainovacao.com.br/API/";
const loc = window.location.href;
let method = "GetMediaScheduleForWeek";
let monitors = [];
let pendingOrdersVTEX = [];
let pendingOrdersWMW = [];
let groups = [];
let intervalExtensions;
let extensionsFilter = null;
let extensionsOnlineOnly = true;
let extensionsAvailableOnly = true;
let sellerCode = 0;
let sellerCodeLoading = 0;

listaDeCompras_storeId = 1;
listaDeCompras_key = "editorainovacao";
listaDeCompras_token = "DCB3C797FAD372E5FF5B95821A872438F588CAA51232BFCDD74C88CAEF";

$(document).ready(initializeIntranet);

function initializeIntranet() {
	if($("#todayMediaSchedule tr").length > 0 && typeof blinker !== "undefined")
		setInterval(function () {blinker("#todayMediaSchedule tr");}, 1000);
	$("[data-toggle='tooltip']").tooltip();
	if(typeof Fingerprint2 !== "undefined")
        setTimeout(getFingerprint, 1000);
	if(typeof updateLinks !== "undefined")
		updateLinks();
	if(typeof getMonitors !== "undefined")
		getMonitors();
    if(typeof isMonitors !== "undefined" && isMonitors)
        return;
    updateServiceLinks();
    if (loc.indexOf("ecommerce") !== -1 || loc.indexOf("supervisao") !== -1)
        method = "GetMediaScheduleForNextNDays?days=30";
    else if (loc.indexOf("operacao") !== -1)
        method = "GetMediaScheduleForPreviousNDays?days=7";
    else if (loc.indexOf("cadastro") !== -1)
        method = "GetMediaScheduleForNextNDays?days=1";
    initializeDials();
    attachEvents();
    onUnavailableMonitors();    
	if(typeof loadRankingData !== "undefined")
		loadRankingData();
    initializeFeeds();
    initializeBanner();
    if($(".ordersReports").length === 1)
        initializeOrdersReport();
    if($(".ordersGrowth").length === 1)
        initializeOrdersGrowth();
    if($(".ordersPending").length === 1)
        initializeOrdersWithError();
}

function updateLinks(){
    $.each($(".operation a"), function (index, item){
        if($(item).attr("href").indexOf("redirect.php") === -1)
            $(item).attr("href", "https://intranet.editorainovacao.com.br/redirect.php?url=" + $(item).attr("href"));
    });
}

function initializeOrdersReport(){
    loadOrdersReport();
    setInterval(loadOrdersReport, 1 * 60 * 1000);
}

function initializeOrdersGrowth(){
    loadOrdersGrowth();
    setInterval(loadOrdersGrowth, 10 * 60 * 1000);
}

function initializeOrdersWithError(){
    loadOrdersWithError();
    setInterval(loadOrdersWithError, 30 * 60 * 1000);
}

function initializeFeeds() {
    if($("#todayMediaSchedule").length === 1 &&
		typeof loadMediaScheduleToday !== "undefined"){
        loadMediaScheduleToday();
        setInterval(loadMediaScheduleToday, 5 * 60 * 1000);
    }
    if ($("#weekMediaSchedule").length === 1 &&
		typeof loadMediaScheduleWeek !== "undefined") {
        loadMediaScheduleWeek(method);
        setInterval(function () { loadMediaScheduleWeek(method); }, 5 * 60 * 1000);
    }
    if(loc.indexOf("producao") === -1 && 
       loc.indexOf("comercial") === -1 && 
       loc.indexOf("financeiro") === -1 &&
	   typeof loadRecordSchedule !== "undefined")
        return;
    loadRecordSchedule();
    setInterval(loadRecordSchedule, 5 * 60 * 1000);
}

function initializeDials() {
    if ($(".dials").length === 0)
        return;
    if(typeof dials !== "undefined" &&
       dials !== null &&
       typeof selectedDials !== "undefined" &&
       selectedDials !== null)
        buildDials();
    $(".dials").tip_cards({
        flipButton: "[+ Informações]",
        closeButton: "[Fechar]",
        navigation: false
    });
}

function buildDials(){
    var ul = $(".dials");
    ul.empty();
    for(let x = 0; x < selectedDials.length; x++){
        var item =  findByProperty(dials, "Name", selectedDials[x]);
        if(item == null)
            continue;
        let li = "<li>";
        li += "<a href='" + item.Href + "'>";
        if(item.Monitor)
            li += "<div class='monitor' data-monitor='" + item.MonitorName + "'></div>"
        li += item.Name;
        li += "<br />";
        li += "<img src='" + item.Image + "' alt='" + item.Name + "' />"; 
        li += "</a>";
        li += "</li>";
        ul.append(li);
    }
}

function attachEvents() {   
    if(typeof showProductModal !== "undefined")
		$(document).on("click", "tr[data-productid]", showProductInModal);  	    
	if(typeof fixCRMService !== "undefined")
		$("#fixCRMService").click(fixCRMService);
	if(typeof fixCRMExtension !== "undefined")
		$("#fixCRMExtension").click(fixCRMExtension);
	if(typeof getCRMSellerName !== "undefined")
		$(document).on("keyup change","#fixCRMExtensionExtension", getCRMSellerName);
	if(typeof configureExtensions !== "undefined")
		$("#configureExtensions").click(configureExtensions);    
}     

function updateServiceLinks() {
    var isLocalIntranet = true & window.Cookies.get("intranet.isLocalIntranet");
    $.each(serviceLinks, function (i, service) {
        const link = isLocalIntranet ? service.urls.local : service.urls.remote;
        $(".dials a div.monitor[data-monitor='" + service.service + "']").parent().attr("href", link);
    });
    updateLinks();
}
