window.onresize = function() {
    chinaMap.resize();
    trendChartsForeign.resize();
    trendCharts.resize();
};

//基础数据
var trendChartsForeign;
var confirmedCountOptionForeign; //累计确诊
var currentConfirmedCountOptionForeign; //现存确诊
var deadCountOptionForeign; //累计死亡
var curedCountOptionForeign; //累计治愈
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

        confirmedCountOptionForeign = {
            title: {
                text: "累计确诊",
                left: 'center'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: updateTimeForeign
            },
            yAxis: {
                type: 'value',
                min: function (value) {
                    return value.min - 1000;
                },
                max: 'dataMax'
            },
            series: [{
                data: confirmedCountDataForeign,
                type: 'line',
                areaStyle: {}
            }]
        };

        currentConfirmedCountOptionForeign = {
            title: {
                text: "现存确诊",
                left: 'center'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: updateTimeForeign
            },
            yAxis: {
                type: 'value',
                min: function (value) {
                    return value.min - 1000;
                },
                max: 'dataMax'
            },
            series: [{
                data: currentConfirmedCountDataForeign,
                type: 'line',
                areaStyle: {}
            }]
        };

        deadCountOptionForeign = {
            title: {
                text: "累计死亡",
                left: 'center'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: updateTimeForeign
            },
            yAxis: {
                type: 'value',
                min: function (value) {
                    return value.min - 1000;
                },
                max: 'dataMax'
            },
            series: [{
                data: deadCountDataForeign,
                type: 'line',
                areaStyle: {}
            }]
        };

        curedCountOptionForeign = {
            title: {
                text: "累计治愈",
                left: 'center'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: updateTimeForeign
            },
            yAxis: {
                type: 'value',
                min: function (value) {
                    return value.min - 1000;
                },
                max: 'dataMax'
            },
            series: [{
                data: curedCountDataForeign,
                type: 'line',
                areaStyle: {}
            }]
        };

        trendChartsForeign.setOption(confirmedCountOptionForeign);
    })
})

//国内疫情地图
var chinaMap = echarts.init(document.getElementById('chinaMap'));
var confirmedOption;
var suspectedOption;
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

    confirmedOption = {
        title : {
            text: '累计确诊',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 2000,
            left: 'left',
            top: 'bottom',
            calculable : true
        },
        toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name: '累计确诊人数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:confirmed
            }
        ]
    };

    suspectedOption = {
        title : {
            text: '现存疑似',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 10,
            left: 'left',
            top: 'bottom',
            calculable : true
        },
        toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name: '现存疑似人数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:suspected
            }
        ]
    };

    chinaMap.setOption(confirmedOption);
})

//切换地图
function switchMap(type) {
    if (type === "confirmed") {
        chinaMap.setOption(confirmedOption);
    } else if (type === "suspected") {
        chinaMap.setOption(suspectedOption);
    };
}

//国内疫情趋势图
var trendCharts = echarts.init(document.getElementById('trendCharts'));
var updateTime = [];
var confirmedCountData = []; //累计确诊
var currentConfirmedCountData = []; //现存确诊
var deadCountData = []; //累计死亡
var curedCountData = []; //累计治愈

var confirmedCountOption; //累计确诊
var currentConfirmedCountOption; //现存确诊
var deadCountOption; //累计死亡
var curedCountOption; //累计治愈
$.get("api/getTimeLineData?startdate=2020-03-06&enddate=2020-03-30").done(function (data) {
    for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].updateTime);
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        updateTime.push(M+D);
        confirmedCountData.push(Number(data[i].confirmedCount));
        currentConfirmedCountData.push(data[i].currentConfirmedCount);
        deadCountData.push(data[i].deadCount);
        curedCountData.push(data[i].curedCount);
    }

    confirmedCountOption = {
        title: {
            text: "累计确诊",
            left: 'center'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: updateTime
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - 1000;
            },
            max: 'dataMax'
        },
        series: [{
            data: confirmedCountData,
            type: 'line',
            areaStyle: {}
        }]
    };

    currentConfirmedCountOption = {
        title: {
            text: "现存确诊",
            left: 'center'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: updateTime
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - 1000;
            },
            max: 'dataMax'
        },
        series: [{
            data: currentConfirmedCountData,
            type: 'line',
            areaStyle: {}
        }]
    };

    deadCountOption = {
        title: {
            text: "累计死亡",
            left: 'center'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: updateTime
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - 1000;
            },
            max: 'dataMax'
        },
        series: [{
            data: deadCountData,
            type: 'line',
            areaStyle: {}
        }]
    };

    curedCountOption = {
        title: {
            text: "累计治愈",
            left: 'center'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: updateTime
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - 1000;
            },
            max: 'dataMax'
        },
        series: [{
            data: curedCountData,
            type: 'line',
            areaStyle: {}
        }]
    };

    trendCharts.setOption(confirmedCountOption);
})

//切换趋势图
function switchChart(type) {
    if (type === "confirmedCount") {
        trendCharts.setOption(confirmedCountOption);
    } else if (type === "currentConfirmedCount") {
        trendCharts.setOption(currentConfirmedCountOption);
    } else if (type === "deadCount") {
        trendCharts.setOption(deadCountOption);
    } else if (type === "curedCount") {
        trendCharts.setOption(curedCountOption);
    };
}


//国内各地区详细疫情

var fold;
var areaBlock1;
var subBlock1;
var subBlock2;
var subBlock3;
var subBlock4;
var subBlock5;
var areaBlock2;
var subBlock;

var provinceArray = ['安徽省','北京市','重庆市','福建省','甘肃省',
    '广东省','广西壮族自治区','贵州省','海南省','河北省','黑龙江省',
    '河南省','香港','湖北省','湖南省','江苏省','江西省',
    '吉林省','辽宁省', '澳门','内蒙古自治区','宁夏回族自治区',
    '青海省','山东省', '上海市','山西省','陕西省','四川省','台湾','天津市',
    '新疆维吾尔自治区','西藏自治区','云南省','浙江省'];

for (var i = 0; i < provinceArray.length; i++) {
    $.get("api/getProvinceDetails?name="+provinceArray[i]+"").done(function (data) {

        fold = $("<div class='fold'></div>");
        var num = data.length - 1;
        areaBlock1 = $("<div class='areaBlock1' data-toggle='collapse' href='#" + data[num].provinceName + "'></div>");
        subBlock1 = $("<div class='subBlock1 col-md-3' style='cursor: pointer'></div>").text(data[num].provinceName);
        subBlock2 = $("<div class='subBlock2 col-md-3'></div>").text(data[num].provinceConfirmedCount);
        subBlock3 = $("<div class='subBlock3 col-md-2' ></div>").text(data[num].provinceSuspectedCount);
        subBlock4 = $("<div class='subBlock4 col-md-2' ></div>").text(data[num].provinceCuredCount);
        subBlock5 = $("<div class='subBlock5 col-md-2' ></div>").text(data[num].provinceDeadCount);

        areaBlock1.append(subBlock1,subBlock2,subBlock3,subBlock4,subBlock5);
        fold.append(areaBlock1);
        areaBlock2 = $("<div class='areaBlock2 collapse' id="+data[0].provinceName+"></div>");

        for (var j = 0; j < data.length; j++) {
            for (var i=0; i<=j; i++){
                if (i%2==0){
                    subBlock = $("<div></div>");
                    subBlock1 = $("<div class='subBlock1 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityName);
                    subBlock2 = $("<div class='subBlock2 col-md-3' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityConfirmedCount);
                    subBlock3 = $("<div class='subBlock3 col-md-2' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].citySuspectedCount);
                    subBlock4 = $("<div class='subBlock4 col-md-2' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityCuredCount);
                    subBlock5 = $("<div class='subBlock5 col-md-2' style='background: rgba(60,63,65,0.1)'></div>").text(data[j].cityDeadCount);
                }else{
                    subBlock = $("<div></div>");
                    subBlock1 = $("<div class='subBlock1 col-md-3'></div>").text(data[j].cityName);
                    subBlock2 = $("<div class='subBlock2 col-md-3' ></div>").text(data[j].cityConfirmedCount);
                    subBlock3 = $("<div class='subBlock3 col-md-2' ></div>").text(data[j].citySuspectedCount);
                    subBlock4 = $("<div class='subBlock4 col-md-2' ></div>").text(data[j].cityCuredCount);
                    subBlock5 = $("<div class='subBlock5 col-md-2' ></div>").text(data[j].cityDeadCount);
                }
            }
            subBlock.append(subBlock1,subBlock2,subBlock3,subBlock4,subBlock5);
            areaBlock2.append(subBlock);
        }
        fold.append(areaBlock2);
        $(".expand").append(fold);
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