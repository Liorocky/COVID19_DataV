package top.warmj.covid19_DataV.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.BasicDataDao;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.service.BasicDataService;

@Service("basicDataService")
public class BasicDataServiceImpl implements BasicDataService {

    @Autowired
    BasicDataDao basicDataDao;

    @Override
    public BasicData getBasicData() {
        return basicDataDao.getBasicData();
    }

}
