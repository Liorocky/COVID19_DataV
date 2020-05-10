package top.warmj.covid19_DataV.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.service.impl.ManageServiceImpl;

import static top.warmj.covid19_DataV.utils.COVIDData.downLoadFromUrl;

@Controller
@RequestMapping("/manage")
public class ManageController {

    @Autowired
    ManageServiceImpl manageServiceImpl;

    @RequestMapping("/updateDXYArea")
    @ResponseBody
    public int updateDXYArea(@Param("url") String url){
//        url = "https://gitcdn.xyz/repo/BlankerL/DXY-COVID-19-Data/master/csv/DXYArea.csv";
        String fileName = "DXYArea.csv"; //文件名字
        String tempTableName = "dxyarea_temp"; //临时表
        String tableName = "dxyarea"; //生产表
        String field = "(continentName,@dummy,countryName,@dummy,provinceName,@dummy,@dummy,province_confirmedCount,province_suspectedCount,province_curedCount,province_deadCount,updateTime,cityName,@dummy,@dummy,city_confirmedCount,city_suspectedCount,city_curedCount,city_deadCount)";

        return updateDate(url, fileName, tempTableName, tableName, field);
    }

    @RequestMapping("/updateDXYOverall")
    @ResponseBody
    public int updateDXYOverall(@Param("url") String url){
//        String url = "https://gitcdn.xyz/repo/BlankerL/DXY-COVID-19-Data/master/csv/DXYOverall.csv";
        String fileName = "DXYOverall.csv"; //文件名字
        String tempTableName = "dxyoverall_temp"; //临时表
        String tableName = "dxyoverall"; //生产表
        String field = "(@dummy,@dummy,@dummy,@dummy,currentConfirmedCount,confirmedCount,suspectedCount,curedCount,deadCount,seriousCount,suspectedIncr,currentConfirmedIncr,confirmedIncr,curedIncr,deadIncr,seriousIncr,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,foreignStatistics,globalStatistics,globalOtherTrendChartData,updateTime)";

        return updateDate(url, fileName, tempTableName, tableName, field);
    }

    @RequestMapping("/updateDXYNews")
    @ResponseBody
    public int updateDXYNews(@Param("url") String url){
//        String url = "https://gitcdn.xyz/repo/BlankerL/DXY-COVID-19-Data/master/csv/DXYNews.csv";
        String fileName = "DXYNews.csv"; //文件名字
        String tempTableName = "dxynews_temp"; //临时表
        String tableName = "dxynews"; //生产表
        String field = "(@dummy,id,pubDate,title,@dummy,@dummy,sourceUrl,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy)";

        return updateDate(url, fileName, tempTableName, tableName, field);
    }

    /**
     *
     * @param url   下载连接
     * @param fileName  文件名
     * @param tempTableName 临时表名
     * @param targetTableName   目标表名
     * @param field 字段
     * @return
     */
    private int updateDate(String url, String fileName,
                           String tempTableName, String targetTableName,
                           String field) {
        int size = 0; //写入行数，决定是否写入成功
        int truncateSize; //清除行数
        try{
            String rootPath = getClass().getResource("/").getPath();
            System.out.println("准备将文件下载到：" + rootPath + "目录中");

            System.out.println("开始下载：" + url);

            String path = downLoadFromUrl(url, fileName, rootPath);
            System.out.println("下载成功，文件保存到：" + path);

            path = "'" + path + "'";
            path = path.replaceAll("\\\\", "/");

            System.out.println("清除临时表的数据");
            truncateSize = manageServiceImpl.truncateTable(tempTableName);
            System.out.println("清除了" + truncateSize + "行");

            System.out.println("将要把路径为" + path + "的文件写入到表" + tempTableName + "中");
            size = manageServiceImpl.importFromPath(path, tempTableName, field);
            System.out.println(tempTableName + "写入成功，共写入" + size + "行");

            System.out.println("清除目标表的数据");
            truncateSize = manageServiceImpl.truncateTable(targetTableName);
            System.out.println("清除了" + truncateSize + "行");

            System.out.println("开始将临时表中的数据导入到目标表中");
            size = manageServiceImpl.coverT1FromT2(targetTableName, tempTableName);
            System.out.println(targetTableName + "导入成功，共导入" + size + "行");
        }catch (Exception e) {
            new RuntimeException(e);
        }

        return size;
    }
}
