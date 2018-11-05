toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "10000",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

window.onerror = function (errorMsg, url, lineNumber) {
	window.location.reload();
}

$(document).ready(function (){
    getLocks(11);
	getLocks(12);
	initializeOrdersWithError();
	setInterval(lifecycle, 1000);
	updateOrdersCards();
	setInterval(updateOrdersCards, 30 * 1000);
	$(".alarm").css('height', $(document).height());
	alarms = {
		"debug": false,
		"warned": false,
		"duration": 0,
		"durationNormalized": 0,
		"error": $("#alarmError")[0],
		"danger": $("#alarmDanger")[0],
		"warning": $("#alarmWarning")[0],
		"highlight": $(".alarm")
	};
	$("#dashboard, #dashboard iframe, .databaseLocks").height($(window).height() + "px");
	$("#dashboard").slick({
		arrows: false,
		dots: false,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 30000		
	});
	setTimeout(function(){window.location.reload();}, 6 * 600  * 1000);
});

let locksSankhya = [];
let locksWMW = [];
let alarms = null;
const isMonitors = true;
const hidePausedMonitors = true;

function lifecycle(){
	updateLocks();
	siren();
	updateMonitorsCards();
}

function getLocks(monitorId){
    $.ajax({
        url: integracaoEndPointMain + "Monitor/GetSqlServerLocks?MonitorId=" + monitorId,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if(monitorId === 11)
                locksSankhya = data;
            else if(monitorId === 12)
                locksWMW = data;
			else
				console.log(data);
        }
    });
    setTimeout(function() { getLocks(monitorId)}, 2000);
}

function updateLocks(){
    let tbody = $(".databaseLocks table tbody");
    tbody.empty();
	if(!alarms.debug)
		alarms.duration = 0;
    $.each(locksSankhya, function(index, item) {
        if(!isNaN(item.BlockedDuration))
            tbody.append(processLock(item, "Sankhya"));			
    });
    $.each(locksWMW, function (index, item){
        if(!isNaN(item.BlockedDuration))
            tbody.append(processLock(item, "WMW Vendas"));			
    });
}

function siren(){
	if(alarms.debug)
		alarms.duration++;
	if(alarms.duration == 0)
	{	
		$("#dashboard").show();
		$(".databaseLocks").hide();
		alarms.highlight.removeClass("faster");
		alarms.error.pause();
		alarms.error.currentTime = 0;		
		alarms.danger.pause();
		alarms.danger.currentTime = 0;		
		alarms.warning.pause();
		alarms.warning.currentTime = 0;
		if(alarms.durationNormalized >= 5) {
			alarms.durationNormalized = 0;			
			alarms.highlight.hide();
			return;
		}
		alarms.highlight.css("background","limegreen");
		alarms.durationNormalized++;
		alarms.warned = false;
		return;		
	}
	$("#dashboard").hide();
	$(".databaseLocks").show();
	alarms.durationNormalized = 0;
	alarms.highlight.show();
	if(alarms.duration <= 60){		
		alarms.highlight.removeClass("faster");
		alarms.highlight.css("background","goldenrod");
		if(alarms.duration >= 20 && !alarms.warned)
		{
			alarms.warned = true;
			alarms.warning.play();
		}
		return;
	}	
	alarms.highlight.css("background","red");
	if(alarms.duration <= 90)
	{
		alarms.highlight.removeClass("faster");
		if(alarms.error.paused)
			alarms.error.play();
		return;
	}
	if(alarms.duration <= 120)
		return;
	alarms.highlight.addClass("faster");
	alarms.error.pause();
	if(alarms.danger.paused)
		alarms.danger.play();	
}

function processLock(item, application){
	var time = item.BlockedDuration / 1000;
	if(alarms.duration < time)
		alarms.duration = time;
    let tr = $("<tr></tr>").addClass("danger");
    let thPID = $("<th></th>").text(item.BlockedSessionId);
    tr.append(thPID);
    let tdPID = $("<td></td>").text(item.BlockingSessionId);
    tr.append(tdPID);
    let tdDMS = $("<td></td>").text(time + " segundos");
    tr.append(tdDMS);
    let tdTYPE = $("<td></td>").text(item.BlockedType);
    tr.append(tdTYPE);
    let tdCMD =$("<td></td>").text(item.BlockingCommand);
    tr.append(tdCMD);
    let tdAPP = $("<td></td>").text(item.BlockingProgram);
    tr.append(tdAPP);
    let tdCLI = $("<td></td>").text(item.BlockingUsername + " / " + item.BlockingHostname);
    tr.append(tdCLI);
    return tr;
}

function updateMonitorsCards(){
	$("#monitors").empty();
	for(let x = 0; x < monitors.length; x++)
		populateMonitor(monitors[x]);
}

function populateMonitor(monitor){
	let className;
	switch(monitor.CurrentStatus)
	{
		case 0:
			className = "default";
		break;
		case 1:
			className = "danger";
		break;
		case 2:
			className = "success";
		break;
		case 3:
			className = "warning";
		break;
	}
	var div = "<div class='col-md-2 bg-" + className + "' style='14px; height: 60px;border:1px solid #000;padding: 2px;'>";
	div += monitor.Name + " <br /> " + ToReadableTime(ToJavaScriptDate(monitor.LastStatusDate));
	div += "</div>";
	$("#monitors").append(div);
}

function updateOrdersCards(){
	if(typeof pendingOrdersVTEX === "undefined" || 
	   typeof pendingOrdersWMW === "undefined")
		return;
	$("#pendingOrders").empty();
	populateOrders("VTEX", pendingOrdersVTEX);
	populateOrders("WMW Vendas", pendingOrdersWMW);
	
	
}

function populateOrders(systemName, pendingOrders) {
	var className = pendingOrders.length > 0 ? "danger" : "success";
	$("#pendingOrders").append("<div class='col-md-12 bg-" + className + " text-" + className + "' style='font-size: 64px; text-align:center;'><span style='font-size:24px;'>Pedidos com erro de importação (" + systemName + "):</span> " + pendingOrders.length + "</div>");
	for(let x = 0; x <pendingOrders.length; x++)
		populateOrder(pendingOrders[x]);
}

function populateOrder(order){
	var div = "<div class='col-md-6 panel panel-danger'>";
	div += "<div class='panel-heading'>";
	div += "<i class='fa fa-hashtag' aria-hidden='true'></i> " + order.Code;
	div += "<br /><i class='fa fa-clock-o' aria-hidden='true'></i> " + ToReadableDateTime(ToJavaScriptDate(order.OrderDate));
	div += "<br /><i class='fa fa-edit' aria-hidden='true'></i> " + ToReadableDateTime(ToJavaScriptDate(order.ChangedDate));
	div += "</div>";
	div += "<div class='panel-body' style='word-break:break-all;'>" + order.History + "</div>";
	div += "</div>";	
	$("#pendingOrders").append(div);	
}