package com.java.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.main.entities.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, String>{

}
