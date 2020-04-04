package top.warmj.covid19_DataV.dao;

import top.warmj.covid19_DataV.domain.BasicData;

public interface BasicDataDao {
    /**
     * 获取国内基础数据
     * @return
     */
    BasicData getBasicData();

}
