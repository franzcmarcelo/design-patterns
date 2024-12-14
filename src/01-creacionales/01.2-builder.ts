//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 *
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

class QueryBuilder {

  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`)
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {

    const fields = (this.fields.length > 0) ? this.fields.join(', ') : '*';
    const conditions = (this.conditions.length > 0) ? ` WHERE ${this.conditions.join(' AND ')}` : '';
    const orderFields = (this.orderFields.length > 0) ? ` ORDER BY ${this.orderFields.join(', ')}` : '';
    const limit = this.limitCount ? ` LIMIT ${this.limitCount}` : '';

    return `\nSELECT ${fields}\n FROM ${this.table}\n${conditions}\n${orderFields}\n${limit}`;
  }
}

function main() {
  const usersQuery = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .orderBy("age", "DESC")
    .limit(10)
    .execute();

  console.log(usersQuery);
}

main();