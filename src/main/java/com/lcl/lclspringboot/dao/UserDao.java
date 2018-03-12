package com.lcl.lclspringboot.dao;


import com.lcl.lclspringboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Long> {
    /*这里涉及到SpringDataJpa的相关知识，数据访问层是只有接口没有实现的，具体可以参考笔记
    同时笔记中有使用spring自带的page进行分页的相关资料*/
    User findByEmail(String email);
}
