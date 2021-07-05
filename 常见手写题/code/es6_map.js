const items = [
    ['name', '张三'],
    ['title', 'Author']
  ];
  
  const map = new Map();
  
  items.forEach(
    ([key, value]) => map.set(key, value)
  );

  console.log('map: ', map)

// const map = new Map();

// map.set(1, 'aaa')   // Map(1) { 1 => 'aaa' }

// console.log('map: ', map)
