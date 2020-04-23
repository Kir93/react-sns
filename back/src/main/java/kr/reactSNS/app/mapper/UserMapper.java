package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.UserBean;

@Mapper
public interface UserMapper {

    @Select("select count(id) from Users where userId=#{userId}")
    public int checkUserId(String userId);

    @Select("SELECT u.*, GROUP_CONCAT(DISTINCT p.id) AS `Posts`, GROUP_CONCAT(DISTINCT fer.followingId) AS `Followings`, GROUP_CONCAT(DISTINCT fing.followerId) AS `Followers` FROM Users AS u JOIN Posts AS p ON (u.id = p.UserId) JOIN Follow AS fer ON (u.id = fer.followerId) JOIN Follow AS fing ON (u.id = fing.followingId) WHERE u.id = #{id}")
    public UserBean checkUser(int id);

    @Insert("insert into Users (userId, nickname, password) value (#{userId}, #{nickname}, #{password})")
    public int signUp(UserBean ub);
}