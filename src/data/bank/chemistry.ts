import type { Question } from '@/data/questions'
import { raw } from './chemistry-extra'
import { parseBank } from './parse'

export const chemistry: Question[] = [
  { id: 'chm-001', subject: 'chemistry', topic: 'Atomic structure', question: 'An element has atomic number 11 and mass number 23. The number of neutrons is', options: ['11', '12', '23', '34'], answer: 1, explanation: 'Neutrons = mass number − atomic number = 23 − 11 = 12.' },
  { id: 'chm-002', subject: 'chemistry', topic: 'Periodic table', question: 'Elements in the same group of the periodic table have the same', options: ['atomic mass', 'number of shells', 'number of valence electrons', 'number of neutrons'], answer: 2, explanation: 'Group members share the same number of outermost (valence) electrons.' },
  { id: 'chm-003', subject: 'chemistry', topic: 'Mole concept', question: 'How many moles are in 44 g of CO₂? (C = 12, O = 16)', options: ['0.5', '1', '2', '44'], answer: 1, explanation: 'Molar mass of CO₂ = 44 g/mol, so 44 g = 1 mol.' },
  { id: 'chm-004', subject: 'chemistry', topic: 'Acids, bases & salts', question: 'A solution with pH 2 is', options: ['strongly acidic', 'weakly acidic', 'neutral', 'strongly alkaline'], answer: 0, explanation: 'pH values far below 7 indicate strong acidity.' },
  { id: 'chm-005', subject: 'chemistry', topic: 'Chemical bonding', question: 'The bond formed between sodium and chlorine in NaCl is', options: ['covalent', 'ionic', 'metallic', 'dative'], answer: 1, explanation: 'Sodium transfers an electron to chlorine, forming an ionic (electrovalent) bond.' },
  { id: 'chm-006', subject: 'chemistry', topic: 'Organic chemistry', question: 'The general formula of the alkanes is', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₁OH'], answer: 1, explanation: 'Alkanes are saturated hydrocarbons with formula CₙH₂ₙ₊₂.' },
  { id: 'chm-007', subject: 'chemistry', topic: 'Redox', question: 'Oxidation is defined as', options: ['gain of electrons', 'loss of electrons', 'gain of hydrogen', 'loss of oxygen'], answer: 1, explanation: 'OIL RIG: Oxidation Is Loss of electrons.' },
  { id: 'chm-008', subject: 'chemistry', topic: 'Separation techniques', question: 'The best method to separate a mixture of ethanol and water is', options: ['filtration', 'fractional distillation', 'decantation', 'sublimation'], answer: 1, explanation: 'Miscible liquids with different boiling points are separated by fractional distillation.' },
  { id: 'chm-009', subject: 'chemistry', topic: 'Gas laws', question: 'What volume does 1 mole of any gas occupy at s.t.p.?', options: ['11.2 dm³', '22.4 dm³', '24.0 dm³', '44.8 dm³'], answer: 1, explanation: 'The molar volume of a gas at s.t.p. is 22.4 dm³.' },
  { id: 'chm-010', subject: 'chemistry', topic: 'Electrolysis', question: 'During electrolysis, reduction takes place at the', options: ['anode', 'cathode', 'electrolyte', 'salt bridge'], answer: 1, explanation: 'Cations gain electrons (are reduced) at the cathode.' },
  { id: 'chm-011', subject: 'chemistry', topic: 'Rates of reaction', question: 'A catalyst increases the rate of a reaction by', options: ['increasing the temperature', 'lowering the activation energy', 'increasing the concentration', 'shifting the equilibrium'], answer: 1, explanation: 'Catalysts provide an alternative pathway with lower activation energy.' },
  { id: 'chm-012', subject: 'chemistry', topic: 'Water', question: 'Temporary hardness of water is caused by dissolved', options: ['calcium hydrogencarbonate', 'calcium sulphate', 'sodium chloride', 'magnesium sulphate'], answer: 0, explanation: 'Calcium/magnesium hydrogencarbonates cause temporary hardness, removable by boiling.' },
]

chemistry.push(...parseBank('chemistry', 'chm', 13, raw))
