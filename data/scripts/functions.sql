CREATE OR REPLACE FUNCTION newcocktail(
    p_name TEXT,
    p_instruction TEXT,
    p_user_id INTEGER,
    p_ingredients JSON
) RETURNS INTEGER AS $$
DECLARE 
    v_cocktail_id INTEGER;
    v_ingredient record;
    ingredient_id INTEGER;
    quantity INTEGER;

BEGIN

INSERT INTO cocktail(name, instruction, validation, user_id) 
VALUES (
    p_name, 
    p_instruction, 
    false, 
    p_user_id)
RETURNING id INTO v_cocktail_id;

FOR v_ingredient IN SELECT * FROM json_array_elements(p_ingredients) LOOP
    ingredient_id := (ingredient->>'id')::INTEGER;
    quantity := (ingredient =>> 'quantity')::INTEGER;

INSERT INTO cocktail_contain_ingredient (cocktail_id, ingredient_id, quantity)
VALUES (
    v_cocktail_id, 
    ingredient_id,
    quantity
);
END LOOP;

RETURN v_cocktail_id;
END;

$$ LANGUAGE PLPGSQL;

COMMIT;