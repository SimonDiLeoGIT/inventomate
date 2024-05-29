-- Crear tabla de sucursales
CREATE TABLE SUCURSAL (
    sucursal_id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de categorías
CREATE TABLE CATEGORIA (
    categoria_id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de productos
CREATE TABLE PRODUCTO (
    producto_id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100),
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id)
);

-- Crear tabla intermedia para la relación muchos a muchos entre sucursal y producto
CREATE TABLE sucursal_producto (
    sucursal_id INTEGER,
    producto_id INTEGER,
    stock INTEGER NOT NULL,
    precio_venta DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (sucursal_id, producto_id),
    FOREIGN KEY (sucursal_id) REFERENCES SUCURSAL(sucursal_id),
    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
);

-- Crear tabla de compras
CREATE TABLE compra (
    id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    sucursal_id INTEGER NOT NULL,
    fecha_hora TIMESTAMP,
    total DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (sucursal_id) REFERENCES SUCURSAL(sucursal_id)
);

-- Crear tabla de detalles de compra
CREATE TABLE detalle_compra (
    id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    compra_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_compra DOUBLE PRECISION NOT NULL,
    subtotal DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compra(id),
    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
);

-- Crear tabla de ventas
CREATE TABLE venta (
    id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    sucursal_id INTEGER NOT NULL,
    fecha_hora TIMESTAMP,
    total DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (sucursal_id) REFERENCES SUCURSAL(sucursal_id)
);

-- Crear tabla de detalles de venta
CREATE TABLE detalle (
    id SERIAL PRIMARY KEY, -- Usa SERIAL para autoincremento
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_venta DOUBLE PRECISION NOT NULL,
    subtotal DOUBLE PRECISION NOT NULL,
    promo INTEGER,
    FOREIGN KEY (venta_id) REFERENCES venta(id),
    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
);


-- Insertar datos en la tabla de sucursales (asumiendo que ya existen dos sucursales con ID 1 y 2)
INSERT INTO SUCURSAL (sucursal_id, nombre) VALUES 
(1, 'Sucursal A'),
(2, 'Sucursal B');

-- Insertar datos en la tabla de categorías (asumiendo que ya existen categorías con ID 1 y 2)
INSERT INTO CATEGORIA (categoria_id, nombre) VALUES 
(1, 'Notebooks'),
(2, 'iPhones');

-- Insertar productos (notebooks) en la tabla de productos
INSERT INTO PRODUCTO (producto_id, nombre, descripcion, categoria_id) VALUES 
(1, 'Notebook Dell XPS 13', 'Descripción del Dell XPS 13', 1),
(2, 'Notebook HP Spectre x360', 'Descripción del HP Spectre x360', 1),
(3, 'Notebook Lenovo ThinkPad X1 Carbon', 'Descripción del ThinkPad X1 Carbon', 1),
(4, 'Notebook Apple MacBook Pro', 'Descripción del MacBook Pro', 1),
(5, 'Notebook Asus ZenBook', 'Descripción del Asus ZenBook', 1),
(6, 'Notebook Microsoft Surface Laptop', 'Descripción del Surface Laptop', 1),
(7, 'Notebook Acer Swift 5', 'Descripción del Acer Swift 5', 1),
(8, 'Notebook Samsung Galaxy Book Flex', 'Descripción del Galaxy Book Flex', 1),
(9, 'Notebook Huawei MateBook X Pro', 'Descripción del MateBook X Pro', 1),
(10, 'Notebook LG Gram', 'Descripción del LG Gram', 1);

-- Insertar productos (iPhones) en la tabla de productos
INSERT INTO PRODUCTO (producto_id, nombre, descripcion, categoria_id) VALUES 
(11, 'iPhone 13 Pro', 'Descripción del iPhone 13 Pro', 2),
(12, 'iPhone 13', 'Descripción del iPhone 13', 2),
(13, 'iPhone 13 mini', 'Descripción del iPhone 13 mini', 2),
(14, 'iPhone 13 Pro Max', 'Descripción del iPhone 13 Pro Max', 2),
(15, 'iPhone 12 Pro', 'Descripción del iPhone 12 Pro', 2),
(16, 'iPhone 12', 'Descripción del iPhone 12', 2),
(17, 'iPhone 12 mini', 'Descripción del iPhone 12 mini', 2),
(18, 'iPhone 12 Pro Max', 'Descripción del iPhone 12 Pro Max', 2),
(19, 'iPhone SE', 'Descripción del iPhone SE', 2),
(20, 'iPhone 11', 'Descripción del iPhone 11', 2);

-- Insertar productos en la tabla intermedia sucursal_producto para cada sucursal
INSERT INTO sucursal_producto (sucursal_id, producto_id, stock, precio_venta)
SELECT s.sucursal_id, p.producto_id, 0, 0
FROM SUCURSAL s
CROSS JOIN PRODUCTO p
WHERE p.categoria_id IN (1, 2); -- Selección de productos de las categorías "notebooks" (ID 1) e "iPhones" (ID 2)

-- Insertar datos ficticios de ventas y detalles de ventas
WITH dates AS (
    SELECT generate_series(
        DATE_TRUNC('YEAR', CURRENT_DATE - INTERVAL '1 YEAR'),
        CURRENT_DATE,
        INTERVAL '1 day'
    )::DATE AS fecha
)
INSERT INTO venta (sucursal_id, fecha_hora, total)
SELECT 
    1 AS sucursal_id,
    fecha,
    CAST(random() * 1000 + 500 AS NUMERIC(10, 2)) AS total
FROM dates;

INSERT INTO detalle (venta_id, producto_id, cantidad, precio_venta, subtotal, promo)
SELECT
    v.id AS venta_id,
    sp.producto_id,
    ROUND(random() * 10) AS cantidad,
    CAST(random() * 500 + 500 AS NUMERIC(10, 2)) AS precio_venta,
    CAST(ROUND(random() * 10) * (random() * 500 + 500) AS NUMERIC(10, 2)) AS subtotal,
    FLOOR(random() * 101) AS promo -- Generar un nÃºmero entero entre 0 y 100
FROM venta v
CROSS JOIN sucursal_producto sp
WHERE v.sucursal_id = 1
AND v.fecha_hora BETWEEN DATE_TRUNC('YEAR', CURRENT_DATE - INTERVAL '1 YEAR') AND CURRENT_DATE;

-- Insertar datos ficticios de compras y detalles de compras
WITH dates AS (
    SELECT generate_series(
        DATE_TRUNC('YEAR', CURRENT_DATE - INTERVAL '1 YEAR'),
        CURRENT_DATE,
        INTERVAL '1 day'
    )::DATE AS fecha
)
INSERT INTO compra (sucursal_id, fecha_hora, total)
SELECT 
    1 AS sucursal_id,
    fecha,
    CAST(random() * 2000 + 1000 AS NUMERIC(10, 2)) AS total
FROM dates;

INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_compra, subtotal)
SELECT
    c.id AS compra_id,
    sp.producto_id,
    ROUND(random() * 20) AS cantidad,
    CAST(random() * 800 + 400 AS NUMERIC(10, 2)) AS precio_compra,
    CAST(ROUND(random() * 20) * (random() * 800 + 400) AS NUMERIC(10, 2)) AS subtotal
FROM compra c
CROSS JOIN sucursal_producto sp
WHERE c.sucursal_id = 1
AND c.fecha_hora BETWEEN DATE_TRUNC('YEAR', CURRENT_DATE - INTERVAL '1 YEAR') AND CURRENT_DATE;