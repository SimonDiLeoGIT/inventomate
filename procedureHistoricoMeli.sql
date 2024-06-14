-- Variables para datos
SET @fecha_actual = '2024-06-04';

-- Procedimiento almacenado para insertar datos
DELIMITER //

CREATE PROCEDURE InsertHistoricalData()
BEGIN
    DECLARE v_counter INT DEFAULT 0;
    DECLARE v_fecha DATE;
    DECLARE v_categoria1_id BIGINT;
    DECLARE v_categoria2_id BIGINT;

    SET v_fecha = @fecha_actual;
    
    -- Asumimos que ya conoces los IDs de las categorías
    SET v_categoria1_id = 1; -- Reemplaza con el ID correcto de la categoría Smartphones
    SET v_categoria2_id = 2; -- Reemplaza con el ID correcto de la categoría Notebooks

    WHILE v_counter < 12 DO
        -- Inserción de productos con datos variados para Smartphones
        INSERT INTO productos_meli (id_meli, trend_position, fecha, nombre, precio, divisa, id_categoria) VALUES
        ('MLA21024384', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Samsung Galaxy A04 128 GB Negro 4 GB RAM', 264999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA22385548', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Samsung Galaxy A34 128GB Awesome Graphite 6GB RAM', 695999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA19069553', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Xiaomi Redmi 10c Dual Sim 128gb 4gb Ram Gris grafito', 269999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA19069554', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Xiaomi Redmi 10c Dual Sim 128gb 4gb Ram Ocean Blue', 269999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA22385547', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Samsung Galaxy A34 128gb 6gb Ram Awesome Silver', 500000 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA26862371', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Zte Blade A53 Plus 2GB Gris oscuro Ram 64 GB', 145999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA27440592', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Motorola Moto G84 5G 256 GB Negro espacial 8 GB RAM', 469999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA24521863', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'TCL 40 SE 128 GB twilight purple 4 GB RAM', 249999 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA28131664', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Xiaomi Redmi 13C Dual SIM 256 GB Midnight Black 8 GB RAM', 278990 * (1 + RAND()), 'ARS', v_categoria1_id),
        ('MLA26862373', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Zte Blade A33 Plus 32 GB Space Gray 2 GB RAM', 129999 * (1 + RAND()), 'ARS', v_categoria1_id);

        -- Inserción de productos con datos variados para Notebooks
        INSERT INTO productos_meli (id_meli, trend_position, fecha, nombre, precio, divisa, id_categoria) VALUES
        ('MLA27706172', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Hp 255 G9 R5 5625u 8gb Ssd 256gb 15.6 W11h Ct Color Gris ceniza', 749999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA22826188', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Exo Smart T38 Intel N4020 4gb Ssd128gb Windows 11 Color Gris', 399999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA19667501', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Exo Smart R33 Intel N4020 4gb Ssd 64 Gb Windows 11 Color Gris', 359999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA29590978', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Lenovo Ideapad 1 4gb 128gb 14 Intel Celeron W11 Color Plateado', 560999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA21263733', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Cx 27000w, Conectividad 4g Lte Con Chip De Celular , 128gb Ssd , 4gb Ram, 14.1 1366 Px X 768 Px , Qualcomm Sc7180 2.4ghz, Gpu Adreno 618, Windows 10 Pro', 313999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA26696118', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Asus X515EA slate grey 15.6", Intel Core i3 1115G4 8GB de RAM 256GB SSD, Gráficos Intel UHD 1366x768px FreeDOS', 802998.9 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA23376685', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Dell Inspiron 3525 plata 15.5", AMD Ryzen 5 5500U 8GB de RAM 512GB SSD, AMD Radeon RX Vega 7 120 Hz 1920x1080px Windows 11 Home', 1210999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA26314185', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Asus X515EA slate grey 15.6", Intel Core i7 1165G7 40GB de RAM 1TB SSD, Intel Iris Xe Graphics 60 Hz 1920x1080px FreeDOS', 1290000 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA27961100', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Asus Ultra Thin L510MA star black 15.6", Intel Pentium Silver N5030 4GB de RAM 128GB SSD, Intel UHD Graphics 605 60 Hz 1920x1080px Windows 11 Home', 719999 * (1 + RAND()), 'ARS', v_categoria2_id),
        ('MLA18500496', 1 + FLOOR(10 * RAND()), DATE_SUB(v_fecha, INTERVAL v_counter MONTH), 'Notebook Asus X515EA gris 15.6", Intel Core i5 1135G7 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1920x1080px FreeDOS', 864919 * (1 + RAND()), 'ARS', v_categoria2_id);

        SET v_counter = v_counter + 1;
    END WHILE;
END //

DELIMITER ;

-- Llamar al procedimiento para insertar los datos
CALL InsertHistoricalData();
