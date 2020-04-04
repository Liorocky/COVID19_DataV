//国内基础数据
$.get("api/getBasicData").done(function (data) {
    $("#updateTime").text("截至北京时间：" + data.updateTime);
    $("#currentConfirmedCount").text(data.currentConfirmedCount);
    $("#suspectedCount").text(data.suspectedCount);
    $("#seriousCount").text(data.seriousCount);
    $("#confirmedCount").text(data.confirmedCount);
    $("#deadCount").text(data.deadCount);
    $("#curedCount").text(data.curedCount);
})

//国内疫情地图
var chinaMap = echarts.init(document.getElementById('chinaMap'));
var confirmed = new Array();
var suspected = new Array();
var confirmedOption;
var suspectedOption;
$.get("api/getProvinceData").done(function (data) {
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
var updateTime = new Array();
var confirmedCountData = new Array(); //累计确诊
var currentConfirmedCountData = new Array(); //现存确诊
var deadCountData = new Array(); //累计死亡
var curedCountData = new Array(); //累计治愈

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