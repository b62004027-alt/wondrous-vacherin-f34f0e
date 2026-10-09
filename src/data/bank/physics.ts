import type { Question } from '@/data/questions'
import { raw } from './physics-extra'
import { parseBank } from './parse'

export const physics: Question[] = [
  { id: 'phy-001', subject: 'physics', topic: 'Motion', question: 'A car accelerates uniformly from rest to 20 m/s in 5 s. What is its acceleration?', options: ['4 m/s²', '100 m/s²', '0.25 m/s²', '25 m/s²'], answer: 0, explanation: 'a = (v − u)/t = 20/5 = 4 m/s².' },
  { id: 'phy-002', subject: 'physics', topic: 'Work, energy & power', question: 'A body of mass 2 kg moves with a velocity of 3 m/s. Its kinetic energy is', options: ['6 J', '9 J', '18 J', '3 J'], answer: 1, explanation: 'K.E. = ½mv² = ½ × 2 × 9 = 9 J.' },
  { id: 'phy-003', subject: 'physics', topic: 'Current electricity', question: 'Three 6 Ω resistors are connected in parallel. The effective resistance is', options: ['18 Ω', '2 Ω', '3 Ω', '6 Ω'], answer: 1, explanation: '1/R = 3/6, so R = 2 Ω.' },
  { id: 'phy-004', subject: 'physics', topic: 'Waves', question: 'A wave has a frequency of 50 Hz and wavelength of 4 m. Its speed is', options: ['12.5 m/s', '200 m/s', '54 m/s', '0.08 m/s'], answer: 1, explanation: 'v = fλ = 50 × 4 = 200 m/s.' },
  { id: 'phy-005', subject: 'physics', topic: 'Heat', question: 'The quantity of heat needed to raise the temperature of 1 kg of a substance by 1 K is its', options: ['heat capacity', 'latent heat', 'specific heat capacity', 'thermal conductivity'], answer: 2, explanation: 'That is the definition of specific heat capacity.' },
  { id: 'phy-006', subject: 'physics', topic: 'Light', question: 'The image formed by a plane mirror is', options: ['real and inverted', 'virtual and laterally inverted', 'real and magnified', 'virtual and diminished'], answer: 1, explanation: 'Plane mirrors form virtual, upright, laterally inverted images of the same size.' },
  { id: 'phy-007', subject: 'physics', topic: 'Pressure', question: 'Calculate the pressure at a depth of 10 m in water. (ρ = 1000 kg/m³, g = 10 m/s²)', options: ['10⁴ Pa', '10⁵ Pa', '10³ Pa', '10⁶ Pa'], answer: 1, explanation: 'P = ρgh = 1000 × 10 × 10 = 1.0 × 10⁵ Pa.' },
  { id: 'phy-008', subject: 'physics', topic: 'Radioactivity', question: 'A radioactive sample has a half-life of 2 days. What fraction remains after 6 days?', options: ['1/3', '1/6', '1/8', '1/4'], answer: 2, explanation: '6 days = 3 half-lives: (½)³ = 1/8.' },
  { id: 'phy-009', subject: 'physics', topic: 'Electromagnetism', question: 'The device that converts mechanical energy to electrical energy is the', options: ['electric motor', 'transformer', 'generator', 'rectifier'], answer: 2, explanation: 'A generator (dynamo) converts mechanical energy into electrical energy.' },
  { id: 'phy-010', subject: 'physics', topic: 'Measurement', question: 'Which of the following is a derived quantity?', options: ['mass', 'length', 'velocity', 'time'], answer: 2, explanation: 'Velocity is derived from length and time.' },
  { id: 'phy-011', subject: 'physics', topic: 'Machines', question: 'A machine has a velocity ratio of 5 and efficiency of 80%. Its mechanical advantage is', options: ['4', '6.25', '400', '0.16'], answer: 0, explanation: 'Efficiency = MA/VR, so MA = 0.8 × 5 = 4.' },
  { id: 'phy-012', subject: 'physics', topic: 'Gas laws', question: 'At constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure. This is', options: ["Charles' law", "Boyle's law", "Pressure law", "Dalton's law"], answer: 1, explanation: "Boyle's law: PV = constant at constant temperature." },
]

physics.push(...parseBank('physics', 'phy', 13, raw))
