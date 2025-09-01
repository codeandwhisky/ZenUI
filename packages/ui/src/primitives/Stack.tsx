import React from 'react'
import { Box, BoxProps } from './Box'

export interface StackProps extends BoxProps {
  /**
   * Direction of the stack
   */
  direction?: 'column' | 'row'
  /**
   * Space between children
   */
  space?: number
  /**
   * Alignment of children along the cross axis
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * Justification of children along the main axis
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  /**
   * Whether children should wrap
   */
  wrap?: boolean
}

/**
 * Stack component - A layout component that stacks its children with consistent spacing.
 */
export const Stack = React.forwardRef<any, StackProps>(
  ({ 
    direction = 'column',
    space = 16,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    style,
    children,
    ...props 
  }, ref) => {
    const flexDirection = direction === 'column' ? 'column' : 'row'
    const alignItems = 
      align === 'start' ? 'flex-start' :
      align === 'end' ? 'flex-end' :
      align === 'center' ? 'center' :
      'stretch'
    
    const justifyContent = 
      justify === 'start' ? 'flex-start' :
      justify === 'end' ? 'flex-end' :
      justify === 'center' ? 'center' :
      justify === 'space-between' ? 'space-between' :
      justify === 'space-around' ? 'space-around' :
      'space-evenly'

    const stackStyle = {
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap: wrap ? 'wrap' as const : 'nowrap' as const,
      ...style,
    }

    const childrenWithSpacing = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child
      
      const isLast = index === React.Children.count(children) - 1
      if (isLast) return child

      const marginStyle = direction === 'column' 
        ? { marginBottom: space }
        : { marginRight: space }

      return React.cloneElement(child, {
        style: {
          ...child.props.style,
          ...marginStyle,
        },
      })
    })

    return (
      <Box ref={ref} style={stackStyle} {...props}>
        {childrenWithSpacing}
      </Box>
    )
  }
)

Stack.displayName = 'Stack'

/**
 * VStack component - Vertical stack (column direction)
 */
export const VStack = React.forwardRef<any, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
)

VStack.displayName = 'VStack'

/**
 * HStack component - Horizontal stack (row direction)
 */
export const HStack = React.forwardRef<any, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
)

HStack.displayName = 'HStack'