/**
 * Invokes func on all nodes in the tree recursively
 */
function executeOnNodes(root, func) {
  function recurse(element, depth = 0) {
    switch (func.length) {
      case 1:
        func(element);
        break;
      case 2:
        func(element, depth);
        break;
      default:
        throw "Invalid function definition";
    }

    const wrapper = element.querySelector(".nodes-wrapper");
    if (wrapper) for (let node of wrapper.children) recurse(node, depth + 1);
  }

  for (let node of root.children) recurse(node);
}

/**
 * Sets nodes-wrapper elements maxHeight to 0
 */
function hideNodes(root) {
  executeOnNodes(root, (element) => {
    const wrapper = element.querySelector(".nodes-wrapper");
    if (wrapper) wrapper.style.maxHeight = 0;
  });
}

/**
 * Handle toggling child nodes of a node of type list
 */
function addListHandler(nodeBody, wrapper) {
  const wrapperMaxHeight = wrapper.clientHeight + "px";
  wrapper.style.maxHeight = wrapperMaxHeight;

  nodeBody.addEventListener("click", (event) => {
    wrapper.style.maxHeight = wrapper.clientHeight == 0 ? wrapperMaxHeight : 0;

    event.stopPropagation();
  });
}

/**
 * Handle executing action of a node of type action
 */
function addActionHandler(nodeBody, action) {
  nodeBody.addEventListener("click", (event) => {
    action(event);
    event.stopPropagation();
  });
}

/**
 * Handle redirecting to a list of a node of type link
 */
function addLinkHandler(nodeBody, link) {
  nodeBody.addEventListener("click", (event) => {
    location.href = link;
    event.stopPropagation();
  });
}

/**
 * Recursively builds tree
 */
function buildTree(struct, root, indentation, listIcon, actionIcon, linkIcon) {
  function buildNode(struct, parent, depth = 0) {
    // Create DOM elements
    const node = document.createElement("div");
    const nodeBody = document.createElement("div");
    const nodeIcon = document.createElement("div");
    const nodeLabel = document.createElement("div");

    const nodeType = struct.hasOwnProperty("nodes")
      ? "list"
      : struct.hasOwnProperty("action")
      ? "action"
      : struct.hasOwnProperty("href")
      ? "link"
      : null;

    const wrapper = nodeType === "list" ? document.createElement("div") : null;

    // Add classes for css
    node.classList.add("node");
    nodeBody.classList.add("node-body");
    nodeIcon.classList.add("node-icon");
    nodeLabel.classList.add("node-label");
    if (wrapper) wrapper.classList.add("nodes-wrapper");

    // Add necessary css styles
    node.style.userSelect = "none";
    nodeBody.style.display = "flex";
    nodeBody.style.flexDirection = "row";
    if (wrapper) wrapper.style.overflow = "hidden";

    // Add elements to DOM
    parent.appendChild(node);
    node.appendChild(nodeBody);
    nodeBody.appendChild(nodeIcon);
    nodeBody.appendChild(nodeLabel);
    if (wrapper) {
      node.appendChild(wrapper);
      // Recurse
      struct.nodes.forEach((subStruct) => {
        buildNode(subStruct, wrapper, depth + 1);
      });
    }

    // Set label text
    nodeLabel.innerHTML = struct.label;

    // Add indentation
    const nodeBodyPadding = parseFloat(
      window.getComputedStyle(nodeBody).getPropertyValue("padding-left")
    );
    nodeBody.style.paddingLeft = nodeBodyPadding + indentation * depth + "px";

    // Add hover effect
    nodeBody.addEventListener("mouseover", (event) => {
      nodeBody.classList.add("node-hover");
      event.stopPropagation();
    });

    nodeBody.addEventListener("mouseout", (event) => {
      nodeBody.classList.remove("node-hover");
      event.stopPropagation();
    });

    // Set onClick handlers
    switch (nodeType) {
      case "list":
        if (listIcon) nodeIcon.style.backgroundImage = listIcon;
        addListHandler(nodeBody, wrapper);
        break;
      case "action":
        if (actionIcon) nodeIcon.style.backgroundImage = actionIcon;
        addActionHandler(nodeBody, struct.action);
        break;
      case "link":
        if (linkIcon) nodeIcon.style.backgroundImage = linkIcon;
        addLinkHandler(nodeBody, struct.href);
        break;
    }
  }

  struct.forEach((subStruct) => {
    buildNode(subStruct, root, 0);
  });
}

/**
 * Builds and initializes the tree
 */
function initTree(
  struct,
  root,
  indentation,
  listIcon,
  actionIcon,
  linkIcon
) {
  buildTree(struct, root, indentation, listIcon, actionIcon, linkIcon);
  hideNodes(root);

  // Add transition effect after everything else is set up
  setTimeout(() => {
    executeOnNodes(root, (element) => {
      const wrapper = element.querySelector(".nodes-wrapper");
      if (wrapper) wrapper.style.transition = "max-height .3s ease-out";
    });
  }, 1);
}
