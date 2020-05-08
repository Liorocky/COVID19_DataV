//新闻滚动条
$.get("api/getNews").done(function (data) {
    var ul = $("<ul></ul>");
    var li;
    var a;

    for (var i = 0; i < 4; i++) {
        li = $("<li></li>");
        a = $("<a href='" + data[i].sourceUrl + "' class='glyphicon glyphicon-flag' target='_blank'></a>").text(data[i].title + "  发布日期：" + data[i].pubDate);
        li.append(a);
        ul.append(li);
    }
    $('#news').append(ul);

    $('#news').vTicker({
        speed: 700,
        pause: 3000,
        showItems: 1,
        animation: '',
        mousePause: true,
        isPaused: false,
        direction: 'up',
        height: 0
    });
})

//切换地图
function switchMap(type) {
    if (type === "confirmed") {
        chinaMap.setOption(confirmedOption);
    } else if (type === "suspected") {
        chinaMap.setOption(suspectedOption);
    };
}

//切换国内趋势图
function switchChart(type) {
    if (type === "confirmedCount") {
        trendCharts.setOption(confirmedCountOption, true);
    } else if (type === "currentConfirmedCount") {
        trendCharts.setOption(currentConfirmedCountOption, true);
    } else if (type === "deadCount") {
        trendCharts.setOption(deadCountOption, true);
    } else if (type === "curedCount") {
        trendCharts.setOption(curedCountOption, true);
    };
}

//切换国外趋势图
function switchForeignChart(type) {
    if (type === "confirmedCount") {
        trendChartsForeign.setOption(confirmedCountOptionForeign);
    } else if (type === "currentConfirmedCount") {
        trendChartsForeign.setOption(currentConfirmedCountOptionForeign);
    } else if (type === "deadCount") {
        trendChartsForeign.setOption(deadCountOptionForeign);
    } else if (type === "curedCount") {
        trendChartsForeign.setOption(curedCountOptionForeign);
    };
}

function windowResize() {
    setTimeout("$(window).trigger('resize');","10");
}

window.onresize = function() {
    chinaMap.resize();
    trendChartsForeign.resize();
    trendCharts.resize();
};