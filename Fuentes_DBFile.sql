create database school_db;
use school_db;

create table students(
id int auto_increment primary key,
name varchar(100),
course varchar(50),
year int
);

insert into students (name, course, year)
values ("Mia Santos", "BSCS", 3); /*testing if my backend works*/

ALTER TABLE students
ADD COLUMN status VARCHAR(20) DEFAULT 'existing';