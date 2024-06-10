import { test, expect } from '@playwright/test';

test.describe('CombinedGraficos Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://integrador-nutricion-front.vercel.app/combined-graficos'); // Ajusta la URL según tu configuración
  });

  test('verificar que ambos componentes (Graficos y Graficos2) se muestren correctamente', async ({ page }) => {
    try {
      // Verificar que el título "Diagrama de barras" esté presente y visible en Graficos
      await expect(page.locator('text=Diagrama de barras')).toBeVisible();

      // Verificar que el gráfico de barras esté presente
      await expect(page.locator('canvas')).toBeVisible();

      // Verificar que el título "Datos Recopilados" esté presente y visible en Graficos2
      await expect(page.locator('text=Datos Recopilados')).toBeVisible();

      // Verificar que la tabla de datos esté presente y visible
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verificar que el resumen de respuestas esté presente
      const resumenSensacion = page.locator('h3', { hasText: 'Sensación Granulado Arenoso' });
      await expect(resumenSensacion).toBeVisible();

      const resumenSabor = page.locator('h3', { hasText: 'Sabor Predominante' });
      await expect(resumenSabor).toBeVisible();

      // Verificar que el botón para volver a inicio esté presente y clicable
      const boton = page.locator('text=Volver a Inicio');
      await expect(boton).toBeVisible();
      await expect(boton).toBeEnabled();
    } catch (error) {
      // Tomar una captura de pantalla si algo falla
      await page.screenshot({ path: 'combined_graficos_test_error.png' });
      throw error;
    }
  });
});
