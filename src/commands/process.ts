import { Command, Flags } from "@oclif/core";
import { default as createDebug } from "debug";
import { createReadStream, createWriteStream } from "node:fs";
import { Readable, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

import { getSrtTransforms } from "../lib/srt-transforms.js";

const debug = createDebug("srttool:process");

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

  public async run(): Promise<void> {
    const { flags } = await this.parse(Process);
    let input: Readable;
    if (flags.source) {
      input = createReadStream(flags.source, "utf8");
      debug(`Reading from ${flags.source}`);
    } else {
      input = process.stdin;
      debug(`Reading from stdin`);
    }

    const transforms = [
      ...(await getSrtTransforms(input, flags)),
      createOutStream(flags.destination),
    ];

    try {
      await pipeline(transforms);
      debug("Done!");
    } catch (error) {
      this.error(error as Error, { exit: 2 });
    }
  }
}

function createOutStream(filePath?: string): Writable {
  if (filePath) {
    debug(`Writing to ${filePath}`);
    return createWriteStream(filePath);
  }

  debug(`Writing to stdout`);

  // passthrough to stdout, which permits easier testing
  // also avoids write-after-end by not closing stdout when done
  return new Writable({
    writev(chunks, cb) {
      for (const { chunk } of chunks) {
        process.stdout.write(chunk);
      }

      cb();
    },
  });
}
