import React from 'react'
import { Badge } from 'dcl-ui'
import { Props } from './Coordinate.types'
import styles from './Coordinate.module.css'

const Coordinate = (props: Props) => {
  const { x, y, className } = props

  return (
    <Badge className={className} color="var(--background-secondary)">
      <i className={styles.pin} />
      {`${x},${y}`}
    </Badge>
  )
}

export default React.memo(Coordinate)
