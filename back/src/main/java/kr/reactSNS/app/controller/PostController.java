package kr.reactSNS.app.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    public Object Post(@RequestBody PostBean pb) {
        // try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            int x = 0;
            while (matcher.find()) {
                hashtags[x] = matcher.group(0).substring(1).toLowerCase();
                // int hashtagsId = pm.CheckHashtag(hashtags[x]);
                // if(hashtagsId != 0){
                //     pm.InsertHashtag(hashtags[x]);
                //     System.out.println(hashtags[x]);
                // }
                x++;
            }

            // int result = pm.addPost(pb);
            // System.out.println(result);
            return 0;
        // } catch (Exception e) {
        //     System.out.println(e);
        //     return e;
    }
}
