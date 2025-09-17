package com.java.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.java.main.entites.User;

public interface UserRepository extends JpaRepository<User, String>{

	Optional<User> findByEmail(String email);
}
