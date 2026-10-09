import type { Question } from '@/data/questions'
import { raw } from './biology-extra'
import { parseBank } from './parse'

export const biology: Question[] = [
  { id: 'bio-001', subject: 'biology', topic: 'Cell biology', question: 'The organelle responsible for cellular respiration is the', options: ['nucleus', 'ribosome', 'mitochondrion', 'Golgi body'], answer: 2, explanation: 'Mitochondria are the site of aerobic respiration and ATP production.' },
  { id: 'bio-002', subject: 'biology', topic: 'Genetics', question: 'A cross between two heterozygous tall pea plants (Tt × Tt) gives a phenotypic ratio of', options: ['1 : 1', '3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'], answer: 1, explanation: 'Tt × Tt gives TT, Tt, Tt, tt — 3 tall : 1 short.' },
  { id: 'bio-003', subject: 'biology', topic: 'Nutrition', question: 'Which vitamin deficiency causes scurvy?', options: ['Vitamin A', 'Vitamin B₁', 'Vitamin C', 'Vitamin D'], answer: 2, explanation: 'Scurvy results from a lack of vitamin C (ascorbic acid).' },
  { id: 'bio-004', subject: 'biology', topic: 'Photosynthesis', question: 'The gas released during photosynthesis is', options: ['carbon dioxide', 'oxygen', 'nitrogen', 'hydrogen'], answer: 1, explanation: 'Oxygen is released as a by-product of the photolysis of water.' },
  { id: 'bio-005', subject: 'biology', topic: 'Ecology', question: 'In a food chain, organisms that feed directly on producers are', options: ['primary consumers', 'secondary consumers', 'decomposers', 'tertiary consumers'], answer: 0, explanation: 'Herbivores feeding on producers are primary consumers.' },
  { id: 'bio-006', subject: 'biology', topic: 'Transport', question: 'Which blood vessel carries oxygenated blood from the lungs to the heart?', options: ['pulmonary artery', 'pulmonary vein', 'aorta', 'vena cava'], answer: 1, explanation: 'The pulmonary vein is the only vein carrying oxygenated blood.' },
  { id: 'bio-007', subject: 'biology', topic: 'Classification', question: 'Which of the following is a characteristic of all members of kingdom Monera?', options: ['presence of chloroplasts', 'absence of a true nucleus', 'multicellular body', 'presence of cellulose cell walls'], answer: 1, explanation: 'Monera (bacteria) are prokaryotes — they lack a membrane-bound nucleus.' },
  { id: 'bio-008', subject: 'biology', topic: 'Excretion', question: 'The functional unit of the kidney is the', options: ['neuron', 'nephron', 'alveolus', 'villus'], answer: 1, explanation: 'Nephrons filter blood and form urine.' },
  { id: 'bio-009', subject: 'biology', topic: 'Reproduction', question: 'Fertilisation in humans normally takes place in the', options: ['uterus', 'vagina', 'oviduct (fallopian tube)', 'ovary'], answer: 2, explanation: 'The sperm meets the ovum in the oviduct.' },
  { id: 'bio-010', subject: 'biology', topic: 'Coordination', question: 'The part of the brain that controls balance and posture is the', options: ['cerebrum', 'cerebellum', 'medulla oblongata', 'hypothalamus'], answer: 1, explanation: 'The cerebellum coordinates muscular movement and balance.' },
  { id: 'bio-011', subject: 'biology', topic: 'Evolution', question: 'The theory of natural selection was proposed by', options: ['Lamarck', 'Mendel', 'Darwin', 'Hooke'], answer: 2, explanation: 'Charles Darwin (with Wallace) proposed evolution by natural selection.' },
  { id: 'bio-012', subject: 'biology', topic: 'Diseases', question: 'Malaria is caused by', options: ['a virus', 'Plasmodium', 'a bacterium', 'Trypanosoma'], answer: 1, explanation: 'Malaria is caused by the protozoan Plasmodium, transmitted by the female Anopheles mosquito.' },
]

biology.push(...parseBank('biology', 'bio', 13, raw))
