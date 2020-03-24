package top.warmj.covid19_DataV.service.impl;

import org.springframework.stereotype.Service;
import top.warmj.covid19_DataV.dao.UserDao;
import top.warmj.covid19_DataV.domain.User;
import top.warmj.covid19_DataV.service.UserService;

import javax.annotation.Resource;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public User findUserByid(int id) {
        return userDao.findUserById(id);
    }
}
