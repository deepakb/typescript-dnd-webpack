export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  mountEl: T;
  sourceEl: U;

  constructor(templateId: string, hostId: string, insertAtStart: boolean, sourceElId?: string) {
    this.templateEl = document.getElementById(templateId) as HTMLTemplateElement;
    this.mountEl = document.getElementById(hostId) as T;

    const importFormNode = document.importNode(this.templateEl.content, true);
    this.sourceEl = importFormNode.firstElementChild as U;

    if (sourceElId) {
      this.sourceEl.id = sourceElId;
    }
    
    this.mount(insertAtStart)
  }

  private mount(insertAtStart: boolean) {
    this.mountEl.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.sourceEl);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
