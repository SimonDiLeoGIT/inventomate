package com.inventoMate.dtos.roles;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RolToUserDTO {

	@NotBlank(message = "You must specify the role id")
	String rolId;
	@NotBlank(message = "You must specify the user id")
	String userId;

}
