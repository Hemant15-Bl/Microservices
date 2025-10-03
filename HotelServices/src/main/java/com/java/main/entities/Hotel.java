package com.java.main.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "NHotel")
public class Hotel {
	@Id
	@Column
	private String hotelId;
	@Column
	private String name;
	@Column
	private String imageName;
	@Column
	private String location;
	@Column
	private String about;

	
	
}
