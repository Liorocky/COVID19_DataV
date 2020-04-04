package top.warmj.covid19_DataV.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.AllDataDao;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.domain.ProvinceData;
import top.warmj.covid19_DataV.service.AllDataService;

import java.util.List;

@Service("allDataService")
public class AllDataServiceImpl implements AllDataService {

    @Autowired
    AllDataDao allDataDao;

    @Override
    public BasicData getBasicData() {
        return allDataDao.getBasicData();
    }

    @Override
    public List<ProvinceData> getProvinceData() {
        return allDataDao.getProvinceData();
    }
}
