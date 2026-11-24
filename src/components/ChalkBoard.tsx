const CHECKLIST = [
  'identidade visual',
  '3 telas com navegação',
  'componentização',
  'dados com Preferences'
];

const ChalkBoard: React.FC = () => (
  <aside className="chalkboard" aria-hidden="true">
    <p className="chalkboard__eyebrow">Projeto A2</p>
    <h1 className="chalkboard__title">Semestre</h1>
    <p className="chalkboard__subtitle">
      provas, trabalhos e notas
      <br />
      num app híbrido em Ionic + React
    </p>
    <ul className="chalkboard__list">
      {CHECKLIST.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <p className="chalkboard__date">entrega 01/12</p>
  </aside>
);

export default ChalkBoard;
