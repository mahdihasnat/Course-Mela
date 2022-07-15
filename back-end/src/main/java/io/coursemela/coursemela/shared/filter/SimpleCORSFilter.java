//package io.coursemela.coursemela.shared.filter;
//
//import java.io.IOException;
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Component
//public class SimpleCORSFilter extends OncePerRequestFilter {
//
//    private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);
//
//    public SimpleCORSFilter() {
//        log.info("SimpleCORSFilter init");
//    }
//
////    @Override
////    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
////
////        HttpServletRequest request = (HttpServletRequest) req;
////        HttpServletResponse response = (HttpServletResponse) res;
////        log.info(request.getHeader("Origin"));
////
////    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        log.error(request.getHeader("Origin"));
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
//
//        filterChain.doFilter(request, response);
//    }
//
//
//
//}