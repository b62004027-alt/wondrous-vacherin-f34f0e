import type { Question } from '@/data/questions'
import { raw } from './english-extra'
import { parseBank } from './parse'

export const english: Question[] = [
  { id: 'eng-001', subject: 'english', topic: 'Synonyms', question: 'Choose the option nearest in meaning to the word in capitals: The manager was CANDID about the losses.', options: ['secretive', 'frank', 'angry', 'careless'], answer: 1, explanation: '"Candid" means open and honest — "frank".' },
  { id: 'eng-002', subject: 'english', topic: 'Antonyms', question: 'Choose the option opposite in meaning to the word in capitals: Her remarks were quite AMBIGUOUS.', options: ['clear', 'rude', 'vague', 'lengthy'], answer: 0, explanation: '"Ambiguous" means open to more than one interpretation; its opposite is "clear".' },
  { id: 'eng-003', subject: 'english', topic: 'Concord', question: 'Neither the principal nor the teachers ____ aware of the change.', options: ['was', 'is', 'were', 'has been'], answer: 2, explanation: 'With "neither…nor", the verb agrees with the nearer subject — "teachers" (plural) takes "were".' },
  { id: 'eng-004', subject: 'english', topic: 'Idioms', question: 'Choose the option that best explains the idiom: After the scandal, the minister decided to FACE THE MUSIC.', options: ['enjoy himself', 'accept the consequences', 'resign quietly', 'run away'], answer: 1, explanation: '"To face the music" means to accept criticism or punishment for one\'s actions.' },
  { id: 'eng-005', subject: 'english', topic: 'Prepositions', question: 'The students were accused ____ cheating in the examination.', options: ['for', 'with', 'of', 'on'], answer: 2, explanation: 'The correct collocation is "accused of".' },
  { id: 'eng-006', subject: 'english', topic: 'Vowel sounds', question: 'Choose the word that has the same vowel sound as the one represented by the letters in capitals: blOOd', options: ['food', 'good', 'cut', 'boot'], answer: 2, explanation: '"Blood" has the /ʌ/ sound, the same as "cut".' },
  { id: 'eng-007', subject: 'english', topic: 'Stress', question: 'Choose the word with the correct stress pattern (capitals show the stressed syllable).', options: ['ADvertisement', 'adVERtisement', 'advertiSEment', 'advertisEMENT'], answer: 1, explanation: 'In British English (the JAMB standard), "advertisement" is stressed on the second syllable: ad-VER-tise-ment.' },
  { id: 'eng-008', subject: 'english', topic: 'Question tags', question: 'Let us go to the stadium, ____?', options: ["won't we", 'shall we', "don't we", 'will you'], answer: 1, explanation: '"Let us…" takes the question tag "shall we?".' },
  { id: 'eng-009', subject: 'english', topic: 'Spelling', question: 'Choose the correctly spelt word.', options: ['Accomodation', 'Acommodation', 'Accommodation', 'Accommodasion'], answer: 2, explanation: '"Accommodation" has double "c" and double "m".' },
  { id: 'eng-010', subject: 'english', topic: 'Sentence interpretation', question: 'The proposal was dismissed out of hand. This means the proposal was', options: ['rejected without consideration', 'accepted after debate', 'sent back for review', 'handed to another committee'], answer: 0, explanation: '"Out of hand" means immediately, without careful thought.' },
  { id: 'eng-011', subject: 'english', topic: 'Tenses', question: 'By the time we arrived, the lecture ____.', options: ['has started', 'had started', 'starts', 'was starting already'], answer: 1, explanation: 'An action completed before another past action takes the past perfect: "had started".' },
  { id: 'eng-012', subject: 'english', topic: 'Consonant sounds', question: 'Choose the word that contains the sound /θ/.', options: ['this', 'thought', 'mother', 'breathe'], answer: 1, explanation: '"Thought" begins with the voiceless /θ/; the others contain the voiced /ð/.' },
]

english.push(...parseBank('english', 'eng', 13, raw))
