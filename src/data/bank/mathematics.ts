import type { Question } from '@/data/questions'
import { raw } from './mathematics-extra'
import { parseBank } from './parse'

export const mathematics: Question[] = [
  { id: 'mth-001', subject: 'mathematics', topic: 'Indices', question: 'Simplify 27^(2/3) × 16^(-1/4).', options: ['9/2', '18', '9/4', '3/2'], answer: 0, explanation: '27^(2/3) = 9 and 16^(-1/4) = 1/2, so the product is 9/2.' },
  { id: 'mth-002', subject: 'mathematics', topic: 'Logarithms', question: 'Evaluate log₂8 + log₃9.', options: ['5', '6', '4', '17'], answer: 0, explanation: 'log₂8 = 3 and log₃9 = 2, giving 5.' },
  { id: 'mth-003', subject: 'mathematics', topic: 'Quadratic equations', question: 'Find the roots of x² − 5x + 6 = 0.', options: ['2 and 3', '−2 and −3', '1 and 6', '−1 and 6'], answer: 0, explanation: 'x² − 5x + 6 = (x − 2)(x − 3), so x = 2 or 3.' },
  { id: 'mth-004', subject: 'mathematics', topic: 'Number bases', question: 'Convert 101101₂ to base ten.', options: ['43', '45', '47', '41'], answer: 1, explanation: '32 + 0 + 8 + 4 + 0 + 1 = 45.' },
  { id: 'mth-005', subject: 'mathematics', topic: 'Statistics', question: 'Find the mean of 2, 4, 6, 8, 10.', options: ['5', '6', '7', '8'], answer: 1, explanation: 'Sum = 30, divided by 5 numbers = 6.' },
  { id: 'mth-006', subject: 'mathematics', topic: 'Differentiation', question: 'If y = 3x³ − 2x² + x, find dy/dx.', options: ['9x² − 4x + 1', '9x² − 2x + 1', '3x² − 4x + 1', '9x³ − 4x'], answer: 0, explanation: 'Differentiate term by term: 9x² − 4x + 1.' },
  { id: 'mth-007', subject: 'mathematics', topic: 'Sequences', question: 'Find the 10th term of the A.P. 3, 7, 11, …', options: ['39', '43', '40', '37'], answer: 0, explanation: 'Tₙ = a + (n − 1)d = 3 + 9(4) = 39.' },
  { id: 'mth-008', subject: 'mathematics', topic: 'Probability', question: 'A fair die is tossed once. What is the probability of getting a number greater than 4?', options: ['1/6', '1/3', '1/2', '2/3'], answer: 1, explanation: 'Favourable outcomes are 5 and 6: 2/6 = 1/3.' },
  { id: 'mth-009', subject: 'mathematics', topic: 'Mensuration', question: 'Find the area of a circle of radius 7 cm. (π = 22/7)', options: ['44 cm²', '154 cm²', '144 cm²', '308 cm²'], answer: 1, explanation: 'A = πr² = 22/7 × 49 = 154 cm².' },
  { id: 'mth-010', subject: 'mathematics', topic: 'Sets', question: 'If n(A) = 12, n(B) = 9 and n(A ∩ B) = 4, find n(A ∪ B).', options: ['25', '17', '21', '13'], answer: 1, explanation: 'n(A ∪ B) = 12 + 9 − 4 = 17.' },
  { id: 'mth-011', subject: 'mathematics', topic: 'Trigonometry', question: 'If sin θ = 3/5 and θ is acute, find tan θ.', options: ['4/5', '3/4', '4/3', '5/3'], answer: 1, explanation: 'Opposite = 3, hypotenuse = 5, so adjacent = 4. tan θ = 3/4.' },
  { id: 'mth-012', subject: 'mathematics', topic: 'Variation', question: 'y varies inversely as x. When x = 4, y = 6. Find y when x = 8.', options: ['12', '3', '2', '48'], answer: 1, explanation: 'xy = k = 24; when x = 8, y = 24/8 = 3.' },
]

mathematics.push(...parseBank('mathematics', 'mth', 13, raw))
