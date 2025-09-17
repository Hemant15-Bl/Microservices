package com.java.main.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		//get token
		String requestHeader = request.getHeader("Authorization");
		
		logger.info("Header : {}",requestHeader);
		
		String username = null;
		String token = null;
		
		if(requestHeader!=null && requestHeader.startsWith("Bearer")) {
			token = requestHeader.substring(7);
			
			try {
				username = this.jwtTokenHelper.getUsernameFromToken(token);
			}catch (IllegalArgumentException e) {
				logger.info("Enable to getjwt token!!");
				e.printStackTrace();
			}catch (ExpiredJwtException e) {
				logger.info("Jwt token is expired!!");
				e.printStackTrace();
			}catch (MalformedJwtException e) {
				logger.info("Invalid jwt token!!");
				e.printStackTrace();
			}
			
		}else {
			logger.info("Invalid header value!!");
		}
		
		//Once we get token,
		//Now we can provide Validation or get user details
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			String usernameFromToken = this.jwtTokenHelper.getUsernameFromToken(token);
			
			 List<GrantedAuthority> authorities = new ArrayList<>();
			if (this.jwtTokenHelper.validateToken(token)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(usernameFromToken,null, List.of());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}else {
				logger.info("Invalid jwt token!! from hotel");
			}
		}
		
		filterChain.doFilter(request, response);
	}

}
