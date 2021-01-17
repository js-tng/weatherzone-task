import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Switch from "react-switch";
import { colors } from '../styles/colors'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SwitchLabels = styled.span`
  margin: 8px;
`

const Toggle = ({ id, name, checked, leftLabel, rightLabel, onChange }) => {
  return (
    <Wrapper id={id} name={name}>
      {leftLabel && <SwitchLabels>{leftLabel}</SwitchLabels>}
      <Switch
        checked={checked}
        onChange={onChange}
        onColor={colors.blue.lightBlue}
        onHandleColor={colors.blue.primaryBlue}
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow={colors.shadow.defaultShadow}
        activeBoxShadow={colors.shadow.activeShadow}
        height={20}
        width={48}
      />
      {rightLabel && <SwitchLabels>{rightLabel}</SwitchLabels>}
    </Wrapper>
  )
}

Toggle.defaultProps = {
  checked: false
}

Toggle.propTypes = {
  /** Sets element id. */
  id: PropTypes.string.isRequired,
  /** Sets element name. */
  name: PropTypes.string.isRequired,
  /** Sets element checked/toggle status. */
  checked: PropTypes.bool.isRequired,
  /** Sets element's left label. */
  leftLabel: PropTypes.string,
  /** Sets element's right label. */
  rightLabel: PropTypes.string,
  /** Runs function on toggle change. */
  onChange: PropTypes.func.isRequired,
}

export default Toggle