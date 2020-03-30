package top.warmj.covid19_DataV.service;

import top.warmj.covid19_DataV.domain.BasicData;

public interface BasicDataService {
    /**
     * 获取国内基础数据
     * @return
     */
    BasicData getBasicData();

    /**
     * 更新数据库基础数据
     * @param startdate 开始日期
     * @param enddate 结束日期
     */
    void updateBasicData(String startdate, String enddate);
}
