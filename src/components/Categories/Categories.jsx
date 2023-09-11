import Container from "../Shared/Container";
import { categories } from "./categoriesData";
import CategoryBox from "./CategoryBox";
const Categories = ({ handleCategories, selected }) => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            label={item.label}
            icon={item.icon}
            key={item.label}
            selected={selected}
            handleCategories={handleCategories}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
