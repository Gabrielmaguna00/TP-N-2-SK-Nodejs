
/* POSITION*/
CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEdditPositions`(
    IN _id INT,
    IN _name VARCHAR(100) 
)
BEGIN
    IF _id = 0 THEN 
        INSERT INTO positions (name)
        VALUES (_name);

        SET _id = LAST_INSERT_ID();

    ELSE
        UPDATE positions
        SET 
            name = _name
            WHERE id = _id;

    END IF;

    SELECT _id AS id;
END

/* PRODUCTS*/

CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEdditProducts`(
    IN _id INT,
    IN _name VARCHAR(40),
    IN _price INT,
    IN _category_id int
)
BEGIN
    IF _id = 0 THEN 
        INSERT INTO products (name, price, stock, category_id)
        VALUES (_name, _price, _stock, _category_id);

        SET _id = LAST_INSERT_ID();

    ELSE
        UPDATE products
        SET 
            name = _name,
            price = _price
            WHERE id = _id;

    END IF;

    SELECT _id AS id;
END

/*STAFF*/

CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEdditStaff`(
    IN _id INT,
    IN _name VARCHAR(100),
    IN _store_id INT,
    IN _position_id int
)
BEGIN
    IF _id = 0 THEN 
        INSERT INTO staff (name, store_id, position_id)
        VALUES (_name, _store_id, _position_id);

        SET _id = LAST_INSERT_ID();

    ELSE
        UPDATE staff
        SET 
            name = _name,
            store_id = _store_id,
            position_id = _position_id
            WHERE id = _id;

    END IF;

    SELECT _id AS id;
END

/*STOCKS*/

CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEdditStocks`(
    IN _id INT,
    IN _store_id int,
    IN _product_id INT,
    IN _quantity int
)
BEGIN
	IF _id = 0 THEN 
		insert into stocks (id, store_id, product_id, quantity)
        values (_id, _store_id, _product_id, _quantity);
        
        set _id = last_insert_id();
        
	else
     UPDATE stocks
        SET 
        quantity = _quantity
        where id = _id;
    
    END IF;
	SELECT _id AS id;

END