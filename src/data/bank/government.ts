import type { Question } from '@/data/questions'
import { raw } from './government-extra'
import { parseBank } from './parse'

export const government: Question[] = [
  { id: 'gov-001', subject: 'government', topic: 'Basic concepts', question: 'The ability to make others act in a way they would not otherwise act is', options: ['authority', 'power', 'legitimacy', 'sovereignty'], answer: 1, explanation: 'Power is the capacity to compel compliance.' },
  { id: 'gov-002', subject: 'government', topic: 'Constitution', question: 'A constitution that is difficult to amend is described as', options: ['flexible', 'rigid', 'unwritten', 'unitary'], answer: 1, explanation: 'Rigid constitutions require special procedures to amend.' },
  { id: 'gov-003', subject: 'government', topic: 'Separation of powers', question: 'The theory of separation of powers is associated with', options: ['John Locke', 'Baron de Montesquieu', 'A. V. Dicey', 'Karl Marx'], answer: 1, explanation: 'Montesquieu popularised separation of powers in "The Spirit of the Laws" (1748).' },
  { id: 'gov-004', subject: 'government', topic: 'Rule of law', question: 'The concept of the rule of law was popularised by', options: ['A. V. Dicey', 'Rousseau', 'Thomas Hobbes', 'Aristotle'], answer: 0, explanation: 'A. V. Dicey expounded the rule of law in 1885.' },
  { id: 'gov-005', subject: 'government', topic: 'Nigerian history', question: 'Nigeria became a republic in', options: ['1960', '1963', '1966', '1979'], answer: 1, explanation: 'Nigeria became a republic on 1 October 1963.' },
  { id: 'gov-006', subject: 'government', topic: 'Federalism', question: 'Nigeria adopted federalism formally under the', options: ['Clifford Constitution 1922', 'Richards Constitution 1946', 'Macpherson Constitution 1951', 'Lyttleton Constitution 1954'], answer: 3, explanation: 'The 1954 Lyttleton Constitution introduced a federal system.' },
  { id: 'gov-007', subject: 'government', topic: 'Electoral systems', question: 'In Nigeria, elections are conducted by', options: ['NPC', 'INEC', 'EFCC', 'NJC'], answer: 1, explanation: 'The Independent National Electoral Commission conducts elections.' },
  { id: 'gov-008', subject: 'government', topic: 'International organisations', question: 'ECOWAS was established in', options: ['1963', '1975', '1981', '2002'], answer: 1, explanation: 'ECOWAS was created by the Treaty of Lagos in May 1975.' },
  { id: 'gov-009', subject: 'government', topic: 'Legislature', question: 'The upper chamber of the Nigerian National Assembly is the', options: ['House of Representatives', 'Senate', 'House of Assembly', 'Council of State'], answer: 1, explanation: 'The Senate is the upper chamber, with 109 senators.' },
  { id: 'gov-010', subject: 'government', topic: 'Pre-colonial systems', question: 'In the pre-colonial Oyo Empire, the Oyo Mesi was checked by the', options: ['Alaafin', 'Ogboni', 'Are-Ona-Kakanfo', 'Bashorun'], answer: 1, explanation: 'The Ogboni cult served as a check on the Oyo Mesi.' },
  { id: 'gov-011', subject: 'government', topic: 'Political parties', question: 'A system in which only one party is legally allowed is', options: ['multi-party system', 'two-party system', 'one-party system', 'zero-party system'], answer: 2, explanation: 'A one-party (single-party) system permits only one legal party.' },
  { id: 'gov-012', subject: 'government', topic: 'Citizenship', question: 'Which of these is a way of acquiring Nigerian citizenship?', options: ['by birth', 'by residence permit', 'by employment', 'by tax payment'], answer: 0, explanation: 'Citizenship is acquired by birth, registration or naturalisation.' },
]

government.push(...parseBank('government', 'gov', 13, raw))
