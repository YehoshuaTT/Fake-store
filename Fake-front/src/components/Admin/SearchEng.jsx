import { Cascader } from "antd";
const SearchEng = ({ props }) => {
  const options =
    props &&
    props.map((v, i) => {
      return { value: v, label: v.title, key: i + Math.random() };
    });
  console.log(options);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{
        filter,
      }}
      onSearch={(value) => console.log(value)}
    />
  );
};
export default SearchEng;
