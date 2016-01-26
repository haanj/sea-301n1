function Student(name, age, greatestFear) {
    this.name = name;
    this.age = age;
    this.greatestFear = greatestFear;
}

var students = [
    new Student('bob', 20, 'cats'),
    new Student('joe', 4, 'the tooth fairy'),
    new Student('sarah', 99, 'pickles')
];

// sum of ages if they all were one year older

var sum = students.reduce(function(total, student) {
    return total + (student.age + 1);
}, 0)

console.log(sum);


var mapAndReduce = students.map(function(student) {
    return new Student(student.name,
                       student.age + 1,
                       student.greatestFear);
}).reduce(function(sum, student){
    return sum + student.age;
   }, 0);

console.log(mapAndReduce);

// multiply each by 10, multiply products together

var numbers = [10, 15, 20];

var newNumbers = numbers.map(function(num) {
    return num * 10;
}).reduce(function(prod, num){
    return prod * num;
}, 1);

console.log(newNumbers);

// Other weird stuff
var namesArray = students.reduce(function(string, student){
    return string + student.name + "\n";
}, "People in room: \n");

console.log(namesArray);
