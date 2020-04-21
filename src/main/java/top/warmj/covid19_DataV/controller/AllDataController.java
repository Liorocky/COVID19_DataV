package top.warmj.covid19_DataV.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.domain.ProvinceData;
import top.warmj.covid19_DataV.domain.ProvinceDetails;
import top.warmj.covid19_DataV.domain.Timelinedata;
import top.warmj.covid19_DataV.service.AllDataService;

import javax.annotation.Resource;
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
}
