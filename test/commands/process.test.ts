import { captureOutput, runCommand } from "@oclif/test";
import { expect } from "chai";
import eol from "eol";
import { stdin as fstdin } from "mock-stdin";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import Process from "../../src/commands/process";

const trekSrtPath = "examples/trek.srt";

const tmpPath = (name: string) =>
  join(
    tmpdir(),
    `srttooltest-${Math.random().toString().split(".").pop()}-${name}`,
  );

describe("process", () => {
  let trekSrt: string;
  let trekNoAds: string;
  let trekOffset: string;
  let stdin: ReturnType<typeof fstdin>;
  before(async () => {
    trekSrt = await readFile(trekSrtPath, "utf8");
    trekNoAds = await readFile("examples/trek-noads.srt", "utf8");
    trekOffset = await readFile("examples/trek-offset.srt", "utf8");
    stdin = fstdin();
  });
  it("prints to stdout", async () => {
    const { stdout } = await runCommand(["-s", trekSrtPath]);
    expect(eol.auto(stdout)).to.equal(trekSrt);
  });
  it("prints to a file", async () => {
    const temp = tmpPath("treksrtout.json");
    const { stdout } = await runCommand(["-s", trekSrtPath, "-d", temp]);
    expect(eol.auto(await readFile(temp, "utf8"))).to.equal(trekSrt);
    expect(eol.auto(stdout)).to.be.empty;
  });
  it.skip("accepts stdin", async () => {
    const { stdout } = await captureOutput(async () => {
      setTimeout(() => stdin.send(trekSrt), 10);
      return Process.run();
    });
    expect(eol.auto(stdout)).to.equal(trekSrt);
  });
  it("removes matched cues", async () => {
    const { stdout } = await runCommand([
      "-s",
      trekSrtPath,
      "-r",
      "Advertisement",
    ]);
    expect(eol.auto(stdout)).to.equal(trekNoAds);
  });
  it("offsets by provided amount", async () => {
    const { stdout } = await runCommand([
      "-s",
      trekSrtPath,
      "--offset",
      "5000",
    ]);
    expect(eol.auto(stdout)).to.equal(trekOffset);
  });
});
