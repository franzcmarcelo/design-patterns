/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparando una hamburguesa de pollo')
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparando una hamburguesa de res')
  }
}

abstract class RestaurantFactory {

  abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends RestaurantFactory {
  override createHamburger(): Hamburger {
    return new ChickenHamburger()
  }
}

class BeefRestaurant extends RestaurantFactory {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

function main() {
  let restaurant: RestaurantFactory;

  const burgerType = prompt('¿Qué tipo de hamburguesa quieres? (chicken/beef)')

  switch (burgerType) {
    case 'chicken':
      restaurant = new ChickenRestaurant();
      break;
    case 'beef':
      restaurant = new BeefRestaurant();
      break;
    default:
      throw new Error('Opción no válida')
  }

  restaurant.orderHamburger();
}

main();