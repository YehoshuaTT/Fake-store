import { Link, useParams } from "react-router-dom";

function CategoryList({ categories, getCatItems, setShowCat, showCat }) {
  let params = useParams();
  return (
    <nav id="category-list">
      {!showCat &&
        categories.map((cat, i) => (
          <Link to={`/layout/${cat}`} key={i}>
            <div
              className={
                Object.values(params)[0] == cat
                  ? "colored-category"
                  : "category"
              }
              onClick={() => {
                getCatItems(cat);
                setShowCat(false);
              }}
            >
              {cat}
            </div>
          </Link>
        ))}
    </nav>
  );
}

export default CategoryList;
