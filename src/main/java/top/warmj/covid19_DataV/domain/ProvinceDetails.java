package top.warmj.covid19_DataV.domain;


public class ProvinceDetails {

  private String provinceName;
  private String provinceConfirmedCount;
  private String provinceSuspectedCount;
  private String provinceCuredCount;
  private String provinceDeadCount;
  private String cityName;
  private String cityConfirmedCount;
  private String citySuspectedCount;
  private String cityCuredCount;
  private String cityDeadCount;
  private String updateTime;

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

  public String getProvinceCuredCount() {
    return provinceCuredCount;
  }

  public void setProvinceCuredCount(String provinceCuredCount) {
    this.provinceCuredCount = provinceCuredCount;
  }

  public String getProvinceDeadCount() {
    return provinceDeadCount;
  }

  public void setProvinceDeadCount(String provinceDeadCount) {
    this.provinceDeadCount = provinceDeadCount;
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public String getCityConfirmedCount() {
    return cityConfirmedCount;
  }

  public void setCityConfirmedCount(String cityConfirmedCount) {
    this.cityConfirmedCount = cityConfirmedCount;
  }

  public String getCitySuspectedCount() {
    return citySuspectedCount;
  }

  public void setCitySuspectedCount(String citySuspectedCount) {
    this.citySuspectedCount = citySuspectedCount;
  }

  public String getCityCuredCount() {
    return cityCuredCount;
  }

  public void setCityCuredCount(String cityCuredCount) {
    this.cityCuredCount = cityCuredCount;
  }

  public String getCityDeadCount() {
    return cityDeadCount;
  }

  public void setCityDeadCount(String cityDeadCount) {
    this.cityDeadCount = cityDeadCount;
  }

  public String getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(String updateTime) {
    this.updateTime = updateTime;
  }
}
