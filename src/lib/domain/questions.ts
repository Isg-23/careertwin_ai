import type { Question } from "./types";

/**
 * Prototype question bank. Small, hand-written, deterministic.
 * Not a psychometrically validated instrument.
 */
export const questionBank: Question[] = [
  // --- SQL fundamentals / filtering / aggregation ---
  {
    id: "q-sql-1",
    skill: "SQL",
    nodeId: "sql-fundamentals",
    difficulty: 1,
    prompt: "Which clause chooses the columns returned by a query?",
    options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    correctIndex: 0,
    explanation: "SELECT lists the columns; FROM names the table.",
  },
  {
    id: "q-sql-2",
    skill: "SQL",
    nodeId: "sql-filtering",
    difficulty: 1,
    prompt: "Which query returns orders placed after 1 Jan 2024?",
    options: [
      "SELECT * FROM orders HAVING order_date > '2024-01-01'",
      "SELECT * FROM orders WHERE order_date > '2024-01-01'",
      "SELECT * FROM orders ORDER BY order_date > '2024-01-01'",
      "SELECT * FROM orders GROUP BY order_date",
    ],
    correctIndex: 1,
    explanation: "Row-level filtering uses WHERE. HAVING filters groups after aggregation.",
  },
  {
    id: "q-sql-3",
    skill: "SQL",
    nodeId: "sql-aggregation",
    difficulty: 2,
    prompt: "You need total revenue per region. Which is correct?",
    options: [
      "SELECT region, SUM(amount) FROM sales GROUP BY region",
      "SELECT region, SUM(amount) FROM sales",
      "SELECT region, amount FROM sales GROUP BY amount",
      "SELECT SUM(region), amount FROM sales GROUP BY region",
    ],
    correctIndex: 0,
    explanation: "Non-aggregated columns in the SELECT must appear in GROUP BY.",
  },
  {
    id: "q-sql-4",
    skill: "SQL",
    nodeId: "sql-aggregation",
    difficulty: 3,
    prompt: "Which clause filters groups that have more than 10 orders?",
    options: [
      "WHERE COUNT(*) > 10",
      "HAVING COUNT(*) > 10",
      "FILTER COUNT(*) > 10",
      "GROUP BY COUNT(*) > 10",
    ],
    correctIndex: 1,
    explanation: "HAVING applies conditions after aggregation; WHERE runs before grouping.",
  },
  // --- JOINs (the failure point in the demo narrative) ---
  {
    id: "q-join-1",
    skill: "SQL",
    nodeId: "sql-joins",
    difficulty: 2,
    prompt: "Which JOIN keeps every customer even when they have no orders?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN on orders", "CROSS JOIN"],
    correctIndex: 1,
    explanation:
      "LEFT JOIN keeps all rows from the left table (customers) and fills missing order rows with NULL.",
  },
  {
    id: "q-join-2",
    skill: "SQL",
    nodeId: "sql-joins",
    difficulty: 3,
    prompt:
      "customers(1) -> orders(many). Joining them and running COUNT(*) grouped by customer returns inflated totals. The most likely cause is:",
    options: [
      "COUNT(*) is not a valid aggregate",
      "The join duplicates customer rows once per matching order row",
      "GROUP BY cannot be used with JOIN",
      "LEFT JOIN always duplicates rows",
    ],
    correctIndex: 1,
    explanation:
      "A one-to-many join repeats the parent row per child match. Understanding cardinality of the relationship is the prerequisite here.",
  },
  // --- Prerequisite probes: relationships and keys ---
  {
    id: "q-rel-1",
    skill: "SQL",
    nodeId: "db-relationships",
    difficulty: 1,
    prompt:
      "In a one-to-many relationship between customers and orders, where does the foreign key live?",
    options: ["In customers", "In orders", "In both tables", "In a separate index table"],
    correctIndex: 1,
    explanation: "The 'many' side stores the foreign key pointing back to the 'one' side.",
  },
  {
    id: "q-rel-2",
    skill: "SQL",
    nodeId: "db-relationships",
    difficulty: 2,
    prompt:
      "A student can enrol in many courses and a course has many students. This relationship is modelled with:",
    options: [
      "A foreign key in students",
      "A foreign key in courses",
      "A junction (bridge) table holding both keys",
      "No keys are needed",
    ],
    correctIndex: 2,
    explanation:
      "Many-to-many relationships require a junction table with a foreign key to each side.",
  },
  {
    id: "q-key-1",
    skill: "SQL",
    nodeId: "db-keys",
    difficulty: 1,
    prompt: "A primary key must be:",
    options: [
      "Unique and not null",
      "Always an integer",
      "Always auto-generated",
      "Unique but may be null",
    ],
    correctIndex: 0,
    explanation: "A primary key uniquely identifies a row and cannot be null.",
  },
  // --- Python ---
  {
    id: "q-py-1",
    skill: "Python",
    nodeId: "py-fundamentals",
    difficulty: 1,
    prompt: "What does len([1, 2, 3]) return?",
    options: ["2", "3", "[1,2,3]", "Error"],
    correctIndex: 1,
    explanation: "len() returns the number of elements.",
  },
  {
    id: "q-py-2",
    skill: "Python",
    nodeId: "py-data-structures",
    difficulty: 2,
    prompt: "Which structure gives fast lookup by a unique label?",
    options: ["list", "tuple", "dict", "set"],
    correctIndex: 2,
    explanation: "Dictionaries map keys to values with average O(1) lookup.",
  },
  {
    id: "q-py-3",
    skill: "Python",
    nodeId: "py-pandas",
    difficulty: 2,
    prompt: "Which expression returns average revenue per region in a pandas DataFrame df?",
    options: [
      "df.groupby('region')['revenue'].mean()",
      "df['revenue'].groupby('region')",
      "df.mean('region')",
      "df.agg('region', 'revenue')",
    ],
    correctIndex: 0,
    explanation: "groupby() then an aggregation on the target column.",
  },
  {
    id: "q-py-4",
    skill: "Python",
    nodeId: "py-analysis",
    difficulty: 3,
    prompt:
      "A numeric column has 4% missing values in a trend analysis. A defensible first step is:",
    options: [
      "Drop the whole column",
      "Replace every value with 0",
      "Inspect the missingness pattern, then choose drop or impute and document it",
      "Ignore it, pandas handles everything",
    ],
    correctIndex: 2,
    explanation: "Handling missing data starts with understanding why it is missing.",
  },
  // --- Statistics ---
  {
    id: "q-stat-1",
    skill: "Statistics",
    nodeId: "stat-descriptive",
    difficulty: 1,
    prompt: "For a strongly right-skewed salary distribution, the better centre measure is:",
    options: ["Mean", "Median", "Mode of the range", "Standard deviation"],
    correctIndex: 1,
    explanation: "The median resists the pull of extreme values.",
  },
  {
    id: "q-stat-2",
    skill: "Statistics",
    nodeId: "stat-correlation",
    difficulty: 2,
    prompt: "Two variables have a correlation of 0.85. This means:",
    options: [
      "One causes the other",
      "They move together strongly in a linear sense",
      "85% of the variation is explained",
      "The relationship is definitely not linear",
    ],
    correctIndex: 1,
    explanation: "Correlation measures linear association, not causation.",
  },
  {
    id: "q-stat-3",
    skill: "Statistics",
    nodeId: "stat-probability",
    difficulty: 2,
    prompt:
      "A fair coin lands heads 4 times in a row. The probability of heads on the next flip is:",
    options: ["Less than 0.5", "0.5", "More than 0.5", "Cannot be determined"],
    correctIndex: 1,
    explanation: "Independent trials have no memory.",
  },
  // --- Power BI ---
  {
    id: "q-bi-1",
    skill: "Power BI",
    nodeId: "bi-import",
    difficulty: 1,
    prompt: "Which Power BI component is used to load and shape source data?",
    options: ["Power Query", "DAX Studio", "Report view", "Bookmarks"],
    correctIndex: 0,
    explanation: "Power Query handles import and transformation steps.",
  },
  {
    id: "q-bi-2",
    skill: "Power BI",
    nodeId: "bi-transform",
    difficulty: 2,
    prompt: "A fact table and a date table produce wrong totals. The most common cause is:",
    options: [
      "Too many visuals on the page",
      "An incorrect or missing relationship between the tables",
      "The file is too large",
      "Using a bar chart instead of a line chart",
    ],
    correctIndex: 1,
    explanation: "Model relationships drive filter propagation — again a relationships concept.",
  },
  {
    id: "q-bi-3",
    skill: "Power BI",
    nodeId: "bi-dashboard",
    difficulty: 3,
    prompt: "An executive dashboard should lead with:",
    options: [
      "Every available metric",
      "A small set of decision-relevant KPIs with context",
      "Raw tables",
      "As many colours as possible",
    ],
    correctIndex: 1,
    explanation: "Dashboard design prioritises decisions, not completeness.",
  },
];

export function questionsForNode(nodeId: string) {
  return questionBank.filter((q) => q.nodeId === nodeId);
}
