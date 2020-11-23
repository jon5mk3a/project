create schema if not exists project;

use project;

create table if not exists user (
	id bigint unsigned primary key auto_increment,
	photo varchar(500),
	name varchar(50) not null,
	surname varchar(50) not null,
	address varchar(100) not null,
    phone varchar(50) not null unique,
    email varchar(100) not null unique,
	nick_name varchar(50) not null unique,
	password varchar(128) not null,
	information varchar(1000)
);

create table if not exists apartment (
	id bigint unsigned primary key auto_increment,
    photo varchar(500) not null,
    location varchar(100) not null,
    rooms int not null,
    bathroom int not null,
    lift boolean default false,
    balcony boolean default false,
    heating boolean default false,
    furniture boolean default false,
    internet boolean default false,
    tv boolean default false,
    price decimal(10, 2) default 0
);

create table if not exists user_apartment_request (
	id bigint unsigned primary key auto_increment,
    id_user bigint unsigned,
    foreign key(id_user) references user (id),
    id_apartment bigint unsigned,
    foreign key(id_apartment) references apartment (id)
);

create table if not exists user_apartment_book (
	id bigint unsigned primary key auto_increment,
	id_user bigint unsigned,
    foreign key(id_user) references user (id),
    id_apartment bigint unsigned,
    foreign key(id_apartment) references apartment (id),
    date date,
    available boolean default true
);

create table if not exists evaluate (
	id bigint unsigned primary key auto_increment,
    text varchar(1000),
    rating int not null
);
