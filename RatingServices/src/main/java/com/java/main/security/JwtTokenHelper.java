package com.java.main.security;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenHelper {

public static final long JWT_TOKEN_VALIDITY = Duration.ofHours(5).toMillis();
	
private final String SECRET_KEY = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf"; // Same secret as Auth Service

//public String extractUsername(String token) {
//    return Jwts.parser().setSigningKey(SECRET_KEY)
//               .parseClaimsJws(token)
//               .getBody().getSubject();
//}
//
//public boolean validateToken(String token) {
//    try {
//        Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//        return true;
//    } catch (Exception e) {
//        return false;
//    }
//}

Boolean validationToken(String token, UserDetails userDetails) {
	final String username = getUsernameFromToken(token);
	return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
}

public boolean validateToken(String token) {
	try {
		getAllClaimsFromToken(token); // throws if invalid
		return !isTokenExpired(token);
	} catch (JwtException e) {
		return false;
	}
}

private boolean isTokenExpired(String token) {
	final Date expiration = getExpirationDateFromToken(token);
	return expiration.before(new Date());
}

public Date getExpirationDateFromToken(String token) {
	return getClaimFromToken(token, Claims::getExpiration);
}

private Claims getAllClaimsFromToken(String token) {
	
	return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
}

public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
	final Claims claims = getAllClaimsFromToken(token);
	return claimsResolver.apply(claims);
}

public String getUsernameFromToken(String token) {
	return getClaimFromToken(token, Claims::getSubject);
}
}
