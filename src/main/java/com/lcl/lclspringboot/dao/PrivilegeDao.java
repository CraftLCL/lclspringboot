package com.lcl.lclspringboot.dao;

import com.lcl.lclspringboot.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeDao extends JpaRepository<Privilege,Long> {
    Privilege findByName(String name);
}
