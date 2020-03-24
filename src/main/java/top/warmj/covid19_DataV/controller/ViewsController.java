package top.warmj.covid19_DataV.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 页面跳转
 */
@Controller
@RequestMapping("views")
public class ViewsController {

    @RequestMapping("mainView")
    public String mainView() {
        return "mainView";
    }
}
