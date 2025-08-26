function calculate() {

  let math = parseFloat(document.getElementById("math").value) || 0;
  let science = parseFloat(document.getElementById("science").value) || 0;
  let english = parseFloat(document.getElementById("english").value) || 0;
  let computer = parseFloat(document.getElementById("computer").value) || 0;


  let total = math + science + english + computer;
  let percentage = (total / 400) * 100;


  let grade = "";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 75) grade = "A";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 45) grade = "C";
  else grade = "Fail";

  
  document.getElementById("result").innerHTML =
    `Total Marks: ${total}/400 <br> 
     Percentage: ${percentage.toFixed(2)}% <br>
     Grade: ${grade}`;
}
