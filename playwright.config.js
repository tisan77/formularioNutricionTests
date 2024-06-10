import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright
 */
export default defineConfig({
  testDir: './e2e', // Directorio donde están ubicados los archivos de prueba
  timeout: 30 * 1000, // Tiempo de espera por defecto para las pruebas
  expect: {
    timeout: 5000, // Tiempo de espera por defecto para las expectativas
  },
  fullyParallel: true, // Ejecutar pruebas en paralelo
  retries: 2, // Número de reintentos en caso de fallo
  reporter: 'html', // Reporte de pruebas en formato HTML
  use: {
    actionTimeout: 0, // Tiempo de espera por defecto para acciones
    browserName: 'chromium', // Navegador por defecto
    headless: false, // Ejecutar en modo headless
    screenshot: 'only-on-failure', // Tomar capturas de pantalla solo en caso de fallo
    video: 'retain-on-failure', // Grabar video solo en caso de fallo
    trace: 'on-first-retry', // Guardar trazas en el primer reintento
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev', // Comando para iniciar el servidor de desarrollo
    port: 5173, // Puerto en el que corre la aplicación
    timeout: 120 * 1000, // Tiempo de espera para que el servidor se inicie
    reuseExistingServer: !process.env.CI, // Reutilizar el servidor si no está en CI
  },
});

