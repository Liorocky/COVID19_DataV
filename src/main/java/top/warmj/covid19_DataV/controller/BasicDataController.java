package top.warmj.covid19_DataV.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.service.BasicDataService;

import javax.annotation.Resource;

@Controller
@RequestMapping("api")
public class BasicDataController {

    @Resource
    BasicDataService basicDataService;

    @RequestMapping("getBasicData")
    @ResponseBody
    public BasicData getBasicData() {
        BasicData basicData = basicDataService.getBasicData();
        return basicData;
    }
}
