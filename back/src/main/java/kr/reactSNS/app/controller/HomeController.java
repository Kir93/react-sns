package kr.reactSNS.app.controller;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.mapper.TestMapper;

@RestController
public class HomeController {
	
	@Autowired TestMapper tm;
	
	@GetMapping("/api")
	public String hello(){
		return "안녕하세요. 현재 서버시간은 "+new Date() +"입니다. \n"; 
	}
	
	@RequestMapping("/test")
	public String home() {
		System.out.println("home");
		String result = tm.test();
		return result;
	}
}
