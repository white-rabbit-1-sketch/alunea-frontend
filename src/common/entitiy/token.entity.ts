export class Token {
  protected value: string | null = null;
  protected sub: string | null = null;
  protected exp: number | null = null;

  public getValue(): string | null {
    return this.value;
  }

  public setValue(value: string | null) {
    this.value = value;
  }

  public getSub(): string | null {
    return this.sub;
  }

  public setSub(sub: string | null) {
    this.sub = sub;
  }

  public getExp(): number | null {
    return this.exp;
  }

  public setExp(exp: number | null) {
    this.exp = exp;
  }
}
