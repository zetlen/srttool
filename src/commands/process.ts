import { Command, Flags } from "@oclif/core";
import chalk from "chalk";
import { createReadStream, createWriteStream } from "node:fs";
import { Readable, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { filter, parse, resync, stringify } from "subtitle";

export default class Process extends Command {
  static override description =
    "Modify SRT subtitle files. Offset all titles in seconds, remove or replace titles, embed or extract them.";

  static override examples = [
    {
      command:
        "<%= config.bin %> <%= command.id %> --offset 500 -s file.srt -d outfile.srt",
      description: "Move subtitles forward 0.5 seconds",
    },
    {
      command:
        "<%= config.bin %> <%= command.id %> --detect-from video.mkv -s file.srt -d outfile.srt",
      description: "Synchronize subtitles with detected dialog in video.mkv",
    },
  ];

  static override flags = {
    destination: Flags.file({
      aliases: ["d"],
      summary: "output file (stdout if not provided)",
    }),
    offset: Flags.integer({
      description:
        "Positive or negative offset, in milliseconds. A negative offset will make subtitles appear earlier.",
      summary: "Offset in milliseconds",
    }),
    remove: Flags.string({
      aliases: ["r"],
      multiple: true,
      summary: "Remove cues containing this string",
    }),
    source: Flags.file({
      aliases: ["s"],
      exists: true,
      summary: ".srt file to modify (stdin if not provided)",
    }),
  };

  protected logInfo(message: string) {
    this.logToStderr(
      `${chalk.dim.blue("[info]")} ${chalk.dim.yellow(message)}`,
    );
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Process);
    let input: Readable;
    if (flags.source) {
      input = createReadStream(flags.source, "utf8");
      this.logInfo(`Reading from ${flags.source}`);
    } else {
      input = process.stdin;
      this.logInfo(`Reading from stdin`);
    }

    const transforms: (Readable | Writable)[] = [input, parse()];

    if (flags.offset) {
      transforms.push(resync(flags.offset));
      this.logInfo(`Offsetting all cues by ${flags.offset}ms`);
    }

    if (flags.remove && flags.remove.length > 0) {
      transforms.push(
        filter(
          (node) =>
            !(
              node.type === "cue" &&
              flags.remove!.some((toRemove) =>
                node.data.text.includes(toRemove),
              )
            ),
        ),
      );
      this.logInfo(
        ["Removing all cues that contain text:", ...flags.remove].join(
          "\n  - ",
        ),
      );
    }

    transforms.push(stringify({ format: "SRT" }));

    const [outStream, name] = createOutStream(flags.destination);
    transforms.push(outStream);
    this.logInfo(`Writing to ${name}`);

    try {
      await pipeline(transforms, {
        end: Boolean(flags.destination),
      });
      this.logInfo("Done!");
    } catch (error) {
      this.error(error as Error, { exit: 2 });
    }
  }
}

function createOutStream(filePath?: string): [stream: Writable, name: string] {
  if (filePath) {
    return [createWriteStream(filePath), filePath];
  }

  // horrible hack for testing because @oclif/testing can't deal with piping
  // directly to stdout

  if (process.env.NODE_ENV === "test") {
    return [
      new Writable({
        writev(chunks, cb) {
          for (const { chunk } of chunks) {
            process.stdout.write(chunk);
          }

          cb();
        },
      }),
      "test stdout",
    ];
  }

  /* c8 ignore next */
  return [process.stdout, "stdout"];
}
