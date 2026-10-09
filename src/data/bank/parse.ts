import type { Question, SubjectId } from '@/data/questions'

// Compact bank format, one question per line:
//   Topic | Question | Correct option | Wrong option | Wrong option | Wrong option | Explanation
// The correct option's position is derived from a hash of the question text, so answers are
// spread across A–D but stay stable between deploys (attempts are graded by id on the server).
export function parseBank(subject: SubjectId, prefix: string, firstNumber: number, raw: string): Question[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const [topic, question, correct, w1, w2, w3, explanation] = line.split('|').map((part) => part.trim())
      const answer = (hash(question) % 4) as Question['answer']
      const options = [w1, w2, w3]
      options.splice(answer, 0, correct)
      return {
        id: `${prefix}-${String(firstNumber + i).padStart(3, '0')}`,
        subject,
        topic,
        question,
        options: options as Question['options'],
        answer,
        explanation,
      }
    })
}

function hash(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h
}
