package top.warmj.covid19_DataV.service;

import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.domain.ProvinceData;

import java.util.List;

public interface AllDataService {
    /**
     * 获取现存确诊 境外输入 现存无症状 累计确诊 累计死亡 累计治愈  国内外
     * @return
     */
    BasicData getBasicData();

    /**
     * 地图 累计确诊 现存疑似
     * @return
     */
    List<ProvinceData> getProvinceData();
}
