package top.warmj.covid19_DataV.dao;

import top.warmj.covid19_DataV.domain.User;

public interface UserDao {

    User findUserById(int id);
}
