package com.lcl.lclspringboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("u").password("p").roles("USER");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                    .antMatchers("/login*").anonymous()
                    .antMatchers("/css/**", "/js/**","/images/**", "/webjars/**", "**/favicon.ico","/fonts/**","/font-awesome/**","/img/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    //注意这里一定不能使用loginPage("/login.html")因为这个默认为登陆路径就会出现"/login"反复转跳login.html的情况
                    .loginPage("/login").defaultSuccessUrl("/index")
                    //.failureUrl("/login?error")
                    .permitAll()
                    .and()
                .logout()
                    .logoutSuccessUrl("/login")
                    .permitAll();
    }
}
