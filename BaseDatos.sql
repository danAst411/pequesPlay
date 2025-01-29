-- Seleccionar el esquema de trabajo (reemplaza 'peques_play' si usas otro nombre)
CREATE DATABASE IF NOT EXISTS peques_play;
USE peques_play;

-- Tabla principal: Inscripciones
CREATE TABLE inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_nino VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    tipo_familia ENUM('Nuclear', 'Monoparental', 'Extensa', 'Otro') DEFAULT 'Nuclear',
    vive_con VARCHAR(255),
    numero_hermanos INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Padres
CREATE TABLE padres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscripcion_id INT NOT NULL,
    tipo ENUM('Padre', 'Madre') NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    profesion VARCHAR(100),
    lugar_trabajo VARCHAR(255),
    direccion VARCHAR(255),
    celular VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id) ON DELETE CASCADE
);

-- Tabla: Datos Médicos
CREATE TABLE datos_medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscripcion_id INT NOT NULL,
    tipo_sangre VARCHAR(5),
    observaciones_embarazo TEXT,
    semanas_termino INT,
    tipo_parto ENUM('Normal', 'Cesarea'),
    examen_audicion BOOLEAN DEFAULT FALSE,
    examen_vision BOOLEAN DEFAULT FALSE,
    enfermedades TEXT,
    alergias TEXT,
    medicamentos_prohibidos TEXT,
    medicamentos_emergencia TEXT,
    FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id) ON DELETE CASCADE
);

-- Tabla: Personas Autorizadas
CREATE TABLE autorizados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscripcion_id INT NOT NULL,
    ci VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    parentesco VARCHAR(50),
    celular VARCHAR(20),
    emergencia BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id) ON DELETE CASCADE
);

-- Tabla: Servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscripcion_id INT NOT NULL,
    servicio ENUM('Estimulación Temprana', 'Subnivel', 'Inicial 1', 'Inicial 2', 'Tareas dirigidas', 'Cuidado diario', 'Apoyo pedagógico') NOT NULL,
    horario VARCHAR(50),
    FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id) ON DELETE CASCADE
);

-- Tabla: Documentos
CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscripcion_id INT NOT NULL,
    tipo_documento ENUM('Foto Carnet', 'Cédula Niño', 'Cédula Padre', 'Cédula Madre', 'Cédula Autorizado', 'Carnet Vacunación') NOT NULL,
    url_documento VARCHAR(255) NOT NULL,
    FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id) ON DELETE CASCADE
);
