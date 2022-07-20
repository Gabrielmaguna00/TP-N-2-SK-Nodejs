create table Stores (
  id int not null auto_increment,
  name varchar(100) not null,
  city varchar(50) not null,
  primary key (id)
);

create table Positions (
  id int not null auto_increment,
  name varchar(100) not null,
  primary key (id)
);

create table Staff (
  id int not null auto_increment,
  name varchar(100) not null,
  position_id int not null,
  store_id int not null,
  primary key (id),
  foreign key (store_id) references Stores(id),
  foreign key (position_id) references Positions(id)
);

create table Categories (
  id int not null auto_increment,
  name varchar(100) not null,
  primary key (id)
);

create table Products (
  id int not null auto_increment,
  name varchar(100) not null,
  price int not null,
  category_id int not null,
  primary key (id),
  foreign key (category_id) references Categories(id)
);

create table Stocks (
  id int not null auto_increment,
  quantity int not null,
  store_id int not null,
  product_id int not null,
  primary key (id),
  foreign key (store_id) references Stores(id),
  foreign key (product_id) references Products(id)
);

create table Customers (
  id int not null auto_increment,
  name varchar(100) not null,
  email varchar(150) not null,
  primary key (id)
);

create table Orders (
  id int not null auto_increment,
  status bit not null,
  store_id int not null,
  staff_id int not null,
  customer_id int not null,
  primary key (id),
  foreign key (store_id) references Stores(id),
  foreign key (staff_id) references Staff(id),
  foreign key (customer_id) references Customers(id)
);

create table Order_Products (
  id int not null auto_increment,
  quantity int not null,
  total int not null,
  order_id int not null,
  product_id int not null,
  primary key (id),
  foreign key (order_id) references Orders(id),
  foreign key (product_id) references Products(id)
);

insert into Positions(name) values 
("Gerente"),
("Encargado"),
("Repositor"),
("Cajero")
;

insert into Stores(name, city) values 
("Palermo", "CABA"),
("Chacarita", "CABA"),
("Belgrano", "CABA"),
("Almagro", "CABA"),
("Colegiales", "CABA")
;

insert into Staff(name, store_id, position_id) values
("Mathias", 3, 1),
("Oscar", 2, 3),
("Camila", 1, 2),
("Vicente", 4, 4)
;
