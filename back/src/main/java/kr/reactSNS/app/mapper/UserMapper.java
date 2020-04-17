package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select id from Users where userId=#{userId}")
    public String checkUserId(int userId);
}