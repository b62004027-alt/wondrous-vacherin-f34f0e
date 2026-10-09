import type { Question } from '@/data/questions'
import { raw } from './literature-extra'
import { parseBank } from './parse'

export const literature: Question[] = [
  { id: 'lit-001', subject: 'literature', topic: 'Literary terms', question: 'A comparison using "like" or "as" is a', options: ['metaphor', 'simile', 'personification', 'hyperbole'], answer: 1, explanation: 'A simile compares two things explicitly using "like" or "as".' },
  { id: 'lit-002', subject: 'literature', topic: 'Drama', question: 'A tragic hero\'s fatal flaw is known as', options: ['catharsis', 'hamartia', 'hubris', 'peripeteia'], answer: 1, explanation: 'Hamartia is the error or flaw that leads to the hero\'s downfall.' },
  { id: 'lit-003', subject: 'literature', topic: 'Poetry', question: 'A poem of fourteen lines is a', options: ['ballad', 'sonnet', 'ode', 'elegy'], answer: 1, explanation: 'The sonnet has fourteen lines.' },
  { id: 'lit-004', subject: 'literature', topic: 'Literary terms', question: '"The wind whispered through the trees" is an example of', options: ['simile', 'personification', 'onomatopoeia', 'irony'], answer: 1, explanation: 'Giving the wind a human ability (whispering) is personification.' },
  { id: 'lit-005', subject: 'literature', topic: 'Prose', question: 'A narrative told by a character using "I" is in the', options: ['third-person point of view', 'first-person point of view', 'omniscient point of view', 'second-person point of view'], answer: 1, explanation: 'First-person narration uses "I".' },
  { id: 'lit-006', subject: 'literature', topic: 'Drama', question: 'A speech in which a character alone on stage reveals his thoughts is a', options: ['dialogue', 'aside', 'soliloquy', 'monologue to the audience'], answer: 2, explanation: 'A soliloquy is spoken by a character alone, revealing inner thoughts.' },
  { id: 'lit-007', subject: 'literature', topic: 'African literature', question: '"Things Fall Apart" was written by', options: ['Wole Soyinka', 'Chinua Achebe', 'Ngũgĩ wa Thiong\'o', 'Cyprian Ekwensi'], answer: 1, explanation: 'Chinua Achebe published "Things Fall Apart" in 1958.' },
  { id: 'lit-008', subject: 'literature', topic: 'Poetry', question: 'The repetition of initial consonant sounds in nearby words is', options: ['assonance', 'alliteration', 'rhyme', 'enjambment'], answer: 1, explanation: 'Alliteration repeats initial consonant sounds, e.g. "Peter Piper picked".' },
  { id: 'lit-009', subject: 'literature', topic: 'Literary terms', question: 'Exaggeration used for emphasis is', options: ['litotes', 'hyperbole', 'euphemism', 'paradox'], answer: 1, explanation: 'Hyperbole is deliberate exaggeration.' },
  { id: 'lit-010', subject: 'literature', topic: 'Drama', question: 'A play that ends happily and is meant to amuse is a', options: ['tragedy', 'comedy', 'melodrama', 'tragicomedy'], answer: 1, explanation: 'Comedy is light-hearted with a happy ending.' },
  { id: 'lit-011', subject: 'literature', topic: 'Poetry', question: 'A poem mourning the dead is an', options: ['ode', 'elegy', 'epic', 'lyric'], answer: 1, explanation: 'An elegy is a lament for the dead.' },
  { id: 'lit-012', subject: 'literature', topic: 'Literary terms', question: 'When the audience knows something a character does not, it is', options: ['verbal irony', 'dramatic irony', 'situational irony', 'satire'], answer: 1, explanation: 'Dramatic irony occurs when the audience knows more than the characters.' },
]

literature.push(...parseBank('literature', 'lit', 13, raw))
