function calculateMarks() {

    const sub1 = parseFloat(document.getElementById('sub1').value) || 0;
    const sub2 = parseFloat(document.getElementById('sub2').value) || 0;
    const sub3 = parseFloat(document.getElementById('sub3').value) || 0;
    const sub4 = parseFloat(document.getElementById('sub4').value) || 0;
    const sub5 = parseFloat(document.getElementById('sub5').value) || 0;

    if (sub1 > 100 || sub2 > 100 || sub3 > 100 || sub4 > 100 || sub5 > 100) {
        alert("Please enter marks between 0 and 100.");
        return;
    }

    const totalMarks = sub1 + sub2 + sub3 + sub4 + sub5;
    const averageMarks = totalMarks / 5;

    let grade;
    if (averageMarks >= 90) {
        grade = 'A';
    } else if (averageMarks >= 80) {
        grade = 'B';
    } else if (averageMarks >= 70) {
        grade = 'C';
    } else if (averageMarks >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    document.getElementById('total').textContent = totalMarks;
    document.getElementById('average').textContent = averageMarks.toFixed(2);
    document.getElementById('grade').textContent = grade;
    document.getElementById('results').style.display = 'block';
}