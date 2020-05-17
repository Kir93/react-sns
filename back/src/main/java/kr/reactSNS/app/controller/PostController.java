package kr.reactSNS.app.controller;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
// import java.io.File; //개발환경
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.reactSNS.app.beans.CommentBean;
import kr.reactSNS.app.beans.HashtagBean;
import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.mapper.CommentMapper;
import kr.reactSNS.app.mapper.HashtagMapper;
import kr.reactSNS.app.mapper.PostMapper;

@RestController
@RequestMapping("/api/post/*")
public class PostController {

    @Autowired
    private PostMapper pm;
    @Autowired
    private HashtagMapper hm;

    @Autowired
    private CommentMapper cm;

    @PostMapping("/")
    public ResponseEntity<Object> Post(@RequestBody PostBean pb, HttpSession session) {
        try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            int x = 0;
            Object userId = session.getAttribute("rslc");
            List<String> images = pb.getImages();
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            pb.setUserId((int) userId);
            pm.AddPost(pb);
            int postId = pb.getId();
            for (int i = 0; i < images.size(); i++) {
                pm.InsertImage(images.get(i), postId);
            }
            while (matcher.find()) {
                hashtags[x] = matcher.group(0).substring(1).toLowerCase();
                HashtagBean hb = hm.CheckHashtag(hashtags[x]);
                hb.setName(hashtags[x]);
                if (hb.getId() == 0) {
                    pm.InsertHashtag(hb);
                }
                pm.AddPostHashtag(postId, hb.getId());
                x++;
            }
            PostBean newPost = pm.SelectPost(postId);
            return ResponseEntity.ok(newPost);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> RemovePost(@PathVariable int id){
        try {
            PostBean post = pm.SelectPost(id);
            if (post == null) {
                return ResponseEntity.status(401).body("존재하지 않는 포스트입니다.");
            }
            pm.RemovePost(id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> EditPost(@PathVariable int id, @RequestBody PostBean pb, HttpSession session) {
        try {
            final String regex = "#[^\\s]+";
            final String string = pb.getContent();
            final Pattern pattern = Pattern.compile(regex);
            final Matcher matcher = pattern.matcher(string);
            int size = pb.getContent().split("#").length;
            String[] hashtags = new String[size];
            Object userId = session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            pb.setUserId((int) userId);
            pm.EditPost(string, id);
            List<String> oldImages = pm.SelectImages(id);
            List<String> images = pb.getImages();
            for (int i = 0; i < images.size(); i++) {
                for (int j = 0; j < oldImages.size(); j++){
                    if(images.get(i).equals(oldImages.get(j))){
                        oldImages.remove(j);
                        break;
                    }
                }
                if(pm.SelectImage(images.get(i)) == null){
                    pm.InsertImage(images.get(i), id);
                }
            }
            for(int i = 0; i< oldImages.size(); i++){
                pm.DeleteImage(oldImages.get(i), id);
            }
            int x = 0;
            while (matcher.find()) {
                hashtags[x] = matcher.group(0).substring(1).toLowerCase();
                HashtagBean hb = hm.CheckHashtag(hashtags[x]);
                hb.setName(hashtags[x]);
                if (hb.getId() == 0) {
                    pm.InsertHashtag(hb);
                }
                if(hm.CheckPostHashtag(hb.getId(), id) == null){
                    pm.AddPostHashtag(id, hb.getId());
                }
                x++;
            }
            PostBean newPost = pm.SelectPost(id);
            return ResponseEntity.ok(newPost);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<Object> LoadComments(@PathVariable int id) {
        try {
            PostBean post = pm.SelectPost(id);
            if (post == null) {
                return ResponseEntity.status(401).body("존재하지 않는 포스트입니다.");
            }
            Collection<CommentBean> comments = cm.LoadComments(id);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Object> AddComment(@RequestBody CommentBean cb, @PathVariable int id, HttpSession session) {
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            PostBean post = pm.SelectPost(id);
            if (post == null) {
                return ResponseEntity.status(403).body("존재하지 않는 포스트입니다.");
            }
            cb.setUserId((int) userId);
            cb.setPostId(id);
            cm.AddComment(cb);
            CommentBean comment = cm.LoadComment(cb);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    private AmazonS3 s3Client;

    @PostConstruct
    public void setS3Client() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

            s3Client = AmazonS3ClientBuilder.standard()
                        .withCredentials(new AWSStaticCredentialsProvider(credentials))
                        .withRegion(this.region)
                        .build();

    }

    @PostMapping("/images")
    public ResponseEntity<Object> AddImages(@RequestParam("image") List<MultipartFile> images,
            HttpServletRequest request) {
        try {
            List<String> list = new ArrayList<String>();
            // String baseDir = System.getProperty("user.dir") + "/back/src/main/resources/static/uploads/"; // 개발환경
            for (MultipartFile image : images) {
                byte[] bytes = IOUtils.toByteArray(image.getInputStream());
                ObjectMetadata objmeta = new ObjectMetadata();
                objmeta.setContentType(image.getContentType());
                objmeta.setContentLength(bytes.length);
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

                String ext = FilenameUtils.getExtension(image.getOriginalFilename());
                if(ext =="png" || ext == "jpg" || ext == "jpeg"){
                    String basename = FilenameUtils.getBaseName(image.getOriginalFilename()) + new Date().getTime();
                    String newFile = basename + "." + ext;
                    s3Client.putObject(new PutObjectRequest(bucket, newFile, byteArrayInputStream, objmeta));
                    // File dest = new File(baseDir + basename + "." + ext); // 개발환경
                    // image.transferTo(dest); // 개발환경
                    list.add(s3Client.getUrl(bucket, newFile).toString());
                }else{
                    return ResponseEntity.status(403).body("JPG나 PNG 파일을 등록하세요");
                }
            }
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Object> LikePost(@PathVariable int postId, HttpSession session) {
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            PostBean post = pm.SelectPost(postId);
            if (post == null) {
                return ResponseEntity.status(403).body("존재하지 않는 포스트입니다.");
            }
            pm.InsertLike(postId, (int) userId);
            return ResponseEntity.ok(userId);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<Object> UnlikePost(@PathVariable int postId, HttpSession session) {
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            PostBean post = pm.SelectPost(postId);
            if (post == null) {
                return ResponseEntity.status(403).body("존재하지 않는 포스트입니다.");
            }
            pm.UnLike(postId, (int) userId);
            return ResponseEntity.ok(userId);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }

    @PostMapping("/{postId}/retweet")
    public ResponseEntity<Object> Retweet(@PathVariable int postId, HttpSession session) {
        try {
            Object userId = (Object) session.getAttribute("rslc");
            if (userId == null) {
                return ResponseEntity.status(403).body("로그인 후 이용하세요.");
            }
            PostBean post = pm.SelectPost(postId);
            if (post == null) {
                return ResponseEntity.status(403).body("존재하지 않는 포스트입니다.");
            }
            if(post.getRetweetId() != 0){
                post.setRetweet(pm.SelectRetweetPost(post.getId()));
            }
            if ((int) userId == post.getUserId() || (post.getRetweet() != null && post.getRetweet().get("UserId").equals(userId))) {
                return ResponseEntity.status(403).body("자신의 포스트는 리트윗할 수 없습니다.");
            }
            int retweetTargetId = post.getRetweetId();
            if (retweetTargetId == 0) {
                retweetTargetId = post.getId();
            }
            Object exPost = pm.CheckRetweet((int) userId, retweetTargetId);
            if (exPost != null) {
                return ResponseEntity.status(403).body("이미 리트윗한 포스트입니다.");
            }
            post.setRetweetId(retweetTargetId);
            post.setUserId((int) userId);
            pm.InsertRetweet(post);
            int retweetPostId = post.getId();
            PostBean retweetPost = pm.SelectPost(retweetPostId);
            retweetPost.setRetweet(pm.SelectRetweetPost(retweetPostId));
            if(retweetPost.getRetweet().get("src") != null){
                PostBean setRetweetSrc = new PostBean();
                setRetweetSrc.setSrc((String) retweetPost.getRetweet().get("src"));
                retweetPost.getRetweet().put("src", setRetweetSrc.getSrc());
            }
            return ResponseEntity.ok(retweetPost);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(403).body(e);
        }
    }
}
