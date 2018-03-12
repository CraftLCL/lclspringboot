package com.lcl.lclspringboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;

@Configuration
@ComponentScan(basePackages = "com.lcl.lclspringboot")
@EnableWebMvc
public class MvcConfig extends WebMvcConfigurerAdapter{
    //    json转换
   /* @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter());
    }*/
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /**
         * 这里涉及到一个静态资源映射问题可以参考笔记
         */
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/login?error").setViewName("login");
        registry.addViewController("/logout");
        registry.addViewController("/test").setViewName("test");
        registry.addViewController("/login.html");
        registry.addViewController("/logoutSuccessUrl").setViewName("logoutSuccess");
    }

    /***
     * 解决response乱码的问题
     * @return
     */
    @Bean
    public HttpMessageConverter<String> responseBodyConverter(){
        StringHttpMessageConverter converter = new StringHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(new MediaType("text", "plain", Charset.forName("UTF-8"))));
        return converter;
    }
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        super.configureMessageConverters(converters);
        converters.add(responseBodyConverter());
        //converters.add(new MappingJackson2HttpMessageConverter());
    }
//    文件上传
   /* @Bean
    public MultipartResolver multipartResolver(){
        CommonsMultipartResolver bean=new CommonsMultipartResolver();
        bean.setDefaultEncoding("UTF-8");
        bean.setMaxUploadSize(8388608);
        return bean;
    }*/
}

