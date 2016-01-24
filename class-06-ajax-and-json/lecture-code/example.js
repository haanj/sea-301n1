/*
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var people = [
  new Person('John Bravo', 80),
  new Person('Beth', 15),
  new Person('Timmy', 10)
];

var yearsOfLife = people.reduce(function(sum, person) {
  return sum + person.age;
}, 0);

//console.log(yearsOfLife);

var sum = [1,2,3,4,5].reduce(function(sum, number){
  return sum + number;
});

//console.log(sum);

var product = [1,2,3,4,5].reduce(function(prod, number) {
  return prod * number;
});
//console.log(product);

var hello = people.reduce(function(msg, person) {
  return msg + "Hello " + person.name + "\n";
}, "");
//console.log(hello);
*/
/*
// ---- Curry ----
function greetFactory(greeting) {
  return function(name) {
    console.log(greeting + ' ' + name + '!!!');
  }
}

var hello = greetFactory('hello');
var hola = greetFactory('hola');

hello('Tim');
hello('Janet');
hello('Bob');
hola('Jak');
hola('Morty');

greetFactory('Goodbye')('George');


// practice

function adder(number1) {
  return function(number2) {
    return number1 + number2;
  }
}

function add5numbers(number1) {
  return function(number2) {
    return function(number3) {
      return function(number4) {
        return function(number5){
          return number1 + number2 + number3 + number4 + number5;
        }
      }
    }
  }
}

var add4 = adder(4);
var result = add4(10); //14
var result2 = add4(11); //15
console.log(result);
console.log(result2);


var add1 = adder(1);
var result3 = add1(5); // 6
console.log(result3);

console.log(add5numbers(1)(1)(2)(3)(1));
var add3To4Numbers = add5numbers(3);

console.log(add3To4Numbers(1)(2)(1)(1));
*/
/*
function Pet(name, age, type, gender){
  this.name = name;
  this.age = age;
  this.type = type;
  this.gender = gender;
}

var pets = [
  new Pet('fluffy', 4, 'lizard', 'male'),
  new Pet('fluffy2', 3, 'lizard', 'male'),
  new Pet('Trogdor', 10, 'cat', 'female'),
  new Pet('McMorty', 4, 'morty', 'male')
];

var femalePets = pets.filter(function(pet) {
  return pet.gender == 'female';
})

console.log(femalePets);

var olderLizards = pets
  .filter(function(pet) {
    return pet.type == 'lizard';
  })
  .map(function(pet){
    pet.age += 1;
    return pet;
  })
console.log(pets);
console.log(olderLizards);
*/
var numbers = [13, 34, 1, 24, 4];

sumOfAllNumbersLessThan10 = numbers.filter(function(number){
  return number < 10;
}).reduce(function(sum, num){
  return sum + num;
});

console.log(sumOfAllNumbersLessThan10);

sumOfAllNumbersGreaterThan10 = numbers.filter(function(number){
  return number > 10;
}).reduce(function(sum, num){
  return sum + num;
});

console.log(sumOfAllNumbersGreaterThan10);

allNumbersGreaterThan10AfterAddingNumber = numbers.map(function(number){
  return number + 5;
}).filter(function(number){
  return number > 10;
})

console.log(allNumbersGreaterThan10AfterAddingNumber);
