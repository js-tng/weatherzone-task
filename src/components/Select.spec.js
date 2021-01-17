import React from 'react'
import { create } from 'react-test-renderer'
import Select from './Select'

describe('<Select />', () => {
  it('renders Select component', () => {
    const snapshot = create(
      <Select
        id='test-id'
        name='test-name'
        options={[{ label: 'label 1', value: 'value-1' }, { label: 'label 2', value: 'value-2' }]}
        onChange={jest.fn()}
      />).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})
