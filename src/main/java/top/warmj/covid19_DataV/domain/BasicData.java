package top.warmj.covid19_DataV.domain;

public class BasicData {
    private String chinaCurrentConfirmedCount; // 国内现有确诊
    private String chinaSuspectedCount; // 国内现有疑似
    private String overseasInputCount; // 国内境外输入
    private String chinaConfirmedCount; // 国内累计确诊
    private String chinaCuredCount; // 国内累计治愈
    private String chinaDeadCount; // 国内累计死亡

    private String foreignCurrentConfirmedCount; // 国外现有确诊
    private String foreignConfirmedCount; // 国外累计确诊
    private String foreignCuredCount; // 国外累计治愈
    private String foreignDeadCount; // 国外累计死亡

    public String getChinaCurrentConfirmedCount() {
        return chinaCurrentConfirmedCount;
    }

    public void setChinaCurrentConfirmedCount(String chinaCurrentConfirmedCount) {
        this.chinaCurrentConfirmedCount = chinaCurrentConfirmedCount;
    }

    public String getChinaSuspectedCount() {
        return chinaSuspectedCount;
    }

    public void setChinaSuspectedCount(String chinaSuspectedCount) {
        this.chinaSuspectedCount = chinaSuspectedCount;
    }

    public String getOverseasInputCount() {
        return overseasInputCount;
    }

    public void setOverseasInputCount(String overseasInputCount) {
        this.overseasInputCount = overseasInputCount;
    }

    public String getChinaConfirmedCount() {
        return chinaConfirmedCount;
    }

    public void setChinaConfirmedCount(String chinaConfirmedCount) {
        this.chinaConfirmedCount = chinaConfirmedCount;
    }

    public String getChinaCuredCount() {
        return chinaCuredCount;
    }

    public void setChinaCuredCount(String chinaCuredCount) {
        this.chinaCuredCount = chinaCuredCount;
    }

    public String getChinaDeadCount() {
        return chinaDeadCount;
    }

    public void setChinaDeadCount(String chinaDeadCount) {
        this.chinaDeadCount = chinaDeadCount;
    }

    public String getForeignCurrentConfirmedCount() {
        return foreignCurrentConfirmedCount;
    }

    public void setForeignCurrentConfirmedCount(String foreignCurrentConfirmedCount) {
        this.foreignCurrentConfirmedCount = foreignCurrentConfirmedCount;
    }

    public String getForeignConfirmedCount() {
        return foreignConfirmedCount;
    }

    public void setForeignConfirmedCount(String foreignConfirmedCount) {
        this.foreignConfirmedCount = foreignConfirmedCount;
    }

    public String getForeignCuredCount() {
        return foreignCuredCount;
    }

    public void setForeignCuredCount(String foreignCuredCount) {
        this.foreignCuredCount = foreignCuredCount;
    }

    public String getForeignDeadCount() {
        return foreignDeadCount;
    }

    public void setForeignDeadCount(String foreignDeadCount) {
        this.foreignDeadCount = foreignDeadCount;
    }
}
