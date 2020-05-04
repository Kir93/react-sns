package kr.reactSNS.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.mapper.HashtagMapper;

@RestController
@RequestMapping("/api/hashtag/*")
public class HashtagController {

    @Autowired
    HashtagMapper hm;

    @GetMapping("/{tag}")
    public ResponseEntity<Object> hashtagPosts(@PathVariable String tag) {
        try {
            HashtagBean hb = hm.CheckHashtag(tag);
            Collection<PostBean> loadHashtagPosts = hm.LoadHashtagPosts(hb.getId());
            return ResponseEntity.ok(loadHashtagPosts);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}