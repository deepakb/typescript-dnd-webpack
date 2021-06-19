import Component from '../components/base';
import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';
import { autobind } from '../decorators/autobind';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.sourceEl.addEventListener('dragstart', this.dragStartHandler);
    this.sourceEl.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.sourceEl.querySelector('h2')!.textContent = this.project.title;
    this.sourceEl.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.sourceEl.querySelector('p')!.textContent = this.project.description;
  }
}
