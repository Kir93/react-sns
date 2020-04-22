package kr.reactSNS.app.Beans;

public class UserBean {
    int id;
    String nickname;
    String userId;
    String password;
    String delYn;
    String createdAt;
    String updatedAt;
    String[] Posts;
    String[] Followings;
    String[] Followers;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String[] getPosts() {
        return Posts;
    }

    public void setPosts(String posts) {
        Posts = posts.split(",");
    }

    public String[] getFollowings() {
        return Followings;
    }

    public void setFollowings(String followings) {
        Followings = followings.split(",");
    }

    public String[] getFollowers() {
        return Followers;
    }

    public void setFollowers(String followers) {
        Followers = followers.split(",");
    }

}