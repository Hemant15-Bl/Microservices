package com.java.main.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GatewayFilterFactory<JwtAuthFilter.Config>{

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	private Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);
	@Override
	public Class<Config> getConfigClass() {
	    return Config.class;
	}

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (request.getMethod() == HttpMethod.OPTIONS) {
            	logger.info("request HttpMethod>OPTION : {} ",request.getMethod());
                ServerHttpResponse response = exchange.getResponse();
                HttpHeaders headers = response.getHeaders();
                headers.add("Access-Control-Allow-Origin", "http://localhost:5173");
                headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                headers.add("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
                headers.add("Access-Control-Allow-Credentials", "true");
                response.setStatusCode(HttpStatus.OK);
                return response.setComplete();
            }

            // ✅ Allow public endpoints (fixing typo: /ap1 → /api)
            String path = request.getPath().value();
            if (path.startsWith("/api/v1/auth/")) {
                return chain.filter(exchange);
            }
            
            // Validation
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

            // Inject user info into headers
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
    
    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        HttpHeaders headers = response.getHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:5173");
        headers.add("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Credentials", "true");
        return response.setComplete();
    }
}
