package com.java.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.main.entites.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{

	Optional<Role> findByName(String name);
}
