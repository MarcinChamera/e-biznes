import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

function Category({setCategory}) {
    const { categories } = useContext(ProductsContext);
    const [formCategory, setFormCategory] = useState(0); 

    useEffect(() => {
        setFormCategory(formCategory)
    }, [formCategory]) 

    return (
        <FormControl fullWidth className="categoriesCombobox" >
            <InputLabel className="categoriesLabel">Kategorie</InputLabel>
            <Select
                value={formCategory}
                label="Kategoria"
                onChange={event => {
                    setCategory(event.target.value)
                    setFormCategory(event.target.value)
                }}
            >
                <MenuItem className="category" key={-1} value={0}>
                    <em>wszystkie</em>
                </MenuItem>
                {categories.map((category, id) => (
                    <MenuItem className="category" key={id} value={category.ID}>{category.Name}</MenuItem>
                ))}
            </Select>
    </FormControl>
    )
}

export default Category;
