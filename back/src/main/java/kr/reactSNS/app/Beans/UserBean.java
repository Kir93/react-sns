package kr.reactSNS.app.Beans;

public class UserBean {
    int id;
    String nickname;
    String userId;
    String password;
    String delYn;
    String createdAt;
    String updatedAt;
    String[] post;
    String[] following;
    String[] follower;
    int Posts;
    int Followings;
    int Followers;

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

    public String[] getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post.split(",");
    }

    public String[] getFollowing() {
        return following;
    }

    public void setFollowing(String following) {
        this.following = following.split(",");
    }

    public String[] getFollower() {
        return follower;
    }

    public void setFollower(String follower) {
        this.follower = follower.split(",");
    }

    public int getPosts() {
        return Posts;
    }

    public void setPosts(int posts) {
        Posts = posts;
    }

    public int getFollowings() {
        return Followings;
    }

    public void setFollowings(int followings) {
        Followings = followings;
    }

    public int getFollowers() {
        return Followers;
    }

    public void setFollowers(int followers) {
        Followers = followers;
    }

}