package com.java.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.main.entites.ActivityLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long>{

	List<ActivityLog> findTop10ByOrderByTimestampDesc();
}
