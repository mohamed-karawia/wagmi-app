export const mapItemToDropdownItem = (
  item: any,
  iconsList: Record<string, string>
) => {
  return {
    label: item?.name,
    value: item?.id,
    icon: item.name && iconsList[item.name],
  };
};
