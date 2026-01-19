package com.java.main.config;

import java.net.InetSocketAddress;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {

	@Bean
	public KeyResolver userKeyResolver() {
		return exchange ->{
			Mono<String> principalMono =  exchange.getPrincipal().map(principal -> principal.getName());
			
//			return principalMono.switchIfEmpty(Mono.just(exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()));
			return principalMono.switchIfEmpty(Mono.defer(() -> {
				InetSocketAddress remoteAddress = exchange.getRequest().getRemoteAddress();
				
				if (remoteAddress != null) {
					return Mono.just(remoteAddress.getAddress().getHostAddress());
				}else {
					System.err.println("Warning: Remote address is null. Using fallback rate limit key.");
					return Mono.just("anonymous-fallback");
				}
			}));
		};
	}
}
