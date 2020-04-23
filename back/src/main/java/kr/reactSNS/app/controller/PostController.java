package kr.reactSNS.app.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/post/*")
public class PostController {

    @Autowired
    private PostMapper pm;

    @PostMapping("/")
    public PostBean Post(@RequestBody PostBean pb, HttpSession session) {
        try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            int x = 0;
            int userId = (int) session.getAttribute("rslc");
            pb.setUserId(userId);
            pm.AddPost(pb);
            int postId = pb.getId();
            int hashtagId;
            while (matcher.find()) {
                hashtags[x] = matcher.group(0).substring(1).toLowerCase();
                System.out.println(hashtags[x]);
                hashtagId = pm.CheckHashtag(hashtags[x]);
                System.out.println(hashtagId);
                if (hashtagId == 0) {
                    System.out.println("들어옴");
                    Object test = pm.InsertHashtag(hashtags[x]);
                    System.out.println(test);
                    System.out.println(hashtags[x]);
                }
                System.out.println(postId);
                System.out.println(hashtagId);
                pm.AddPostHashtag(postId, hashtagId);
                x++;
            }
            PostBean newPost = pm.SelectPost(postId);
            return newPost;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
