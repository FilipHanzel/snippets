const struct = [
  {
    label: "Some Node",
    nodes: [
      {
        label: "Nested Node",
        href: "http://github.com",
      },
      {
        label: "Another Nested Node",
        nodes: [
          {
            label: "Nested Node",
            action: (event) => {
              console.log(event);
            },
          },
        ],
      },
    ],
  },
  {
    label: "Some Other Node",
    nodes: [
      { label: "Some Other Nested Node", href: "#" },
      { label: "Some Other Another Nested Node", href: "#" },
    ],
  },
  {
    label: "Just a Node",
  },
];

const root = document.getElementById("tree-root");

initTree(
  struct,
  root,
  50.0,
  "url(icons/list.svg)",
  "url(icons/action.svg)",
  "url(icons/link.svg)"
);
