import type { ArticleDetail } from "~/types/article";
import { authors } from "./authorData";

const sampleWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
];

function randomSentence(wordCount: number): string {
  return (
    Array.from({ length: wordCount })
      .map(() => sampleWords[Math.floor(Math.random() * sampleWords.length)])
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase()) + "."
  );
}

function randomText(
  sentences: number,
  minWords: number,
  maxWords: number,
): string {
  return Array.from({ length: sentences })
    .map(() =>
      randomSentence(
        minWords + Math.floor(Math.random() * (maxWords - minWords)),
      ),
    )
    .join(" ");
}

// 🔹 Helper – random EditorJS content generátor
function generateEditorJSContent(): EditorJS.OutputData {
  const blocks: EditorJS.OutputData["blocks"] = [];

  // Random number of paragraphs
  const paragraphCount = 2 + Math.floor(Math.random() * 4);

  for (let i = 0; i < paragraphCount; i++) {
    blocks.push({
      id: `block-${i}`,
      type: "paragraph",
      data: {
        text: randomText(1 + Math.floor(Math.random() * 3), 10, 20),
      },
    });
  }

  // Néha adjunk címet is
  if (Math.random() > 0.5) {
    blocks.unshift({
      id: "header-1",
      type: "header",
      data: {
        text: randomSentence(3 + Math.floor(Math.random() * 3)),
        level: 2,
      },
    });
  }

  return {
    time: Date.now(),
    blocks,
    version: "2.29.1", // tetszőleges verzió
  };
}

export const articles: ArticleDetail[] = Array.from({ length: 18 }).map(
  (_, i) => {
    const author = authors[i % authors.length];
    return {
      id: String(i + 1),
      title: randomSentence(3 + Math.floor(Math.random() * 8)),
      summary: randomText(1 + Math.floor(Math.random() * 3), 8, 15),
      content: generateEditorJSContent(), // 🔹 EditorJS kompatibilis content
      created_at: new Date(2025, 0, i + 1),
      updated_at: new Date(2025, 0, i + 1 + (i % 2)),
      author: {
        username: author.username,
        full_name: author.full_name,
        profile_image: author.profile_image,
        url: new URL(`/authors/${author.username}`, window.location.origin),
      },
    };
  },
);
