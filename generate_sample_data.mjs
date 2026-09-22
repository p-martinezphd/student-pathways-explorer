import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outputDirectory = dirname(fileURLToPath(import.meta.url));
const rowCount = 600;
let seed = 20210922;

const genders = ["Female", "Male", "Nonbinary"];
const races = [
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "Two or more races",
  "White",
];
const colleges = ["Arts & Humanities", "Business", "Education", "Engineering", "Natural Sciences"];
const degrees = ["BA", "BFA", "BS", "BBA"];
const majors = {
  "Arts & Humanities": ["Communication", "English", "Studio Art"],
  Business: ["Accounting", "Finance", "Marketing"],
  Education: ["Education Studies", "Human Development", "Teaching"],
  Engineering: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
  "Natural Sciences": ["Biology", "Chemistry", "Mathematics"],
};

function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 4294967296;
}

function choose(values) {
  return values[Math.floor(random() * values.length)];
}

function bool(value) {
  return value ? "TRUE" : "FALSE";
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const columns = [
  "id", "term_code", "gender", "race_ethnicity", "age", "college", "degree", "major", "program",
  "term_gpa", "persisted_w3_to_end", "undeclared_to_declared", "Year1_Persistence", "Year2_Persistence",
  "Year3_Persistence", "Year4_Persistence", "Graduated", "Dropped_Out", "Year5_Persistence", "Graduation_Year",
];

const rows = [];
for (let index = 0; index < rowCount; index += 1) {
  const college = choose(colleges);
  const degree = choose(degrees);
  const major = choose(majors[college]);
  const year1 = random() < 0.84;
  const year2 = year1 ? random() < 0.88 : random() < 0.24;
  const year3 = year2 ? random() < 0.90 : random() < 0.28;
  const graduateYear3 = year3 && random() < 0.035;
  const year4 = !graduateYear3 && (year3 ? random() < 0.91 : random() < 0.32);
  const graduateYear4 = year4 && random() < 0.33;
  const year5 = !graduateYear3 && !graduateYear4 && (year4 ? random() < 0.86 : random() < 0.36);
  const graduateYear5 = year5 && random() < 0.58;
  const graduated = graduateYear3 || graduateYear4 || graduateYear5;
  const graduationYear = graduateYear3 ? 3 : graduateYear4 ? 4 : graduateYear5 ? 5 : "";
  const droppedOut = !graduated && !year5;

  rows.push({
    id: `S${String(index + 1).padStart(5, "0")}`,
    term_code: "202170",
    gender: choose(genders),
    race_ethnicity: choose(races),
    age: 18 + Math.floor(random() * 8),
    college,
    degree,
    major,
    program: degree,
    term_gpa: (1.8 + random() * 2.2).toFixed(2),
    persisted_w3_to_end: bool(random() < 0.94),
    undeclared_to_declared: bool(random() < 0.09),
    Year1_Persistence: bool(year1),
    Year2_Persistence: bool(year2),
    Year3_Persistence: bool(year3),
    Year4_Persistence: bool(year4),
    Graduated: bool(graduated),
    Dropped_Out: bool(droppedOut),
    Year5_Persistence: bool(year5),
    Graduation_Year: graduationYear,
  });
}

const content = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => csv(row[column])).join(",")),
].join("\n");

writeFileSync(join(outputDirectory, "student_data.csv"), `${content}\n`, "utf8");
console.log(`Generated ${rowCount} synthetic student records.`);
