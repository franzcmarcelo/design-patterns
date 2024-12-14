/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar
      la interfaz Report, generando el contenido de cada reporte en el método generate.

  2.	Implementen las clases SalesReportFactory e InventoryReportFactory
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */


// 1. Definir la interfaz Report
interface Report {
  generate(): void;
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport

class SalesReport implements Report {
  generate(): void {
    console.log('Generando reporte de ventas...')
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('Generando reporte de inventario...')
  }
}

// 3. Clase Base ReportFactory con el Método Factory

abstract class ReportFactory {
  protected abstract createReport(): Report;
  // protected: solo las clases que extiendan de la misma tienen acceso a la propiedad,
  // para no poder cometer el error de llamar reportFactory.createReport(), ya que esta
  // tarea esta delegada a generateReport()

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// 4. Clases Concretas de Fábricas de Reportes

class SalesReportFactory extends ReportFactory {
  createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Report {
    return new InventoryReport();
  }
}

// 5. Código Cliente para Probar

function main() {
  let reportFactory: ReportFactory;

  const reportType = prompt('¿Qué tipo de reporte deseas? (sales/inventory)');

  switch (reportType) {
    case 'sales':
      reportFactory = new SalesReportFactory();
      break;
      case 'inventory':
      reportFactory = new InventoryReportFactory();
      break;
    default:
      throw new Error('Opción no válida')
  }

  reportFactory.generateReport();
}

main();
