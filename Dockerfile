FROM php:8.1.13-apache

RUN a2enmod rewrite

COPY ./ /var/www/html/