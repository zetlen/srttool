import { default as createDebug } from "debug";
import { Readable, Writable } from "node:stream";
import { filter, parse, resync, stringify } from "subtitle";

const debug = createDebug("srttool:srttransforms");

type SrtTransformFlags = {
  offset?: number;
  remove?: string[];
};

export async function getSrtTransforms(
  input: Readable,
  flags: SrtTransformFlags,
) {
  const transforms: (Readable | Writable)[] = [input, parse()];

  if (flags.offset) {
    transforms.push(resync(flags.offset));
    debug(`Offsetting all cues by ${flags.offset}ms`);
  }

  if (flags.remove && flags.remove.length > 0) {
    transforms.push(
      filter(
        (node) =>
          !(
            node.type === "cue" &&
            flags.remove!.some((toRemove) => node.data.text.includes(toRemove))
          ),
      ),
    );
    debug(
      ["Removing all cues that contain text:", ...flags.remove].join("\n  - "),
    );
  }

  transforms.push(stringify({ format: "SRT" }));

  return transforms;
}
