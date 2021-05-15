import { taskbarWidth } from "../const";
import { activeWindowsId, windows } from "./windows";


function setTopWindow(id: string) {
  activeWindowsId.value = id;
}

function preventDefault(ev: Event) {
  ev.preventDefault();
}
/**
 * set top window
 */
document.addEventListener("mousedown", (ev) => {
  let node = <Element>ev.target;
  if (node instanceof Element === false) {
    return;
  }
  if (Array.from(node.classList).includes("xiaobai-window-wrapper")) {
    setTopWindow(node.id);
    return;
  }
  while (node !== null) {
    node = <Element>node.parentNode;
    if (!node) {
      break;
    }
    if (node.nodeName === "BODY") {
      break;
    }
    if (Array.from(node.classList).includes("xiaobai-window-wrapper")) {
      setTopWindow(node.id);
      break;
    }
  }
});

/**
 * resize and scale
 */
document.addEventListener("mousedown", function (ev) {
  if (ev.target === null) {
    return;
  }

  const target: HTMLDivElement = <HTMLDivElement>ev.target;
  const action = target.getAttribute("xiaobai-resize-trigger");

  if (action === null) {
    return;
  }

  ev.preventDefault();
  ev.stopPropagation();

  const parent = <HTMLDivElement>target.parentNode;
  const id = parent.id;

  const windowIdx = windows.value.findIndex((item) => {
    return item.id === id;
  });

  const obj = windows.value[windowIdx];

  // disabled animation
  obj.animation = false;

  // save init point
  var _initPoint = {
    left: obj.x,
    top: obj.y,
    width: obj.width,
    height: obj.height,
  };

  var initX = ev.pageX;
  var initY = ev.pageY;
  var startX = _initPoint.left;
  var startY = _initPoint.top;
  var endX = _initPoint.left + _initPoint.width;
  var endY = _initPoint.top + _initPoint.height;

  bind();

  function bind() {
    document.addEventListener("selectstart", preventDefault);
    document.addEventListener("dragstart", preventDefault);

    // save coordinates during movement
    var point = {
      startX: _initPoint.left,
      startY: _initPoint.top,
      endX: endX,
      endY: endY,
    };

    function mousemove(ev: MouseEvent) {
      switch (action) {
        case "e":
          point.endX = endX + (ev.pageX - initX);
          break;
        case "s":
          point.endY = endY + (ev.pageY - initY);
          break;
        case "w":
          point.startX = startX - (initX - ev.pageX);
          break;
        case "n":
          point.startY = startY - (initY - ev.pageY);
          break;
        case "nw":
          point.startX = startX - (initX - ev.pageX);
          point.startY = startY - (initY - ev.pageY);
          break;
        case "sw":
          point.startX = startX - (initX - ev.pageX);
          point.endY = endY + (ev.pageY - initY);
          break;
        case "se":
          point.endX = endX + (ev.pageX - initX);
          point.endY = endY + (ev.pageY - initY);
          break;
        case "ne":
          point.endX = endX + (ev.pageX - initX);
          point.startY = startY - (initY - ev.pageY);
          break;
        case "move":
          obj.x = point.startX + (ev.pageX - initX);
          obj.y = point.startY + (ev.pageY - initY);
          if (obj.x <= taskbarWidth.value) {
            obj.x = taskbarWidth.value;
          }
          if (obj.y <= 0) {
            obj.y = 0;
          }
          return;
      }

      var newPoint = {
        left: point.startX < point.endX ? point.startX : point.endX,
        top: point.startY < point.endY ? point.startY : point.endY,
        width:
          point.startX < point.endX
            ? point.endX - point.startX
            : point.startX - point.endX,
        height:
          point.startY < point.endY
            ? point.endY - point.startY
            : point.startY - point.endY,
      };

      obj.x = newPoint.left;
      obj.y = newPoint.top;
      obj.width = newPoint.width;
      obj.height = newPoint.height;
    }
    document.addEventListener("mousemove", mousemove);

    function mouseup() {
      document.removeEventListener("selectstart", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      obj.animation = true;
    }

    document.addEventListener("mouseup", mouseup);
  }
});