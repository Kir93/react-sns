package kr.reactSNS.app.mapper;

import java.util.Collection;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import kr.reactSNS.app.Beans.CommentBean;

public interface CommentMapper {

    @Insert("insert into Comments (content, UserId, PostId) value (#{content}, #{UserId}, #{PostId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int AddComment(CommentBean cb);

    @Select("SELECT c.*, u.nickname FROM Comments AS c JOIN Users AS u ON (c.UserId = u.id) WHERE c.id=#{id}")
    public CommentBean LoadComment(CommentBean cb);

    @Select("SELECT c.*, u.nickname FROM Comments AS c JOIN Users AS u ON (c.UserId = u.id) WHERE c.PostId=#{PostId} ORDER BY c.createdAt ASC")
    public Collection<CommentBean> LoadComments(int PostId);
}