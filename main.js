const baseValue = document.getElementById('base-value');
const ratio = document.getElementById('ratio');
const stepsPerCycle = document.getElementById('steps-per-cycle');
const cyclesAboveBase = document.getElementById('cycles-above-base');
const cyclesBelowBase = document.getElementById('cycles-below-base');
const outputEl = document.getElementById('output');
const resetButton = document.getElementById('reset');

const ROUND_PRECISION = 1000000;
const round = (number) => Math.round(number * ROUND_PRECISION) / ROUND_PRECISION;

const getValueAtStep = (steps, baseValue, ratio, stepsPerCycle) => {
  return Math.pow(ratio, (1 / stepsPerCycle) * steps) * baseValue;
};

const sanitizeFloat = (input) => {
  let value = input.value.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
  if (value.startsWith('-')) value = value.substring(1);
  input.value = value;
};

const sanitizePositiveInteger = (input) => {
  let value = input.value.replace(/\D/g, '');
  let intValue = parseInt(value, 10);
  if (isNaN(intValue)) {
    input.value = '';
    return;
  }
  if (intValue < 1) intValue = 1;
  input.value = intValue;
};

const getInputs = () => {
  return {
    f: parseFloat(baseValue.value),
    r: parseFloat(ratio.value),
    n: parseInt(stepsPerCycle.value),
    h: parseInt(cyclesAboveBase.value),
    l: parseInt(cyclesBelowBase.value)
  };
};

const calculateScale = (f, r, n, h, l) => {
  const values = [];
  for (let i = l * n * -1; i <= -1; i++) {
    const value = getValueAtStep(i, f, r, n);
    if (value === 0) break;
    values.push(value);
  }
  for (let i = 0; i <= h * n; i++) {
    const value = getValueAtStep(i, f, r, n);
    if (!Number.isFinite(value)) break;
    values.push(value);
  }
  return values.reverse();
};

const updateDOM = () => {
  const { f, r, n, h, l } = getInputs();
  if (isNaN(f) || isNaN(r) || isNaN(n) || isNaN(h) || isNaN(l)) {
    outputEl.innerHTML = '';
    return;
  }
  const valuesArray = calculateScale(f, r, n, h, l);
  let html = '';
  valuesArray.forEach((value, i) => {
    const className = (i % n !== 0) ? 'secondary' : 'primary';
    html += `<div class="output-group ${className}"><span>Value ${i + 1}:</span><span>${round(value)}</span></div>`;
  });
  outputEl.innerHTML = html;
};

const clearAll = () => {
  baseValue.value = '';
  ratio.value = '';
  stepsPerCycle.value = '';
  cyclesAboveBase.value = '';
  cyclesBelowBase.value = '';
  updateDOM();
};

const handleInput = (e) => {
  const input = e.target;
  switch (input.id) {
    case 'base-value':
    case 'ratio':
      sanitizeFloat(input);
      break;
    case 'steps-per-cycle':
    case 'cycles-above-base':
    case 'cycles-below-base':
      sanitizePositiveInteger(input);
      break;
  }
  updateDOM();
};

const setupEventListeners = () => {
  const inputList = document.querySelectorAll('input');
  inputList.forEach(input => { input.addEventListener('input', handleInput) });
  resetButton.addEventListener('click', clearAll);
};

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateDOM();
});
