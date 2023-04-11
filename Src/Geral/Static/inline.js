if (typeof inlineLoaded === "undefined")
    var inlineLoaded = false;
if (typeof jQuery === "undefined")
    var jQuery = null;
// ReSharper disable UnusedParameter
(function ($, window, document, inlineLoaded, undefined) {
// ReSharper restore UnusedParameter
    "use strict";

    const editoraInovacao = "Inova\u00E7\u00E3o Media Brasil";
    let toastrReady;
    let partner = null;
    let isLocalIntranet = false;
	let jQueryRetries = 0;
	const jQueryExpectedVersion = "3.5.1";

    function getInfoFromIntegracaoAPI(endpoint, method, data, callback) {
        $.ajax({
            url: "https://integracao.editorainovacao.com.br/API/" + endpoint,
            type: method,
            data: data,
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-INTEGRACAOSERVICEAPI-KEY", "intranet");
                xhr.setRequestHeader("X-INTEGRACAOSERVICEAPI-TOKEN", "yMzanJ6ZuBNBSMlH9dtAyaf6JU5LT86x");
            },
            error: function (x, t, e) {
                console.error(e);
            },
            success: function (data) {
                callback(data);
            }
        });
    }
	
	function getInfoFromVisualizadorAPI(endpoint, method, data, callback){
		$.ajax({
			url: "https://visualizador.editorainovacao.com.br/" + endpoint,			
			type: method,
			data: data,
			dataType: "json",
			error: function(x, t, e){
				console.error(e);				
			},
			success: function (data){
				callback(data);
			}
		});
	}

    function loadScriptIf(condition, src, callback, callbackIfLoad) {
        console.groupCollapsed("Should load script " + src + " ? " + (condition ? "Yes" : "No"));
        console.log("Callback: " + callback);
        console.log("Callback if load: " + callbackIfLoad);
        console.groupEnd();
        if (condition)
            loadScript(src, function () {
                if (typeof callbackIfLoad === "function")
                    callbackIfLoad();
                if (typeof callback === "function")
                    callback();
            });
        else if (typeof callback == "function")
            callback();
    }

    function loadScript(src, callback) {
        console.log("Loading script " + src);
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = src;
        script.type = "text/javascript";
        head.appendChild(script);
        if (typeof callback === "function")
            script.addEventListener('load', function () {
                callback();
            });
    }

    function loadStyle(src) {
        console.log("Loading style " + src);
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = src;
        link.media = 'all';
        head.appendChild(link);
    }

    function isInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function checkIfInlineLoadedFromTop() {
        try {
            return window.top.location !== window.self.location;
        } catch (e) {
            return true;
        }
    }

    function getUserLocalIpAddress() {
        var MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new MyPeerConnection({
            iceServers: []
        }),
            noop = function () { },
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

        function iterateIP(ip) {
            if (!localIPs[ip]) processIp(ip);
            localIPs[ip] = true;
        }

        pc.createDataChannel("");
        pc.createOffer().then(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function () {
            // An error occurred, so handle the failure to connect
        });
        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }

    function processIp(ip) {
        if (!/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip))
            return;
        isLocalIntranet = false;        
        if (ip.indexOf("192.168.1.") !== -1 && ip !== window.Cookies.get("intranet.lanip"))
            checkIfIsInIntranet();
        window.Cookies.set("intranet.lanip", ip, { expires: 30, domain: ".editorainovacao.com.br", secure: true, sameSite: "none" });
    }

    function checkIfIsInIntranet() {
        if (window.Cookies.get("intranet.isLocalIntranet"))
            isLocalIntranet = true;
        console.warn("Currently connected through: " + (isLocalIntranet ? "LAN" : "WAN"));
		return;
		//Fix the SSL certificate of 192.168.1.235
        var img = new Image();
        $(img).on("load", function(){
            window.Cookies.set("intranet.isLocalIntranet", true, { expires: 30, domain: ".editorainovacao.com.br", secure: true, sameSite: "none" });
            if (!isLocalIntranet)
                window.toastr["info"]("Conectado a intranet [Local]", editoraInovacao);
            isLocalIntranet = true;
            console.warn("Currently connected through: LAN");
        });
        $(img).on("error", function(){
            window.Cookies.remove("intranet.isLocalIntranet", { domain: ".editorainovacao.com.br" });
            if (isLocalIntranet)
                window.toastr["info"]("Conectado a extranet [Home office]", editoraInovacao);
            isLocalIntranet = false;
            console.warn("Currently connected through: WAN");
        });
        img.src= "https://192.168.1.235/welcome.png?" + new Date().getTime();        
    }

    function validateIntranet() {
        getUserLocalIpAddress();
    }

    function initialization() {
        console.group("Intranet " + editoraInovacao + " - inline.js initialization from " + window.self.location);
        if (window.location.href.toLowerCase().indexOf("postmessage.html") !== -1)
            window.addEventListener("message", receiveMessage, false);
        if (window.inlineLoaded || checkIfInlineLoadedFromTop()) {
            console.info("Not initializing inline.js from " + window.self.location + " because it was previously loaded");
            console.groupEnd();
            return;
        } else
            console.info("Initializing inline.js");
        window.inlineLoaded = true;
        loadScriptIf(typeof $ === "undefined" || $ == null || $.fn.jquery !== jQueryExpectedVersion, "https://code.jquery.com/jquery-" + jQueryExpectedVersion + ".min.js", null, nc);
        loadScriptIf(typeof window.toastr === "undefined", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js", configureToastr, function () { loadStyle("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"); });
        loadScriptIf(typeof window.Cookies === "undefined", "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js", cookiesLoaded);
        console.groupEnd();
    }

    function nc() {
        console.log("$ version: " + (typeof $ !== "undefined" && $ != null ? $.fn.jquery : "Not loaded"));
		console.log("jQuery version: " + jQuery.fn.jquery);
		if(jQuery.fn.jquery === jQueryExpectedVersion)
			return;
        $ = jQuery.noConflict(true);
        console.log("$ version after noConflict: " + $.fn.jquery);		
		console.log("jQuery version after noConflict: " + jQuery.fn.jquery );
    }

    function configureToastr() {
        window.toastr.options = {
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
        toastrReady = true;
    }

    function cookiesLoaded() {
        if (jQuery == null || jQuery.fn.jquery !== jQueryExpectedVersion) {
			jQueryRetries++;
			console.log("Waiting jQuery load #" + jQueryRetries);
			if(jQueryRetries < 30)
				setTimeout(cookiesLoaded, 1000);
            return;
        }
        window.Cookies.json = true;
        validateIntranet();
        getPartnerData();
        if (partner === null || partner.UserGroup !== "Ti-sistema")
            return;
		jQuery(document).ready(function () {
            drawHelpbar();
            loadIframe(window.location.href.indexOf("sankhya") !== -1);
        });
    }

    function loadIframe(useFrame) {
        if (isInIframe())
            return;
        var iframe = $("<" + (useFrame ? "" : "i") + "frame />");
        iframe.attr("src", "https://intranet.editorainovacao.com.br/postMessage.html");
        iframe.attr("id", "inlineJSpostMessage");
        iframe.attr("style", "width:0;height:0;");
        iframe.on("load", initializeMessage);
        $("body").append(iframe);
    }

    function initializeMessage() {
        window.addEventListener("message", receiveMessage, false);
        var iframe = document.getElementById("inlineJSpostMessage");
        var iframewindow = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
        iframewindow.postMessage("Hi from parent", "https://intranet.editorainovacao.com.br");
    }

    function receiveMessage(message) {
        console.info("Message received in " + window.location.href + " from " + message.origin);
        console.log(message.data);
        if (window.parent !== window.self)
            window.parent.postMessage("Response to " + message.data + " from postMessage.html", message.origin);
    }

    function drawHelpbar() {
        var style = "<style type='text/css'>#inlinejsHelper .personalData b {font-weight:bold; font-size: 9px;} #inlinejsHelper .personalData {border-bottom: 1px solid #000; margin-bottom: 3px; font-weight: normal;font-size: 12px;} #inlinejsHelper .col img { width: 50px; height: 50px;} #inlinejsHelper .col {float: left; width: 50%; min-height: 75px; text-align:center;} #inlinejsHelper .inside {overflow: hidden; height: 0; text-align: left; font-size: 10px; color: #000;} #inlinejsHelper .title span {cursor:pointer;float: right;color: red;position: relative;right: 6px;top: 2px;border-radius: 15px;border:red 1px solid;width:15px;height:15px;font-size:9px;line-height:12px;} #inlinejsHelper .title {padding-top:10px;} #inlinejsHelper .inside {background: #FFF; cursor: default; margin-left: 1px;} #inlinejsHelper {cursor:pointer;opacity:.7;position:fixed;top:0;right:0;width:15%;min-width:290px;background:#28a945;height:30px;border-bottom-left-radius:30px;font-weight:bold;color:#FFF;z-index:10000000;text-align:center;font-size:14px;}#inlinejsHelper:hover{opacity:1;}</style>";
        var div = $("<div></div>");
        div.data("state", "closed");
        div.attr("id", "inlinejsHelper");
        var span = $("<span></span>");
        span.text("X");
        span.attr("title", "Fechar");
        span.click(function () {
            $("#inlinejsHelper").remove();
        });

        var inside = $("<div></div>");
        inside.attr("class", "inside");
        div.append(inside);
        populateInside(inside);

        var title = $("<div></div>");
        title.attr("class", "title");
        title.click(toggleHelpBar);
        title.text(editoraInovacao + " - TI [BETA]");
        title.append(span);
        div.append(title);

        $("head").append(style);
        $("body").append(div);
    }

    function populateInside(inside) {
        if (partner != null && partner.Code > 0) {
            var message = "<div class='personalData'>";
            message += "<b>Ramal:</b> " + partner.UserName + " <b>Grupo: </b> " + partner.UserGroup + "<br/>";
            message += "<b>Nome:</b> " + partner.SocialName + "<br/>";
            if (partner.SellerCode > 0) {
                message += "<b>Vendedor:</b> " + partner.SellerCode + " - " + partner.SellerName + " <b>Setor: </b> " + partner.SellerSector + "<br/>";
                if (partner.SellerSupervisorCode > 0)
                    message += "<b>Supervisor:</b> " + partner.SellerSupervisor + "<br/>";
            }
            if (partner.BuyerCode > 0) {
                message += "<b>Comprador:</b> " + partner.BuyerCode + " - " + partner.BuyerName + " <b>Setor: </b> " + partner.BuyerSector + "<br/>";
                if (partner.BuyerSupervisorCode > 0)
                    message += "<b>Supervisor:</b> " + partner.BuyerSupervisor + "<br/>";
            }
            message += "</div>";
            inside.append(message);
        }
        const hesk = "<div class='col'><a href='https://help.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/Hesk.png' alt='HESK - Help Desk' /></a></div>";
        const product = "<div class='col'><a href='https://listadecompras.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/ListaDeCompras.png' alt='Consulta de produtos' /></a></div>";
        const sankhya = "<div class='col'><a href='https://sankhya.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/Sankhya.png' alt='Sankhya-W' /></a></div>";
        const visualizador = "<div class='col'><a href='https://visualizador.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/VisualizadorDePedidos.png' alt='Visualizador de Pedidos' /></a></div>";
        const vendas = "<div class='col'><a href='https://vendas.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/WMWVendas.png' alt='WMW Vendas' /></a></div>";
		const icrm = "<div class='col'><a href='https://crm.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/InovacaoCRM.png' alt='Inovação CRM' /></a></div>";
        const totalip = "<div class='col'><a href='https://totalip.editorainovacao.com.br'><img src='https://intranet.editorainovacao.com.br/Images/Dials/TotalIP.png' alt='Total IP' /></a></div>";
        inside.append(hesk);
        inside.append(product);
        inside.append(sankhya);
        inside.append(visualizador);
        inside.append(vendas);
		inside.append(icrm);
        inside.append(totalip);
    }

    function toggleHelpBar() {
        var helper = $(this).parent();
        var currentState = helper.data("state");
        console.log(currentState);
        if (currentState === "closed")
            helper.data("state", "opened").animate({ height: "340px" }).css("opacity", 1).find("div.inside").animate({ height: "300px" });
        else
            helper.data("state", "closed").animate({ height: "30px" }).css("opacity", .7).find("div.inside").animate({ height: "0" });
    }

    function getPartnerData() {
        console.group(editoraInovacao + " - Get partner data");
        if (!window.Cookies.get("intranet.partner")) {
            getPartner();
            return;
        }
        console.warn("Partner data stored in cookies");
        partner = window.Cookies.get("intranet.partner");
        console.log(partner);
        console.groupEnd();
    }

    function getPartnerByUserId(userId) {
        console.warn("Sankhya user id: " + userId);
        getInfoFromIntegracaoAPI("Partners/GetPartnerByUserId?UserId=" + userId, "GET", null, processPartner);
    }

    function getPartnerBySession(session) {
        console.warn("Sankhya session: " + session);
    }

    function getPartnerByCRMName(name) {
        console.warn("WMW vendas name: " + name);
        getInfoFromIntegracaoAPI("Partners/GetPartnerByCRMSellerName?SellerName=" + name, "GET", null, processPartner);
    }

    function getPartnerByExtension(extension) {
        console.warn("Total IP extension: " + extension);
        getInfoFromIntegracaoAPI("Partners/GetPartnerByUserName?UserName=" + extension, "GET", null, processPartner);
    }
	
	function getPartnerByFingerprint(fingerprint){
		console.warn("Visualizador de Pedidos fingerprint: " + fingerprint);
		getInfoFromVisualizadorAPI("Fingerprint/?fingerprint=" + fingerprint, "GET", null, function (data) {
			if(data.Success) 
				getPartnerByExtension(data.Extension); 
		});		
	}
    
	function processPartner(partner) {
        if (partner == null) {
            console.warn("Unable to get the partner data");
            console.groupEnd();
            return;
        }
        console.log(partner);
        window.Cookies.set("intranet.partnerCode", partner.Code, { expires: 15, domain: ".editorainovacao.com.br", secure: true, sameSite: "none" });
        window.toastr["success"]("Oi " + partner.SocialName + "!", editoraInovacao);
        window.Cookies.set("intranet.partner", partner, { expires: 5, domain: ".editorainovacao.com.br", secure: true, sameSite: "none" });
        console.groupEnd();
    }

    function getPartner() {
        if (window.location.href.indexOf("sankhya") !== -1) {
            if (window.Cookies.get("userIDLogado"))
                return getPartnerByUserId(window.Cookies.get("userIDLogado"));
            return getPartnerBySession(window.Cookies.get("JSESSIONID"));
        }
        if (window.location.href.indexOf("totalip") !== -1 && $("#header div.block label").length === 1)
            return getPartnerByExtension($("#header div.block label").text());
        if (window.location.href.indexOf("vendas") !== -1 && $("#nmUserLogado").length === 1)
            return getPartnerByCRMName($("#nmUserLogado").text());
        if(window.location.href.indexOf("visualizador") !== -1 && window.Cookies.get("fingerprint"))
            return getPartnerByFingerprint(window.Cookies.get("fingerprint"));
        return null;
    }
    
    if(window.location.hash.indexOf("enable-inlinejs") === -1 &&
       window.location.href.indexOf("localhost") === -1 &&
	   window.location.href.indexOf("intranet.editorainovacao.com.br") === -1 &&
	   window.location.href.indexOf("sankhya.editorainovacao.com.br") === -1 &&
	   window.location.href.indexOf("visualizador.editorainovacao.com.br") === -1)
    {
	    console.warn("inline.js disabled");
        return;
    }
	initialization();
}(jQuery, window, document, window.inlineLoaded));
