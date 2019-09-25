-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2019 a las 19:52:31
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

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `caducidad` date NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `valor` int(11) NOT NULL,
  `enVenta` tinyint(4) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `usuario` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cupones`
--

INSERT INTO `cupones` (`id`, `nombre`, `caducidad`, `descripcion`, `foto`, `valor`, `enVenta`, `createdAt`, `updatedAt`, `usuario`) VALUES
(2, 'Cupón regalo', '2019-09-02', 'Cupón regalo', '1', 20, 0, NULL, NULL, ''),
(3, 'Cupón regalo', '2019-09-02', 'Cupón regalo', '2', 90, 0, NULL, NULL, ''),
(4, 'Cupón Airbnb', '2019-09-02', 'Cupón descuento en la app airbnb', 'airbnb', 120, 0, NULL, NULL, ''),
(5, 'Cupón 4', '2019-09-02', 'Cupón de ejemplo', '1', 45, 0, NULL, NULL, ''),
(6, 'Cupón 5', '2019-09-02', 'Cupón de ejemplo2', '2', 95, 0, NULL, NULL, ''),
(7, 'Cupón 6', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(8, 'Cupón 7', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(9, 'Cupón 8', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(10, 'Cupón 9', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(11, 'Cupón 10', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(12, 'Cupón 11', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(13, 'Cupón 12', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(14, 'Cupón 13', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(15, 'Cupón 14', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(16, 'Cupón 15', '2019-09-02', 'Cupón de ejemplo 3', 'airbnb', 95, 0, NULL, NULL, ''),
(17, 'cupon', '2019-10-16', 'Cupon con 75% de descuento en cinesa', 'airbnb', 0, 1, '2019-09-25', '2019-09-25', '578470a6-c83f-4a51-bfe1-372e0e57692f');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
