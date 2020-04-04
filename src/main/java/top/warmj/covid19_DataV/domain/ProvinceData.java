package top.warmj.covid19_DataV.domain;

public class ProvinceData {

    private String provinceName;
    private String provinceConfirmedCount;
    private String provinceSuspectedCount;

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getProvinceConfirmedCount() {
        return provinceConfirmedCount;
    }

    public void setProvinceConfirmedCount(String provinceConfirmedCount) {
        this.provinceConfirmedCount = provinceConfirmedCount;
    }

    public String getProvinceSuspectedCount() {
        return provinceSuspectedCount;
    }

    public void setProvinceSuspectedCount(String provinceSuspectedCount) {
        this.provinceSuspectedCount = provinceSuspectedCount;
    }
}
