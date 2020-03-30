package top.warmj.covid19_DataV.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.BasicDataDao;
import top.warmj.covid19_DataV.domain.BasicData;
import top.warmj.covid19_DataV.service.BasicDataService;
import top.warmj.covid19_DataV.utils.COVIDData;

import java.util.HashMap;
import java.util.Map;

@Service("basicDataService")
public class BasicDataServiceImpl implements BasicDataService {

    @Autowired
    BasicDataDao basicDataDao;

    COVIDData covidData = new COVIDData();

    @Override
    public BasicData getBasicData() {
        return basicDataDao.getBasicData();
    }

    @Override
    public void updateBasicData(String startdate, String enddate){

        // 获取json对象
        JSONObject jsonObject = covidData.getJsonFromUrl("https://www.windquant.com/qntcloud/data/edb?" +
                "userid=fe4af824-484d-4b44-9688-7397584660b1&" +
                "indicators=S6274770,S6290834,S6274773,S6274774,S6274771,S6274772&" +
                "startdate="+startdate+"&" +
                "enddate="+enddate+"");

        //获取json对象中的data、times字段，并转换成String
        String data = jsonObject.getString("data");
        String times = jsonObject.getString("times");

        //取整
        data = data.replaceAll("\\.0", "");

        //将字符串转换成json数组
        JSONArray dataArray = JSONArray.parseArray(data);
        JSONArray timesArray = JSONArray.parseArray(times);

        for (int i = 0; i < timesArray.size(); i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("chinaConfirmedCount", ((JSONArray) dataArray.get(0)).get(i).toString());
            map.put("chinaCurrentConfirmedCount", ((JSONArray) dataArray.get(1)).get(i).toString());
            map.put("chinaSuspectedCount", ((JSONArray) dataArray.get(2)).get(i).toString());
            map.put("chinaGraveCount", ((JSONArray) dataArray.get(3)).get(i).toString());
            map.put("chinaDeadCount", ((JSONArray) dataArray.get(4)).get(i).toString());
            map.put("chinaCuredCount", ((JSONArray) dataArray.get(5)).get(i).toString());
            map.put("time", ((Long) timesArray.get(i)) / 1000 );

            //执行sql更新操作
            basicDataDao.updateBasicData(map);
        }
    }
}
