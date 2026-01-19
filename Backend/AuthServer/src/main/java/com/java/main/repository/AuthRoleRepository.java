package com.java.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.main.externalServices.Role;

public interface AuthRoleRepository extends JpaRepository<Role, Integer>{

	Optional<Role> findByName(String name);
}
