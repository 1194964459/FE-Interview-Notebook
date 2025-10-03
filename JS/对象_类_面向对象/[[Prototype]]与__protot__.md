# [[Prototype]]与__protot__

## [[Prototype]]
[[Prototype]] 是 JavaScript 引擎内部使用的一个属性，用于实现对象的继承机制。每个对象（除了 null）都有一个 [[Prototype]]，指向它的原型对象

在 JS 代码中无法直接访问 [[Prototype]]，常规的点、方括号是无法获取和修改它的。需要通过Object.getPrototypeOf() 和 Object.setPrototypeOf() 间接访问：设置、获取一个对象的原型对象。

## __protot__

__proto__ 是一个访问器属性，可通过点、方括号直接操作操作。在早期浏览器中用的比较多，现在该属性主要是为了兼容老旧的浏览器。

__proto__ 的读写操作，本质上就是在操作对象的 [[Prototype]]。

不过，从最佳实践和性能角度考虑，推荐使用 Object.getPrototypeOf() 和 Object.setPrototypeOf() 等方法来操作对象原型，而不是频繁使用 __proto__ 。