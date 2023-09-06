FROM php:8.2-apache

RUN a2enmod rewrite

COPY ./Src /var/www/html/
