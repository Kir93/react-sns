package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.PostBean;
import kr.reactSNS.app.Beans.UserBean;

@Mapper
public interface UserMapper {

    @Select("select id from Users where userId=#{userId}")
    public Object checkUserId(String userId);

    @Select("SELECT u.*, GROUP_CONCAT(DISTINCT p.id) Post," + "GROUP_CONCAT(DISTINCT fing.followerId) Following,"
            + "GROUP_CONCAT(DISTINCT fer.followingId) Follower FROM Users AS u "
            + "JOIN Posts AS p ON (u.id = p.UserId) " + "JOIN Follow AS fing ON (u.id = fing.followingId) "
            + "JOIN Follow AS fer ON (u.id = fer.followerId) " + "WHERE u.id = #{id}")
    public UserBean checkUser(int id);

    @Insert("insert into Users (userId, nickname, password) value (#{userId}, #{nickname}, #{password})")
    public int signUp(UserBean ub);

    @Select("SELECT p.*, u.nickname, GROUP_CONCAT(DISTINCT i.src) as src FROM Posts AS p JOIN Users AS u ON (p.UserId = u.id) LEFT JOIN Images AS i ON (p.id = i.PostId) WHERE u.id=#{id} GROUP BY p.id ORDER BY p.createdAt DESC")
    public Collection<PostBean> LoadUserPosts(int id);
}