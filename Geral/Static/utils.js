toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "60000",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

window.onerror = function (errorMsg, url, lineNumber) {
    if (errorMsg.indexOf("Script error") !== -1 && lineNumber === 0)
        return false;
    if (typeof window.toastr !== "undefined")
        window.toastr["error"](errorMsg + " on line number " + lineNumber + " of file " + url);
    return false;
};

const icons = {
    header: "ui-icon-circle-arrow-e",
    activeHeader: "ui-icon-circle-arrow-s"
};


const serviceLinks = [
    {
        "service": "WMW Vendas",
        "urls":
            {
                "local": "http://192.168.1.235:8081",
                "remote": "http://vendas.editorainovacao.com.br"
            }
    },
    {
        "service": "Total IP",
        "urls":
            {
                "local": "http://192.168.1.194",
                "remote": "http://totalip.editorainovacao.com.br"
            }
    }
];

(function (i, s, o, g, r) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    const a = s.createElement(o);
    const m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-61406720-3', 'auto');
ga('send', 'pageview');

function ToJavaScriptDate(value) {
    const pattern = /Date\(([^)]+)\)/;
    const results = pattern.exec(value);
    return new Date(parseFloat(results[1]));
}

function ToReadableTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    return hours + "h" + minutes;
}

function ToReadableDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;

    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;

    return day + "/" + month;
}

function ToReadableDateTime(date) {
    return ToReadableTime(date) + " em " + ToReadableDate(date);
}

function notification(type, title, message) {
    window.toastr[type](message, title);
    desktopNotification(type, title, message);
}

function desktopNotification(type, title, message) {
    if (!Notification)
        return;

    if (Notification.permission !== "granted")
        Notification.requestPermission();

    if (Notification.permission !== "granted")
        return;

    var notification = new Notification(title, {
        icon: notificationIconsBasePath + type + ".png",
        body: message
    });
	
	notification.onclick = function(){
			window.open("https://intranet.editorainovacao.com.br/Monitores");
	};
}

function removeByProperty(array, key, value) {
    for (let x = 0; x < array.length; x++) {
        if (array[x][key] !== value)
            continue;
        array.splice(x, 1);
    }
    return array;
}

function findByProperty(array, key, value){
    for(let x = 0; x < array.length; x++)
        if(array[x][key] === value)
            return array[x];
    return null;
}

function anyDifferent(array, key, value) {
    for (let x = 0; x < array.length; x++)
        if (array[x][key] !== value)
            return true;
    return false;
}

function anyDifferentFunc(array, func){
    for(let x = 0; x < array.length; x++)
        if(func(array[x]))
            return true;
    return false;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function orderByName(a, b){
    return a.Name > b.Name 
    ? 1 
    : b.Name > a.Name 
        ? -1 
        : 0;
}

function blinker(items) {
    var currentDate = new Date();
    $(items).each(function () {
        var startTime = $(this).data("start");
        var endTime = $(this).data("end");
        if (typeof startTime === "undefined" ||
            typeof endTime === "undefined" ||
            startTime === null ||
            endTime === null)
            return;
        startTime = startTime.split("h");
        const startHours = parseInt(startTime[0]);
        const startMinutes = parseInt(startTime[1]);
        endTime = endTime.split("h");
        const endHours = parseInt(endTime[0]);
        const endMinutes = parseInt(endTime[1]);
        if (!$(this).hasClass("blinking") &&
            ((startHours < currentDate.getHours() || (startHours === currentDate.getHours() && startMinutes <= currentDate.getMinutes())) &&
                (endHours > currentDate.getHours() || (endHours === currentDate.getHours() && endMinutes >= currentDate.getMinutes()))))
            $(this).addClass("blinking");
        if ($(this).hasClass("blinking") &&
            (endHours < currentDate.getHours() || (endHours === currentDate.getHours() && endMinutes < currentDate.getMinutes())))
            $(this).removeClass("blinking");
    });
}

function getFingerprint(){
    new Fingerprint2().get(function (result){
		var d = new Date();
		d.setDate(d.getDate() + 365);
		if(typeof window.Cookies !== "undefined" && window.Cookies !== null)
			window.Cookies.set("fingerprint", result, { expires: 365, domain: ".editorainovacao.com.br", secure: true, sameSite: "none" });
		else
			document.cookie= "fingerprint=" + result + ";expires=" + d.toGMTString() + ";domain=.editorainovacao.com.br;Secure;SameSite=none";
    })
}