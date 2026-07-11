// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Terminal boot sequence
const lines = [
  { prompt: '$ whoami', output: 'Daniel Enyia' },
  { prompt: '$ role', output: 'Backend Developer (in training)' },
  { prompt: '$ education', output: 'Software Engineering, FUTMinna — 100L' },
  { prompt: '$ location', output: 'Abia State, Nigeria' },
  { prompt: '$ status', output: 'Open to internships & backend roles' },
];

const body = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  body.innerHTML = '';
  lines.forEach(line => {
    const row = document.createElement('div');
    row.className = 'term__row';
    row.innerHTML = `<span class="term__prompt">${line.prompt}</span>\n<span class="term__output">> ${line.output}</span>`;
    body.appendChild(row);
  });
  const cursorRow = document.createElement('div');
  cursorRow.className = 'term__row';
  cursorRow.innerHTML = '<span class="term__cursor"></span>';
  body.appendChild(cursorRow);
}

function typeSequence() {
  body.innerHTML = '';
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      const cursorRow = document.createElement('div');
      cursorRow.className = 'term__row';
      cursorRow.innerHTML = '<span class="term__cursor"></span>';
      body.appendChild(cursorRow);
      return;
    }

    const line = lines[lineIndex];
    const row = document.createElement('div');
    row.className = 'term__row';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'term__prompt';
    row.appendChild(promptSpan);
    body.appendChild(row);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      promptSpan.textContent = line.prompt.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= line.prompt.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          const outputSpan = document.createElement('span');
          outputSpan.className = 'term__output';
          outputSpan.textContent = '> ' + line.output;
          row.appendChild(document.createElement('br'));
          row.appendChild(outputSpan);
          lineIndex++;
          setTimeout(typeLine, 220);
        }, 150);
      }
    }, 28);
  }

  typeLine();
}

if (reduceMotion) {
  renderStatic();
} else {
  typeSequence();
}
