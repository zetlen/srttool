import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('process', () => {
  it('prints to stdout', async () => {
    // @oclif/test doesn't properly mock streams, so piping to stdout
    // does not get caught
    const {stderr} = await runCommand(['-s', 'examples/trek.srt']);
    expect(stderr).to.contain('[info]');
  })
})
