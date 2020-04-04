package top.warmj.covid19_DataV.service;

import top.warmj.covid19_DataV.domain.BasicData;

public interface BasicDataService {
    /**
     * 获取国内基础数据 累计确诊 累计治愈 累计死亡 境外输入
     * @return
     */
    BasicData getBasicData();
}
