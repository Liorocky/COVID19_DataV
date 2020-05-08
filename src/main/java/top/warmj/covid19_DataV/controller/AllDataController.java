package top.warmj.covid19_DataV.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.domain.*;
import top.warmj.covid19_DataV.service.AllDataService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("api")
public class AllDataController {

    @Resource
    AllDataService allDataService;

    @RequestMapping("getBasicData")
    @ResponseBody
    public BasicData getBasicData() {
        BasicData basicData = allDataService.getBasicData();

        //取整
        basicData.setCurrentConfirmedCount(basicData.getCurrentConfirmedCount().replaceAll("\\.0", ""));
        basicData.setSeriousCount(basicData.getSeriousCount().replaceAll("\\.0", ""));
        basicData.setSuspectedIncr(basicData.getSuspectedIncr().replaceAll("\\.0", ""));
        basicData.setCurrentConfirmedIncr(basicData.getCurrentConfirmedIncr().replaceAll("\\.0", ""));
        basicData.setConfirmedIncr(basicData.getConfirmedIncr().replaceAll("\\.0", ""));
        basicData.setCuredIncr(basicData.getCuredIncr().replaceAll("\\.0", ""));
        basicData.setDeadIncr(basicData.getDeadIncr().replaceAll("\\.0", ""));
        basicData.setSeriousIncr(basicData.getSeriousIncr().replaceAll("\\.0", ""));

        return basicData;
    }

    @RequestMapping("getProvinceData")
    @ResponseBody
    public List<ProvinceData> getProvinceData() {
        return allDataService.getProvinceData();
    }

    @RequestMapping("getTimeLineData")
    @ResponseBody
    public List<Timelinedata> getTimeLineData(@Param("startdate") String startdate, @Param("enddate") String enddate) {
        return allDataService.getTimeLineData(startdate, enddate);
    }

    @RequestMapping("getProvinceDetails")
    @ResponseBody
    public List<ProvinceDetails> getProvinceDetails(@Param("name") String name) {
        return allDataService.getProvinceDetails(name);
    }

    @RequestMapping("getAllProvinceDetails")
    @ResponseBody
    public List<List> getAllProvinceDetails() {
        List<List> list = new ArrayList<>();
        String[] provinceArray = {"湖北省","北京市","上海市","广东省","安徽省","重庆市","福建省","甘肃省","广西壮族自治区","贵州省","海南省","河北省","黑龙江省",
                "河南省","湖南省","江苏省","江西省",
                "吉林省","辽宁省","内蒙古自治区","宁夏回族自治区",
                "青海省","山东省","山西省","陕西省","四川省","天津市",
                "新疆维吾尔自治区","西藏自治区","云南省","浙江省", "澳门","台湾","香港"};

        for (int i = 0; i < provinceArray.length; i++) {
            list.add(allDataService.getProvinceDetails(provinceArray[i]));
        }

        return list;
    }

    @RequestMapping("getNews")
    @ResponseBody
    public List<News> getNews() {
        return allDataService.getNews();
    }

    @RequestMapping("getForeignDetails")
    @ResponseBody
    public List<ProvinceDetails> getForeignDetails() {
        return allDataService.getForeignDetails();
    }
}
