package top.warmj.covid19_DataV.dao;

import top.warmj.covid19_DataV.domain.BasicData;

import java.util.Map;

public interface BasicDataDao {
    /**
     * 获取国内基础数据
     * @return
     */
    BasicData getBasicData();

    /**
     * 更新数据库基础数据
     * @param params
     */
    void updateBasicData(Map<String, Object> params);
}
