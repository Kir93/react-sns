package kr.reactSNS.app.controller;

import java.util.Date;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.mapper.TestMapper;

@RestController
public class HomeController {

	@Autowired
	TestMapper tm;

	@GetMapping("/")
	public String hello() {
		Cookie c = new Cookie("test", "test");
		c.setMaxAge(3600);
		return "안녕하세요. 현재 서버시간은 " + new Date() + "입니다. \n";
	}

	// @GetMapping("/uploads/{path}")
	// public String ImageLoader(@PathVariable String path) {
	// return "/uploads/" + path;
	// }

	@RequestMapping("/test")
	public String home() {
		System.out.println("home");
		String result = tm.test();
		return result;
	}
}
