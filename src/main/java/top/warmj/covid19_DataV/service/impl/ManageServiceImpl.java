package top.warmj.covid19_DataV.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.ManageDao;
import top.warmj.covid19_DataV.service.ManageService;

@Service("manageService")
public class ManageServiceImpl implements ManageService {
    @Autowired
    ManageDao manageDao;

    @Override
    public int importFromPath(String path, String target, String field) {
        return manageDao.importFromPath(path, target, field);
    }

    @Override
    public int truncateTable(String tableName) {
        return manageDao.truncateTable(tableName);
    }

    @Override
    public int coverT1FromT2(String t1, String t2) {
        return manageDao.coverT1FromT2(t1, t2);
    }
}
