package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import kr.reactSNS.app.beans.FollowBean;
import kr.reactSNS.app.beans.PostBean;
import kr.reactSNS.app.beans.UserBean;

@Mapper
public interface UserMapper {

    @Select("select id from Users where userId=#{userId}")
    public Object checkUserId(String userId);

    @Select("SELECT u.*, GROUP_CONCAT(DISTINCT p.id) Post," + "GROUP_CONCAT(DISTINCT fing.followerId) Following, "
            + "GROUP_CONCAT(DISTINCT fer.followingId) Follower FROM Users AS u "
            + "LEFT JOIN Posts AS p ON (u.id = p.UserId) " + "LEFT JOIN Follow AS fing ON (u.id = fing.followingId) "
            + "LEFT JOIN Follow AS fer ON (u.id = fer.followerId) " + "WHERE u.id = #{id} AND p.delYn = N")
    public UserBean checkUser(int id);

    @Insert("INSERT INTO Users (userId, nickname, password) VALUE (#{userId}, #{nickname}, #{password})")
    public int signUp(UserBean ub);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src, "
    + "GROUP_CONCAT(DISTINCT l.userId) as Likers FROM Posts AS p "
    + "JOIN Users AS u ON (p.UserId = u.id) "
    + "LEFT JOIN Images AS i ON (p.id = i.PostId) "
    + "LEFT JOIN `Like` AS l ON (p.id = l.PostId) "
    + "${where} "
    + "GROUP BY p.id ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadUserPosts(int id, String where);

    @Insert("INSERT INTO Follow (followingId, followerId) VALUE (#{followingId}, #{followerId})")
    public int Follow(int followingId, int followerId);

    @Delete("DELETE FROM Follow WHERE followingId = #{followingId} AND followerId = #{followerId}")
    public int Unfollow(int followingId, int followerId);

    @Delete("DELETE FROM Follow WHERE followerId = #{followerId} AND followingId = #{followingId}")
    public int RemoveFollower(int followerId, int followingId);
    
    @Select("SELECT f.followingId AS id, u.nickname FROM Follow f JOIN Users u ON(f.followingId=u.id) WHERE f.followerId=#{id} LIMIT #{limit} OFFSET #{offset}")
    public Collection<FollowBean> LoadFollowers(int id, int offset, int limit);

    @Select("SELECT f.followerId AS id, u.nickname FROM Follow f JOIN Users u ON(f.followerId=u.id) WHERE f.followingId=#{id} LIMIT #{limit} OFFSET #{offset}")
    public Collection<FollowBean> LoadFollowings(int id, int offset, int limit);

    @Update("UPDATE Users SET nickname=#{nickname} WHERE id=#{id}")
    public boolean EditNickname(String nickname, int id);
}