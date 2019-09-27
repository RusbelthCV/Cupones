-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-09-2019 a las 20:13:28
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cupones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

drop database if exists cupones;

create database cupones;

use cupones;

DROP TABLE IF EXISTS cupones;

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `caducidad` date NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `valor` int(11) NOT NULL,
  `enVenta` tinyint(4) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `usuario` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cupones`
--

INSERT INTO `cupones` (`id`, `nombre`, `caducidad`, `descripcion`, `foto`, `valor`, `enVenta`, `createdAt`, `updatedAt`, `usuario`) VALUES
(2, 'Cupón regalo', '2019-09-02', '2020-09-02', '1.png', 1, 20, '0000-00-00', '0000-00-00', '0000-00-00'),
(3, 'Cupón regalo', '2019-09-02', '2019-12-02', 'cinesa.png', 2, 90, '0000-00-00', '0000-00-00', '0000-00-00'),
(4, 'Cupón Airbnb', '2019-09-02', '2019-09-20', '1.png', 0, 120, '0000-00-00', '0000-00-00', '0000-00-00'),
(5, 'Cupón 4', '2019-09-02', '2019-09-02', '2.png', 1, 45, '0000-00-00', '0000-00-00', '0000-00-00'),
(6, 'Cupón 5', '2019-09-02', '2019-09-02', 'cinesa.png', 2, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(7, 'Cupón 6', '2019-09-02', '2019-09-02', 'cinesa.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(8, 'Cupón 7', '2019-09-02', '2019-09-02', '1.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(9, 'Cupón 8', '2019-09-02', '2019-09-02', '2.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(10, 'Cupón 9', '2019-09-02', '2019-09-02', 'cinesa.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(11, 'Cupón 10', '2019-09-02', '2019-09-02', 'cinesa.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(12, 'Cupón 11', '2019-09-02', '2019-09-02', 'airbnb.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(13, 'Cupón 12', '2019-09-02', '2019-09-02', '1.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(14, 'Cupón 13', '2019-09-02', '2019-09-02', '2.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(15, 'Cupón 14', '2019-09-02', '2019-09-02', '1.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(16, 'Cupón 15', '2019-09-02', '2019-09-02', 'airbnb.png', 0, 95, '0000-00-00', '0000-00-00', '0000-00-00'),
(17, 'cupon', '2019-10-16', 'Cupon con 75% de descuento en cinesa', 'airbnb.png', 0, 1, '2019-09-25', '2019-09-25', '578470a6-c83f-4a51-bfe1-372e0e57692f'),
(19, 'cuponcito', '2020-04-16', '123', 'airbnb.png', 123, 1, '2019-09-26', '2019-09-26', 'af982442-cf33-477e-81e4-ae7b81841a01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` int(11) NOT NULL,
  `Nombre_categoria` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `Cupones_id` int(11) NOT NULL,
  `Usuario_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL DEFAULT 0,
  `token` varchar(20) DEFAULT NULL,
  `idusuari` varchar(36) DEFAULT NULL,
  `nomusuari` varchar(100) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `idusuari`, `nomusuari`, `admin`, `createdAt`, `updatedAt`) VALUES
(0, 'HHahzYYnuFwXQGY', 0, 'Bryan', 0, '2019-09-26 18:12:18', '2019-09-26 18:12:18'),
(0, 'NATQOQZyr3KSkxV', 0, 'Bryan', 0, '2019-09-26 18:13:26', '2019-09-26 18:13:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `_uuid` varchar(36) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `nacimiento` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `admin` tinyint(4) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`_uuid`, `nombre`, `email`, `password`, `nacimiento`, `createdAt`, `updatedAt`, `admin`) VALUES
('af982442-cf33-477e-81e4-ae7b81841a01', 'Bryan', 'bryamc10@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '1997-04-16', '2019-09-26', '2019-09-26', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendidos`
--

CREATE TABLE `vendidos` (
  `Cupones_id` int(11) NOT NULL,
  `Etiquetas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`Cupones_id`,`Usuario_id`),
  ADD KEY `fk_Cupones_has_Usuario_Usuario1_idx` (`Usuario_id`),
  ADD KEY `fk_Cupones_has_Usuario_Cupones1_idx` (`Cupones_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`_uuid`);

--
-- Indices de la tabla `vendidos`
--
ALTER TABLE `vendidos`
  ADD PRIMARY KEY (`Cupones_id`,`Etiquetas_id`),
  ADD KEY `fk_Cupones_has_Etiquetas_Etiquetas1_idx` (`Etiquetas_id`),
  ADD KEY `fk_Cupones_has_Etiquetas_Cupones1_idx` (`Cupones_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `fk_Cupones_has_Usuario_Cupones1` FOREIGN KEY (`Cupones_id`) REFERENCES `cupones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Cupones_has_Usuario_Usuario1` FOREIGN KEY (`Usuario_id`) REFERENCES `usuario` (`_uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vendidos`
--
ALTER TABLE `vendidos`
  ADD CONSTRAINT `fk_Cupones_has_Etiquetas_Cupones1` FOREIGN KEY (`Cupones_id`) REFERENCES `cupones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Cupones_has_Etiquetas_Etiquetas1` FOREIGN KEY (`Etiquetas_id`) REFERENCES `etiquetas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
