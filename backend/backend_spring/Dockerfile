# Usa una imagen base de Java
FROM openjdk:17-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el script de inicialización y el archivo JAR de la aplicación al contenedor
COPY target/backend_spring-0.0.1-SNAPSHOT.jar inventomate.jar

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 8080

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "inventomate.jar"]