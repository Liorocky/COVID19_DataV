//区域趋势图
var basicAreaChartOption = {
    title: {
        text: "标题",
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ""
    },
    yAxis: {
        type: 'value',
        min: function (value) {
            return value.min - 1000;
        },
        max: 'dataMax'
    },
    series: [{
        data: "",
        type: 'line',
        areaStyle: {}
    }]
}

//地图
var mapChartOption = {
    title : {
        text: '标题',
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
            data:""
        }
    ]
}