
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

