/**
 * Interface IComposeVariable.
 */
export interface IComposeVariable {
  // variable name.
  name: string;
  // variable value.
  value: string;
}

/**
 * Class ComposeVariable.
 */
export class ComposeVariable implements IComposeVariable {
  // variable name.
  public name: string;
  // variable value.
  public value: string;

  // constructor.
  public constructor(options: IComposeVariable) {
    // assign values.
    this.name = options.name;
    this.value = options.value;
  }

  // serialize variable instance to compose syntax.
  public serialize() {
    return `${this.name}=${this.value}`;
  }
}

// default export.
export default ComposeVariable;
