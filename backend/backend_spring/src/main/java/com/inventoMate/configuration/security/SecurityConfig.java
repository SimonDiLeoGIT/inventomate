package com.inventoMate.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import com.inventoMate.configuration.auth0.OktaOauth2Properties;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

	private final OktaOauth2Properties oktaOauth2Properties;

	private final AuthenticationErrorHandler authenticationErrorHandler;

	@Bean
	public SecurityFilterChain httpSecurity(final HttpSecurity http) throws Exception {
		return http
				.authorizeHttpRequests(authz -> authz
						// roles
						.requestMatchers(HttpMethod.GET, "/api/roles/**").hasAuthority("read:roles")
						.requestMatchers(HttpMethod.PUT, "/api/roles/**").hasAuthority("assign:roles-to-user")
						// users
						.requestMatchers("api/users/create").hasAuthority("create:user")
						.requestMatchers("api/users/**").authenticated()
						// empresas
						.requestMatchers("api/empresas/profile").hasAuthority("read:company-owner")
						.requestMatchers("api/empresas/edit").hasAuthority("edit:company")
						.requestMatchers("api/empresas/delete").hasAnyAuthority("delete:company")
						.requestMatchers("api/empresas/create").authenticated()
						// sucursales
						.requestMatchers("api/sucursales/create").hasAnyAuthority("edit:company")
						.requestMatchers("api/sucursales/{idSucursal}/edit").hasAuthority("edit:company")
						.requestMatchers(HttpMethod.GET, "api/sucursales/{idSucursal}").hasAuthority("read:company-owner")
						.requestMatchers(HttpMethod.PUT, "api/sucursales/{idSucursal}").hasAuthority("edit:company")
						.requestMatchers(HttpMethod.DELETE, "api/sucursales/{idSucursal}").hasAnyAuthority("edit:company")
						.requestMatchers("api/sucursales/{idSucursal}/invite/**").hasAuthority("assign:roles-to-user")
						.requestMatchers("api/sucursales/{idSucursal}/users/{idUsuario}/roles/{idsRol}/edit").hasAuthority("assign:roles-to-user")
						.requestMatchers("api/sucursales/{idSucursal}/users/{idUsuario}/roles").hasAuthority("read:roles")
						.requestMatchers("api/sucursales/{idSucursal}/users/{idUsuario}/delete").hasAuthority("edit:company")
						// bd empresa
						.requestMatchers("api/bd-empresa/**").hasAuthority("edit:company")
						// proyeccion de ventas
						.requestMatchers(HttpMethod.POST, "api/informes/proyeccion-de-ventas/{idSucursal}").hasAuthority("decide:sales-reports")
						.requestMatchers(HttpMethod.GET, "api/informes/proyeccion-de-ventas/{idSucursal}").hasAuthority("read:sales-reports")
						.requestMatchers(HttpMethod.GET, "api/informes/proyeccion-de-ventas/{idInforme}/sucursales/{idSucursal}").hasAuthority("read:sales-reports")
						// tendencias
						.requestMatchers(HttpMethod.POST, "api/informes/tendencias/{idSucursal}").hasAuthority("decide:trend-information")
						.requestMatchers(HttpMethod.GET, "api/informes/tendencias/{idSucursal}").hasAuthority("read:trend-information")
						.requestMatchers(HttpMethod.GET, "api/informes/tendencias/{idInforme}/sucursales/{idSucursal}").hasAuthority("read:trend-information")
						// otros
						.anyRequest().permitAll()
						)
				.cors(Customizer.withDefaults())
				.oauth2ResourceServer(
						oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(makePermissionsConverter()))
								.authenticationEntryPoint(authenticationErrorHandler))
				.build();
	}

	@Bean
	JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(oktaOauth2Properties.getIssuer());

		OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(oktaOauth2Properties.getAudience());
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(oktaOauth2Properties.getIssuer());
		OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

		jwtDecoder.setJwtValidator(withAudience);

		return jwtDecoder;
	}

	private JwtAuthenticationConverter makePermissionsConverter() {
		final var jwtAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
		jwtAuthoritiesConverter.setAuthoritiesClaimName("permissions");
		jwtAuthoritiesConverter.setAuthorityPrefix("");

		final var jwtAuthConverter = new JwtAuthenticationConverter();
		jwtAuthConverter.setJwtGrantedAuthoritiesConverter(jwtAuthoritiesConverter);

		return jwtAuthConverter;
	}
}