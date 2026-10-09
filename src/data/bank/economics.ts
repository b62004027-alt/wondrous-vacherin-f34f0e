import type { Question } from '@/data/questions'
import { raw } from './economics-extra'
import { parseBank } from './parse'

export const economics: Question[] = [
  { id: 'eco-001', subject: 'economics', topic: 'Basic concepts', question: 'Opportunity cost is best defined as', options: ['the money cost of a good', 'the alternative forgone', 'the cost of production', 'the market price'], answer: 1, explanation: 'Opportunity cost is the next best alternative sacrificed.' },
  { id: 'eco-002', subject: 'economics', topic: 'Demand & supply', question: 'A rise in the price of a good, other things being equal, leads to', options: ['a rise in quantity demanded', 'a fall in quantity demanded', 'a shift of the demand curve to the right', 'no change in demand'], answer: 1, explanation: 'By the law of demand, price and quantity demanded move in opposite directions.' },
  { id: 'eco-003', subject: 'economics', topic: 'Elasticity', question: 'If a 10% fall in price causes a 20% rise in quantity demanded, demand is', options: ['inelastic', 'unitary elastic', 'elastic', 'perfectly inelastic'], answer: 2, explanation: 'PED = 20/10 = 2 > 1, so demand is elastic.' },
  { id: 'eco-004', subject: 'economics', topic: 'Money', question: 'Which of the following is NOT a function of money?', options: ['medium of exchange', 'store of value', 'measure of value', 'factor of production'], answer: 3, explanation: 'Money is not one of the factors of production (land, labour, capital, entrepreneur).' },
  { id: 'eco-005', subject: 'economics', topic: 'Market structures', question: 'A market with a single seller and no close substitutes is', options: ['perfect competition', 'oligopoly', 'monopoly', 'monopolistic competition'], answer: 2, explanation: 'A monopoly has one seller and no close substitutes.' },
  { id: 'eco-006', subject: 'economics', topic: 'Inflation', question: 'Inflation caused by rising production costs is known as', options: ['demand-pull inflation', 'cost-push inflation', 'hyperinflation', 'creeping inflation'], answer: 1, explanation: 'Rising input costs push prices up — cost-push inflation.' },
  { id: 'eco-007', subject: 'economics', topic: 'National income', question: 'GDP plus net factor income from abroad gives', options: ['NNP', 'GNP', 'NDP', 'Per capita income'], answer: 1, explanation: 'GNP = GDP + net income from abroad.' },
  { id: 'eco-008', subject: 'economics', topic: 'Banking', question: 'The lender of last resort in Nigeria is the', options: ['First Bank', 'Central Bank of Nigeria', 'Bank of Industry', 'Ministry of Finance'], answer: 1, explanation: 'The CBN acts as the lender of last resort to commercial banks.' },
  { id: 'eco-009', subject: 'economics', topic: 'Production', question: 'The reward for land as a factor of production is', options: ['wages', 'interest', 'rent', 'profit'], answer: 2, explanation: 'Land earns rent; labour earns wages; capital earns interest; entrepreneur earns profit.' },
  { id: 'eco-010', subject: 'economics', topic: 'International trade', question: 'The theory of comparative advantage is associated with', options: ['Adam Smith', 'David Ricardo', 'J. M. Keynes', 'Thomas Malthus'], answer: 1, explanation: 'David Ricardo developed the theory of comparative cost advantage.' },
  { id: 'eco-011', subject: 'economics', topic: 'Public finance', question: 'A tax whose rate increases as income increases is', options: ['regressive', 'proportional', 'progressive', 'indirect'], answer: 2, explanation: 'Progressive taxes take a higher percentage from higher incomes.' },
  { id: 'eco-012', subject: 'economics', topic: 'Population', question: 'The Malthusian theory states that population grows in', options: ['arithmetic progression', 'geometric progression', 'harmonic progression', 'a constant rate'], answer: 1, explanation: 'Malthus said population grows geometrically while food supply grows arithmetically.' },
]

economics.push(...parseBank('economics', 'eco', 13, raw))
