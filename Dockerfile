FROM php:7.4-apache

RUN a2enmod rewrite

COPY ./ /var/www/html/