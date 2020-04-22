package kr.reactSNS.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostMapper pm;

    @PostMapping("/")
    public int Post(PostBean pb) {
        return pm.addPost(pb);
    }
}