export default abstract class App {
  howtoRootDir: string | null;

  constructor(howtoRootDir: string | null) {
    this.howtoRootDir = howtoRootDir;
  }

  public start(): void {
    console.log(`Starting App`);
    this.run();
  }

  protected abstract run(): void;
}
