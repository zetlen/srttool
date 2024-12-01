import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('offset', () => {
  it('runs offset cmd', async () => {
    const {stdout} = await runCommand('offset')
    expect(stdout).to.contain('hello world')
  })

  it('runs offset --name oclif', async () => {
    const {stdout} = await runCommand('offset --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
