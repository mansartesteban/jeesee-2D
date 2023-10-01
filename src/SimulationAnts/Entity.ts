import ArrayUtils from "../Utils/Arrays";
import Component from "./Components";
import TransformComponent from "./Components/TransformComponent";
import Scene from "./Scene";

class Entity {
  components: Component[] = [];
  datas: { [name: string]: any; } = {};

  transform: TransformComponent = new TransformComponent();

  constructor(...components: Component[]) {
    this.components = this.components.concat(this.transform, components);
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  removeComponent(component: Component) {
    let foundComponent = this.components.findIndex(
      (entityComponent) => entityComponent == component
    );
    if (foundComponent !== -1) {
      this.components.splice(foundComponent, 1);
    }
  }

  removeComponents(componentType: { new(): Component; }) {
    let foundIndexes = ArrayUtils.findIndexMultiple(
      this.components,
      (component: Component) => component instanceof componentType
    );
    if (foundIndexes) {
      ArrayUtils.removeMultiple(this.components, foundIndexes);
    }
  }

  getComponent(componentType: { new(): Component; }) {
    return this.components.find((component) => {
      return component instanceof componentType;
    });
  }

  update() {
    this.updateEntity();
    this.components.forEach((component) => {
      component.updateComponent(this);
    });
  }

  updateEntity() { }

  delete() {
    Scene.removeEntity(this);
  }
}

export default Entity;
