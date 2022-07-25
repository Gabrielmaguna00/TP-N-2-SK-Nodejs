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

insert into Categories(name) values 
("Bebidas no alcoholicas"),
("Bebidas alcoholicas"),
("Fiambres"),
("Quesos")
;

insert into Products(name, price, category_id ) values 
("Lata de Coca-Cola", 250, 1),
("Lata de Sprite", 250, 1)
;

insert into Customers(name, email) values
("Juan", "jon@ejemplo"),
("Pepe", "pepe@google"),
("Estiv", "EstivTrabajo@apple"),
("Maria", "maria@microsoft");

insert into Order_Products(quantity, total, order_id, product_id) values 
(2, 500, 1, 3), 
(1, 650, 2, 4);

insert into Categories (name) values 
("Sanguches"), 
("Salames"), 
("Tablas"), 
("Regaleria");

insert into Stocks(store_id, product_id, quantity) values (2, 2, 4);
insert into Stocks(store_id, product_id, quantity) values (1, 1, 6);

insert into Stores(name, city) values ("Remidios de escalada", "CABA");
insert into Stores(name, city) values ("Retiro", "CABA");

insert into Orders(status, store_id, staff_id, customer_id) values 
(1, 2, 3, 1), 
(0, 1, 2, 2);

insert into Products (name, price, category_id) values 
("sanguche de milanesa", 800, 4), 
("salame picado fino", 900, 5), 
("tabla de madera", 750, 6), 
("alfajores", 950, 7);
