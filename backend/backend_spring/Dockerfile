# Usa una imagen base de Java
FROM openjdk:17-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR de la aplicación al contenedor
COPY target/backend_spring-0.0.1-SNAPSHOT.jar inventomate.jar

# Copia el archivo keystore.p12 al contenedor
COPY keystore.p12 keystore.p12

# Expone el puerto HTTPS en el que la aplicación se ejecuta
EXPOSE 8443

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "inventomate.jar"]