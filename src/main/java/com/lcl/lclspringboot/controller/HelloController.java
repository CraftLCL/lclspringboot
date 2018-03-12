package com.lcl.lclspringboot.controller;


import com.lcl.lclspringboot.dao.PrivilegeDao;
import com.lcl.lclspringboot.dao.RoleDao;
import com.lcl.lclspringboot.dao.UserDao;
import com.lcl.lclspringboot.model.Privilege;
import com.lcl.lclspringboot.model.Role;
import com.lcl.lclspringboot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Controller
public class HelloController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private PrivilegeDao privilegeDao;

    /**
     * 此类为spring security自带的密码加密类
     */
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @RequestMapping("/hello")
    @Transactional
    public String hello(Model model){
        /*User user=new User();
        String s="老李";
        user.setFirstName("李超靓");
        user.setEmail("1251777858@qq.com");
        userDao.save(user);
        List<User> users=userDao.findAll();
        User user1= users.get(0);
        model.addAttribute("user",user1);*/
        //User user=userDao.findByEmail("1251777858@qq.com");

        return "hello";
    }
    @RequestMapping("/create")
    public String create(){
        bCryptPasswordEncoder=new BCryptPasswordEncoder();
        Privilege readPrivilege=createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege=createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        List<Privilege> adminPrivileges= Arrays.asList(readPrivilege,writePrivilege);
        createRoleIfNotFound("ROLE_ADMIN",adminPrivileges);
        createRoleIfNotFound("ROLE_USER",Arrays.asList(readPrivilege));

        Role adminRole=roleDao.findByName("ROLE_ADMIN");
        User user=new User();
        user.setFirstName("老李");
        user.setLastName("Test");
        user.setPassword(bCryptPasswordEncoder.encode("test"));
        user.setEmail("test@test.com");
        user.setRoles(Arrays.asList(adminRole));
        user.setEnabled(true);
        userDao.save(user);
        return "create";
    }


    /**
     *  @ Transactional不能用于注释private方法，代理生成器会自动忽略它
     * @param name
     * @return
     */
    @Transactional
    public Privilege createPrivilegeIfNotFound(String name){
        Privilege privilege =privilegeDao.findByName(name);
        if (privilege==null){
            privilege=new Privilege();
            privilege.setName(name);
            privilegeDao.save(privilege);
        }
        return privilege;
    }
    @Transactional
    public Role createRoleIfNotFound(String name,Collection<Privilege> privileges){
        Role role=roleDao.findByName(name);
        if (role ==null){
            role=new Role();
            role.setName(name);
            role.setPrivileges(privileges);
            roleDao.save(role);
        }

        return role;

    }





}
