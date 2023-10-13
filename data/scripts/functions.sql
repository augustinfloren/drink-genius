CREATE OR REPLACE FUNCTION newcocktail(
    p_name TEXT,
    p_instruction TEXT,
    p_user_id NUMBER,
    p_ingredient_id NUMBER,
    p_quantity NUMBER
) RETURN NUMBER $$
DECLARE v_cocktail_id NUMBER;

BEGIN

INSERT INTO cocktail(name, instruction, validation, user_id) 
VALUES (p_name, p_instruction, false, p_user_id)
RETURNING cocktail.id INTO v_cocktail_id;

INSERT INTO cocktail_contain_ingredient (cocktail_id, ingredient_id, quantity)
VALUES (v_cocktail_id, p_ingredient_id, p_quantity);

RETURN v_cocktail_id;
END;

$$ LANGUAGE PLSQL