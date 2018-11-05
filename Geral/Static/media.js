function loadMediaScheduleToday() {    
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetMediaScheduleForToday",
        type: "GET",
        dataType: "json",
        error: function () {
            onEmptyMediaSchedule("today");
			setTimeout(loadMediaScheduleToday, 15000);
        },
        success: function (data) {
            onSuccessMediaSchedule(data, "today");
        }
    });
}

function loadMediaScheduleWeek(method) {   
    $.ajax({
        url: integracaoEndPointMain + "Feeds/" + method,
        type: "GET",
        dataType: "json",
        error: function () {
            onEmptyMediaSchedule("week");
            setTimeout(function() {loadMediaScheduleWeek(method);}, 15000);
        },
        success: function (data) {
            onSuccessMediaSchedule(data, "week");
        }
    });
}

function onSuccessMediaSchedule(data, type) {
    if (type === "today")
        $("#lastUpdateMedia").text("atualizado às " + ToReadableTime(ToJavaScriptDate(data.UpdateDate)));
    else if (type === "tomorrow")
        $("#lastUpdateMediaTomorrow").text("atualizado às " + ToReadableTime(ToJavaScriptDate(data.UpdateDate)));
    else if (type === "week"){
        $("#periodMedia").text(ToReadableDate(ToJavaScriptDate(data.StartDate)) + " até " + ToReadableDate(ToJavaScriptDate(data.EndDate)));
        $("#lastUpdateMediaPeriod").text("atualizado às " + ToReadableDateTime(ToJavaScriptDate(data.UpdateDate)));
    }
    $("#" + type + "MediaSchedule").empty();
    if (data.Medias == null || data.Medias.length === 0)
        return onEmptyMediaSchedule(type);
    $.each(data.Medias, function (index, item) {
        parseMediaItem(item, type);
    });    
    $("[data-toggle='tooltip']").tooltip();
    return true;
}

function onEmptyMediaSchedule(type) {
    let colspan = 5;
    if (type === "week")
        colspan = 4;
    $("#" + type + "MediaSchedule").empty().append("<tr><td colspan='" + colspan + "' class='big' id='emptyMediaSchedule'>Não existem mídias agendadas</td></tr>");
}


function parseMediaItem(item, type) {
    const startFullDate = ToJavaScriptDate(item.StartDate);
    const endFullDate = ToJavaScriptDate(item.EndDate);
    const startTime = ToReadableTime(startFullDate);
    const startDate = ToReadableDate(startFullDate);
    const endTime = ToReadableTime(endFullDate);
    let availability = "";
    if(typeof(item.ProductAvailability) !== "undefined" && !isNaN(item.ProductAvailability))
        {
            let className = "success";
            let orMore = "";
            const s = item.ProductAvailability === 1 || item.ProductAvailability === -1 ? "" : "s";
            let title = item.ProductAvailability + " " + (s === "" ? "unidade disponível" : "unidades disponiveis") + " para venda";
            if(item.ProductAvailability > 15){
                item.ProductAvailability = 15;
                orMore = "+";
                title = "Mais de 15 unidades disponíveis para venda";
            }
            if(item.ProductAvailability <= 5) {
                className = "warning";
                title = "Poucas unidades disponíveis: " + item.ProductAvailability + " unidade" + s + " restante" + s;
            }
            if(item.ProductAvailability <= 0){
                className = "danger";
                title = "Indisponível para venda";
            }
            
            availability = "<span class='label label-" + className + "' data-toggle='tooltip' title='" + title + "'>" + item.ProductAvailability + orMore + " unidade" + s + "</span>";
        }
    if (type === "today")
        $("#todayMediaSchedule").append("<tr data-start='" + startTime + "' data-end='" + endTime + "' data-productid='" + item.ProductCode + "'><td>" + startTime + "</td><td style='text-align:left;padding-left:3px;'><span class='label label-info' data-toggle='tooltip' title='Código do produto: " + item.ProductCode + "'>#" + item.ProductCode + "</span> " + availability + " <span class='label label-primary' data-toggle='tooltip' title='Professor(a): " + item.PartnerName + "'>" + item.PartnerName + "</span> <span class='label label-default' data-toggle='tooltip' title='Mídia: " + item.Name + "'>" + item.Name + "</span> <br />" + item.ProductName + "</td></tr>");
    else
        $("#weekMediaSchedule").append("<tr data-productid='" + item.ProductCode + "'><td>" + startDate + "</td><td>" + startTime + "</td><td style='text-align:left; padding-left:3px;'><span class='label label-info' data-toggle='tooltip' title='Código do produto: " + item.ProductCode + "'>#" + item.ProductCode + "</span> <span class='label label-primary' data-toggle='tooltip' title='Professor(a): " + item.PartnerName + "'>" + item.PartnerName + "</span> <span class='label label-default' data-toggle='tooltip' title='Mídia: " + item.Name + "'>" + item.Name + "</span> <br />" + item.ProductName + "</td></tr>");
}
