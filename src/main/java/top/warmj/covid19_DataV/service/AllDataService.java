package top.warmj.covid19_DataV.service;

import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.domain.ProvinceData;
import top.warmj.covid19_DataV.domain.Timelinedata;

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

    /**
     * -- 趋势图 累计确诊病例 现有确诊病例 累计死亡病例 累计治愈病例
     * @return
     */
    List<Timelinedata> getTimeLineData(String startdate, String enddate);
}
