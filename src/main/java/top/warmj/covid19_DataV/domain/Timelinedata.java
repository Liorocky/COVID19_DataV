package top.warmj.covid19_DataV.domain;

import java.sql.Timestamp;

public class Timelinedata {

  private String confirmedCount;
  private String currentConfirmedCount;
  private String suspectedCount;
  private String graveCount;
  private String deadCount;
  private String curedCount;
  private java.sql.Timestamp updateTime;


  public String getConfirmedCount() {
    return confirmedCount;
  }

  public void setConfirmedCount(String confirmedCount) {
    this.confirmedCount = confirmedCount;
  }


  public String getCurrentConfirmedCount() {
    return currentConfirmedCount;
  }

  public void setCurrentConfirmedCount(String currentConfirmedCount) {
    this.currentConfirmedCount = currentConfirmedCount;
  }


  public String getSuspectedCount() {
    return suspectedCount;
  }

  public void setSuspectedCount(String suspectedCount) {
    this.suspectedCount = suspectedCount;
  }


  public String getGraveCount() {
    return graveCount;
  }

  public void setGraveCount(String graveCount) {
    this.graveCount = graveCount;
  }


  public String getDeadCount() {
    return deadCount;
  }

  public void setDeadCount(String deadCount) {
    this.deadCount = deadCount;
  }


  public String getCuredCount() {
    return curedCount;
  }

  public void setCuredCount(String curedCount) {
    this.curedCount = curedCount;
  }

  public Timestamp getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Timestamp updateTime) {
    this.updateTime = updateTime;
  }
}
