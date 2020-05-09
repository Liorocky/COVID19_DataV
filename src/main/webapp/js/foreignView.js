//全球基础数据 国外趋势走势图
$.get("api/getBasicData").done(function (data) {
    $(".updateTime").text("截至北京时间：" + data.updateTime);
    var text = data.globalStatistics;
    var globalStatistics = text.replace(/\'/g, '\"');
    globalStatistics = JSON.parse(globalStatistics);
    $("#currentConfirmedCountForeign").text(globalStatistics.currentConfirmedCount);
    $("#confirmedCountForeign").text(globalStatistics.confirmedCount);
    $("#deadCountForeign").text(globalStatistics.deadCount);
    $("#curedCountForeign").text(globalStatistics.curedCount);

    //国外趋势走势图
    var globalOtherTrendChartData = data.globalOtherTrendChartData; //获取数据链接
    $.get(globalOtherTrendChartData).done(function (data) {
        trendChartsForeign = echarts.init(document.getElementById('trendChartsForeign'));
        var updateTimeForeign = [];
        var confirmedCountDataForeign = []; //累计确诊
        var currentConfirmedCountDataForeign = []; //现存确诊
        var deadCountDataForeign = []; //累计死亡
        var curedCountDataForeign = []; //累计治愈

        var data = data.data;
        for (var i = 0; i < data.length; i++) {
            updateTimeForeign.push(data[i].dateId);
            confirmedCountDataForeign.push(data[i].confirmedCount);
            currentConfirmedCountDataForeign.push(data[i].currentConfirmedCount);
            deadCountDataForeign.push(data[i].deadCount);
            curedCountDataForeign.push(data[i].curedCount);
        }

        confirmedCountOptionForeign.title.text = "累计确诊";
        confirmedCountOptionForeign.xAxis.data = updateTimeForeign;
        confirmedCountOptionForeign.series[0].data = confirmedCountDataForeign;

        currentConfirmedCountOptionForeign.title.text = "现存确诊";
        currentConfirmedCountOptionForeign.xAxis.data = updateTimeForeign;
        currentConfirmedCountOptionForeign.series[0].data = currentConfirmedCountDataForeign;

        deadCountOptionForeign.title.text = "累计死亡";
        deadCountOptionForeign.xAxis.data = updateTimeForeign;
        deadCountOptionForeign.series[0].data = deadCountDataForeign;

        curedCountOptionForeign.title.text = "累计治愈";
        curedCountOptionForeign.xAxis.data = updateTimeForeign;
        curedCountOptionForeign.series[0].data = curedCountDataForeign;

        trendChartsForeign.setOption(confirmedCountOptionForeign);
    })

})

//国外趋势走势图
var trendChartsForeign;
var confirmedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计确诊
var currentConfirmedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //现存确诊
var deadCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计死亡
var curedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计治愈


//重点国家疫情数据
$.get("api/getForeignDetails").done(function (data) {
    var provinceConfirmedCount = $.extend([], data);
    var provinceDeadCount = $.extend([], data);;
    var provinceCuredCount = $.extend([], data);;

    provinceConfirmedCount.sort(sortBy(("provinceConfirmedCount")));
    provinceDeadCount.sort(sortBy(("provinceDeadCount")));
    provinceCuredCount.sort(sortBy(("provinceCuredCount")));

    for (var i = 0; i < 10; i++) {
        var tr1 = $("<tr></tr>");
        var tr2 = $("<tr></tr>");
        var tr3 = $("<tr></tr>");

        var td = $("<td></td>").text(provinceConfirmedCount[i].provinceName);
        tr1.append(td);
        var td = $("<td></td>").text(provinceConfirmedCount[i].provinceConfirmedCount);
        tr1.append(td);
        var td = $("<td></td>").text(i + 1);
        tr1.append(td);

        var td = $("<td></td>").text(provinceDeadCount[i].provinceName);
        tr2.append(td);
        var td = $("<td></td>").text(provinceDeadCount[i].provinceDeadCount);
        tr2.append(td);
        var td = $("<td></td>").text(i + 1);
        tr2.append(td);

        var td = $("<td></td>").text(provinceCuredCount[i].provinceName);
        tr3.append(td);
        var td = $("<td></td>").text(provinceCuredCount[i].provinceCuredCount);
        tr3.append(td);
        var td = $("<td></td>").text(i + 1);
        tr3.append(td);

        $("#table-ConfirmedCount > tbody").append(tr1);
        $("#table-DeadCount > tbody").append(tr2);
        $("#table-CuredCount > tbody").append(tr3);
    }
})

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