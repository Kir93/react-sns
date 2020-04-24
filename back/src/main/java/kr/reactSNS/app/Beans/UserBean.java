package kr.reactSNS.app.Beans;

public class UserBean {
    int id;
    String nickname;
    String userId;
    String password;
    String delYn;
    String createdAt;
    String updatedAt;
    String[] Post;
    String[] Following;
    String[] Follower;
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
        return Post;
    }

    public void setPost(String post) {
        Post = post.split(",");
    }

    public String[] getFollowing() {
        return Following;
    }

    public void setFollowing(String following) {
        Following = following.split(",");
    }

    public String[] getFollower() {
        return Follower;
    }

    public void setFollower(String follower) {
        Follower = follower.split(",");
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