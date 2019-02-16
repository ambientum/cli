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
}

// default export.
export default ComposeVariable;
