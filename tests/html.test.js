// Tests de estructura HTML del proyecto
// Verifican que los archivos clave existen en el repositorio

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

describe('Estructura de archivos HTML', () => {

  test('index.html existe en la raíz', () => {
    const existe = fs.existsSync(path.join(root, 'index.html'));
    expect(existe).toBe(true);
  });

  test('public/home.html existe', () => {
    const existe = fs.existsSync(path.join(root, 'public', 'home.html'));
    expect(existe).toBe(true);
  });

  test('public/student.html existe', () => {
    const existe = fs.existsSync(path.join(root, 'public', 'student.html'));
    expect(existe).toBe(true);
  });

  test('public/student2.html existe', () => {
    const existe = fs.existsSync(path.join(root, 'public', 'student2.html'));
    expect(existe).toBe(true);
  });

  test('index.html no está vacío', () => {
    const contenido = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    expect(contenido.length).toBeGreaterThan(100);
  });

});
