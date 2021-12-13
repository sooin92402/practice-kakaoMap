package study.kakaomap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class showMapController {
    @GetMapping(value = "/show")
    public String show(){
        return "map";
    }
}
