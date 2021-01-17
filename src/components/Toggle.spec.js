import React from 'react'
import { create } from 'react-test-renderer'
import Toggle from './Toggle'

describe('<Toggle />', () => {
  it('renders Toggle component when not toggled', () => {
    const snapshot = create(
      <Toggle
        id='test-id'
        name='test-name'
        leftLabel='left label'
        rightLabel='right label'
        onChange={jest.fn()}
      />).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
  it('renders Toggle component when toggled on', () => {
    const snapshot = create(
      <Toggle
        id='test-id'
        name='test-name'
        leftLabel='left label'
        rightLabel='right label'
        onChange={jest.fn()}
        checked
      />).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})
