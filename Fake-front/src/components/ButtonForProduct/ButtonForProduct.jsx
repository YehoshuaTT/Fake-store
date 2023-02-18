import main from "../../stores/main";
const { productsData } = main;

function ButtonForProduct({ item }) {
  const { increase, decrease, cartItem } = productsData;
  return (
    <div className="buttons-in-item">
      {!cartItem.find((v) => item.id === v.id) ? (
        <button
          className="ATC-bottun"
          onClick={() => {
            increase(item);
          }}
        >
          Add to Cart
        </button>
      ) : (
        <>
          <img
            src="https://findicons.com/files/icons/1014/ivista/128/plus.png"
            alt="plus"
            className="inc-dec-category"
            onClick={() => increase(item)}
          />

          <img
            alt="minus"
            src="https://findicons.com/files/icons/1014/ivista/128/minus.png"
            className="inc-dec-category"
            onClick={() =>
              decrease(item, cartItem.find((v) => item.id === v.id).amount)
            }
          />
        </>
      )}
    </div>
  );
}

export default ButtonForProduct;
