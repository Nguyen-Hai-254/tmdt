import { categoriesEnum, statusEnum } from "./enum";

// change enum to option [{value: 1, label: 'option1'}, {value: 2, label: 'option2'}]
export const categoriesOptions = Object.entries(categoriesEnum).map(
  ([value, label]) => ({
    value: label,
    label: label,
  })
);