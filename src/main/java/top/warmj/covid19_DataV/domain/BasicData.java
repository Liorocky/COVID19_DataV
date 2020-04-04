package top.warmj.covid19_DataV.domain;


import java.sql.Timestamp;

public class BasicData {

  private String chinaConfirmedCount;
  private String chinaCuredCount;
  private String chinaDeadCount;
  private String overseas;
  private java.sql.Timestamp updateTime;

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

  public String getOverseas() {
    return overseas;
  }

  public void setOverseas(String overseas) {
    this.overseas = overseas;
  }

  public Timestamp getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Timestamp updateTime) {
    this.updateTime = updateTime;
  }
}
