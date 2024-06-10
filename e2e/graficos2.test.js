import { test, expect } from '@playwright/test';

test.describe('Graficos2 Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://integrador-nutricion-front.vercel.app/grafico2'); // Ajusta la URL según tu configuración
  });

  test('verificar que la tabla de datos se muestre correctamente', async ({ page }) => {
    try {
      // Espera a que el título "Datos Recopilados" esté presente en el DOM
      await page.waitForSelector('text=Datos Recopilados', { timeout: 10000 });

      // Verificar que el título esté presente y visible
      await expect(page.locator('text=Datos Recopilados')).toBeVisible();

      // Esperar a que la tabla de datos esté presente
      await page.waitForSelector('table', { timeout: 10000 });

      // Verificar que la tabla esté presente y visible
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verificar que el resumen de respuestas esté presente
      const resumenSensacion = page.locator('h3', { hasText: 'Sensación Granulado Arenoso' });
      await expect(resumenSensacion).toBeVisible();

      const resumenSabor = page.locator('h3', { hasText: 'Sabor Predominante' });
      await expect(resumenSabor).toBeVisible();

      // Verificar que el botón para ver gráfico de barras esté presente y clicable
      const boton = page.locator('text=Ver Gráfico de Barras');
      await expect(boton).toBeVisible();
      await expect(boton).toBeEnabled();
    } catch (error) {
      // Tomar una captura de pantalla si algo falla
      await page.screenshot({ path: 'graficos2_test_error.png' });
      throw error;
    }
  });
});
