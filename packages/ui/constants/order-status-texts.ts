export const orderStatusTexts: { [key: string]: string } = {
  scan: "Scanned",
  expected: "Expected",
  at_warehouse: "At Warehouse",
  on_the_way: "On the Way",
  in_georgia: "In Georgia",
  received: "Received",
};

//test
export const orderStatusOptions = [
  { value: "at_warehouse", label: "At Warehouse" },
  { value: "on_the_way", label: "On the way" },
  { value: "scan", label: "Scanned" },
  { value: "in_local_country", label: "In Local Country" },
  {
    value: "received",
    label: "Received",
  },
  {
    value: "return",
    label: "Return",
  },
];

export const orderTypes = [
  {
    key: 0,
    label: "Online shop",
    value: "online_shopping",
  },
  {
    key: 1,
    label: "Personal items",
    value: "personal_items",
  },
];
