FROM php:8.4-rc-apache

RUN a2enmod rewrite

COPY ./Src /var/www/html/
