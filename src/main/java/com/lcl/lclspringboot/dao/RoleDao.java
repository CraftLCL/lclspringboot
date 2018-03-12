package com.lcl.lclspringboot.dao;

import com.lcl.lclspringboot.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role,Long>{
    Role findByName(String name);
}
