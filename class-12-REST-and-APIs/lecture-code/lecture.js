function Cat(name, age, breed) {
  this.name = name
  this.age = age
  this.breed = breed
  this.opinionsOnOwner = opinionsOnOwner
}

Cat.prototype.getInfo() {
  return this.name + ' ' + this.age + ' ' + this.breed
}
