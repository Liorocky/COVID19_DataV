package top.warmj.covid19_DataV.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.BasicDataDao;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.service.BasicDataService;
import top.warmj.covid19_DataV.utils.COVIDData;

@Service("basicDataService")
public class BasicDataServiceImpl implements BasicDataService {

    @Autowired
    BasicDataDao basicDataDao;

    COVIDData covidData = new COVIDData();

    @Override
    public BasicData getBasicData() {
        return basicDataDao.getBasicData();
    }
}
