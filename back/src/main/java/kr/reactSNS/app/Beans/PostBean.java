package kr.reactSNS.app.beans;

import java.util.List;
import java.util.Map;

public class PostBean {
    int id;
    String content;
    String delYn;
    String createdAt;
    String updatedAt;
    int UserId;
    int RetweetId;
    String nickname;
    List<String> images;
    String[] src;
    String[] likers;
    Map<String, Object> retweet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) {
        UserId = userId;
    }

    public int getRetweetId() {
        return RetweetId;
    }

    public void setRetweetId(int retweetId) {
        RetweetId = retweetId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String[] getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src.split(",");
    }

    public String[] getLikers() {
        return likers;
    }

    public void setLikers(String likers) {
        this.likers = likers.split(",");
    }

    public Map<String, Object> getRetweet() {
        return retweet;
    }

    public void setRetweet(Map<String, Object> retweet) {
        this.retweet = retweet;
    }

}