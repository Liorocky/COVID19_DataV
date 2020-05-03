package top.warmj.covid19_DataV.service;

public interface ManageService {
    /**
     * 从路径的文件更新到表中
     * @param path
     * @param target
     * @param field
     * @return
     */
    int importFromPath(String path, String target, String field);

    /**
     * 清除表中的数据
     * @param tableName
     * @return
     */
    int truncateTable(String tableName);

    /**
     * 将t2表中的数据覆盖到表t1中
     * @param t1 待覆盖表
     * @param t2 数据表
     * @return
     */
    int coverT1FromT2(String t1, String t2);
}
