package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.HashtagBean;
import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.HashtagMapper;

@RestController
@RequestMapping("/api/hashtag/*")
public class HashtagController {

    @Autowired
    HashtagMapper hm;

    @GetMapping("/{tag}")
    public Object hashtagPosts(@PathVariable String tag) {
        try {
            HashtagBean hb = hm.CheckHashtag(tag);
            Collection<PostBean> loadHashtagPosts = hm.LoadHashtagPosts(hb.getId());
            return loadHashtagPosts;
        } catch (Exception e) {
            System.err.println(e);
            return e;
        }
    }
}