function getMonitors() {
    $.ajax({
        url: integracaoEndPointMain + "Monitor/GetMonitors",
        type: "GET",
        dataType: "JSON",
        error: onUnavailableMonitors,
        success: onAvaliableMonitors
    });
    setTimeout(getMonitors, 10000);
}

function onUnavailableMonitors() {
    $(".monitor").empty();
    let img = $("<img />").attr("src", "Images/Monitors/unavailable.png").attr("title", "Monitor não disponível");
    $(".monitor").append(img);
}

function onAvaliableMonitors(data) {
    $("ul#monitorsList").empty();
    if(data.length == 0)
        $("ul#monitorsList").append("<li class='list-group-item list-group-item-danger text-center'><i class='fa fa-thumbs-down ' aria-hidden='true'></i> Nenhum monitor disponível!</li>");
    var showTime = typeof isMonitors === "undefined" || !isMonitors;
        data.sort(orderByName);
    if(!showTime)
        data.sort(function (a, b) { 
            var ao = a.CurrentStatus == 3 
                                ? 0 
                                : a.CurrentStatus == 1 
                                    ? 1
                                    : 2;
            var bo = b.CurrentStatus == 3 
                                ? 0
                                : b.CurrentStatus == 1
                                    ? 1
                                    : 2;
            return ao > bo ? 1 : bo > ao ? -1 : orderByName(a, b);
        });
    $.each(data, function (index, item) {
        const monitor = $(".monitor[data-monitor='" + item.Name + "']");
        const previous = findMonitorPreviousState(item.MonitorId);
        const date = ToReadableDateTime(ToJavaScriptDate(item.UpdateDate));
        let actual = findByProperty(monitors, "MonitorId", item.MonitorId);
        if (actual === null &&
            previous !== null &&
            previous.CurrentStatus !== item.CurrentStatus)
            actual = previous;
        if (actual === null)
            actual = { CurrentStatus: 2 };          
        let src;
		let text = item.ErrorMessage;
		let className;
        let icon;
        const showNotification = typeof isMonitors !== "undefined" && isMonitors ||
                                 typeof banner !== "undefined" && banner === "ti" ||
                                 item.Priority === 2 && (new Date().getTime() - date.getTime) / 1000 > 60;								 
        switch(item.CurrentStatus){
			case 0:
				src = "Unavailable";
				text = "com monitoramento pausado";
				className = "warning";
                icon = "fa-pause-circle-o";
				monitor.parent().parent().parent().remove();
			break;
			case 1:
				src = "Down";
				className = "danger";
                icon = "fa-stop-circle-o";
				if(actual.CurrentStatus !== 1 && showNotification)
					notification("error", item.Category, item.ErrorMessage);
			break;
			case 2:
				src = "Up";
				text = "operando normal";
				className = "success";
				icon = "fa-play-circle-o";
				if((actual.CurrentStatus === 1 || actual.CurrentStaus === 3) && showNotification)
					notification("success", item.Category, "Acesso ao sistema/serviço " + item.Name + " normalizado às " + date);
			break;
			case 3:
				src = "Unstable";
				let textNotification = text;
				if(item.ErrorMessage === ""){
					textNotification = "O sistema/serviço " + item.Name + " está em estado de alerta!";
					text = "em estado de alerta";
				}
				className = "danger";
				icon = "fa-exclamation-triangle";
				if(actual.CurrentStatus !== 3 && showNotification)
					notification("warning", item.Category, textNotification);
			break;			
		}
		
		var img = $("<img />");				
        img.attr("src", "Images/Monitors/" + src + ".png");
        img.attr("title", "Sistema " + text + " <br /> <span style='font-size:12px;text-decoration:underline;'>Atualizado às " + date + "</span>");
        img.tooltip({html: true});
		monitor.empty();
        monitor.append(img);
        monitors = removeByProperty(monitors, "MonitorId", item.MonitorId);
        monitors.push(item);        
        const li = "<li class='list-group-item list-group-item-" + className + "'> <i class='fa " + icon + "' aria-hidden='true'></i> <b>" + item.Name + "</b> " + (showTime ? "<a href='" + item.URL + "' target='_blank' style='color:#000 !important;'><i class='fa fa-external-link' aria-hidden='true'></i></a> <span style='font-size:9px;'>Atualizado em " + date + "</span></li>" : "");
        if(item.CurrentStatus !== 0 || typeof hidePausedMonitors === "undefined" || !hidePausedMonitors)
            $("ul#monitorsList").append(li);
    });
    storeMonitorsInCookie(data);
}

function storeMonitorsInCookie(data) {
    var temp = [];
    $.each(data, function (index, item) {
        if(item.Priority === 1)
            temp.push({ MonitorId: item.MonitorId, Name: item.Name, CurrentStatus: item.CurrentStatus });
    });
    window.Cookies.set("monitors", temp, { expires: 365, domain: ".editorainovacao.com.br", secure: true, sameSite: "none"});
}

function findMonitorPreviousState(monitorId) {
    const data = window.Cookies.getJSON("monitors");
    if (typeof data === "undefined" || data == null)
        return null;
	return findByProperty(data, "MonitorId", monitorId);
}