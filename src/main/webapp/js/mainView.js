var trendChartOfConfirmedCasesInChina = echarts.init(document.getElementById('element1'));
var latestChartOfConfirmedCasesByProvince = echarts.init(document.getElementById('element2'));

var date = []; //日期
var confirmedNumInChina = []; //中国累计确诊人数
var provinceOrCityInChina = []; //中国各省市名称
var confirmedNumByProvince = []; //中国各省市累计确诊人数


// 中国累计确诊人数趋势area图
var trendChartOfConfirmedCasesInChinaOption = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '中国累计确诊人数趋势',
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100,
        disabled: true
    }, {
        start: 0,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name: '确诊人数',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: confirmedNumInChina
        }
    ]
};

// 各省市最新确诊人数条形图
var latestChartOfConfirmedCasesByProvinceOption = {
    title: {
        left: 'center',
        text: '各省市最新确诊人数',
    },
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    xAxis: {
        type: 'category',
        data: provinceOrCityInChina
    },
    yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax'

    },
    series: [{
        data: confirmedNumByProvince,
        type: 'bar'
    }]
};


// 使用刚指定的配置项和数据显示图表。
trendChartOfConfirmedCasesInChina.setOption(trendChartOfConfirmedCasesInChinaOption);
latestChartOfConfirmedCasesByProvince.setOption(latestChartOfConfirmedCasesByProvinceOption);

// 异步加载中国累计确诊人数趋势数据
$.get('http://www.dzyong.top:3005/yiqing/history').done(function (data) {
    for (var i = 0; i < 70; i++) {
        date.push(data.data[i].date);
        confirmedNumInChina.push(data.data[i].confirmedNum);
    }

    trendChartOfConfirmedCasesInChina.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },

        series: [{
            name: '确诊人数',
            data: confirmedNumInChina
        }]
    });
});

// 异步加载各省市最新确诊人数数据
$.get('http://www.dzyong.top:3005/yiqing/province').done(function (data) {
    console.log(data);
    for (var i = 0; i < data.data.length; i++) {
        provinceOrCityInChina.push(data.data[i].provinceName);
        confirmedNumByProvince.push(data.data[i].confirmedNum);
    }

    latestChartOfConfirmedCasesByProvince.setOption({
        xAxis: {
            type: 'category',
            data: provinceOrCityInChina
        },

        series: [{
            data: confirmedNumByProvince,
            type: 'bar'
        }]
    });
});