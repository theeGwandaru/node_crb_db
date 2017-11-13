create database if not exists node_crb;
create user if not exists 'node_crb'@'localhost' identified by 'password';
grant all on node_crb.* to 'node_crb'@'localhost';
use node_crb;

drop table if exists subscriber_type;
create table subscriber_type(
	subscriber_type_id int primary key auto_increment,
    subscriber_type_name varchar(100)
);
drop table if exists subscriber;
create table subscriber(
	subscriber_id int primary key auto_increment,
    subscriber_name varchar(100),
    subscriber_type_id int
);

drop table  if exists contact;
create table contact(
	contact_id int primary key auto_increment,
    surname varchar(50),
    other_names varchar(150),
    national_id varchar(20),
    passport_no varchar(20),
    alien_id varchar(20),
    service_id varchar(20),
    date_of_birth date
);

drop table if exists facility_type;
create table facility_type(
	facility_type_id int primary key auto_increment,
    facility_type_name varchar(100)
);
drop table if exists facility;
create table facility(
	facility_id int primary key auto_increment,
    contact_id int,
    subscriber_id int,
    facility_type int,
    principle_amount decimal(12,2),
    current_balance decimal(12,2),
    has_default_history boolean,
    is_delinquent boolean,
    date_opened date,
    last_payment_date date
)