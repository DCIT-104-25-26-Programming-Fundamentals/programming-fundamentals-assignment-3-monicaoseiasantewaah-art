// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 2
// =============================================================================
//
// TASK: Student Grade System
//
// Write a JavaScript program that reads a student's score and outputs the
// corresponding letter grade based on the scale below.
//
// Grading Scale:
//   Score 80 – 100  →  Grade A
//   Score 70 – 79   →  Grade B
//   Score 60 – 69   →  Grade C
//   Score 50 – 59   →  Grade D
//   Score below 50  →  Grade F
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_02_student_grade_system.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLES
// -----------------------------------------------------------------------------
//
//   Enter student score (0-100): 85
//   Grade: A
//
//   Enter student score (0-100): 73
//   Grade: B
//
//   Enter student score (0-100): 45
//   Grade: F
//
//   Enter student score (0-100): 110
//   Error: Score must be between 0 and 100.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST use functions (see scaffold below).
// - Validate the score inside getGrade(). If it is out of range, return null
//   and let main() print the error message.
// - Use if / else if / else to determine the grade.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

function calculateAverage(scores) {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((total, score) => total + score, 0);
    return sum / scores.length;
}

function addStudent(students) {
    const name = readlineSync.question('Student name: ').trim();
    const id = readlineSync.questionInt('Student ID: ');
    const numScores = readlineSync.questionInt('How many scores? ');

    if (numScores <= 0) {
        console.log('Error: Number of scores must be greater than 0.');
        return;
    }

    const scores = [];
    for (let i = 1; i <= numScores; i++) {
        const score = readlineSync.questionFloat(`Enter score ${i}: `);
        scores.push(score);
    }

    const student = {
        name: name,
        id: id,
        scores: scores
    };

    students.push(student);
    console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents(students) {
    if (students.length === 0) {
        console.log('No student records found.');
        return;
    }

    console.log('\n-------------------------------------------------------------------');
    console.log('Name'.padEnd(20) + 'ID'.padEnd(15) + 'Scores'.padEnd(20) + 'Average');
    console.log('-------------------------------------------------------------------');

    students.forEach(student => {
        const avg = calculateAverage(student.scores).toFixed(2);
        const scoresStr = student.scores.join(', ');
        console.log(
            student.name.padEnd(20) +
            String(student.id).padEnd(15) +
            scoresStr.padEnd(20) +
            avg
        );
    });
}

function calculateStudentAverage(students) {
    const targetId = readlineSync.questionInt('Enter student ID: ');
    const student = students.find(s => s.id === targetId);

    if (student) {
        const avg = calculateAverage(student.scores).toFixed(2);
        console.log(`${student.name}'s average score: ${avg}`);
    } else {
        console.log(`Error: Student ID '${targetId}' not found.`);
    }
}

function displayMenu() {
    console.log('\n================================');
    console.log('  STUDENT RECORD SYSTEM MENU  ');
    console.log('================================');
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');
}

function main() {
    const students = [];

    while (true) {
        displayMenu();
        const choice = readlineSync.question('Enter your choice (1-4): ').trim();

        if (choice === '1') {
            addStudent(students);
        } else if (choice === '2') {
            displayAllStudents(students);
        } else if (choice === '3') {
            calculateStudentAverage(students);
        } else if (choice === '4') {
            console.log('Goodbye!');
            break;
        } else {
            console.log('Invalid choice! Please enter a number between 1 and 4.');
        }
    }
}

main();

