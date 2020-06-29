function configureExtensions(){
    $.confirm({
        title: "Configurar ramais Total IP",
        content: "url: includes/configureExtensions.modal.php",
        theme: "bootstrap",
        type: "orange",
        icon: "fa fa-gear",
        animation: 'scale',
        columnClass: 'col-xs-12 col-md-6 col-md-offset-3',
        closeIcon: true,
        buttons:{
            confirm:{
                btnClass: "btn-success",
                text: "<span class='sr-only'>OK</span><i class='fa fa-thumbs-up' aria-hidden='true'></i>"
            }
        }
    });
}

function loadTotalIpStatus() {
    if ($("#extensions").length === 0)
        return;
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetOperatorsStatus",
        type: "GET",
        dataType: "JSON",
        success: processTotalIpData
    });
}

function processTotalIpData(data) {
    var users = [];
    for (let x = 0; x < data.length; x++) {
        if (data[x].GroupName === "Usuários Bloqueados" ||
            data[x].GroupName === "Total IP" ||
            data[x].GroupName === "Teste")
            continue;
        users.push(data[x]);
    }
    users = sortByKey(users, "GroupName");
    groups = new Array();
    $.each(users, function (index, user) {
        if (typeof groups[user.GroupName] === "undefined")
            groups[user.GroupName] = [];
        groups[user.GroupName].push(user);
    });
    const stored = window.Cookies.getJSON("extensionsOptions");
    if (typeof stored !== "undefined" && stored !== null) {
        if (typeof stored.Filter !== "undefined")
            extensionsFilter = stored.Filter;
        if (typeof stored.OnlineOnly !== "undefined")
            extensionsOnlineOnly = stored.OnlineOnly;            
        if (typeof stored.AvailableOnly !== "undefined")
            extensionsAvailableOnly = stored.AvailableOnly;
    }
    processTotalIpDataInterface();
}

function processTotalIpConfigure(){
    $("input[name='onlineOnly']").prop("checked", extensionsOnlineOnly).change();
    $("input[name='availableOnly']").prop("checked", extensionsAvailableOnly).change();
    const select = $("select[name='groups']");
    select.empty();
    select.html("<option>[TODOS]</option>");
    for(var group in groups){
        if(extensionsOnlineOnly && 
           !anyDifferent(groups[group], "StatusCode", 2))
            continue;
        if (extensionsAvailableOnly &&
            !anyDifferent(groups[group], "ConnectionCode", 0) &&
            !anyDifferent(groups[group], "StatusCode", 1))
            continue;
        if(extensionsAvailableOnly &&
           !anyDifferentFunc(groups[group], function (item) {
                return item.ConnectionCode === 0 &&
                       item.StatusCode === 1
           }))
           continue;
        const option = $("<option></option>").val(group).text(group);
        if(extensionsFilter == group)
            option.attr("selected", true);
        select.append(option);
    }
}

function processTotalIpDataInterface() {
    const ul = $("#extensions");
    let filter = null;
    if (extensionsFilter !== null)
        filter = extensionsFilter;
    if (filter === null)
        filter = "[TODOS]";    
    ul.empty();
    for (var group in groups) {
        if (extensionsOnlineOnly && !anyDifferent(groups[group], "StatusCode", 2))
            continue;
        if (extensionsAvailableOnly &&
            !anyDifferent(groups[group], "ConnectionCode", 0) &&
            !anyDifferent(groups[group], "StatusCode", 1))
            continue;
        if (filter !== "[TODOS]" && filter !== group)
            continue;
        const users = sortByKey(groups[group], "OperatorName");
        var first = true;
        $.each(users, function (_, user) {
            if (user.StatusCode === 2 && extensionsOnlineOnly)
                return;
            if (extensionsAvailableOnly && (user.ConnectionCode !== 0 || user.StatusCode !== 1))
                return;
            if (first)
                ul.append($("<li></li>").addClass("list-group-item list-group-item-info text-center").text(group));
            first = false;
            processExtension(user, ul);
        });
    }
    window.Cookies.set("extensionsOptions", { 
        Filter: extensionsFilter, 
        OnlineOnly: extensionsOnlineOnly, 
        AvailableOnly: extensionsAvailableOnly 
    }, {
         expires: 365
    });
}

function processExtension(user, ul) {
    const version = parseFloat($.fn.tooltip.Constructor.VERSION);
    const badgePrefix = version >= 4 ? "badge badge-" : "label label-";
    var badge = "";
    var userClass = "list-group-item-danger";
    switch (user.StatusCode) {
        case 1:
            userClass = user.ConnectionCode === 0 ? "list-group-item-success" : "list-group-item-warning";
            switch (user.ConnectionCode) {
                case 0:
                    badge = "<span class='" + badgePrefix + "success'>Livre</span>";
                    break;
                case 1:
                    badge = "<span class='" + badgePrefix + "warning'>Em ligação</span>";
                    break;
                case 2:
                    badge = "<span class='" + badgePrefix + "warning'>Ocupado</span>";
                    break;
                case 4:
                    badge = "<span class='" + badgePrefix + "danger'>Discador desconectado</span>";
                    break;
                case 8:
                    badge = "<span class='" + badgePrefix + "info'>Tocando</span>";;
                    break;
            }
            break;
        default:
            badge = "<span class='" + badgePrefix + "danger'>" + user.Status + "</span>";
            break;
    }
    ul.append($("<li></li>").addClass("list-group-item " + userClass).html("<a href='sip:" + user.Extension + "'>" + user.Extension + "</a> " + badge + " " + user.OperatorName));
}
