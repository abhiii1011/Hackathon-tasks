const marks = [15, 38, 59, 99, 90, 67];
let highest = 0;

for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i];
  }
}

console.log("Highest Marks:", highest);
