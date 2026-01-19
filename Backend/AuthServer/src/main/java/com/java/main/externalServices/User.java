package com.java.main.externalServices;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.java.main.dto.RatingDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "NAuthUser")
public class User implements UserDetails{
	
	@Id
	@Column
	private String userId;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String password;
	@Column
	private String contactNo;
	@Column
	private String address;

	@Column
	private String imageName;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"), inverseJoinColumns = @JoinColumn(name = "role", referencedColumnName = "id"))
	private Set<Role> roles = new HashSet<>();

	@Transient 
	  private List<RatingDto> rating = new ArrayList<RatingDto>();
	 
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = this.roles.stream()
				.map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
	    return true; // Or return a field from your entity
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true; // Or return a field from your entity
	}

	@Override
	public boolean isCredentialsNonExpired() {
	    return true; // Or return a field from your entity
	}

	@Override
	public boolean isEnabled() {
	    return true; // Or return a field from your entity
	}
	
	@Override
	public String getUsername() {
		return this.getEmail();
	}
	
	@Override
	public String getPassword() { // This one might be required if not generated/correct
	    return this.password;
	}
}
