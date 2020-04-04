package top.warmj.covid19_DataV.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.domain.ProvinceData;
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
        return allDataService.getBasicData();
    }

    @RequestMapping("getProvinceData")
    @ResponseBody
    public List<ProvinceData> getProvinceData() {
        return allDataService.getProvinceData();
    }

}
