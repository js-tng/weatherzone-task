import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 6px;
  min-width: 120px;
  font-size: 1.125rem;
  border-radius: 6px;
`

const Select = ({ id, name, placeholder, options, onChange }) => {
  return (
    <StyledSelect id={id} name={name} onChange={onChange} defaultValue={'default'}>
      <option value={'default'} disabled>{placeholder}</option>
      {options.map((option, index) => <option key={`${index}-${option.value}`} value={option.value}>{option.label}</option>)}
    </StyledSelect>
  )
}

Select.defaultProps = {
  placeholder: 'Please select an option'
}

Select.propTypes = {
  /** Sets element id. */
  id: PropTypes.string.isRequired,
  /** Sets element name. */
  name: PropTypes.string.isRequired,
  /** Sets element placeholder. */
  placeholder: PropTypes.string,
  /** Sets element options with label and value. */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
  })).isRequired,
  /** Runs function on selection change. */
  onChange: PropTypes.func.isRequired,
}

export default Select