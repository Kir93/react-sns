package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.Beans.UserBean;

@Mapper
public interface UserMapper {

    @Select("select id from Users where userId=#{userId}")
    public int checkUserId(String userId);

    @Select("select * from Users where userId=#{userId}")
    public UserBean checkUser(String userId);

    @Insert("insert into Users (userId, nickname, password) value (#{userId}, #{nickname}, #{password})")
    public int signUp(UserBean ub);
}