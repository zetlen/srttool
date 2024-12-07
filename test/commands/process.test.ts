import { captureOutput, runCommand } from "@oclif/test";
import { expect } from "chai";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { stdin as fstdin } from "mock-stdin";
import Process from "../../src/commands/process";

const trekSrtPath = "examples/trek.srt";

const tmpPath = (name: string) =>
  join(
    tmpdir(),
    `srttooltest-${Math.random().toString().split(".").pop()}-${name}`,
  );

describe("process", () => {
  let trekSrt: string;
  let stdin: ReturnType<typeof fstdin>;
  before(async () => {
    trekSrt = await readFile(trekSrtPath, "utf8");
    stdin = fstdin();
  });
  it("prints to stdout", async () => {
    const { stderr, stdout } = await runCommand(["-s", trekSrtPath]);
    expect(stdout).to.equal(trekSrt);
    expect(stderr).to.contain("[info]");
  });
  it("prints to a file", async () => {
    const temp = tmpPath("treksrtout.json");
    const { stdout, stderr } = await runCommand([
      "-s",
      trekSrtPath,
      "-d",
      temp,
    ]);
    expect(await readFile(temp, "utf8")).to.equal(trekSrt);
    expect(stdout).to.be.empty;
    expect(stderr).to.contain("[info]");
  });
  it.skip("accepts stdin", async () => {
    const { stdout, stderr } = await captureOutput(async () => {
      setTimeout(() => stdin.send(trekSrt), 10);
      return Process.run();
    });
    expect(stderr).to.contain("[info]");
    expect(stdout).to.equal(trekSrt);
  });
});
