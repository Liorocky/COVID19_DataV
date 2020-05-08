//基础数据 国外趋势走势图
var trendChartsForeign; //国外趋势图
var confirmedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计确诊
var currentConfirmedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //现存确诊
var deadCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计死亡
var curedCountOptionForeign = $.extend(true, {}, basicAreaChartOption); //累计治愈
$.get("api/getBasicData").done(function (data) {
    //国内基础数据
    $(".updateTime").text("截至北京时间：" + data.updateTime);
    $("#currentConfirmedCount").text(data.currentConfirmedCount);
    $("#suspectedCount").text(data.suspectedCount);
    $("#seriousCount").text(data.seriousCount);
    $("#confirmedCount").text(data.confirmedCount);
    $("#deadCount").text(data.deadCount);
    $("#curedCount").text(data.curedCount);

    //全球基础数据
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

//国内疫情地图
var chinaMap = echarts.init(document.getElementById('chinaMap'));
var confirmedOption = $.extend(true, {}, mapChartOption);
var suspectedOption = $.extend(true, {}, mapChartOption);
$.get("api/getProvinceData").done(function (data) {
    var confirmed = new Array();
    var suspected = new Array();

    for (var i = 0; i < data.length; i++) {
        confirmed.push({
            name : data[i].provinceName.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,""),
            value : data[i].provinceConfirmedCount
        });

        suspected.push({
            name : data[i].provinceName.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,""),
            value : data[i].provinceSuspectedCount
        })
    }

    confirmedOption.title.text = "累计确诊";
    confirmedOption.visualMap.min = 0;
    confirmedOption.visualMap.max = 2000;
    confirmedOption.series[0].name = "累计确诊人数";
    confirmedOption.series[0].data = confirmed;

    suspectedOption.title.text = "现存疑似";
    suspectedOption.visualMap.min = 0;
    suspectedOption.visualMap.max = 10;
    suspectedOption.series[0].name = "现存疑似人数";
    suspectedOption.series[0].data = suspected;

    chinaMap.setOption(confirmedOption);
})

//国内疫情趋势图
var trendCharts = echarts.init(document.getElementById('trendCharts'));
var updateTime = []; //更新时间数据
var confirmedCountData = []; //累计确诊数据
var currentConfirmedCountData = []; //现存确诊数据
var deadCountData = []; //累计死亡数据
var curedCountData = []; //累计治愈数据

var confirmedCountOption = $.extend(true, {}, basicAreaChartOption); //累计确诊选项
var currentConfirmedCountOption  = $.extend(true, {}, basicAreaChartOption); //现存确诊选项
var deadCountOption  = $.extend(true, {}, basicAreaChartOption); //累计死亡选项
var curedCountOption  = $.extend(true, {}, basicAreaChartOption); //累计治愈选项
var startDate = "2020-03-01";

var date = new Date(); // 获取当前日期
var nowMonth = date.getMonth() + 1; // 获取当前月份
var strDate = date.getDate(); // 获取当前是几号

// 对月份进行处理，1-9月在前面添加一个“0”
if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
}

// 对月份进行处理，1-9号在前面添加一个“0”
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}

// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
var endDate = date.getFullYear() + "-" + nowMonth + "-" + strDate;

// $.get("api/getTimeLineData?startdate=2020-03-06&enddate=2020-03-30").done(function (data) {
$.get("https://www.windquant.com/qntcloud/data/edb?userid=fe4af824-484d-4b44-9688-7397584660b1&indicators=S6274770,S6290834,S6274771,S6274772&startdate=" + startDate + "&enddate=" + endDate + "").done(function (data) {
    // for (var i = 0; i < data.length; i++) {
    //     var date = new Date(data[i].updateTime);
    //     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //     var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    //     updateTime.push(M+D);
    //     confirmedCountData.push(Number(data[i].confirmedCount));
    //     currentConfirmedCountData.push(data[i].currentConfirmedCount);
    //     deadCountData.push(data[i].deadCount);
    //     curedCountData.push(data[i].curedCount);
    // }

    for (var i = 0; i < data.times.length; i++) {
        var date = new Date(data.times[i]);
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        updateTime.push(M+D);
        confirmedCountData.push(data.data[0][i]);
        currentConfirmedCountData.push(data.data[1][i]);
        deadCountData.push(data.data[2][i]);
        curedCountData.push(data.data[3][i]);
    }

    confirmedCountOption.title.text = "累计确诊";
    confirmedCountOption.xAxis.data = updateTime;
    confirmedCountOption.series[0].data = confirmedCountData;

    currentConfirmedCountOption.title.text = "现存确诊";
    currentConfirmedCountOption.xAxis.data = updateTime;
    currentConfirmedCountOption.series[0].data = currentConfirmedCountData;

    deadCountOption.title.text = "累计死亡";
    deadCountOption.xAxis.data = updateTime;
    deadCountOption.series[0].data = deadCountData;

    curedCountOption.title.text = "累计治愈";
    curedCountOption.xAxis.data = updateTime;
    curedCountOption.series[0].data = curedCountData;

    trendCharts.setOption(confirmedCountOption);
})

//国内各地区详细疫情
var fold;
var areaBlock1;
var subBlock1;
var subBlock2;
var subBlock3;
var subBlock4;
var areaBlock2;
var subBlock;
var provinceArray = ['湖北省','北京市','上海市'];

for (var i = 0; i < 3; i++) {
    $.get("api/getProvinceDetails?name="+provinceArray[i]+"").done(function (data) {
        fold = $("<div class='fold'></div>");
        areaBlock1 = $("<div class='areaBlock1' data-toggle='collapse' href='#" + data[0].provinceName + "'></div>");
        subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3' style='cursor: pointer'></div>").text(data[0].provinceName);
        subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3'></div>").text(data[0].provinceConfirmedCount);
        subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' ></div>").text(data[0].provinceDeadCount);
        subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' ></div>").text(data[0].provinceCuredCount);

        areaBlock1.append(subBlock1,subBlock2,subBlock3,subBlock4);
        fold.append(areaBlock1);
        areaBlock2 = $("<div class='areaBlock2 collapse' id=" + data[0].provinceName + "></div>");

        for (var j = 0; j < data.length; j++) {
            for (var k=0; k<=j; k++){
                if (k%2 == 0){
                    subBlock = $("<div></div>");
                    subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityName);
                    subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityConfirmedCount);
                    subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityDeadCount);
                    subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityCuredCount);
                }else{
                    subBlock = $("<div></div>");
                    subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3'></div>").text(data[j].cityName);
                    subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3' ></div>").text(data[j].cityConfirmedCount);
                    subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' ></div>").text(data[j].cityDeadCount);
                    subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' ></div>").text(data[j].cityCuredCount);
                }
            }
            subBlock.append(subBlock1,subBlock2,subBlock3,subBlock4);
            areaBlock2.append(subBlock);
        }
        fold.append(areaBlock2);

        $(".expand").append(fold);

    })
}

function getAllProvinceDetails() {
    $("#getAllProvinceDetailsBtn").button("loading");

    $.get("api/getAllProvinceDetails").done(function (data) {
        //移除原有省份数据
        $(".fold").remove();
        $('#getAllProvinceDetailsBtn').remove();

        for (var i = 0; i < data.length; i++) {
            fold = $("<div class='fold'></div>");
            areaBlock1 = $("<div class='areaBlock1' data-toggle='collapse' href='#" + data[i][0].provinceName + "'></div>");
            subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3' style='cursor: pointer'></div>").text(data[i][0].provinceName);
            subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3'></div>").text(data[i][0].provinceConfirmedCount);
            subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' ></div>").text(data[i][0].provinceDeadCount);
            subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' ></div>").text(data[i][0].provinceCuredCount);

            areaBlock1.append(subBlock1,subBlock2,subBlock3,subBlock4);
            fold.append(areaBlock1);
            areaBlock2 = $("<div class='areaBlock2 collapse' id=" + data[i][0].provinceName + "></div>");

            for (var j = 0; j < data[i].length; j++) {
                for (var k=0; k<=j; k++){
                    if (k%2 == 0){
                        subBlock = $("<div></div>");
                        subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[i][j].cityName);
                        subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[i][j].cityConfirmedCount);
                        subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[i][j].cityDeadCount);
                        subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[i][j].cityCuredCount);
                    }else{
                        subBlock = $("<div></div>");
                        subBlock1 = $("<div class='subBlock1 col-xs-3 col-md-3'></div>").text(data[i][j].cityName);
                        subBlock2 = $("<div class='subBlock2 col-xs-3 col-md-3' ></div>").text(data[i][j].cityConfirmedCount);
                        subBlock3 = $("<div class='subBlock3 col-xs-3 col-md-3' ></div>").text(data[i][j].cityDeadCount);
                        subBlock4 = $("<div class='subBlock4 col-xs-3 col-md-3' ></div>").text(data[i][j].cityCuredCount);
                    }
                }
                subBlock.append(subBlock1,subBlock2,subBlock3,subBlock4);
                areaBlock2.append(subBlock);
            }
            fold.append(areaBlock2);

            $(".expand").append(fold);
        }
    })
}


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

//比较数组对象
function sortBy(field) {
    return function(a,b) {
        return parseInt(b[field]) - parseInt(a[field]);
    }
}

