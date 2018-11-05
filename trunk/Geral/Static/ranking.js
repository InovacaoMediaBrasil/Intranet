function loadRankingData() {
    $.each($("div[data-rankingtop]"), function () {
        loadRanking($(this).data("rankingtop"));
    });
}

function loadRanking(top) {
    $.ajax({
        url: integracaoEndPointMain + "Feeds/GetSellersRanking?top=" + top,
        type: "GET",
        dataType: "JSON",
        error: function () {
            loadRanking(div, top);
        },
        success: function (data) {
            processRankingData(data, top);
        }
    });
}

function processRankingData(data, top) {
    const div = $("div[data-rankingtop='" + top + "']");
    var html = "<ul class='list-group'>";
    html += "<li class='list-group-item list-group-item-primary text-center'>Ranking " + div.data("nometop") + "</li>";
    $.each(data.Rankings, function (index, ranking) {
        if (index > 9)
            return;
        html += "<li class='list-group-item'>#" + ++index + " " + ranking.SellerName + " <span class='badge badge-info'>" + ranking.Quantity + " pedido" + (ranking.Quantity === 1 ? "" : "s") + "</span></li>";
    });
    html += "</ul>";
    div.html(html);
}
