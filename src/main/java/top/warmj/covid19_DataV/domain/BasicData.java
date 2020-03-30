package top.warmj.covid19_DataV.domain;


public class BasicData {

  private String chinaConfirmedCount;
  private String chinaCurrentConfirmedCount;
  private String chinaSuspectedCount;
  private String chinaGraveCount;
  private String chinaDeadCount;
  private String chinaCuredCount;
  private java.sql.Timestamp time;

  public String getChinaConfirmedCount() {
    return chinaConfirmedCount;
  }

  public void setChinaConfirmedCount(String chinaConfirmedCount) {
    this.chinaConfirmedCount = chinaConfirmedCount;
  }


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


  public String getChinaGraveCount() {
    return chinaGraveCount;
  }

  public void setChinaGraveCount(String chinaGraveCount) {
    this.chinaGraveCount = chinaGraveCount;
  }


  public String getChinaDeadCount() {
    return chinaDeadCount;
  }

  public void setChinaDeadCount(String chinaDeadCount) {
    this.chinaDeadCount = chinaDeadCount;
  }


  public String getChinaCuredCount() {
    return chinaCuredCount;
  }

  public void setChinaCuredCount(String chinaCuredCount) {
    this.chinaCuredCount = chinaCuredCount;
  }


  public java.sql.Timestamp getTime() {
    return time;
  }

  public void setTime(java.sql.Timestamp time) {
    this.time = time;
  }

}
