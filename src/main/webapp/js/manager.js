function updateAll() {
    updateNews();
    updateArea();
    updateOverall();
}

//更新新闻 dxynews
function updateNews() {
    var url = "https://cdn.jsdelivr.net/gh/BlankerL/DXY-COVID-19-Data/csv/DXYNews.csv";
    console.log("开始从" + url + "更新新闻数据，请耐心等待");
    $.get("manage/updateDXYNews?url=" + url).done(function (data) {
        console.log("更新成功，现有新闻数据" + data + "条");
    })
}

//更新全球各地 dxyarea
function updateArea() {
    var url = "https://cdn.jsdelivr.net/gh/BlankerL/DXY-COVID-19-Data/csv/DXYArea.csv";
    console.log("开始从" + url + "全球各地数据，请耐心等待");
    $.get("manage/updateDXYArea?url=" + url).done(function (data) {
        console.log("更新成功，现有全球各地数据" + data + "条");
    })
}

//更新国内基础 dxyoverall
function updateOverall() {
    var url = "https://gitcdn.xyz/repo/BlankerL/DXY-COVID-19-Data/master/csv/DXYOverall.csv";
    console.log("开始从" + url + "国内基础数据，请耐心等待");
    $.get("manage/updateDXYOverall?url=" + url).done(function (data) {
        console.log("更新成功，现有国内基础数据" + data + "条");
    })
}

//更新国内趋势 timelinedata
function updateTimelinedata() {

}