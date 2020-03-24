package top.warmj.covid19_DataV.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.warmj.covid19_DataV.domain.User;
import top.warmj.covid19_DataV.service.UserService;

import javax.annotation.Resource;

@Controller
@RequestMapping("")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping("findUser")
    @ResponseBody
    public User findUser() {
        int id = 123;
        User user = userService.findUserByid(id);
        user.setName("李四");
        return user;
    }
}
