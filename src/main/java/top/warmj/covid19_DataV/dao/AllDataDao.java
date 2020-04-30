package top.warmj.covid19_DataV.dao;

import top.warmj.covid19_DataV.domain.*;

import java.util.List;
import java.util.Map;

public interface AllDataDao {
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
    List<Timelinedata> getTimeLineData(Map<String, Object> map);

    /**
     * 列表 国内各地区详细疫情  现存确诊 累计确诊 累计死亡病例 累计治愈病例
     * @return
     */
    List<ProvinceDetails> getProvinceDetails(String name);

    /**
     * 滚动条 获取新闻
     * @return
     */
    List<News> getNews();
}
