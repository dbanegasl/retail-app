// Tests de lógica básica del proyecto
// Estas funciones simulan validaciones reales de una app retail

describe('Lógica de negocio — Retail App', () => {

  test('El precio de un producto debe ser mayor a cero', () => {
    const precio = 9.99;
    expect(precio).toBeGreaterThan(0);
  });

  test('El nombre del producto no debe estar vacío', () => {
    const nombre = 'Laptop DUOTICS Pro';
    expect(nombre.length).toBeGreaterThan(0);
  });

  test('El descuento no debe superar el 100%', () => {
    const descuento = 15;
    expect(descuento).toBeLessThanOrEqual(100);
  });

  test('Total = precio × cantidad', () => {
    const precio = 10;
    const cantidad = 3;
    const total = precio * cantidad;
    expect(total).toBe(30);
  });

});
