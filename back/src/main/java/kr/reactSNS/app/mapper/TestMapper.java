package kr.reactSNS.app.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface TestMapper {
	
	@Select("select '접속 성공' as msg")
	public String test();
}
