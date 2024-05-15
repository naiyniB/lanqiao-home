
import './index.css';
document.addEventListener("DOMContentLoaded", function () {
  
  // 获取父元素和子元素
  var parentDiv = document.getElementById("parent");
  var childDiv = document.getElementById("child");

  // 为父元素添加点击事件监听器
  parentDiv.addEventListener("click", function (event) {
    console.log("父元素被点击");
  });

  // 为子元素添加点击事件监听器
  childDiv.addEventListener("click", function (event) {
    console.log("子元素被点击");
  });

  // 为按钮添加点击事件监听器
  var button = document.querySelector("button");
  button.addEventListener("click", function (event) {
    alert("按钮被点击");
    event.stopPropagation();
    // 由于事件冒泡，即使不调用event.stopPropagation()，事件也会传播到父元素
  });
 
});
