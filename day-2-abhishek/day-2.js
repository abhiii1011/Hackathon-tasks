const marks = [45, 78, 89, 32, 90, 67];
let highest = 0;

for (let i = 0; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i];
  }
}

console.log("Highest Marks:", highest);