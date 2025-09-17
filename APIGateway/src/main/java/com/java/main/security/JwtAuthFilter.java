package com.java.main.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;

@Component
public class JwtAuthFilter implements GatewayFilterFactory<JwtAuthFilter.Config>{

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Override
	public Class<Config> getConfigClass() {
	    return Config.class;
	}

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7); // Remove "Bearer "
            if (!this.jwtTokenHelper.validateToken(token)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            Claims claims = this.jwtTokenHelper.getAllClaimsFromToken(token);
            String userId = claims.getSubject();
            String role = claims.get("role", String.class);

            // Add userId and role to header and continue the request
            ServerHttpRequest modifiedRequest = request.mutate()
                    .header("X-User-Id", userId)
                    .header("X-User-Role", role)
                    .build();

            ServerWebExchange modifiedExchange = exchange.mutate().request(modifiedRequest).build();

            return chain.filter(modifiedExchange);
        };
    }

    public static class Config {
        // Add config fields if needed later
    }
}
