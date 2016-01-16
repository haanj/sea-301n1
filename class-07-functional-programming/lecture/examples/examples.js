var numbers = [1,2,3,4,5];
var sum = 0;
for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i]
}
console.log(sum);



function hi(name) {
  console.log('hello ' + name + ' how are you today?');
}

var names = ['janet', 'henry', 'beth', 'bob'];

// ok
for (var i = 0; i < names.length; i++) {
  hi(names[i]);
}

// much better
names.forEach(hi);
names.forEach(function(name) {
  console.log(name);
})


var people = [{name: 'john', age: 24}, {name: 'beth', age: 50}, {name: 'sally', age: 65}]

people.forEach(function(nachoCheese) {
  console.log('hello ' + nachoCheese.name + ' how are you?');
});

people.forEach(function(peep){
  console.log('hi ' + peep.name + ", you're " + peep.age + " years old");
});

var doubleAge = people.map(function(peep){
  return peep.age * 2;
});

console.log(doubleAge);
